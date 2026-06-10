import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Convex URL for production
// Priority: 1. import.meta.env (build-time), 2. window.CONVEX_URL (runtime for Cloudflare)
const convexUrl = import.meta.env.VITE_CONVEX_URL || (typeof window !== 'undefined' ? window.CONVEX_URL : '');

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
