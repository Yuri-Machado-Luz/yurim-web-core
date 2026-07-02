// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
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
    icon(),
    mdx({ extendMarkdownConfig: true }),
    sitemap({
      filter: (page) =>
        page.startsWith("https://blog.yurimachado.dev.br/docs/notes/") ||
        page === "https://blog.yurimachado.dev.br/",
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
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@home": fileURLToPath(
          new URL("./src/components/home", import.meta.url),
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
