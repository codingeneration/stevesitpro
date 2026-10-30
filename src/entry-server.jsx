// Build-time entry: renders the homepage to static HTML so crawlers, link
// previews and AI search tools see the real content without running JavaScript.
// Used only by scripts/prerender.mjs. The browser still loads src/main.jsx,
// which hydrates this markup.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function render() {
  return renderToString(<App />);
}
