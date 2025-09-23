import React, { useState } from "react";
import { Check, Zap, Shield, Clock, ArrowRight, Mail, Phone, Quote } from "lucide-react";

/* ---------- Config ---------- */
const CONTACT_EMAIL = "steve@stevesitpro.com";
const BUSINESS_PHONE = "TBD";
const CALENDLY_URL = "#";                   // add later if you want
const INTAKE_FORM_URL = "";                 // optional external intake form
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyevJvyyUv4wDkbCJuHkMJ18iRICrEyLpMtJ5x7r0U9-OG7ntO7tsNgFWAE_0sKN0KM/exec";

/* ---------- Helpers ---------- */
function resolveLink(url, fallback = "#contact") {
  const u = (url || "").trim();
  if (u && u !== "#") return { href: u, external: /^https?:\/\//.test(u) };
  return { href: fallback, external: false };
}

/* ---------- Page Data ---------- */
const features = [
  { icon: <Zap className="w-5 h-5 text-green-600" />, title: "Automation, Fast", text: "Apps Script workflows that remove busywork in days, not months." },
  { icon: <Shield className="w-5 h-5 text-red-500" />, title: "Secure by Default", text: "SPF/DKIM/DMARC, role-based access, and admin policies baked in." },
  { icon: <Clock className="w-5 h-5 text-yellow-500" />, title: "On-Time Delivery", text: "Clear milestones, weekly updates, and predictable timelines." },
];

const services = [
  {
    title: "Google Workspace Setup & Hardening",
    bullets: [
      "Tenant setup/migration guidance",
      "Secure groups, OUs, & sharing controls",
      "SPF, DKIM, DMARC configuration",
      "Drive/Shared Drives structure & cleanup",
    ],
  },
  {
    title: "Apps Script Automation & Integrations",
    bullets: [
      "Onboarding/Offboarding flows (Forms → Sheets → Admin)",
      "Doc/Drive automations & scheduled reports",
      "3rd-party APIs & webhooks",
      "Custom admin tools & dashboards",
    ],
  },
  {
    title: "Admin & End-User Training",
    bullets: [
      "Google Workspace Admin fundamentals",
      "Security & compliance best practices",
      "Workspace productivity (Gmail, Docs, Sheets, Meet)",
      "Custom training playbooks and office hours",
    ],
  },
];

const tiers = [
  {
    name: "Starter Setup",
    price: "$749",
    cadence: "one-time",
    cta: "Get Started",
    popular: false,
    points: [
      "New or cleanup Workspace setup",
      "SPF/DKIM/DMARC + basic policies",
      "Shared Drives structure blueprint",
      "2 hours of admin coaching",
    ],
  },
  {
    name: "Automation Sprint",
    price: "$1,499",
    cadence: "per sprint (1–2 weeks)",
    cta: "Build My Workflow",
    popular: true,
    points: [
      "One scoped Apps Script workflow",
      "Intake form + Sheet + approvals",
      "Email/slack notifications",
      "Implementation & handoff video",
    ],
  },
  {
    name: "Pro Support",
    price: "$799",
    cadence: "/month",
    cta: "Book a Call",
    popular: false,
    points: [
      "Up to 8 hrs/mo consulting & fixes",
      "Policy reviews & admin changes",
      "Quarterly security tune-ups",
      "Priority response (next-business-day)",
    ],
  },
];

const testimonials = [
  { quote: "We went from manual onboarding chaos to a 1-click workflow. Saved ~10 hours a week.", name: "Alicia P.", role: "Operations Lead, CraftSupply Co." },
  { quote: "SPF/DKIM/DMARC and sharing policies tightened in a day. Our deliverability issues disappeared.", name: "Marcus D.", role: "Founder, DataFix Labs" },
  { quote: "The Apps Script dashboard is gold—weekly Drive reports and alerts without lifting a finger.", name: "Jenny R.", role: "IT Manager, Northview Charter" },
];

/* ---------- Component ---------- */
export default function App() {
  const calendly = resolveLink(CALENDLY_URL);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [status, setStatus] = useState({ type: "idle", note: "" });

  // Simple, optimistic submit: if fetch doesn't throw, show success.
  const submitDirect = async () => {
    if ((form.website || "").trim() !== "") { // honeypot
      setStatus({ type: "ok", note: "Thanks!" });
      setForm({ name: "", email: "", company: "", message: "", website: "" });
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", note: "Please enter your name, email and a short message." });
      return;
    }
    setStatus({ type: "sending", note: "" });

    try {
      await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" }, // no preflight
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          website: form.website || "",
          source: "stevesitpro.com",
        }),
      });
      setStatus({ type: "ok", note: "Thanks! We received your message." });
      setForm({ name: "", email: "", company: "", message: "", website: "" });
    } catch {
      setStatus({ type: "error", note: "Submission failed. Try again or email us." });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.svg" alt="Logo" className="h-9 w-9 rounded-2xl p-0.5" />
            <div className="font-semibold text-blue-600">Steve’s IT Pro</div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#services" className="hover:text-blue-600">Services</a>
            <a href="#pricing" className="hover:text-blue-600">Pricing</a>
            <a href="#advantages" className="hover:text-blue-600">Why Us</a>
            <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="hover:text-blue-600">Contact</a>
          </nav>
          <a
            href={calendly.href}
            target={calendly.external ? "_blank" : undefined}
            rel={calendly.external ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
          >
            Book a free consult <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-blue-700">
            Google Workspace Consulting & Apps Script Automation
          </h1>
          <p className="mt-4 text-slate-700 text-lg">
            Set up securely, automate the boring stuff, and train your team to fly. Side-hustle speed. Enterprise discipline.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a href="#pricing" className="px-5 py-3 rounded-2xl bg-green-600 text-white inline-flex items-center gap-2">
              See pricing <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="px-5 py-3 rounded-2xl border border-yellow-500 text-yellow-600 inline-flex items-center gap-2">
              Contact us
            </a>
          </div>
          <div className="mt-5 text-sm text-slate-600">Arizona-based • Remote-first • Fast turnarounds</div>
        </div>
        <div className="rounded-3xl bg-white shadow-lg border border-slate-200 p-5">
          <div className="text-sm font-medium text-blue-600">Quick wins you’ll see</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-green-600" /> 1-click user onboarding from a form</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-yellow-500" /> Auto-labeled email & drive reports</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-red-500" /> Error-free SPF/DKIM/DMARC setup</li>
            <li className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-blue-600" /> Admin + end-user training playbooks</li>
          </ul>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 font-semibold">{f.icon}{f.title}</div>
              <p className="mt-3 text-slate-600 text-sm">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-6">
        <h2 className="text-2xl font-bold text-blue-700">Services</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-lg text-green-600">{s.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {s.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-yellow-500" /> {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="text-2xl font-bold text-blue-700">Pricing</h2>
          <p className="text-sm text-slate-600 max-w-xl">
            Transparent pricing—edge over managed IT rates, premium over generic freelancers. Ask for fixed-fee if preferred.
          </p>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => {
            const cta = resolveLink(INTAKE_FORM_URL);
            return (
              <div
                key={i}
                className={`rounded-3xl border ${t.popular ? "border-blue-600" : "border-slate-200"} bg-white p-6 shadow-sm relative`}
              >
                {t.popular && (
                  <div className="absolute -top-3 right-6 text-xs px-2 py-1 bg-red-500 text-white rounded-full">Most Popular</div>
                )}
                <div className="flex items-end gap-2">
                  <div className="text-3xl font-bold text-blue-700">{t.price}</div>
                  <div className="text-sm text-slate-500">{t.cadence}</div>
                </div>
                <h3 className="mt-2 font-semibold text-lg text-green-600">{t.name}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {t.points.map((p, j) => (
                    <li key={j} className="flex gap-2"><Check className="w-4 h-4 mt-0.5 text-yellow-500" /> {p}</li>
                  ))}
                </ul>
                <a
                  href={cta.href}
                  target={cta.external ? "_blank" : undefined}
                  rel={cta.external ? "noreferrer" : undefined}
                  className={`mt-5 inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-xl ${
                    t.popular ? "bg-green-600 text-white" : "border border-blue-600 text-blue-600"
                  }`}
                >
                  {t.cta} <ArrowRight className="w-4 h-4" />
                </a>
                <div className="mt-3 text-xs text-slate-500">
                  Need custom? Hourly consulting: <span className="font-medium">$95/hr</span>. Advanced scripting/security:{" "}
                  <span className="font-medium">$125/hr</span>.
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Bar */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl bg-blue-600 text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xl font-semibold">Competitive Advantage</div>
            <p className="text-white/80 text-sm mt-1">
              Free 30-min discovery • 48-hour prototype on most automations • 14-day warranty & fixes • Clear documentation & handoff video
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a
              href={calendly.href}
              target={calendly.external ? "_blank" : undefined}
              rel={calendly.external ? "noreferrer" : undefined}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-400 text-slate-900"
            >
              Book a free consult <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-blue-600 border border-white">
              Start discovery form <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-4 pb-10">
        <h2 className="text-2xl font-bold text-blue-700">What clients say</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Quote className="w-6 h-6 text-blue-600" />
              <p className="mt-3 text-slate-700">“{t.quote}”</p>
              <div className="mt-4 text-sm text-slate-600 font-medium">{t.name}</div>
              <div className="text-xs text-slate-500">{t.role}</div>
            </div>
          ))}
        </div>
       
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-blue-700">Let’s talk</h3>
            <p className="mt-2 text-sm text-slate-600">
              Tell us about your Workspace environment and what you’d like to automate or improve. We’ll reply within one business day.
            </p>
            <form className="mt-4 grid gap-3" onSubmit={(e) => { e.preventDefault(); submitDirect(); }}>
              <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Name"
                     value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Email"
                     value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Company"
                     value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <textarea className="border border-slate-300 rounded-xl px-3 py-2" placeholder="What problem should we solve?"
                        rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              {/* Honeypot (hidden) */}
              <input type="text" name="website" value={form.website || ""} onChange={(e) => setForm({ ...form, website: e.target.value })}
                     style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
              <div className="flex gap-3 flex-wrap items-center">
                <button type="submit" className="px-4 py-2 rounded-xl bg-green-600 text-white inline-flex items-center gap-2 disabled:opacity-50"
                        disabled={status.type === "sending"}>
                  {status.type === "sending" ? "Sending…" : "Send"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {status.type === "ok" && <div className="text-xs text-green-700">{status.note}</div>}
              {status.type === "error" && <div className="text-xs text-red-600">{status.note}</div>}
              <div className="text-xs text-slate-500">Prefer email? {CONTACT_EMAIL}</div>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-lg text-blue-700">FAQ</h3>
            <div className="mt-3 space-y-3 text-sm">
              <details className="group border border-slate-200 rounded-xl p-3">
                <summary className="font-medium cursor-pointer">How fast is a typical automation?</summary>
                <p className="mt-2 text-slate-600">Most 1–workflow builds complete within 1–2 weeks including testing and documentation.</p>
              </details>
              <details className="group border border-slate-200 rounded-xl p-3">
                <summary className="font-medium cursor-pointer">What access do you need?</summary>
                <p className="mt-2 text-slate-600">We follow least-privilege. For admin tasks, temporary admin or delegated access. For automations, we use service accounts and secure secrets.</p>
              </details>
              <details className="group border border-slate-200 rounded-xl p-3">
                <summary className="font-medium cursor-pointer">Can you train our admins and users?</summary>
                <p className="mt-2 text-slate-600">Yes—remote sessions with recordings, quick-reference guides, and Q&A office hours can be added to any engagement.</p>
              </details>
            </div>
            <div className="mt-6 text-sm text-slate-600 flex flex-col gap-1">
              <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-600" /> {CONTACT_EMAIL}</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-600" /> {BUSINESS_PHONE}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-700">Privacy Policy</h2>
          <p className="mt-3 text-sm text-slate-600">Last updated: {new Date().getFullYear()}</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>We collect the information you submit via the contact form (name, email, company, message). We use this only to respond to your inquiry and deliver services.</p>
            <p>Submission data is processed via a Google Apps Script Web App and stored in our Google Sheet. We do not sell your data. We may retain emails and form submissions for records and compliance.</p>
            <p>You can request deletion of your data anytime by emailing <a href={`mailto:${CONTACT_EMAIL}`} className="underline text-blue-600">{CONTACT_EMAIL}</a>.</p>
            <p>Our site may include links to third-party services (e.g., Calendly, Google Forms). Their policies apply when you use those services.</p>
          </div>
        </div>
      </section>

      {/* Terms */}
      <section id="terms" className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-700">Terms of Service</h2>
          <p className="mt-3 text-sm text-slate-600">Last updated: {new Date().getFullYear()}</p>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p>By engaging Steve’s IT Pro, you agree that statements of work (SOWs), proposals, or emails define scope, pricing, and timelines. Unless otherwise agreed, time &amp; materials work is billed in 30-minute increments.</p>
            <p>You’re responsible for providing accurate information and necessary access. We follow least-privilege principles and are not liable for downtime caused by pre-existing system issues or third-party outages.</p>
            <p>Deliverables are provided “as is” with a 14-day defect fix window unless a different warranty is specified in the SOW. Ownership of custom code and artifacts transfers upon full payment, excluding third-party libraries and Google services.</p>
            <p>Arizona law governs these terms. Disputes will be handled in Maricopa County, AZ, unless both parties agree otherwise.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Steve’s IT Pro • Google Workspace Consulting & Apps Script Automation{" "}
        <a href="#privacy" className="underline text-blue-600">Privacy</a>{" • "}
        <a href="#terms" className="underline text-blue-600">Terms</a>
      </footer>
    </main>
  );
}
