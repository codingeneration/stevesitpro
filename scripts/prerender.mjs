// Injects the server-rendered homepage into dist/index.html.
// Runs after `vite build` (client) and `vite build --ssr` (server bundle).
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = resolve(root, "dist/index.html");
const serverEntry = resolve(root, "dist-ssr/entry-server.js");

const { render } = await import(pathToFileURL(serverEntry).href);
const html = readFileSync(indexPath, "utf8");

const placeholder = '<div id="root"></div>';
if (!html.includes(placeholder)) {
  throw new Error(`prerender: ${placeholder} not found in dist/index.html`);
}

writeFileSync(indexPath, html.replace(placeholder, `<div id="root">${render()}</div>`));
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });
console.log("prerender: homepage HTML written to dist/index.html");
