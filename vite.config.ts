// @leadconnector/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only, jsxSource fallback + tailwind config), @tanstack/devtools-vite source injection (data-tsd-source, dev-only),
//     HMR gate/flush, dev-server bridge controls, server diagnostics, lightningcss, and sandbox detection
//     (secure host allowlist, port/strictPort, watch ignores, and HMR overlay policy).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@leadconnector/vite-tanstack-config";

export default defineConfig({
  // Vercel deploys need Nitro's "vercel" output. It is only enabled when the
  // build runs on Vercel (or with DEPLOY_TARGET=vercel) so local builds stay simple.
  ...(process.env["VERCEL"] || process.env["DEPLOY_TARGET"] === "vercel"
    ? { nitro: { preset: "vercel" } }
    : {}),
  // Browser errors stay in the trusted parent-frame console-log flow;
  // do not expose the bridge collector on the public sandbox tunnel.
  devServerBridge: { errorCollector: false },
  // Dev-only diagnostics logger. It patches a line in @tanstack/start-server-core
  // that the patched (>= 1.169.39) releases no longer contain, which crashes the dev
  // server. Production builds are unaffected; remove this once the config package
  // supports the patched server-core.
  serverFnErrorLogger: false,
  // Do not set server.hmr.timeout — Vite 8 deprecated those websocket fields
  // (use server.ws.*). Overlay/host/port are package-owned; default WS timeout is 30s.
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
