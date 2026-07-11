---
title: Changelog
type: changelog
description: Histórico de versões e mudanças do site pessoal.
draft: false
---

## v3.x: Em andamento

### Adicionado

- Changelog consolidado em `/posts/changelog`
- Landing do blog agrupada por collection (`notes`, `portfolio`, `automation`)
- i18n pt/en na home (`/en`) com LocaleToggle e cookie `locale`
- Tokens de marca compartilhados com o portfólio (Next.js) via `brand-tokens.css`
- Theme cookie cross-subdomain (`Domain=.yurimachado.dev.br`)

### Alterado

- Portfólio editorial migrado para Next.js; blog permanece em Astro
- Sidebar de docs inclui notes, portfolio e automation (sandbox draft omitido)

### Removido

- Home flat só de notas (substituída por seções por collection)

---

## v3.0: 2026-06-15

Reescrita completa. Migração de Quartz/Preact para Astro 6.

### Adicionado

- Astro 6 com SSG nativo e React 19 islands
- Tailwind CSS v4 com design tokens nativos via `@theme` (sem `tailwind.config.js`)
- Content collections com schemas Zod: `portfolio`, `automation`, `sandbox`, `notes`
- Layout `Content` com sidebar dinâmica e TOC gerada dos headings H2/H3
- GSAP 3 + ScrollTrigger com `matchMedia` para `prefers-reduced-motion`
- Deploy automático na Vercel via `@astrojs/vercel`
- Página `/sobre` com histórico de experiência, formação e idiomas
- Página `/projetos` com grid de featured + ferramentas + notas

### Removido

- Quartz como base de documentação
- Preact (substituído por React 19 islands)

---

## v2.0: 2024

Baseado em [Quartz](https://quartz.jzhao.xyz/): gerador estático para digital gardens. Segunda tentativa de criar uma base integrada de portfólio + blog + documentação. Quartz resolve o problema de renderização de Markdown e wikilinks sem configuração, mas o modelo de customização é limitado: dificuldade para integrar design system próprio e componentes React.

### Removido na migração para v3

- Base Quartz com Preact
- Wikilinks e backlinks automáticos (não essenciais para o caso de uso)
- Estrutura de digital garden (substituída por content collections estruturadas)

---

## v1.0: 2022

React SPA: primeira versão do portfólio. Build baseada em Create React App (CRA). Roteamento client-side, zero SSG, bundle JS pesado. Adequada para um portfólio simples, mas sem suporte nativo a conteúdo Markdown ou coleções estruturadas.

### Removido na migração para v2

- Create React App
- Roteamento client-side puro
- Ausência de SSG / geração estática
