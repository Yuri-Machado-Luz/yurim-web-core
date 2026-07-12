---
title: Sistema visual do projeto
description: Tokens CSS com Tailwind v4, paleta de cores, tipografia e componentes semânticos adotados no site.
pubDate: 2026-06-07
updatedAt: 2026-07-10
draft: false
tags: [devlog, design]
---

Documentação do sistema visual: como tokens, tipografia e componentes foram organizados para manter coerência entre portfólio e blog sem acoplamento rígido a um único framework. Valores ao vivo: `01_Sites/portfolio/src/styles/brand-tokens.css`. Intent: hub vault `10_Areas/11_Brand/visual/`.

## Tokens canônicos

A fonte da verdade é `brand-tokens.css` (sincronizado do portfólio). O blog importa esses tokens e expõe aliases Shadcn (`--background`, `--foreground`, `--primary`…) mais compatibilidade legada (`--color-bg`, `--color-text`, `--color-surface`).

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

Tailwind v4 consome as variáveis via `@theme`: sem `tailwind.config.js`. Utilitárias como `bg-background`, `text-primary` e `border-border` saem direto do CSS.

## Tipografia

**Fraunces**: display (títulos, brand signal).  
**Inter**: corpo e UI.  
**JetBrains Mono**: código.

A escala tipográfica usa classes semânticas (`.page-title`, `.page-lead`, `.eyebrow`) em `@layer components`, não um acúmulo de utilitárias por template.

## Componentes

Botões e toggles alinham ao portfólio (variantes primary/outline/ghost, ThemeToggle, LocaleToggle). O cookie de tema (`theme`, Domain=`.yurimachado.dev.br`) mantém light/dark entre subdomínios.

## Estado atual

Portfólio (Next.js + Shadcn) e blog (Astro) compartilham a mesma paleta, tipografia e toggles (tema + locale). Mudanças de marca entram primeiro em `brand-tokens.css` e são sincronizadas para o blog; cookies de tema e idioma usam o domínio pai para manter preferência entre subdomínios.
