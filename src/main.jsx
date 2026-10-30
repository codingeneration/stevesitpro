import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// In production the homepage HTML is pre-rendered at build time
// (scripts/prerender.mjs), so React attaches to it. In `npm run dev`
// the root is empty and React renders from scratch.
const container = document.getElementById('root')
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />)
} else {
  createRoot(container).render(<App />)
}
