---
title: Project visual system
description: CSS tokens with Tailwind v4, shared brand palette, typography, and semantic components across portfolio and blog.
pubDate: 2026-06-07
updatedAt: 2026-07-10
draft: false
tags: [devlog, design]
---

Documentation of the visual system — how tokens, typography, and components stay coherent across portfolio and blog without hard-coupling to a single framework.

## Canonical tokens

The source of truth is `brand-tokens.css` (synced from the portfolio). The blog imports those tokens and exposes Shadcn aliases (`--background`, `--foreground`, `--primary`…) plus legacy compatibility (`--color-bg`, `--color-text`, `--color-surface`).

```css
@import "../../styles/brand-tokens.css";

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* … */
  --color-bg: var(--background);
  --color-text: var(--foreground);
}
```

Tailwind v4 consumes the variables via `@theme` — no `tailwind.config.js`. Utilities like `bg-background`, `text-primary`, and `border-border` come straight from CSS.

## Typography

**Fraunces** — display (titles, brand signal).  
**Inter** — body and UI.  
**JetBrains Mono** — code.

The type scale uses semantic classes (`.page-title`, `.page-lead`, `.eyebrow`) in `@layer components`, not a pile of utilities per template.

## Components

Buttons and toggles align with the portfolio (primary/outline/ghost variants, ThemeToggle, LocaleToggle). The theme cookie (`theme`, Domain=`.yurimachado.dev.br`) keeps light/dark in sync across subdomains.

## Current state

Portfolio (Next.js + Shadcn) and blog (Astro) share the same palette, typography, and toggles (theme + locale). Brand changes land first in `brand-tokens.css` and sync to the blog; theme and locale cookies use the parent domain so preferences stick across subdomains.
