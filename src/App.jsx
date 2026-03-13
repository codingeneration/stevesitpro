import React, { useMemo, useState, useEffect } from “react”;
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
ArrowLeft,
} from “lucide-react”;

/* ––––– Config ––––– */
const CONTACT_EMAIL = “steve@stevesitpro.com”;
const BUSINESS_PHONE = “TBD”;

const INTAKE_FORM_URL =
“https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header”;

const WEB_APP_URL =
“https://script.google.com/macros/s/AKfycbyevJvyyUv4wDkbCJuHkMJ18iRICrEyLpMtJ5x7r0U9-OG7ntO7tsNgFWAE_0sKN0KM/exec”;

const STRIPE_LINKS = {
starter: “https://buy.stripe.com/5kQ28tcnn95wb3X0Wh8k800”,
automation: “https://buy.stripe.com/28E3cx2MNgxY0pjgVf8k802”,
proSupport: “https://buy.stripe.com/9B67sNaffgxYb3XeN78k803”,
consult95: “https://buy.stripe.com/aFa8wR3QR4Pgdc5fRb8k804”,
advanced125: “https://buy.stripe.com/00w4gBcnnftU0pj9sN8k805”,
};

const LEGAL = {
terms: “/terms.html”,
privacy: “/privacy.html”,
refunds: “/refunds.html”,
};

/* ––––– Helpers ––––– */
function track(event, params = {}) {
if (typeof window !== “undefined” && window.gtag) {
window.gtag(“event”, event, params);
}
}

/* ============================================================
BLOG POSTS
============================================================ */

