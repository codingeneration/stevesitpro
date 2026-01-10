import React, { useMemo, useState } from "react";
import {
  Check,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Mail,
  Phone,
  Quote,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

/* ---------- Config ---------- */
const CONTACT_EMAIL = "steve@stevesitpro.com";
const BUSINESS_PHONE = "TBD";

/** Intake / Book a Call (must stay) */
const INTAKE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header";

/** Apps Script contact form endpoint */
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyevJvyyUv4wDkbCJuHkMJ18iRICrEyLpMtJ5x7r0U9-OG7ntO7tsNgFWAE_0sKN0KM/exec";

/** Stripe Payment Links (LIVE) */
const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/5kQ28tcnn95wb3X0Wh8k800",
  automation: "https://buy.stripe.com/28E3cx2MNgxY0pjgVf8k802",
  proSupport: "https://buy.stripe.com/9B67sNaffgxYb3XeN78k803",
  consult95: "https://buy.stripe.com/aFa8wR3QR4Pgdc5fRb8k804",
  advanced125: "https://buy.stripe.com/00w4gBcnnftU0pj9sN8k805",
};

/** Legal pages */
const LEGAL = {
  terms: "/terms.html",
  privacy: "/privacy.html",
  refunds: "/refunds.html",
};

/* ---------- Helpers ---------- */
function track(event, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}
function link(url) {
  return { href: url, external: /^https?:\/\//.test(url) };
}

/* ---------- Data ---------- */
const features = [
  {
    icon: <Zap className="w-5 h-5 text-emerald-400" />,
    title: "Automation, Fast",
    text: "Apps Script workflows that remove busywork in days, not months.",
  },
  {
    icon: <Shield className="w-5 h-5 text-sky-400" />,
    title: "Secure by Default",
    text: "SPF, DKIM, DMARC, least-privilege access, and clean admin policy design.",
  },
  {
    icon: <Clock className="w-5 h-5 text-yellow-400" />,
    title: "On-Time Delivery",
    text: "Clear scope, milestones, documentation, and handoff videos.",
  },
];

const services = [
  {
    title: "Google Workspace Setup & Hardening",
    bullets: [
      "Tenant setup or cleanup",
      "SPF / DKIM / DMARC",
      "Groups, OUs & sharing controls",
      "Shared Drives structure",
    ],
  },
  {
    title: "Apps Script Automation",
    bullets: [
      "Onboarding & offboarding flows",
      "Forms → Sheets → Admin",
      "Notifications & approvals",
      "Custom admin tooling",
    ],
  },
  {
    title: "Training & Enablement",
    bullets: [
      "Admin fundamentals",
      "Security best practices",
      "End-user productivity",
      "Recorded sessions & playbooks",
    ],
  },
];

const testimonials = [
  {
    quote:
      "We went from manual onboarding chaos to a 1-click workflow. Saved 10+ hours a week.",
    name: "Alicia P.",
    role: "Operations Lead",
  },
  {
    quote:
      "SPF/DKIM/DMARC fixed in one day. Our email issues disappeared immediately.",
    name: "Marcus D.",
    role: "Founder",
  },
  {
    quote:
      "The automation dashboards are gold. Reporting without lifting a finger.",
    name: "Jenny R.",
    role: "IT Manager",
  },
];

export default function App() {
  const tiers = useMemo(
    () => [
      {
        key: "starter",
        name: "Starter Setup",
        price: "$749",
        cadence: "one-time",
        stripe: STRIPE_LINKS.starter,
        points: [
          "Workspace setup or cleanup",
          "SPF / DKIM / DMARC",
          "Shared Drives blueprint",
          "2 hours admin coaching",
        ],
      },
      {
        key: "automation",
        name: "Automation Sprint",
        price: "$1,499",
        cadence: "1–2 weeks",
        stripe: STRIPE_LINKS.automation,
        popular: true,
        points: [
          "One scoped Apps Script workflow",
          "Forms + Sheets + approvals",
          "Notifications",
          "Handoff video",
        ],
      },
      {
        key: "pro",
        name: "Pro Support",
        price: "$799",
        cadence: "/month",
        stripe: STRIPE_LINKS.proSupport,
        points: [
          "Up to 8 hrs/month",
          "Admin changes & fixes",
          "Quarterly security review",
          "Priority response",
        ],
      },
    ],
    []
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    website: "",
  });
  const [status, setStatus] = useState("idle");

  const submit = async () => {
    if (form.website) return;
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
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10">
  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div className="flex items-center gap-6">
      <div className="font-bold text-sky-400">Steve’s IT Pro</div>
      <a
        href="https://stevemoynihan.com"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-white/70 hover:text-white transition"
      >
        About Steve
      </a>
    </div>

    <a
      href={INTAKE_FORM_URL}
      target="_blank"
      rel="noreferrer"
      className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-semibold"
    >
      Book a free consult →
    </a>
  </div>
</header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Google Workspace Consulting & Automation
          </h1>
          <p className="mt-4 text-white/70">
            Secure setup, smart automation, and training that actually sticks.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="#pricing"
              className="px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-semibold"
            >
              View pricing →
            </a>
            <a
              href={INTAKE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl border border-white/20"
            >
              Start discovery →
            </a>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="grid gap-4">
            {features.map((f, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 font-semibold">
                  {f.icon}
                  {f.title}
                </div>
                <p className="text-sm text-white/70">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href={STRIPE_LINKS.consult95}
              target="_blank"
              rel="noreferrer"
              className="bg-white text-slate-950 rounded-xl py-2 text-center font-semibold"
            >
              $95 – 1hr consult
            </a>
            <a
              href={STRIPE_LINKS.advanced125}
              target="_blank"
              rel="noreferrer"
              className="border border-white/20 rounded-xl py-2 text-center"
            >
              $125 – advanced
            </a>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.key}
              className={`bg-white/5 border ${
                t.popular ? "border-sky-400" : "border-white/10"
              } rounded-3xl p-6`}
            >
              {t.popular && (
                <div className="text-xs mb-2 text-sky-400 font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-3xl font-extrabold">{t.price}</div>
              <div className="text-white/60">{t.cadence}</div>
              <h3 className="mt-2 text-lg font-semibold text-emerald-400">
                {t.name}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {t.points.map((p, i) => (
                  <li key={i} className="flex gap-2">
                    <Check className="w-4 h-4 text-yellow-400" /> {p}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={t.stripe}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-500 text-slate-950 rounded-xl py-3 text-center font-semibold"
                >
                  Pay now →
                </a>
                <a
                  href={INTAKE_FORM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/20 rounded-xl py-3 text-center"
                >
                  Book a call →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="font-semibold text-lg">Contact</h3>
            <form
              className="mt-4 grid gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <input
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2"
                rows={4}
                placeholder="What problem should we solve?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button className="bg-emerald-500 text-slate-950 rounded-xl py-2 font-semibold">
                Send →
              </button>
              {status === "ok" && (
                <div className="text-sm text-emerald-400">
                  Thanks! We’ll be in touch.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
<footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
  <div className="flex flex-wrap justify-center gap-4">
    <a href={LEGAL.terms} className="hover:text-white">Terms</a>
    <a href={LEGAL.privacy} className="hover:text-white">Privacy</a>
    <a href={LEGAL.refunds} className="hover:text-white">Refunds</a>
    <a
      href="https://stevemoynihan.com"
      target="_blank"
      rel="noreferrer"
      className="hover:text-white"
    >
      About Steve
    </a>
  </div>

  <div className="mt-4">
    © {new Date().getFullYear()} Steve’s IT Pro
  </div>
</footer>

    </main>
  );
}
