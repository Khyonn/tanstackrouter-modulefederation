import { federation } from "@module-federation/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      origin: env.ASSET_PREFIX,
      port: Number(env.PORT!),
    },
    preview: { port: Number(env.PORT!) },
    base: env.ASSET_PREFIX,
    plugins: [
      react(),
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      federation({
        name: "subapp",
        manifest: true,
        exposes: {
          "./routeTree": "./src/routeTree.gen.ts",
        },
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
  };
});
