import { ArrowRight, FileCheck, Mail, Settings, Workflow } from "lucide-react";
import { FREE_CHECKLIST_URL, SERVICE_PAGES, track } from "../config";

// Crawlable service overview. Each card links to its static service page so
// those pages get internal links (and PageRank) from the homepage.
const SERVICES = [
  {
    key: "setup",
    icon: <Settings className="w-5 h-5 text-emerald-400" />,
    title: "Google Workspace Setup for Small Business",
    text: "New Workspace or a messy one you inherited. Domain and user setup, Shared Drives, admin roles, 2-Step Verification, sharing policies and security hardening — documented so your team can run it.",
    href: SERVICE_PAGES.setup,
    cta: "Workspace setup service",
  },
  {
    key: "email",
    icon: <Mail className="w-5 h-5 text-sky-400" />,
    title: "Email Security Audit: SPF, DKIM & DMARC",
    text: "Stop invoices landing in spam and stop anyone spoofing your domain. A full email authentication audit, fix and deliverability test for Google Workspace, done in 2–3 business days.",
    href: SERVICE_PAGES.emailSecurity,
    cta: "Email security audit",
  },
  {
    key: "automation",
    icon: <Workflow className="w-5 h-5 text-yellow-400" />,
    title: "Google Apps Script Automation",
    text: "Forms that route themselves, approvals without email chains, reports that build overnight. One custom Apps Script workflow, scoped and delivered in 1–2 weeks with a handoff video.",
    href: SERVICE_PAGES.automation,
    cta: "Automation sprint",
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-4 py-14">
      <div className="mb-8 max-w-3xl">
        <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Services</span>
        <h2 className="text-2xl font-bold text-white mt-2">Google Workspace consulting services</h2>
        <p className="text-white/50 mt-2 text-sm leading-relaxed">
          Steve's IT Pro is an independent Google Workspace consultancy for small businesses with 5–50 people. You work directly with a senior Workspace engineer who has run admin consoles for enterprises like Meta and Salesforce — at small-business, fixed prices. Every engagement starts with a free 30-minute call and ends with written documentation and a handoff video.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {SERVICES.map((s) => (
          <article key={s.key} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
            <div className="mb-3">{s.icon}</div>
            <h3 className="text-lg font-semibold text-white">{s.title}</h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed flex-1">{s.text}</p>
            <a
              href={s.href}
              onClick={() => track("services_card_click", { service: s.key })}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition"
            >
              {s.cta} <ArrowRight className="w-4 h-4" />
            </a>
          </article>
        ))}
      </div>

      <a
        href={FREE_CHECKLIST_URL}
        onClick={() => track("services_checklist_click")}
        className="mt-6 flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white/70 hover:text-white hover:border-white/30 transition"
      >
        <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>
          <strong className="text-white">Free:</strong> the 15-point Google Workspace security checklist I run with every new client, with the exact Admin Console path for each item.
        </span>
        <ArrowRight className="w-4 h-4 ml-auto shrink-0" />
      </a>
    </section>
  );
}
