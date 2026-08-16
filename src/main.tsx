import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
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
const convexUrl =
  typeof window !== "undefined" && window.CONVEX_URL
    ? window.CONVEX_URL
    : import.meta.env.VITE_CONVEX_URL
      ? import.meta.env.VITE_CONVEX_URL
      : PRODUCTION_CONVEX_URL;

// Check if we're in production without a Convex URL
if (!convexUrl) {
  console.error(
    "Convex URL not configured. Please set VITE_CONVEX_URL in Cloudflare Pages environment variables.",
  );
}

const convex = new ConvexReactClient(convexUrl);

// @convex-dev/auth's ConvexAuthProvider persists the JWT and refresh token to
// localStorage by default and does not guard that read/write. On browsers
// that block storage (Brave with Shields set aggressively, Chrome mobile
// with strict site data settings, some private-mode configurations), that
// write throws — most likely right after a successful sign-in, when the
// provider tries to persist the new token. Since this component sits above
// App's ErrorBoundary, an unguarded throw here used to unmount the entire
// tree with nothing left to render: no error card, just the dark CSS
// background from index.css, which is why it looked like a plain black
// screen with no visible error.
//
// This wrapper never lets a storage failure throw. It falls back to an
// in-memory store for the current tab when storage is unavailable, so
// sign-in still works for that session, it just won't survive a reload.
function createGuardedStorage() {
  const memory = new Map<string, string>();
  let storageOk = true;
  try {
    window.localStorage.setItem("__lrva_storage_test__", "1");
    window.localStorage.removeItem("__lrva_storage_test__");
  } catch {
    storageOk = false;
  }
  return {
    getItem: (key: string) => {
      try {
        return storageOk
          ? window.localStorage.getItem(key)
          : (memory.get(key) ?? null);
      } catch {
        storageOk = false;
        return memory.get(key) ?? null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        if (storageOk) {
          window.localStorage.setItem(key, value);
          return;
        }
      } catch {
        storageOk = false;
      }
      memory.set(key, value);
    },
    removeItem: (key: string) => {
      try {
        if (storageOk) {
          window.localStorage.removeItem(key);
        }
      } catch {
        storageOk = false;
      }
      memory.delete(key);
    },
  };
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConvexAuthProvider client={convex} storage={createGuardedStorage()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConvexAuthProvider>
    </ErrorBoundary>
  </StrictMode>,
);
