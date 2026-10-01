import { useState } from "react";
import { ArrowRight, BadgeCheck, Mail } from "lucide-react";
import { CONTACT_EMAIL, INTAKE_FORM_URL, WEB_APP_URL } from "../config";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");

  const submit = async () => {
    if (form.website) return; // honeypot
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...form, source: "stevesitpro.com" }),
      });
      setStatus("ok");
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-4 pb-20">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: context */}
        <div>
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Get in Touch</span>
          <h2 className="text-3xl font-extrabold text-white mt-2 mb-3">Let's fix your Workspace.</h2>
          <p className="text-white/50 leading-relaxed mb-6">
            Whether you need a quick tune-up or a full automation build, the first step is a free 30-minute discovery call. No commitment, no sales pressure — just a straight answer on what your setup needs.
          </p>
          <div className="space-y-3">
            <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-emerald-400" /></div>
              Book a free 30-min consult
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail className="w-4 h-4 text-sky-400" /></div>
              {CONTACT_EMAIL}
            </a>
            <a href="https://stevemoynihan.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><BadgeCheck className="w-4 h-4 text-white/40" /></div>
              About Steve → stevemoynihan.com
            </a>
          </div>
        </div>

        {/* Right: form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <h3 className="font-semibold text-white text-lg mb-1">Send a message</h3>
          <p className="text-white/40 text-sm mb-5">Usually responds within one business day.</p>
          {status === "ok" ? (
            <div className="text-center py-10">
              <div className="text-emerald-400 text-4xl mb-3">✓</div>
              <p className="text-white font-semibold">Message sent!</p>
              <p className="text-white/50 text-sm mt-1">I'll be in touch within one business day.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              <input
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                placeholder="Your name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                placeholder="Email address *"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                placeholder="Company (optional)"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <textarea
                className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition resize-none"
                rows={4}
                placeholder="What do you need help with? *"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {/* Honeypot */}
              <input
                type="text"
                className="hidden"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                onClick={submit}
                disabled={status === "sending"}
                className="bg-emerald-500 text-slate-950 rounded-xl py-2.5 font-bold hover:bg-emerald-400 transition disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send message →"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing directly.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