function BlogPostSPF() {
return (
<article className="max-w-3xl mx-auto px-4 py-16 text-white/80">
<span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Email Security</span>
<h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-3 leading-tight">
How to Set Up SPF, DKIM, and DMARC for Google Workspace (2026 Guide)
</h1>
<p className="text-white/40 text-sm mb-8">By Steve · Google Workspace Consultant · 8 min read</p>

```
  <p className="text-lg leading-relaxed mb-8">
    If your business runs on Google Workspace and you haven't configured SPF, DKIM, and DMARC,
    your emails are vulnerable. Bad actors can spoof your domain, send phishing emails that look
    like they came from you, and damage your sender reputation — all without ever touching your
    account. This guide walks you through exactly how to fix that.
  </p>

  <h2 className="text-2xl font-bold text-white mb-4">What Are SPF, DKIM, and DMARC?</h2>
  <p className="leading-relaxed mb-4">
    Think of these three protocols as a three-layer lock on your business email. Each one does
    something different, but together they make it nearly impossible for anyone to impersonate
    your domain.
  </p>
  <ul className="space-y-4 mb-8">
    {[
      ["SPF (Sender Policy Framework)", "Tells receiving mail servers which IP addresses are allowed to send email on behalf of your domain. Unauthorized senders get flagged."],
      ["DKIM (DomainKeys Identified Mail)", "Adds a cryptographic signature to every email you send so receiving servers can verify the message wasn't tampered with in transit."],
      ["DMARC (Domain-based Message Authentication)", "The policy layer. It tells receiving servers what to do when SPF or DKIM checks fail — monitor, quarantine, or reject."],
    ].map(([title, desc]) => (
      <li key={title} className="flex gap-3">
        <span className="text-emerald-400 mt-1 shrink-0">→</span>
        <div><strong className="text-white">{title}:</strong> {desc}</div>
      </li>
    ))}
  </ul>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-10">
    <p className="text-sm"><strong className="text-emerald-400">Real-world impact:</strong> Without DMARC, anyone can send emails from your domain to your clients. They won't know it's fake. This is one of the most common ways small businesses lose client trust overnight.</p>
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Step 1: Set Up SPF</h2>
  <p className="leading-relaxed mb-4">
    Log in to your domain registrar (GoDaddy, Cloudflare, Namecheap, etc.) and add this TXT record:
  </p>
  <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 font-mono text-sm text-emerald-300 mb-4">
    <p className="text-white/30 mb-2">// DNS TXT Record</p>
    <p>Name: @</p>
    <p>Value: v=spf1 include:_spf.google.com ~all</p>
    <p>TTL: 3600</p>
  </div>
  <p className="leading-relaxed mb-2">
    The <code className="bg-white/10 px-1 rounded text-emerald-300">~all</code> means "soft fail" — unauthorized senders get flagged but not outright rejected. Once verified, switch to <code className="bg-white/10 px-1 rounded text-emerald-300">-all</code> for strict enforcement.
  </p>
  <p className="text-white/40 text-sm mb-10">⚠️ You can only have one SPF record per domain. If you use Mailchimp, HubSpot, etc., combine them all into one record.</p>

  <h2 className="text-2xl font-bold text-white mb-4">Step 2: Enable DKIM in Google Workspace</h2>
  <ol className="space-y-3 mb-10">
    {[
      "Log in to admin.google.com",
      "Go to Apps → Google Workspace → Gmail → Authenticate email",
      "Select your domain and click Generate new record",
      "Copy the TXT record (it starts with \"v=DKIM1\")",
      "Add that TXT record in your DNS provider",
      "Wait 24–48 hours, then return and click Start authentication",
    ].map((step, i) => (
      <li key={i} className="flex gap-3">
        <span className="text-emerald-400 font-bold w-5 shrink-0">{i + 1}.</span>
        <span>{step}</span>
      </li>
    ))}
  </ol>

  <h2 className="text-2xl font-bold text-white mb-4">Step 3: Add a DMARC Policy</h2>
  <p className="leading-relaxed mb-4">Start with a monitor-only policy so you can observe before enforcing:</p>
  <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 font-mono text-sm text-emerald-300 mb-4">
    <p className="text-white/30 mb-2">// DNS TXT Record</p>
    <p>Name: _dmarc</p>
    <p>{"Value: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"}</p>
    <p>TTL: 3600</p>
  </div>
  <p className="leading-relaxed mb-6">After 2–4 weeks of reviewing reports, escalate your policy:</p>
  <div className="grid grid-cols-3 gap-3 mb-10">
    {[
      { policy: "p=none", label: "Monitor", desc: "Collect data only" },
      { policy: "p=quarantine", label: "Quarantine", desc: "Suspicious mail → spam" },
      { policy: "p=reject", label: "Reject", desc: "Block unauthorized email" },
    ].map((item) => (
      <div key={item.policy} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
        <p className="text-emerald-400 font-mono text-xs mb-1">{item.policy}</p>
        <p className="text-white font-semibold text-sm">{item.label}</p>
        <p className="text-white/40 text-xs mt-1">{item.desc}</p>
      </div>
    ))}
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Common Mistakes to Avoid</h2>
  <ul className="space-y-3 mb-12">
    {[
      ["Multiple SPF records", "You can only have one. Combine all services into a single record."],
      ["Jumping straight to p=reject", "Always start with p=none and monitor first or you risk blocking legitimate email."],
      ["Forgetting subdomains", "If you send from subdomains, they need their own DMARC coverage."],
      ["No rua address", "Without an aggregate report address you can't see who's spoofing you."],
    ].map(([title, desc]) => (
      <li key={title} className="flex gap-3">
        <span className="text-red-400 font-bold shrink-0">✗</span>
        <span><strong className="text-white">{title}:</strong> {desc}</span>
      </li>
    ))}
  </ul>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-3">Not Sure If Your Setup Is Correct?</h2>
    <p className="text-white/60 mb-6">A misconfigured record can silently break email deliverability for weeks. Book a free consult and I'll audit your full Google Workspace email security — at no charge.</p>
    <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl">
      Book a Free Consult →
    </a>
  </div>
</article>
```

);
}

