import React, { useMemo, useState, useEffect } from "react";
import {
  Check,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Mail,
  Quote,
  Sparkles,
  BadgeCheck,
  ArrowLeft,
  Star,
} from "lucide-react";

/* ––––– Config ––––– */
const CONTACT_EMAIL = "steve@stevesitpro.com";
const INTAKE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header";
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyevJvyyUv4wDkbCJuHkMJ18iRICrEyLpMtJ5x7r0U9-OG7ntO7tsNgFWAE_0sKN0KM/exec";

const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/5kQ28tcnn95wb3X0Wh8k800",
  automation: "https://buy.stripe.com/28E3cx2MNgxY0pjgVf8k802",
  consult95: "https://buy.stripe.com/aFa8wR3QR4Pgdc5fRb8k804",
  advanced125: "https://buy.stripe.com/00w4gBcnnftU0pj9sN8k805",
  advisory: "https://buy.stripe.com/6oU5kFfzz5Tk0pjfRb8k80c",
  managed: "https://buy.stripe.com/7sY5kF1IJ6Xo7RLcEZ8k80d",
  fractionalIT: "https://buy.stripe.com/cNi4gB0EFbdE4FzgVf8k80e",
};

const LEGAL = {
  terms: "/terms.html",
  privacy: "/privacy.html",
  refunds: "/refunds.html",
};

/* ––––– Helpers ––––– */
function track(event, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}

