// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import rehypeCallouts from "rehype-callouts";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import { rehypeWrapTables } from "./src/components/shared/handlers/rehype-wrap-tables.ts";

const markdownPlugins = [remarkDirective];
const rehypePlugins = [rehypeSlug, rehypeCallouts, rehypeWrapTables];

export default defineConfig({
  site: "https://blog.yurimachado.dev.br",
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: false,
  },

  markdown: {
    processor: unified({
      remarkPlugins: markdownPlugins,
      rehypePlugins: rehypePlugins,
    }),
  },

  integrations: [
    react(),
    icon(),
    mdx({ extendMarkdownConfig: true }),
    sitemap({
      filter: (page) =>
        page === "https://blog.yurimachado.dev.br/" ||
        page.startsWith("https://blog.yurimachado.dev.br/docs/") ||
        page.startsWith("https://blog.yurimachado.dev.br/en"),
    }),
  ],

  adapter: vercel(),

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    assetsInclude: ["**/*.base", "**/.obsidian/**", "**/_bases/**"],
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ["**/.vscode/**", "**/.claude/**", "**/.obsidian/**"],
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@ui": fileURLToPath(new URL("./src/components/ui", import.meta.url)),
        "@shared": fileURLToPath(
          new URL("./src/components/shared", import.meta.url),
        ),
        "@styles": fileURLToPath(
          new URL("./src/components/styles", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@config": fileURLToPath(new URL("./src/config.ts", import.meta.url)),
        "@i18n": fileURLToPath(new URL("./src/i18n", import.meta.url)),
      },
    },
  },

  publicDir: "./public",

  server: {
    open: true,
    port: 5000,
  },

  devToolbar: {
    enabled: false,
  },
});