function BlogPostAppsScript() {
return (
<article className="max-w-3xl mx-auto px-4 py-16 text-white/80">
<span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Automation</span>
<h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-3 leading-tight">
Apps Script vs. Zapier: Which Automation Is Right for Your Google Workspace?
</h1>
<p className="text-white/40 text-sm mb-8">By Steve · Google Workspace Consultant · 7 min read</p>

```
  <p className="text-lg leading-relaxed mb-8">
    If your team is doing repetitive work in Google Sheets, Forms, Drive, or Gmail — there's
    a better way. But the tool you choose matters. Apps Script and Zapier are both powerful,
    but they solve different problems. Picking the wrong one costs you time, money, or both.
  </p>

  <h2 className="text-2xl font-bold text-white mb-4">The Difference in Plain English</h2>
  <p className="leading-relaxed mb-6">
    Think of Zapier like a pre-built highway between apps — fast to set up, lots of on-ramps,
    but you're limited to the routes that already exist. Apps Script is more like hiring a
    contractor to build a custom road exactly where you need it — more planning upfront, but
    it goes exactly where you want with no monthly tolls.
  </p>
  <div className="grid md:grid-cols-2 gap-4 mb-10">
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-white font-bold text-lg mb-2">⚡ Google Apps Script</h3>
      <p className="text-white/60 text-sm leading-relaxed">JavaScript-based automation built directly into Google Workspace. Runs inside Sheets, Docs, Forms, Gmail, and Drive. Completely free — no per-task pricing.</p>
    </div>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-white font-bold text-lg mb-2">🔗 Zapier</h3>
      <p className="text-white/60 text-sm leading-relaxed">No-code automation platform connecting 6,000+ apps through a visual interface. Fast to set up. Paid plans required for multi-step or high-volume workflows.</p>
    </div>
  </div>

  <h2 className="text-2xl font-bold text-white mb-6">Head-to-Head Comparison</h2>

  {[
    {
      icon: "💰", title: "Cost",
      body: "Apps Script is completely free — included with every Google Workspace account. Zapier's free plan caps at 100 tasks/month. Most real business workflows require a paid plan starting around $20–$50/month, and costs scale fast with volume.",
      verdict: "Apps Script wins on cost for Google-only workflows.",
      color: "emerald"
    },
    {
      icon: "⏱️", title: "Speed to Build",
      body: "Zapier is dramatically faster for simple workflows. Connecting a Google Form to a Slack notification takes 5 minutes with no coding. Apps Script requires writing JavaScript — a simple workflow might take 30 minutes, complex ones take days. But once built, they run silently forever.",
      verdict: "Zapier wins for speed. Apps Script is a bigger upfront investment.",
      color: "sky"
    },
    {
      icon: "🔧", title: "Flexibility & Power",
      body: "Apps Script dominates here. Because it's real code, you can build logic Zapier can't replicate — conditional branching, dynamically generated PDFs, bulk operations across thousands of rows, deep Google API access. Zapier is powerful within its constraints, but you can't go beyond what each connector supports.",
      verdict: "Apps Script wins for complex, Google-native workflows.",
      color: "emerald"
    },
    {
      icon: "🌐", title: "App Coverage",
      body: "Need to connect Google Sheets to Salesforce, HubSpot, Stripe, or QuickBooks? Zapier has 6,000+ pre-built connectors. Apps Script can technically reach any API, but you have to write that connection yourself.",
      verdict: "Zapier wins when connecting Google to non-Google tools.",
      color: "sky"
    },
  ].map((item) => (
    <div key={item.title} className="mb-8">
      <h3 className="text-xl font-semibold text-emerald-400 mb-3">{item.icon} {item.title}</h3>
      <p className="leading-relaxed mb-3">{item.body}</p>
      <div className={`bg-white/5 border-l-4 ${item.color === 'emerald' ? 'border-emerald-400' : 'border-sky-400'} rounded-r-2xl p-4`}>
        <p className="text-sm"><strong className="text-white">Verdict:</strong> {item.verdict}</p>
      </div>
    </div>
  ))}

  <h2 className="text-2xl font-bold text-white mb-6">When to Use Each One</h2>
  <div className="grid md:grid-cols-2 gap-4 mb-10">
    <div className="bg-white/5 border border-emerald-500/30 rounded-2xl p-5">
      <h3 className="text-emerald-400 font-bold text-lg mb-3">Use Apps Script when...</h3>
      <ul className="space-y-2 text-sm">
        {["Workflow lives entirely in Google Workspace", "You need complex logic or conditional branching", "You process high volumes of data", "You want one-time cost, not monthly fees", "You need custom UI inside Sheets or Docs"].map(i => (
          <li key={i} className="flex gap-2"><span className="text-emerald-400">✓</span>{i}</li>
        ))}
      </ul>
    </div>
    <div className="bg-white/5 border border-sky-500/30 rounded-2xl p-5">
      <h3 className="text-sky-400 font-bold text-lg mb-3">Use Zapier when...</h3>
      <ul className="space-y-2 text-sm">
        {["Connecting Google to non-Google apps", "You need something running within hours", "Your team needs to manage it themselves", "The workflow is simple and low-volume", "No one on your team can code"].map(i => (
          <li key={i} className="flex gap-2"><span className="text-sky-400">✓</span>{i}</li>
        ))}
      </ul>
    </div>
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Real Small Business Examples</h2>
  <div className="space-y-4 mb-12">
    {[
      { scenario: "Client intake form → auto-create Drive folder + send welcome email", winner: "Apps Script", why: "Entirely within Google. One script, no monthly cost.", color: "emerald" },
      { scenario: "New Stripe payment → add row to Google Sheet + notify Slack", winner: "Zapier", why: "Three platforms. Zapier's connectors make this a 5-minute setup.", color: "sky" },
      { scenario: "Weekly report pulling from 5 Sheets tabs, formatted and emailed as PDF", winner: "Apps Script", why: "Complex logic and Google-native PDF generation — Zapier can't do this.", color: "emerald" },
      { scenario: "New HubSpot contact → add to Google Contacts + create Asana task", winner: "Zapier", why: "Three different platforms. Zapier's connectors make this trivial.", color: "sky" },
    ].map((item, i) => (
      <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-white/60 text-sm italic mb-2">"{item.scenario}"</p>
        <p className="text-sm">
          <span className={`font-bold ${item.color === 'emerald' ? 'text-emerald-400' : 'text-sky-400'}`}>→ Use {item.winner}: </span>
          <span className="text-white/60">{item.why}</span>
        </p>
      </div>
    ))}
  </div>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-3">Want Busywork Removed From Your Team's Day?</h2>
    <p className="text-white/60 mb-6">I build custom Apps Script workflows for small businesses — scoped, documented, and delivered in 1–2 weeks. Starting at $1,499.</p>
    <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl">
      Start an Automation Sprint →
    </a>
  </div>
</article>
```

);
}