/* ============================================================
   TESTIMONIALS DATA
============================================================ */
const TESTIMONIALS = [
  {
    name: "Maria T.",
    company: "Founder, Coastal Design Co.",
    text: "Steve set up our entire Google Workspace in two days — email auth, Shared Drives, the works. We went from chaotic to completely organized. Worth every penny of the Starter package.",
    stars: 5,
  },
  {
    name: "James R.",
    company: "Operations Manager, Pacific Build Group",
    text: "The automation sprint he built replaced a 3-hour manual process our team ran every Monday. It now runs itself. I wish we'd done this two years ago.",
    stars: 5,
  },
  {
    name: "Priya N.",
    company: "CEO, Nova Health Consulting",
    text: "Steve speaks plain English, delivers on time, and documents everything clearly. He set up SPF/DKIM/DMARC properly after another consultant left it half-done. Highly recommend.",
    stars: 5,
  },
];

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
        { icon: "💰", title: "Cost", body: "Apps Script is completely free — included with every Google Workspace account. Zapier's free plan caps at 100 tasks/month. Most real business workflows require a paid plan starting around $20–$50/month, and costs scale fast with volume.", verdict: "Apps Script wins on cost for Google-only workflows.", color: "emerald" },
        { icon: "⏱️", title: "Speed to Build", body: "Zapier is dramatically faster for simple workflows. Connecting a Google Form to a Slack notification takes 5 minutes with no coding. Apps Script requires writing JavaScript — a simple workflow might take 30 minutes, complex ones take days. But once built, they run silently forever.", verdict: "Zapier wins for speed. Apps Script is a bigger upfront investment.", color: "sky" },
        { icon: "🔧", title: "Flexibility & Power", body: "Apps Script dominates here. Because it's real code, you can build logic Zapier can't replicate — conditional branching, dynamically generated PDFs, bulk operations across thousands of rows, deep Google API access. Zapier is powerful within its constraints, but you can't go beyond what each connector supports.", verdict: "Apps Script wins for complex, Google-native workflows.", color: "emerald" },
        { icon: "🌐", title: "App Coverage", body: "Need to connect Google Sheets to Salesforce, HubSpot, Stripe, or QuickBooks? Zapier has 6,000+ pre-built connectors. Apps Script can technically reach any API, but you have to write that connection yourself.", verdict: "Zapier wins when connecting Google to non-Google tools.", color: "sky" },
      ].map((item) => (
        <div key={item.title} className="mb-8">
          <h3 className="text-xl font-semibold text-emerald-400 mb-3">{item.icon} {item.title}</h3>
          <p className="leading-relaxed mb-3">{item.body}</p>
          <div className={`bg-white/5 border-l-4 ${item.color === 'emerald' ? 'border-emerald-400' : 'border-sky-400'} rounded-r-2xl p-4`}>
            <p className="text-sm"><strong className="text-white">Verdict:</strong> {item.verdict}</p>
          </div>
        </div>
      ))}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Want Busywork Removed From Your Team's Day?</h2>
        <p className="text-white/60 mb-6">I build custom Apps Script workflows for small businesses — scoped, documented, and delivered in 1–2 weeks. Starting at $1,499.</p>
        <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl">
          Start an Automation Sprint →
        </a>
      </div>
    </article>
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
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center mt-8">
        <h2 className="text-2xl font-bold text-white mb-3">Want a Shared Drive Blueprint Built for Your Business?</h2>
        <p className="text-white/60 mb-6">The Starter Setup ($749) includes a full Shared Drive blueprint — structure, naming conventions, permission setup, and 2 hours of admin coaching.</p>
        <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="inline-block bg-emerald-500 text-slate-950 font-bold px-8 py-3 rounded-xl">
          View Starter Setup →
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   BLOG INDEX
============================================================ */
const BLOG_POSTS = [
  {
    slug: "spf-dkim-dmarc-google-workspace",
    category: "Email Security",
    title: "How to Set Up SPF, DKIM, and DMARC for Google Workspace (2026 Guide)",
    excerpt: "Your emails are vulnerable without SPF, DKIM, and DMARC. This step-by-step guide shows you how to lock down your Google Workspace email authentication — and why it matters for your business.",
    readTime: "8 min read",
    component: BlogPostSPF,
  },
  {
    slug: "apps-script-vs-zapier-google-workspace",
    category: "Automation",
    title: "Apps Script vs. Zapier: Which Automation Is Right for Your Google Workspace?",
    excerpt: "Both tools automate Google Workspace — but they solve different problems. Learn which one saves your business the most time and money based on your actual workflows.",
    readTime: "7 min read",
    component: BlogPostAppsScript,
  },
  {
    slug: "google-workspace-shared-drive-setup",
    category: "Google Workspace",
    title: "Google Workspace Shared Drive Setup: Best Practices for Small Business Teams",
    excerpt: "My Drive is a trap. Learn how to set up Shared Drives with the right structure, permissions, and naming conventions so your team's files are always organized and secure.",
    readTime: "9 min read",
    component: BlogPostSharedDrives,
  },
  {
    slug: "google-workspace-vs-microsoft-365-small-business",
    category: "Comparison",
    title: "Google Workspace vs. Microsoft 365 for Small Business: An Honest Comparison (2026)",
    excerpt: "Google Workspace or Microsoft 365? This honest comparison breaks down cost, collaboration, email, admin, and security for small businesses with 5-50 employees.",
    readTime: "10 min read",
  },
  {
    slug: "google-workspace-security-checklist-small-business",
    category: "Security",
    title: "Google Workspace Security Checklist for Small Business (2026)",
    excerpt: "A 15-point security checklist covering 2FA, admin roles, email authentication, sharing policies, and monitoring. The same audit I run with every new client.",
    readTime: "11 min read",
  },
  {
    slug: "employee-offboarding-google-workspace",
    category: "Admin Guide",
    title: "How to Offboard an Employee in Google Workspace Without Losing Data",
    excerpt: "Don't delete that account yet. Step-by-step guide to transferring files, reassigning email, revoking access, and protecting company data when someone leaves.",
    readTime: "8 min read",
  },
];

function BlogIndex() {
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
          <a
            key={post.slug}
            href={`/blog/${post.slug}.html`}
            className="block w-full text-left bg-white/5 border border-white/10 hover:border-emerald-500 rounded-3xl p-7 transition-colors group no-underline"
          >
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">{post.category}</span>
            <h2 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-emerald-400 transition-colors">{post.title}</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-3">{post.excerpt}</p>
            <span className="text-white/30 text-xs">{post.readTime}</span>
          </a>
        ))}
      </div>
    </main>
  );
}

