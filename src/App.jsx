import { useEffect } from "react";
import { INTAKE_FORM_URL } from "./config";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import RetainerPlans from "./components/RetainerPlans";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Links like /#retainers from other pages arrive before React has drawn the
  // section, so the browser can't jump to it on its own. Do it once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

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

      <Header />
      <Hero />
      <Testimonials />
      <Pricing />
      <RetainerPlans />
      <Contact />
      <Footer />
    </main>
  );
}