function BlogPostSharedDrives() {
return (
<article className="max-w-3xl mx-auto px-4 py-16 text-white/80">
<span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Google Workspace</span>
<h1 className="text-3xl md:text-4xl font-extrabold text-white mt-3 mb-3 leading-tight">
Google Workspace Shared Drive Setup: Best Practices for Small Business Teams
</h1>
<p className="text-white/40 text-sm mb-8">By Steve · Google Workspace Consultant · 9 min read</p>

```
  <p className="text-lg leading-relaxed mb-8">
    "My Drive" is a trap. When every employee stores files in their personal Drive, you're one
    resignation away from losing critical company files forever. Google Workspace Shared Drives
    solve this — but only if you set them up correctly from the start.
  </p>

  <h2 className="text-2xl font-bold text-white mb-4">My Drive vs. Shared Drives</h2>
  <p className="leading-relaxed mb-6">
    Think of My Drive like a personal filing cabinet that goes home with the employee — when they leave,
    the cabinet leaves too. Shared Drives are filing cabinets bolted to the office wall. They belong
    to the company, not the person.
  </p>
  <div className="overflow-x-auto mb-6">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-white/10">
          <th className="py-3 pr-6 text-left text-white/40 font-semibold">Feature</th>
          <th className="py-3 pr-6 text-left text-white/40 font-semibold">My Drive</th>
          <th className="py-3 text-left text-white/40 font-semibold">Shared Drive</th>
        </tr>
      </thead>
      <tbody>
        {[
          ["File ownership", "Individual user", "The organization"],
          ["Survives when user leaves", "❌ No", "✅ Yes"],
          ["Access management", "Manual per-file sharing", "Role-based permissions"],
          ["External sharing control", "User-controlled", "Admin-controlled"],
          ["Available on", "All plans", "Business Standard+"],
        ].map(([f, m, s], i) => (
          <tr key={i} className="border-b border-white/5">
            <td className="py-3 pr-6 font-medium text-white">{f}</td>
            <td className="py-3 pr-6 text-white/60">{m}</td>
            <td className="py-3 text-white/60">{s}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="bg-white/5 border border-red-500/20 rounded-2xl p-5 mb-10">
    <p className="text-sm"><strong className="text-red-400">⚠️ Common mistake:</strong> Many small businesses run entirely out of My Drive and only discover the problem when a key employee leaves and takes their files with them. Set up Shared Drives before this happens, not after.</p>
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Recommended Shared Drive Structure</h2>
  <p className="leading-relaxed mb-6">For most small businesses (5–50 employees), aim for 4–8 top-level Shared Drives:</p>
  <div className="space-y-3 mb-10">
    {[
      ["📁 Company — Admin", "Policies, contracts, legal docs, HR files. Restricted access."],
      ["📁 Finance", "Invoices, budgets, expense reports, tax documents. Finance team only."],
      ["📁 Operations", "SOPs, process docs, templates, vendor info. Accessible to all staff."],
      ["📁 Sales & Marketing", "Proposals, presentations, brand assets, campaign files."],
      ["📁 Clients", "One subfolder per client with deliverables, contracts, and notes."],
      ["📁 Projects", "Active internal projects. Archive completed ones quarterly."],
    ].map(([drive, desc]) => (
      <div key={drive} className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <p className="text-white font-semibold mb-1">{drive}</p>
        <p className="text-white/50 text-sm">{desc}</p>
      </div>
    ))}
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Setting Permissions Correctly</h2>
  <p className="leading-relaxed mb-6">Most small businesses only need three of the five permission levels:</p>
  <div className="space-y-4 mb-10">
    {[
      { role: "Manager", color: "text-yellow-400", border: "border-yellow-400/20", who: "IT admin or owner only", can: "Add/remove members, change settings, delete the drive", note: "Assign sparingly — 1 or 2 people per drive max." },
      { role: "Content Manager", color: "text-emerald-400", border: "border-emerald-400/20", who: "Department leads", can: "Add, edit, move, and delete files. Cannot manage membership.", note: "Good for team leads who own content but shouldn't control access." },
      { role: "Contributor", color: "text-sky-400", border: "border-sky-400/20", who: "Most employees", can: "Add and edit files. Cannot delete or move files made by others.", note: "Default role for most staff." },
      { role: "Viewer", color: "text-white/40", border: "border-white/10", who: "Contractors, external partners", can: "View and download only. Cannot make changes.", note: "Use for anyone outside your core team." },
    ].map((item) => (
      <div key={item.role} className={`bg-white/5 border ${item.border} rounded-2xl p-5`}>
        <div className="flex items-center gap-3 mb-2">
          <span className={`font-bold text-lg ${item.color}`}>{item.role}</span>
          <span className="text-white/30 text-sm">→ {item.who}</span>
        </div>
        <p className="text-sm mb-1"><strong className="text-white">Can:</strong> {item.can}</p>
        <p className="text-white/30 text-xs italic">{item.note}</p>
      </div>
    ))}
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Naming Conventions That Work</h2>
  <p className="leading-relaxed mb-4">Inconsistent naming is the #1 reason people can't find things. Set a convention on day one:</p>
  <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 font-mono text-sm mb-10">
    <p className="text-white/30 mb-3">// Folder format</p>
    <p className="text-emerald-300 mb-1">YYYY — Project or Client Name — Category</p>
    <p className="text-white/50 mb-4">e.g. 2026 — Acme Corp — Proposal</p>
    <p className="text-white/30 mb-3">// File format</p>
    <p className="text-emerald-300 mb-1">YYYY-MM-DD_DocumentType_Version</p>
    <p className="text-white/50">e.g. 2026-03-01_ProposalAcmeCorp_v2</p>
  </div>

  <h2 className="text-2xl font-bold text-white mb-4">Security Settings You Shouldn't Skip</h2>
  <ul className="space-y-4 mb-12">
    {[
      ["Disable 'Anyone with the link' sharing", "Prevent employees from accidentally making sensitive files public. Restrict to your domain only."],
      ["Restrict download for sensitive drives", "For HR and Finance drives, prevent download/print/copy for Viewer-level users."],
      ["Enable Drive audit logs", "See who accessed, moved, or deleted files — critical for compliance and troubleshooting."],
      ["Set expiry dates on external sharing", "When sharing with contractors, set links to expire after 30–90 days automatically."],
    ].map(([title, desc]) => (
      <li key={title} className="flex gap-3 list-none">
        <span className="text-emerald-400 font-bold mt-1 shrink-0">→</span>
        <div><strong className="text-white">{title}:</strong> {desc}</div>
      </li>
    ))}
  </ul>

  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
    <h2 className="text-2xl font-bold text-white mb-3">Want a Shared Drive Blueprint Built for Your Business?</h2>
    <p className="text-white/60 mb-6">The Starter Setup ($749) includes a full Shared Drive blueprint — structure, naming conventions, permission setup, and 2 hours of admin coaching.</p>
    <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl">
      View Starter Setup →
    </a>
  </div>
</article>
```

);
}

