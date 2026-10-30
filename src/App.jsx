import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import RetainerPlans from "./components/RetainerPlans";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// The homepage is pre-rendered to static HTML at build time
// (src/entry-server.jsx + scripts/prerender.mjs), so every section below is
// in the HTML crawlers receive. No <noscript> fallback is needed.
export default function App() {
  // Links like /#retainers from other pages arrive before React has drawn the
  // section, so the browser can't jump to it on its own. Do it once mounted.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-white">
        <Hero />
        <Services />
        <Testimonials />
        <Pricing />
        <RetainerPlans />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
