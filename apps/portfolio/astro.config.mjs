// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import rehypeCallouts from "rehype-callouts";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";

const markdownPlugins = [remarkDirective];
const rehypePlugins = [rehypeSlug, rehypeCallouts];

export default defineConfig({
  site: "https://yurimachado.dev.br",

  prefetch: {
    defaultStrategy: "hover",
    prefetchAll: false,
  },

  markdown: {
    remarkPlugins: markdownPlugins,
    rehypePlugins: rehypePlugins,
  },

  integrations: [react(), mdx({ extendMarkdownConfig: true })],

  adapter: vercel(),

  vite: {
    assetsInclude: ["**/*.base", "**/.obsidian/**", "**/_bases/**"],
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@styles": fileURLToPath(
          new URL("./src/styles/global.css", import.meta.url),
        ),
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