/* ============================================================
BLOG INDEX
============================================================ */
const BLOG_POSTS = [
{
slug: “spf-dkim-dmarc-google-workspace”,
category: “Email Security”,
title: “How to Set Up SPF, DKIM, and DMARC for Google Workspace (2026 Guide)”,
excerpt: “Your emails are vulnerable without SPF, DKIM, and DMARC. This step-by-step guide shows you how to lock down your Google Workspace email authentication — and why it matters for your business.”,
readTime: “8 min read”,
component: BlogPostSPF,
},
{
slug: “apps-script-vs-zapier-google-workspace”,
category: “Automation”,
title: “Apps Script vs. Zapier: Which Automation Is Right for Your Google Workspace?”,
excerpt: “Both tools automate Google Workspace — but they solve different problems. Learn which one saves your business the most time and money based on your actual workflows.”,
readTime: “7 min read”,
component: BlogPostAppsScript,
},
{
slug: “google-workspace-shared-drive-setup”,
category: “Google Workspace”,
title: “Google Workspace Shared Drive Setup: Best Practices for Small Business Teams”,
excerpt: “My Drive is a trap. Learn how to set up Shared Drives with the right structure, permissions, and naming conventions so your team’s files are always organized and secure.”,
readTime: “9 min read”,
component: BlogPostSharedDrives,
},
];