/* ============================================================
   TESTIMONIALS SECTION
============================================================ */
function TestimonialsSection() {
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

/* ============================================================
   RETAINER PLANS SECTION
============================================================ */
function RetainerSection({ tiers }) {
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

/* ============================================================
   MAIN APP
============================================================ */
const features = [
  { icon: <Zap className="w-5 h-5 text-emerald-400" />, title: "Automation, Fast", text: "Apps Script workflows that remove busywork in days, not months." },
  { icon: <Shield className="w-5 h-5 text-sky-400" />, title: "Secure by Default", text: "SPF, DKIM, DMARC, least-privilege access, and clean admin policy design." },
  { icon: <Clock className="w-5 h-5 text-yellow-400" />, title: "On-Time Delivery", text: "Clear scope, milestones, documentation, and handoff videos." },
];

export default function App() {
  // "home" | "blog" | post slug string
  const [view, setView] = useState("home");

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const tiers = useMemo(() => [
    {
      key: "starter",
      name: "Starter Setup",
      price: "$749",
      cadence: "one-time",
      stripe: STRIPE_LINKS.starter,
      points: [
        "Workspace setup or cleanup",
        "SPF / DKIM / DMARC config",
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
        "Automated notifications",
        "Full handoff video",
      ],
    },
  ], []);

  const retainerTiers = useMemo(() => [
    {
      key: "advisory",
      name: "Advisory",
      price: "$950",
      cadence: "/mo",
      hours: "Up to 5 hrs",
      responseTime: "Next business day",
      bestFor: "Best for: teams with in-house help who need an expert on call",
      stripe: STRIPE_LINKS.advisory,
      points: [
        "Async email & chat support",
        "Quarterly security review",
        "Admin guidance & best practices",
      ],
    },
    {
      key: "managed",
      name: "Managed",
      price: "$1,950",
      cadence: "/mo",
      hours: "Up to 12 hrs",
      responseTime: "Same business day",
      bestFor: "Best for: businesses that want their Google Workspace fully managed",
      stripe: STRIPE_LINKS.managed,
      popular: true,
      points: [
        "Everything in Advisory, plus:",
        "User onboarding/offboarding",
        "Email deliverability monitoring (SPF, DKIM, DMARC)",
        "License & admin console management",
        "Monthly health report",
      ],
    },
    {
      key: "fractionalIT",
      name: "Fractional IT Lead",
      price: "$3,950",
      cadence: "/mo",
      hours: "Up to 25 hrs",
      responseTime: "Priority — 4 business hrs",
      bestFor: "Best for: growing companies that need a hands-on IT leader without the full-time hire",
      stripe: STRIPE_LINKS.fractionalIT,
      points: [
        "Everything in Managed, plus:",
        "Project work included",
        "Security remediation & hardening",
        "Vendor & tooling management",
        "On-call escalation",
        "Quarterly IT roadmap session",
      ],
    },
  ], []);

  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");

  const submit = async () => {
    if (form.website) return; // honeypot
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

  // Render individual blog post
  const activeBlogPost = BLOG_POSTS.find((p) => p.slug === view);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ── SEO: Static noscript fallback for crawlers ── */}
      <noscript>
        <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "#fff", background: "#020817" }}>
          <h1>Steve's IT Pro – Google Workspace Consulting & Automation</h1>
          <p>Fixed-price Google Workspace consulting for small businesses. Setup, automation, security hardening, and ongoing support. Based in Riverside County, CA.</p>
          <h2>Services</h2>
          <ul>
            <li>Starter Setup ($749) – Workspace setup, SPF/DKIM/DMARC, Shared Drives, coaching</li>
            <li>Automation Sprint ($1,499) – Custom Apps Script workflow built in 1–2 weeks</li>
          </ul>
          <h2>Retainer Plans</h2>
          <ul>
            <li>Advisory ($950/mo) – Up to 5 hrs, next business day response</li>
            <li>Managed ($1,950/mo) – Up to 12 hrs, same business day response</li>
            <li>Fractional IT Lead ($3,950/mo) – Up to 25 hrs, priority 4-hour response</li>
          </ul>
          <h2>Contact</h2>
          <p>Email: steve@stevesitpro.com</p>
          <p>Book a free consult: <a href={INTAKE_FORM_URL}>Google Form</a></p>
        </div>
      </noscript>

      {/* Header */}
      <header className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center gap-8">
          {/* Left: logo + nav links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setView("home")}
              className="font-bold text-sky-400 hover:text-sky-300 transition whitespace-nowrap"
            >
              Steve's IT Pro
            </button>
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

      {/* Blog Index */}
      {view === "blog" && (
        <BlogIndex />
      )}

      {/* Individual Blog Post — redirect to static page */}
      {activeBlogPost && (
        <script dangerouslySetInnerHTML={{__html: `window.location.href="/blog/${activeBlogPost.slug}.html";`}} />
      )}

      {/* Home Page */}
      {view === "home" && (
        <>
          {/* ── HERO ── */}
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
                {features.map((f, i) => (
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

          {/* ── TESTIMONIALS ── */}
          <TestimonialsSection />

          {/* ── PRICING ── */}
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

          {/* ── RETAINER PLANS ── */}
          <RetainerSection tiers={retainerTiers} />

          {/* ── CONTACT ── */}
          <section id="contact" className="max-w-7xl mx-auto px-4 pb-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: context */}
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Get in Touch</span>
                <h2 className="text-3xl font-extrabold text-white mt-2 mb-3">Let's fix your Workspace.</h2>
                <p className="text-white/50 leading-relaxed mb-6">
                  Whether you need a quick tune-up or a full automation build, the first step is a free 30-minute discovery call. No commitment, no sales pressure — just a straight answer on what your setup needs.
                </p>
                <div className="space-y-3">
                  <a href={INTAKE_FORM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><ArrowRight className="w-4 h-4 text-emerald-400" /></div>
                    Book a free 30-min consult
                  </a>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><Mail className="w-4 h-4 text-sky-400" /></div>
                    {CONTACT_EMAIL}
                  </a>
                  <a href="https://stevemoynihan.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"><BadgeCheck className="w-4 h-4 text-white/40" /></div>
                    About Steve → stevemoynihan.com
                  </a>
                </div>
              </div>

              {/* Right: form */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h3 className="font-semibold text-white text-lg mb-1">Send a message</h3>
                <p className="text-white/40 text-sm mb-5">Usually responds within one business day.</p>
                {status === "ok" ? (
                  <div className="text-center py-10">
                    <div className="text-emerald-400 text-4xl mb-3">✓</div>
                    <p className="text-white font-semibold">Message sent!</p>
                    <p className="text-white/50 text-sm mt-1">I'll be in touch within one business day.</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <input
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    <input
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                      placeholder="Email address *"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <input
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition"
                      placeholder="Company (optional)"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                    <textarea
                      className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-emerald-500 transition resize-none"
                      rows={4}
                      placeholder="What do you need help with? *"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {/* Honeypot */}
                    <input
                      type="text"
                      className="hidden"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <button
                      onClick={submit}
                      disabled={status === "sending"}
                      className="bg-emerald-500 text-slate-950 rounded-xl py-2.5 font-bold hover:bg-emerald-400 transition disabled:opacity-50"
                    >
                      {status === "sending" ? "Sending..." : "Send message →"}
                    </button>
                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center">Something went wrong. Try emailing directly.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-sm text-white/40">
        <div className="flex flex-wrap justify-center gap-4 mb-3">
          <a href={LEGAL.terms} className="hover:text-white transition">Terms</a>
          <a href={LEGAL.privacy} className="hover:text-white transition">Privacy</a>
          <a href={LEGAL.refunds} className="hover:text-white transition">Refunds</a>
          <a href="https://stevemoynihan.com" target="_blank" rel="noreferrer" className="hover:text-white transition">About Steve</a>
          <a href="/blog/" className="hover:text-white transition">Blog</a>
        </div>
        <div>© {new Date().getFullYear()} Steve's IT Pro · Google Workspace Consulting · Riverside County, CA</div>
      </footer>
    </main>
  );
}
