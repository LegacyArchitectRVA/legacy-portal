import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import type { Plugin } from "vite";
import { defineConfig, loadEnv } from "vite";

/** Prevents Cloudflare Rocket Loader from mangling type="module" scripts */
function disableRocketLoader(): Plugin {
  return {
    name: "disable-rocket-loader",
    transformIndexHtml(html: string) {
      return html.replace(
        /<script\s+type="module"/g,
        '<script data-cfasync="false" type="module"',
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base: "/",
    plugins: [react(), tailwindcss(), disableRocketLoader()],
    define: {
      "import.meta.env.VITE_CONVEX_URL": JSON.stringify(
        env.VITE_CONVEX_URL || "",
      ),
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
    },
  };
});
