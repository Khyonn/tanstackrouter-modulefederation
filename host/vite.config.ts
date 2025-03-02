import { federation } from "@module-federation/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    federation({
      name: "host",
      manifest: true,
      shared: Object.fromEntries(
        ["react", "react-dom", "@tanstack/react-router"].map((pkg) => [
          pkg,
          { singleton: true },
        ])
      ),
    }),
  ],
  // Do you need to support build targets lower than chrome89?
  // You can use 'vite-plugin-top-level-await' plugin for that.
  build: {
    target: "chrome89",
  },
});
