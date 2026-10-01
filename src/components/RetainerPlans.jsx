import { Check, Clock, Sparkles, Zap } from "lucide-react";
import { CONTACT_EMAIL, INTAKE_FORM_URL, track } from "../config";
import { RETAINER_TIERS as tiers } from "../data/pricing";

export default function RetainerPlans() {
  return (
    <section id="retainers" className="max-w-7xl mx-auto px-4 py-14">
      <div className="mb-8">
        <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">Ongoing Support</span>
        <h2 className="text-2xl font-bold text-white mt-2">Monthly Retainer Plans</h2>
        <p className="text-white/50 mt-1 text-sm max-w-2xl">
          Guaranteed access to a senior Google Workspace &amp; IT security specialist — without the cost of a full-time hire. Predictable monthly pricing, priority response, and an expert who already knows your environment.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t) => (
          <div key={t.key} className={`bg-white/5 border ${t.popular ? "border-sky-500" : "border-white/10"} rounded-3xl p-6 flex flex-col`}>
            {t.popular && (
              <div className="text-xs mb-3 text-sky-400 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </div>
            )}
            <div className="text-3xl font-extrabold">{t.price}</div>
            <div className="text-white/50 text-sm">{t.cadence}</div>
            <h3 className="mt-2 text-lg font-semibold text-white">{t.name}</h3>
            <p className="text-white/40 text-xs mt-1">{t.bestFor}</p>

            <div className="mt-4 flex gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-sky-400" />{t.hours}</span>
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-sky-400" />{t.responseTime}</span>
            </div>

            <ul className="mt-4 space-y-2 text-sm flex-1">
              {t.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-white/70">
                  <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />{p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={t.stripe}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("retainer_pay_click", { tier: t.key })}
                className="bg-sky-500 text-slate-950 rounded-xl py-3 text-center font-semibold hover:bg-sky-400 transition"
              >
                Subscribe →
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
      <p className="text-center text-white/30 text-xs mt-6">
        Unused hours roll over one month. Work beyond included hours is billed at a preferred rate of $165/hr. No long-term lock-in — plans renew monthly and can be adjusted or cancelled with 30 days' notice. Questions? <a href={`mailto:${CONTACT_EMAIL}`} className="text-sky-400 hover:underline">Email Steve directly</a>.
      </p>
    </section>
  );
}
