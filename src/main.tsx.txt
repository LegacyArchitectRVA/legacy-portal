import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// After a new deploy, a page left open from before the deploy can still try to
// load an old, now-renamed JS chunk (e.g. lazy-loaded route or wasm loader).
// Cloudflare's SPA fallback then serves index.html for that missing asset
// with a 200 status instead of a real 404, so the browser fails trying to
// parse HTML as a JS module ("Failed to fetch dynamically imported module").
// Vite emits `vite:preloadError` for exactly this case — reload once to pick
// up the current build instead of showing the user a broken error screen.
let reloadedForStaleChunk = false;
window.addEventListener("vite:preloadError", () => {
  if (reloadedForStaleChunk) return; // avoid a reload loop if something else is wrong
  reloadedForStaleChunk = true;
  window.location.reload();
});

// Convex URL for production.
// Resolution order:
//   1. window.CONVEX_URL — injected at build time by scripts/inject-convex-url.mjs
//   2. VITE_CONVEX_URL   — Cloudflare Pages environment variable
//   3. hardcoded production fallback — so a missing env var or a plain
//      `vite build` (without the inject step) can never black-screen the
//      portal. This is the real production Convex deployment for this app.
const PRODUCTION_CONVEX_URL = "https://usable-hornet-255.convex.cloud";
// @ts-ignore - Cloudflare injects CONVEX_URL as a global
const convexUrl = typeof window !== 'undefined' && window.CONVEX_URL
  ? window.CONVEX_URL
  : import.meta.env.VITE_CONVEX_URL
  ? import.meta.env.VITE_CONVEX_URL
  : PRODUCTION_CONVEX_URL;

// Check if we're in production without a Convex URL
if (!convexUrl) {
  console.error("Convex URL not configured. Please set VITE_CONVEX_URL in Cloudflare Pages environment variables.");
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexAuthProvider client={convex}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConvexAuthProvider>
  </StrictMode>,
);

