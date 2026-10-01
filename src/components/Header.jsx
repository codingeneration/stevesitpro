import { INTAKE_FORM_URL, track } from "../config";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center gap-8">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition whitespace-nowrap"
          >
            <img
              src="/logo-mark.png"
              alt="Steve's IT Pro logo"
              className="w-8 h-8 rounded-lg shrink-0"
              width={32}
              height={32}
            />
            <span className="font-bold text-sky-400">Steve's IT Pro</span>
          </a>
          <nav className="hidden sm:flex items-center gap-6">
            <a
              href="https://stevemoynihan.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-white/50 hover:text-white transition"
            >
              About Steve
            </a>
            <a
              href="/blog/"
              className="text-sm text-white/50 hover:text-white transition"
            >
              Blog
            </a>
          </nav>
        </div>

        {/* Right: divider + CTA */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <a
            href={INTAKE_FORM_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("header_cta_click")}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm hover:bg-emerald-400 transition whitespace-nowrap"
          >
            Book a free consult →
          </a>
        </div>
      </div>
    </header>
  );
}
