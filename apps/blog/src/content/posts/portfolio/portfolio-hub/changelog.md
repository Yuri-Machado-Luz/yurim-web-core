---
title: Changelog
type: changelog
description: Histórico de versões do blog (Astro). O portfólio Next.js tem changelog próprio.
draft: false
---

## v3.x: Em andamento

### Adicionado

- Changelog agregado em `/posts/changelog` (só conteúdo do blog)
- Landing agrupada por collection (`notes`, `portfolio`, `automation`)
- i18n pt/en na home (`/en`) com LocaleToggle e cookie `locale`
- Tokens de marca compartilhados com o portfólio via `brand-tokens.css`
- Theme cookie cross-subdomain (`Domain=.yurimachado.dev.br`)

### Alterado

- Conteúdo sob `/posts/*` (antes `/docs/*`)
- Portfólio editorial saiu deste deploy: vive em Next.js no domínio principal

### Removido

- Home flat só de notas (substituída por seções por collection)

---

## v3.0: 2026-06-15

Reescrita completa. Migração de Quartz/Preact para Astro 6.

### Adicionado

- Astro 6 com SSG nativo e React 19 islands
- Tailwind CSS v4 com design tokens nativos via `@theme`
- Content collections com schemas Zod: `portfolio`, `automation`, `sandbox`, `notes`
- Layout `Content` com sidebar dinâmica e TOC dos headings H2/H3
- GSAP 3 + ScrollTrigger com respeito a `prefers-reduced-motion`
- Deploy na Vercel via `@astrojs/vercel`

### Removido

- Quartz como base de documentação
- Preact (substituído por React 19 islands)

---

## v2.0: 2024

Baseado em [Quartz](https://quartz.jzhao.xyz/): gerador estático para digital gardens. Tentativa de base integrada portfólio + blog + documentação.

### Removido na migração para v3

- Base Quartz com Preact
- Wikilinks e backlinks automáticos
- Estrutura de digital garden (substituída por content collections)

---

## v1.0: 2022

React SPA (CRA). Primeira versão do site pessoal, antes da cisão portfólio/blog.
