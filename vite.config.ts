import path from "path";
import { defineConfig, type UserConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

const defaultConfig: UserConfig = {
  plugins: [[react(), tailwindcss(), svgr(), tsconfigPaths()]],
  base: process.env.VITE_APP_URL,
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@shared-component",
        replacement: path.resolve(__dirname, "./src/shared/components"),
      },
      {
        find: "@shared-ui",
        replacement: path.resolve(__dirname, "./src/shared/ui"),
      },
      {
        find: "@shared-constants",
        replacement: path.resolve(__dirname, "./src/shared/constants"),
      },
      {
        find: "@shared-types",
        replacement: path.resolve(__dirname, "./src/shared/types"),
      },
      {
        find: "@shared-utils",
        replacement: path.resolve(__dirname, "./src/shared/utils"),
      },
      {
        find: "@shared-stores",
        replacement: path.resolve(__dirname, "./src/shared/stores"),
      },
      {
        find: "@shared-hooks",
        replacement: path.resolve(__dirname, "./src/shared/hooks"),
      },
      {
        find: "@shared-service",
        replacement: path.resolve(__dirname, "./src/shared/services"),
      },
    ],
  },
};

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  const base = process.env.VITE_APP_URL && process.env.VITE_APP_URL !== "undefined" ? process.env.VITE_APP_URL : "/";
  const apiUrl = process.env.VITE_API_URL && process.env.VITE_API_URL !== "undefined" ? process.env.VITE_API_URL : "http://localhost:8000";

  const apiProxy = {
    "/api": {
      target: apiUrl,
      changeOrigin: true,
      secure: false,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  };

  switch (process.env?.VITE_APP_MODE) {
    case "PRODUCTION":
      return {
        ...defaultConfig,
        base,
        esbuild: {
          drop: ["console", "debugger"],
        },
        build: { target: "esnext", minify: true, cssCodeSplit: true },
      };
    case "DEVELOPMENT":
      return {
        ...defaultConfig,
        base,
        server: {
          host: "localhost",
          proxy: apiProxy,
        },
        build: {
          target: "esnext",
          minify: true,
          cssCodeSplit: true,
          cssMinify: "esbuild",
        },
      };
    case "DEVDOCKER":
      return {
        ...defaultConfig,
        base,
        server: {
          proxy: apiProxy,
        },
        esbuild: {
          drop: ["console", "debugger"],
        },
        build: {
          target: "esnext",
          minify: true,
          cssCodeSplit: true, 
          cssMinify: "esbuild",
        },
      };
    case "STAGING":
      return {
        ...defaultConfig,
        base,
        server: {
          proxy: apiProxy,
        },
        esbuild: {
          drop: ["console", "debugger"],
        },
        build: {
          target: "esnext",
          minify: true,
          cssCodeSplit: true,
          cssMinify: "esbuild",
        },
      };
    default:
      return {
        ...defaultConfig,
        base,
        server: {
          proxy: apiProxy,
        },
        esbuild: {
          drop: ["console", "debugger"],
        },
        build: {
          target: "esnext",
          minify: true,
          cssCodeSplit: true,
          cssMinify: "esbuild",
        },
      };
  }
});
