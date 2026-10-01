// POST /api/chat — backend for public/chat-widget.js on stevesitpro.com.
// Request:  { messages: [{ role: "user" | "assistant", content: string }, ...] }
// Response: { reply: string }  or  { error: string } with a 4xx/5xx status.

import { SYSTEM_PROMPT } from "../lib/knowledge.js";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const MAX_TOKENS = 400;
const MAX_MESSAGES = 12; // only the most recent turns are sent to the model
const MAX_CHARS = 2000; // per message
const RATE_LIMIT = 10; // requests per IP per window
const RATE_WINDOW_MS = 60_000;

const ALLOWED_ORIGINS = new Set([
  "https://stevesitpro.com",
  "https://www.stevesitpro.com",
  "http://localhost:5173",
  "http://localhost:4173",
]);

// Best-effort limiter. It lives in one function instance's memory, so it
// resets on cold starts; it's there to stop casual abuse, not a determined attacker.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Max-Age", "86400");
}

// Turn whatever the widget sent into a clean, alternating user/assistant list
// that starts and ends with a user turn (what the Messages API expects).
export function cleanMessages(input) {
  if (!Array.isArray(input)) return [];
  const out = [];
  for (const m of input.slice(-MAX_MESSAGES * 2)) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) continue;
    if (typeof m.content !== "string") continue;
    const content = m.content.trim().slice(0, MAX_CHARS);
    if (!content) continue;
    const last = out[out.length - 1];
    if (last && last.role === m.role) last.content += "\n\n" + content;
    else out.push({ role: m.role, content });
  }
  while (out.length && out[0].role !== "user") out.shift();
  while (out.length && out[out.length - 1].role !== "user") out.pop();
  const trimmed = out.slice(-MAX_MESSAGES);
  while (trimmed.length && trimmed[0].role !== "user") trimmed.shift();
  return trimmed;
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Use POST" });

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).json({ error: "Origin not allowed" });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ error: "Too many messages. Please wait a minute and try again." });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ANTHROPIC_API_KEY is not set");
    return res.status(500).json({ error: "Chat is not configured" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = null; }
  }
  const messages = cleanMessages(body?.messages);
  if (!messages.length) return res.status(400).json({ error: "No message to answer" });

  try {
    const apiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await apiRes.json().catch(() => ({}));
    if (!apiRes.ok) {
      console.error("Anthropic API error", apiRes.status, JSON.stringify(data));
      return res.status(502).json({ error: "The assistant is unavailable right now" });
    }

    const reply = (data.content || [])
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    if (!reply) return res.status(502).json({ error: "Empty reply" });
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler failed", err);
    return res.status(502).json({ error: "The assistant is unavailable right now" });
  }
}
