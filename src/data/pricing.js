import { STRIPE_LINKS } from "../config";

// One-time packages (shown in the Pricing section)
export const PACKAGES = [
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
];

// Monthly retainers (shown in the Retainer Plans section)
export const RETAINER_TIERS = [
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
];
