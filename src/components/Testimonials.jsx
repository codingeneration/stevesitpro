import { Star } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-14">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Client Results</span>
        <h2 className="text-2xl font-bold text-white mt-2">What clients say</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-4">
            <div className="flex gap-0.5">
              {Array.from({ length: t.stars }).map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.text}"</p>
            <div>
              <p className="text-white font-semibold text-sm">{t.name}</p>
              <p className="text-white/40 text-xs">{t.company}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
