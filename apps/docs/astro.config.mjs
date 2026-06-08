// @ts-check
import { defineConfig } from "astro/config";
import { fileURLToPath } from "url";

import { unified } from "@astrojs/markdown-remark";
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
    processor: unified({
      remarkPlugins: markdownPlugins,
      rehypePlugins: rehypePlugins,
    }),
  },

  integrations: [react(), mdx({ extendMarkdownConfig: true })],

  adapter: vercel(),

  vite: {
    assetsInclude: ["**/*.base", "**/.obsidian/**", "**/_bases/**"],
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["lucide-react"],
    },
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@pages": fileURLToPath(
          new URL("./src/components/pages", import.meta.url),
        ),
        "@sections": fileURLToPath(
          new URL("./src/components/sections", import.meta.url),
        ),
        "@ui": fileURLToPath(
          new URL("./src/components/ui", import.meta.url),
        ),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url)),
        "@lib": fileURLToPath(new URL("./src/lib", import.meta.url)),
        "@styles": fileURLToPath(
          new URL("./src/styles/global.css", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@config": fileURLToPath(new URL("./src/config.ts", import.meta.url)),
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
