# Steve’s IT Pro — Consultation Landing Page

This folder contains a simple, conversion‑focused landing page for **/consultation** on stevesitpro.com.

## Files
- `index.html` — the page markup with SEO, OG tags, and two CTAs wired to your existing Google Form.
- `styles.css` — minimal responsive styling.
- (Optional) Add an Open Graph image at `https://stevesitpro.com/assets/og-consultation.jpg` to improve link previews.

## How to add to your site (GitHub workflow)
1. In your website repo, create a folder: `consultation/`
2. Add these two files (`index.html`, `styles.css`) into that folder.
3. Commit & push to your default branch.
4. Your page should be live at: `https://stevesitpro.com/consultation/`

> If your site uses a different hosting or a framework (Next.js, React, etc.), you can still drop this HTML at that route or embed the content into a template.

## Wire up Google Ads conversion tracking
1. Replace the placeholders in `index.html`:
   - `G-XXXXXXXX` (if you use GA4)
   - `AW-XXXXXXX` (your Google Ads Conversion ID)
2. In the bottom `<script>`, replace the commented example with your real conversion label:
   ```js
   gtag('event', 'conversion', {'send_to': 'AW-17557000407/XXXXXXXXXXXXX'});
   ```
3. This event fires when users click the **Book Free Consultation** buttons.

## Update your Google Ads Final URL
- Once the page is live, update your Ads to point to `https://stevesitpro.com/consultation/` for higher conversion intent.
- I can regenerate your bulk‑upload CSV when you’re ready.

## Customization tips
- Swap copy under *Benefits* to match current priorities.
- Add a Calendly link later by replacing the Google Form URLs.
- Add testimonials or logos once you have permission.

## Need help?
Ping me and I’ll tailor the copy, add logos, and wire Calendly + analytics end‑to‑end.
