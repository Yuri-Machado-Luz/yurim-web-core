---
title: Changelog
type: changelog
description: Histórico de versões do portfólio Next.js (www.yurimachado.dev.br).
draft: false
---

Versionamento do site de portfólio. Linhagem compartilhada com o blog até a v3 (monólito); a partir da v4 as tags vivem em cada repo, com major alinhado à geração pós-cisão.

**Linhagem:** v1 CRA → v2 Quartz → v3 Astro unificado → v4 cisão (este site em Next.js).

## v4.1.0: 2026-07-12

Freeze estável pós-cisão. Companion: `personal--blog@v4.1.0`.

### Adicionado

- Cursor custom (desktop) e motion nas seções da home
- Página `/servicos` e teasers na home
- i18n pt/en com cookie de locale e rotas `/en`
- Docs e changelog deste projeto no blog (`/posts/portfolio/sobre`, `/posts/portfolio/changelog`)
- Formulário de contato bilíngue (labels, erros, sucesso) com `aria-invalid` / `aria-describedby`
- Favicon SVG
- Tokens de layout/motion no DS (`container-x`, z-index drawer→toast, enter/leave, ease)

### Alterado

- Copy alinhada à brand voice (hero full-stack, quick facts, experiência freelancer)
- Tema padrão escuro (system ainda disponível)
- Status de serviços: disponibilidade limitada
- Footer do portfólio aponta para este changelog no blog
- Currículo JSON/YAML atualizado

### Removido

- Favicon PNG legado

## v4.0.0: 2026-06

Portfólio editorial em Next.js 16, separado do blog Astro.

### Adicionado

- Next.js App Router + Shadcn (`radix-luma`) + Tailwind v4
- Tokens de marca compartilhados via `brand-tokens.css`
- Theme cookie cross-subdomain (`.yurimachado.dev.br`)
- SEO: hreflang, JSON-LD Person, OG por página

### Removido

- Portfólio acoplado à base Astro/Quartz do blog

## Ancestral (compartilhado com o blog)

### v3.0: 2026-06-15

Última fase integrada com o blog (Astro), antes da cisão. Site unificado Astro 6 (portfólio + docs no mesmo deploy). Tag de referência no histórico do monólito: `v3.1.0`.

### v2.0: 2024

Base Quartz / digital garden. Portfólio e docs no mesmo gerador. Tag de arquivo: `archive-v2-quartz`.

### v1.0: 2022

SPA React (CRA). Primeira versão do portfólio. Tag de arquivo: `archive-v1-react`.
