# Steve’s IT Pro — Website

One-page marketing site built with **Vite + React + Tailwind**.

## Quick start (Mac)

```bash
cd ~/Desktop
unzip stevesitpro_live.zip -d stevesitpro
cd stevesitpro
npm install
npm run dev
```

Open the printed URL (e.g. http://localhost:5173).

## Configure contact form

Your Apps Script Web App is already wired:

```
src/App.jsx → const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwd6VjcxNZLDMCoSk0385J0k1jwPBryIxb7l7AXNpnnGOxgjQNMFzgJuw5Ruz-bOHbw/exec"
```

## Build

```bash
npm run build
```

Publish directory: `dist`

## Deploy

- **Netlify**: Import repo → Build cmd `npm run build` → Publish dir `dist` → Add `stevesitpro.com` domain.
- **Vercel**: Import → Framework auto-detected → Build cmd `npm run build` → Output `dist` → Add domain.

## GitHub setup

```bash
git init
git add .
git commit -m "Initial commit: production site"
git branch -M main
git remote add origin https://github.com/<your-username>/stevesitpro.git
git push -u origin main
```

## Assets

- `public/logo.svg` — simple starter logo (replace later)
- `public/logo.png`, `public/og-image.png` — placeholders
- `public/robots.txt` and `public/sitemap.xml` — SEO basics

---
Last updated: 2025-09-22
