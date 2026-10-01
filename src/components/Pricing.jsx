import { Check, Sparkles } from "lucide-react";
import { CONTACT_EMAIL, INTAKE_FORM_URL, track } from "../config";
import { PACKAGES as tiers } from "../data/pricing";

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Transparent Pricing</span>
        <h2 className="text-2xl font-bold text-white mt-2">Fixed-price packages. No surprises.</h2>
        <p className="text-white/50 mt-1 text-sm">Every engagement includes documentation and a handoff video so your team stays self-sufficient. Need ongoing support instead? See <a href="#retainers" className="text-emerald-400 hover:underline">Monthly Retainer Plans</a> below.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        {tiers.map((t) => (
          <div key={t.key} className={`bg-white/5 border ${t.popular ? "border-emerald-500" : "border-white/10"} rounded-3xl p-6 flex flex-col`}>
            {t.popular && (
              <div className="text-xs mb-3 text-emerald-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}
            <div className="text-3xl font-extrabold">{t.price}</div>
            <div className="text-white/50 text-sm">{t.cadence}</div>
            <h3 className="mt-2 text-lg font-semibold text-white">{t.name}</h3>
            <ul className="mt-4 space-y-2 text-sm flex-1">
              {t.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-white/70">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />{p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={t.stripe}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("pricing_pay_click", { tier: t.key })}
                className="bg-emerald-500 text-slate-950 rounded-xl py-3 text-center font-semibold hover:bg-emerald-400 transition"
              >
                Get started →
              </a>
              <a
                href={INTAKE_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 rounded-xl py-2.5 text-center text-white/60 text-sm hover:text-white hover:border-white/40 transition"
              >
                Ask a question first
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Money-back / risk-reduction note */}
      <p className="text-center text-white/30 text-xs mt-6">
        All packages include a clear scope document before work begins. Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-emerald-400 hover:underline">Email Steve directly</a>.
      </p>
    </section>
  );
}
