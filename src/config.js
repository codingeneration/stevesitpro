// Site-wide links and settings. Update URLs here, not in components.

export const CONTACT_EMAIL = "steve@stevesitpro.com";

// On-site booking page (embeds the intake form). Use this for every
// "book a consult" CTA so visitors and conversions stay on stevesitpro.com.
export const BOOK_URL = "/book/";

// The underlying Google Form. Kept for the /book/ page and as a fallback.
export const INTAKE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScGj_hocIEBDevsfLjQlSHTX74xX78hrLmz2TUejaFRTTBkvQ/viewform?usp=header";
export const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbyq-nuIQ1sNyqdl8VZv56QpH8fMgbg87VdSrOOXR63RTF-vNaPJo8mGDa-JSpX-tXAd/exec";

export const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/5kQ28tcnn95wb3X0Wh8k800",
  automation: "https://buy.stripe.com/28E3cx2MNgxY0pjgVf8k802",
  consult95: "https://buy.stripe.com/aFa8wR3QR4Pgdc5fRb8k804",
  advanced125: "https://buy.stripe.com/00w4gBcnnftU0pj9sN8k805",
  advisory: "https://buy.stripe.com/6oU5kFfzz5Tk0pjfRb8k80c",
  managed: "https://buy.stripe.com/7sY5kF1IJ6Xo7RLcEZ8k80d",
  fractionalIT: "https://buy.stripe.com/cNi4gB0EFbdE4FzgVf8k80e",
};

// Service pages (static HTML in public/services/). Linked from the header,
// the Services section, pricing cards and the footer.
export const SERVICE_PAGES = {
  setup: "/services/google-workspace-setup.html",
  emailSecurity: "/services/email-security-audit.html",
  automation: "/services/google-workspace-automation.html",
};

export const FREE_CHECKLIST_URL = "/free-checklist/";
export const BLOG_URL = "/blog/";
export const ABOUT_URL = "https://stevemoynihan.com";

export const LEGAL = {
  terms: "/terms.html",
  privacy: "/privacy.html",
  refunds: "/refunds.html",
};

// Sends a GA4 event if gtag is loaded (it's added in index.html).
export function track(event, params = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, params);
  }
}