function BlogIndex({ onSelectPost }) {
return (
<main className="max-w-4xl mx-auto px-4 py-20">
<div className="mb-12">
<span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Resources</span>
<h1 className="text-4xl font-extrabold text-white mt-3 mb-4">Google Workspace Guides</h1>
<p className="text-white/60 text-lg">
Practical guides on Google Workspace setup, email security, and automation — written for small business owners and IT admins.
</p>
</div>
<div className="space-y-5">
{BLOG_POSTS.map((post) => (
<button
key={post.slug}
onClick={() => onSelectPost(post.slug)}
className=“w-full text-left bg-white/5 border border-white/10 hover:border-emerald-500 rounded-3xl p-7 transition-colors group”
>
<span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{post.category}</span>
<h2 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-emerald-400 transition-colors">{post.title}</h2>
<p className="text-white/50 text-sm leading-relaxed mb-3">{post.excerpt}</p>
<span className="text-white/30 text-xs">{post.readTime}</span>
</button>
))}
</div>
</main>
);
}

/* ============================================================
MAIN APP
============================================================ */

const features = [
{ icon: <Zap className="w-5 h-5 text-emerald-400" />, title: “Automation, Fast”, text: “Apps Script workflows that remove busywork in days, not months.” },
{ icon: <Shield className="w-5 h-5 text-sky-400" />, title: “Secure by Default”, text: “SPF, DKIM, DMARC, least-privilege access, and clean admin policy design.” },
{ icon: <Clock className="w-5 h-5 text-yellow-400" />, title: “On-Time Delivery”, text: “Clear scope, milestones, documentation, and handoff videos.” },
];

