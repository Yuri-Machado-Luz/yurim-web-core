import type { LocaleCode } from "@/lib/locale-cookie";

export type ChangelogEntry = {
  version: string;
  date: string;
  summary: Record<LocaleCode, string>;
  added?: Record<LocaleCode, string[]>;
  changed?: Record<LocaleCode, string[]>;
  removed?: Record<LocaleCode, string[]>;
};

/** Version history for the Next.js portfolio site only. */
export const portfolioChangelog: ChangelogEntry[] = [
  {
    version: "4.x",
    date: "2026-07",
    summary: {
      pt: "Revisão de voz, home e chrome. Changelog próprio neste site.",
      en: "Voice, home, and chrome review. Dedicated changelog on this site.",
    },
    added: {
      pt: [
        "Página /changelog com versionamento do portfólio Next.js",
        "Cursor custom (desktop) e seções de home com motion",
        "Página /servicos e teasers na home",
        "i18n pt/en com cookie de locale e rotas /en",
      ],
      en: [
        " /changelog page for this Next.js portfolio",
        "Custom cursor (desktop) and motion on home sections",
        "/servicos page and home teasers",
        "pt/en i18n with locale cookie and /en routes",
      ],
    },
    changed: {
      pt: [
        "Copy alinhada à brand voice (sem filler de marketing)",
        "Footer aponta para changelog local, não para o blog",
      ],
      en: [
        "Copy aligned to brand voice (no marketing filler)",
        "Footer links to local changelog, not the blog",
      ],
    },
  },
  {
    version: "4.0",
    date: "2026-06",
    summary: {
      pt: "Portfólio editorial em Next.js 16, separado do blog Astro.",
      en: "Editorial portfolio on Next.js 16, split from the Astro blog.",
    },
    added: {
      pt: [
        "Next.js App Router + Shadcn (radix-luma) + Tailwind v4",
        "Tokens de marca compartilhados via brand-tokens.css",
        "Theme cookie cross-subdomain (.yurimachado.dev.br)",
        "SEO: hreflang, JSON-LD Person, OG por página",
      ],
      en: [
        "Next.js App Router + Shadcn (radix-luma) + Tailwind v4",
        "Shared brand tokens via brand-tokens.css",
        "Cross-subdomain theme cookie (.yurimachado.dev.br)",
        "SEO: hreflang, Person JSON-LD, per-page OG",
      ],
    },
    removed: {
      pt: [
        "Portfólio acoplado à base Astro/Quartz do blog",
      ],
      en: [
        "Portfolio coupled to the blog Astro/Quartz base",
      ],
    },
  },
  {
    version: "3.0",
    date: "2026-06-15",
    summary: {
      pt: "Última fase integrada com o blog (Astro). Histórico herdado antes da cisão.",
      en: "Last phase integrated with the blog (Astro). History before the split.",
    },
    added: {
      pt: [
        "Site unificado Astro 6 (portfólio + docs no mesmo deploy)",
      ],
      en: [
        "Unified Astro 6 site (portfolio + docs in one deploy)",
      ],
    },
  },
  {
    version: "2.0",
    date: "2024",
    summary: {
      pt: "Base Quartz / digital garden. Portfólio e docs no mesmo gerador.",
      en: "Quartz / digital garden base. Portfolio and docs in one generator.",
    },
  },
  {
    version: "1.0",
    date: "2022",
    summary: {
      pt: "SPA React (CRA). Primeira versão do portfólio.",
      en: "React SPA (CRA). First portfolio version.",
    },
  },
];
