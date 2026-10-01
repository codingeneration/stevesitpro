# Maintaining stevesitpro.com

Notes for working on the site.

The homepage is a small React + Vite + Tailwind app. Everything else (blog posts, service pages, legal pages, lead magnets) is plain HTML in `public/` and is copied to the build as-is.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # serve the built site locally
npm run deploy    # build + publish dist/ to the gh-pages branch (this is what updates the live site)
```

`dist/` is a build output and is not committed.

## Where things live

| Path | What it is |
| --- | --- |
| `src/config.js` | Contact email, intake form, Apps Script endpoint, Stripe links, legal links, `track()` helper |
| `src/data/pricing.js` | Package and retainer tiers (prices, bullets, Stripe link per tier) |
| `src/data/testimonials.js` | Testimonial cards |
| `src/components/` | One file per homepage section: Header, Hero, Testimonials, Pricing, RetainerPlans, Contact, Footer |
| `src/App.jsx` | Assembles the sections; holds the `<noscript>` fallback for crawlers |
| `index.html` | Page shell: GA4 tag, SEO/Open Graph meta, icons |
| `public/blog/`, `public/services/`, etc. | Static HTML pages served as-is |
| `public/chat-widget.js` | Chat widget loaded on most pages |
| `public/sitemap.xml`, `public/robots.txt` | SEO files — add new pages to the sitemap |
| `chatbot/` | Backend for the chat bubble, hosted separately on Vercel. See [`chatbot/README.md`](../chatbot/README.md) |
| `apps-script/` | Google Apps Script source for the intake-form automation and CRM sheet setup (pasted into Apps Script, not part of the site build) |

## Common edits

- **Change a price or package bullet:** `src/data/pricing.js`. Also update the `<noscript>` block in `src/App.jsx`, the chatbot's `chatbot/lib/knowledge.js`, and any service pages that quote the price (`grep -rn '\$950' public`).
- **Swap a Stripe link:** `STRIPE_LINKS` in `src/config.js`.
- **Add a blog post:** add an HTML file in `public/blog/`, link it from `public/blog/index.html`, and add it to `public/sitemap.xml`.