export default function App() {
// “home” | “blog” | post slug string
const [view, setView] = useState(“home”);

// Scroll to top on view change
useEffect(() => {
window.scrollTo(0, 0);
}, [view]);

const tiers = useMemo(() => [
{ key: “starter”, name: “Starter Setup”, price: “$749”, cadence: “one-time”, stripe: STRIPE_LINKS.starter, points: [“Workspace setup or cleanup”, “SPF / DKIM / DMARC”, “Shared Drives blueprint”, “2 hours admin coaching”] },
{ key: “automation”, name: “Automation Sprint”, price: “$1,499”, cadence: “1–2 weeks”, stripe: STRIPE_LINKS.automation, popular: true, points: [“One scoped Apps Script workflow”, “Forms + Sheets + approvals”, “Notifications”, “Handoff video”] },
{ key: “pro”, name: “Pro Support”, price: “$799”, cadence: “/month”, stripe: STRIPE_LINKS.proSupport, points: [“Up to 8 hrs/month”, “Admin changes & fixes”, “Quarterly security review”, “Priority response”] },
], []);

const [form, setForm] = useState({ name: “”, email: “”, company: “”, message: “”, website: “” });
const [status, setStatus] = useState(“idle”);

const submit = async () => {
if (form.website) return;
if (!form.name || !form.email || !form.message) return;
setStatus(“sending”);
try {
await fetch(WEB_APP_URL, {
method: “POST”,
headers: { “Content-Type”: “text/plain;charset=utf-8” },
body: JSON.stringify({ …form, source: “stevesitpro.com” }),
});
setStatus(“ok”);
setForm({ name: “”, email: “”, company: “”, message: “”, website: “” });
} catch {
setStatus(“error”);
}
};

// Render individual blog post
const activeBlogPost = BLOG_POSTS.find((p) => p.slug === view);

return (
<main className="min-h-screen bg-slate-950 text-white">
{/* Header */}
<header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10">
<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
<div className="flex items-center gap-6">
<button
onClick={() => setView(“home”)}
className=“font-bold text-sky-400 hover:text-sky-300 transition”
>
Steve’s IT Pro
</button>
<a
href="https://stevemoynihan.com"
target="_blank"
rel="noreferrer"
className="text-sm text-white/70 hover:text-white transition"
>
About Steve
</a>
<button
onClick={() => setView(“blog”)}
className=“text-sm text-white/70 hover:text-white transition”
>
Blog
</button>
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

```
  {/* Blog Index */}
  {view === "blog" && (
    <BlogIndex onSelectPost={(slug) => setView(slug)} />
  )}

  {/* Individual Blog Post */}
  {activeBlogPost && (
    <div>
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <button
          onClick={() => setView("blog")}
          className="flex items-center gap-2 text-white/50 hover:text-white transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </button>
      </div>
      <activeBlogPost.component />
    </div>
  )}

  {/* Home Page */}
  {view === "home" && (
    <>
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
            <a href="#pricing" className="px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-semibold">
              View pricing →
            </a>
            <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl border border-white/20">
              Start discovery →
            </a>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
          <div className="grid gap-4">
            {features.map((f, i) => (
              <div key={i}>
                <div className="flex items-center gap-2 font-semibold">{f.icon}{f.title}</div>
                <p className="text-sm text-white/70">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href={STRIPE_LINKS.consult95} target="_blank" rel="noreferrer" className="bg-white text-slate-950 rounded-xl py-2 text-center font-semibold">
              $95 – 1hr consult
            </a>
            <a href={STRIPE_LINKS.advanced125} target="_blank" rel="noreferrer" className="border border-white/20 rounded-xl py-2 text-center">
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
            <div key={t.key} className={`bg-white/5 border ${t.popular ? "border-sky-400" : "border-white/10"} rounded-3xl p-6`}>
              {t.popular && <div className="text-xs mb-2 text-sky-400 font-semibold">Most Popular</div>}
              <div className="text-3xl font-extrabold">{t.price}</div>
              <div className="text-white/60">{t.cadence}</div>
              <h3 className="mt-2 text-lg font-semibold text-emerald-400">{t.name}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {t.points.map((p, i) => (
                  <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-yellow-400" />{p}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3">
                <a href={t.stripe} target="_blank" rel="noreferrer" className="bg-emerald-500 text-slate-950 rounded-xl py-3 text-center font-semibold">
                  Pay now →
                </a>
                <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="border border-white/20 rounded-xl py-3 text-center">
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
            <form className="mt-4 grid gap-3" onSubmit={(e) => { e.preventDefault(); submit(); }}>
              <input className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <textarea className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2" rows={4} placeholder="What problem should we solve?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <input type="text" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              <button className="bg-emerald-500 text-slate-950 rounded-xl py-2 font-semibold">Send →</button>
              {status === "ok" && <div className="text-sm text-emerald-400">Thanks! We'll be in touch.</div>}
            </form>
          </div>
        </div>
      </section>
    </>
  )}

  {/* Footer */}
  <footer className="border-t border-white/10 py-10 text-center text-sm text-white/60">
    <div className="flex flex-wrap justify-center gap-4">
      <a href={LEGAL.terms} className="hover:text-white">Terms</a>
      <a href={LEGAL.privacy} className="hover:text-white">Privacy</a>
      <a href={LEGAL.refunds} className="hover:text-white">Refunds</a>
      <a href="https://stevemoynihan.com" target="_blank" rel="noreferrer" className="hover:text-white">About Steve</a>
      <button onClick={() => setView("blog")} className="hover:text-white">Blog</button>
    </div>
    <div className="mt-4">© {new Date().getFullYear()} Steve's IT Pro</div>
  </footer>
</main>
```

);
}
