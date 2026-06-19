---
title: Portfólio
description: Site pessoal com portfólio, devlogs e documentação de projetos. Astro 6, Tailwind CSS v4, React islands.
createdAt: 2026-06-15
updatedAt: 2026-06-19
status: dev
type: project
github: https://github.com/Yuri-Machado-Luz/portfolio
live: https://www.yurimachado.dev.br
documentation: /docs/portfolio/portfolio-hub
featured: true
draft: false
order: 1
tags: [astro, react, tailwind, typescript, vercel]
---

Site pessoal construído do zero, usado como vitrine de projetos e ambiente de testes de stack. O próprio site é o projeto mais complexo documentado aqui.

## Stack

| Camada | Tecnologia |
| -------- | ------ |
| Framework | Astro 6 (SSG) |
| UI | Astro Components + Islands |
| Estilo | Tailwind CSS v4 + tokens nativos via `@theme` |
| Animações | GSAP 3 + ScrollTrigger |
| Conteúdo | Markdown + Astro Content Collections |
| Deploy | Vercel (`@astrojs/vercel`) |

## Arquitetura

### Layouts

Dois layouts principais, separados por intenção:

- **RootLayout** — páginas sem navegação lateral (home, `/sobre`, `/contato`, `/projetos`). Limpo, focado em conteúdo editorial.
- **Content** — páginas de documentação e notas. Sidebar gerada dinamicamente a partir das collections; TOC extraída dos headings H2/H3 do conteúdo renderizado.

### Content Collections

Quatro collections com schemas Zod distintos:

- **portfolio** — projetos principais. Suporta sub-páginas (`type: changelog | doc`) que não aparecem nas listagens de projetos.
- **automation** — scripts, ferramentas e extensões publicadas.
- **sandbox** — experimentos e protótipos.
- **notes** — devlogs e publicações, ordenadas por `pubDate`.

O campo `type` na collection `portfolio` distingue entradas de índice de sub-páginas, garantindo que changelogs não contaminem as queries de listagem.

### Routing

Pages estáticas em `src/pages/`. Conteúdo dinâmico via `src/pages/docs/[...slug].astro`, que mapeia todas as collections para URLs `/docs/{collection}/{slug}`.

## Design System

Tokens CSS definidos com `@theme` do Tailwind v4 — sem `tailwind.config.js`, sem plugins. As variáveis ficam disponíveis como CSS nativo e o Tailwind as consume para gerar classes utilitárias padrão.

Componentes reutilizáveis em `@layer components` com classes semânticas (`.btn-primary`, `.card`, `.eyebrow`, `.section-title`) em vez de acúmulo de utilitárias inline.

## Animações

GSAP com `gsap.matchMedia()` para respeitar `prefers-reduced-motion`. ScrollTrigger em batch para animar listas de elementos. Contexto GSAP criado e revertido via `astro:page-load` / `astro:before-preparation` para evitar vazamentos entre navegações no modo client-side.
