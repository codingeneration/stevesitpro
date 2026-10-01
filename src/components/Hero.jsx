import { BadgeCheck, Clock, Shield, Star, Zap } from "lucide-react";
import { INTAKE_FORM_URL, STRIPE_LINKS, track } from "../config";

const FEATURES = [
  { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: "Automation, Fast", text: "Apps Script workflows that remove busywork in days, not months." },
  { icon: <Shield className="w-5 h-5 text-sky-400" />, title: "Secure by Default", text: "SPF, DKIM, DMARC, least-privilege access, and clean admin policy design." },
  { icon: <Clock className="w-5 h-5 text-yellow-400" />, title: "On-Time Delivery", text: "Clear scope, milestones, documentation, and handoff videos." },
];

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
      <div>
        {/* Social proof hook above the fold */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-white/50 text-sm">5-star reviews from 20+ small businesses</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Google Workspace,<br />
          <span className="text-emerald-400">done right</span> — fast.
        </h1>
        <p className="mt-4 text-white/60 text-lg leading-relaxed max-w-md">
          Fixed-price consulting for small businesses. Setup, automation, and security hardening — delivered in days, not months, with zero jargon.
        </p>

        {/* Trust signals */}
        <div className="mt-5 flex flex-wrap gap-3 text-xs text-white/40">
          <span className="flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> 7+ years Google Workspace</span>
          <span className="flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> Meta & Salesforce alumni</span>
          <span className="flex items-center gap-1"><BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> Fixed-price packages</span>
        </div>

        {/* CTA hierarchy: primary = free consult, secondary = pricing */}
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("hero_primary_cta")}
            className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition"
          >
            Book a free consult →
          </a>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-2xl border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition"
          >
            View pricing
          </a>
        </div>
      </div>

      {/* Right card: what you get */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
        <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">What you get</p>
        <div className="grid gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="mt-0.5">{f.icon}</div>
              <div>
                <div className="font-semibold text-white text-sm">{f.title}</div>
                <p className="text-xs text-white/50 mt-0.5">{f.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Single clear consult CTA in the card */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-xs text-white/40 mb-3">Not sure which package fits? Start here:</p>
          <a
            href={STRIPE_LINKS.consult95}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-white text-slate-950 rounded-xl py-2.5 text-center font-semibold text-sm hover:bg-slate-100 transition"
          >
            Book a 1-hr consultation — $95
          </a>
          <p className="text-xs text-white/30 text-center mt-2">Advanced sessions available at $125/hr</p>
        </div>
      </div>
    </section>
  );
}
