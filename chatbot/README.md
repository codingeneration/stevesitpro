# Chatbot backend

Serverless function behind the chat bubble on stevesitpro.com (`public/chat-widget.js`).
It sends the visitor's conversation to Claude Haiku with the business info in
`lib/knowledge.js` and returns the reply.

- `api/chat.js` — the endpoint (`POST /api/chat`), with origin check and a per-IP rate limit
- `lib/knowledge.js` — what the bot knows: packages, retainers, contact, links. **Update this when prices change.**

## Hosting

Deployed on Vercel as the project **stevesitpro-chatbot**, imported from this repo with
**Root Directory = `chatbot`**. Vercel only rebuilds it when files in this folder change.
The widget calls `https://stevesitpro-chatbot.vercel.app/api/chat`.

Environment variables (Vercel → Project → Settings → Environment Variables):

| Name | Required | Value |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | Key from console.anthropic.com |
| `ANTHROPIC_MODEL` | no | Defaults to `claude-haiku-4-5-20251001` |

After adding or changing a variable, redeploy for it to take effect.

## Checking it

Vercel → stevesitpro-chatbot → Logs shows each request; failed calls to Claude are
logged as `Anthropic API error` with the reason (bad key, no credit, etc.).
