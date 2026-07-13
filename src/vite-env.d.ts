/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONVEX_URL: string;
  readonly VITE_IS_PREVIEW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Cloudflare Pages injects the Convex URL as a global at build time
// (see scripts/inject-convex-url.mjs). Declare it so TypeScript and the
// bundler both recognize it.
interface Window {
  CONVEX_URL?: string;
}

// sql.js ships without bundled type declarations.
declare module "sql.js";
