import type { IconName } from "./registry";

// eslint-disable-next-line simple-import-sort/exports
export { iconRegistry, type IconName } from "./registry";

/** Icon name constants for data-driven usage (tech stack, social links, etc.) */
export const ICON = {
  astro: "astro",
  cloudflare: "cloudflare",
  css3: "css3",
  database: "database",
  envelope: "envelope",
  fastapi: "fastapi",
  figma: "figma",
  git: "git",
  github: "github",
  html5: "html5",
  linkedin: "linkedin",
  nextjs: "nextjs",
  nodejs: "nodejs",
  postgresql: "postgresql",
  python: "python",
  react: "react",
  sparkles: "sparkles",
  tailwind: "tailwind",
  typescript: "typescript",
  whatsapp: "whatsapp",
  zap: "zap",
} as const satisfies Record<string, IconName>;
