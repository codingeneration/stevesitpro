import { ABOUT_URL, BLOG_URL, BOOK_URL, CONTACT_EMAIL, FREE_CHECKLIST_URL, LEGAL, SERVICE_PAGES } from "../config";

const COLUMNS = [
  {
    title: "Services",
    links: [
      { label: "Google Workspace Setup", href: SERVICE_PAGES.setup },
      { label: "Email Security Audit", href: SERVICE_PAGES.emailSecurity },
      { label: "Apps Script Automation", href: SERVICE_PAGES.automation },
      { label: "Monthly Retainers", href: "#retainers" },
    ],
  },
  {
    title: "Guides",
    links: [
      { label: "SPF, DKIM & DMARC Setup", href: "/blog/spf-dkim-dmarc-google-workspace.html" },
      { label: "Security Checklist", href: "/blog/google-workspace-security-checklist-small-business.html" },
      { label: "Employee Offboarding", href: "/blog/employee-offboarding-google-workspace.html" },
      { label: "All guides", href: BLOG_URL },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Book a free consult", href: BOOK_URL },
      { label: "Free security checklist", href: FREE_CHECKLIST_URL },
      { label: "About Steve", href: ABOUT_URL, external: true },
      { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-12 pb-10 text-sm text-white/40">
      <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-3 mb-10">
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-3">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="hover:text-white transition"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <a href={LEGAL.terms} className="hover:text-white transition">Terms</a>
          <a href={LEGAL.privacy} className="hover:text-white transition">Privacy</a>
          <a href={LEGAL.refunds} className="hover:text-white transition">Refunds</a>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img src="/logo-mark.png" alt="" className="w-4 h-4 rounded shrink-0" width={16} height={16} />
          © 2026 Steve's IT Pro · Google Workspace Consulting · Riverside County, CA
        </div>
      </div>
    </footer>
  );
}
