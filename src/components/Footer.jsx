import { LEGAL } from "../config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-center text-sm text-white/40">
      <div className="flex flex-wrap justify-center gap-4 mb-3">
        <a href={LEGAL.terms} className="hover:text-white transition">Terms</a>
        <a href={LEGAL.privacy} className="hover:text-white transition">Privacy</a>
        <a href={LEGAL.refunds} className="hover:text-white transition">Refunds</a>
        <a href="https://stevemoynihan.com" target="_blank" rel="noreferrer" className="hover:text-white transition">About Steve</a>
        <a href="/blog/" className="hover:text-white transition">Blog</a>
      </div>
      <div className="flex items-center justify-center gap-2">
        <img src="/logo-mark.png" alt="" className="w-4 h-4 rounded shrink-0" width={16} height={16} />
        © {new Date().getFullYear()} Steve's IT Pro · Google Workspace Consulting · Riverside County, CA
      </div>
    </footer>
  );
}
