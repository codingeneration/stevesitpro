import React, { useState } from "react";

export default function App() {
  const WEB_APP_URL =
    "https://script.google.com/macros/s/AKfycbyevJvyyUv4wDkbCJuHkMJ18iRICrEyLpMtJ5x7r0U9-OG7ntO7tsNgFWAE_0sKN0KM/exec";

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState({ type: "idle", note: "" });

  // -------------------------------
  // Contact form handler
  // -------------------------------
  const submitDirect = async () => {
    // Honeypot: if bots fill hidden field, pretend success
    if ((form.website || "").trim() !== "") {
      setStatus({ type: "ok", note: "Thanks!" });
      setForm({ name: "", email: "", company: "", message: "", website: "" });
      return;
    }

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({
        type: "error",
        note: "Please enter your name, email and a short message.",
      });
      return;
    }

    setStatus({ type: "sending", note: "" });

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids CORS preflight
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          website: form.website || "",
          source: "stevesitpro.com",
        }),
      });

      // If fetch didn’t throw, assume success
      setStatus({ type: "ok", note: "Thanks! We received your message." });
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch (e) {
      setStatus({
        type: "error",
        note: "Submission failed. Try again or email us.",
      });
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Contact Form */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold text-blue-700">Let’s talk</h2>
        <p className="text-sm text-slate-600">
          Tell us about your Workspace environment and what you’d like to
          automate or improve. We’ll reply within one business day.
        </p>

        <div className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-lg border px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full rounded-lg border px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Company"
            className="w-full rounded-lg border px-3 py-2"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
          <textarea
            placeholder="Message"
            className="w-full rounded-lg border px-3 py-2"
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          {/* Honeypot */}
          <input
            type="text"
            className="hidden"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />

          <button
            onClick={submitDirect}
            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Send →
          </button>

          {status.type === "ok" && (
            <p className="text-green-600 text-sm mt-2">{status.note}</p>
          )}
          {status.type === "error" && (
            <p className="text-red-600 text-sm mt-2">{status.note}</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Steve’s IT Pro • Google Workspace
        Consulting & Apps Script Automation{" "}
        <a href="#privacy" className="underline text-blue-600">
          Privacy
        </a>{" "}
        •{" "}
        <a href="#terms" className="underline text-blue-600">
          Terms
        </a>
      </footer>
    </main>
  );
}
