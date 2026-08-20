---
title: Changelog
description: Histórico de versões do site unificado (portfólio + blog) em www.yurimachado.dev.br.
draft: false
status: ativo
---

Histórico do site público. Tags estáveis nascem em `main`; prereleases alpha em `development`. Detalhe máquina-a-máquina (SHAs, compare links) fica no [`CHANGELOG.md`](https://github.com/Yuri-Machado-Luz/yurim-web-core/blob/main/CHANGELOG.md) do repositório.

**Linhagem:** v1 CRA → v2 Quartz → v3 Astro unificado → v4 cisão (portfólio Next + blog companion) → **v5 unificação** (portfólio + blog no mesmo Next; nav sem `/servicos` como produto).

## v5.1.1: 2026-08-20

Ajuste fino de UX no menu mobile: a marca fica só na barra; o drawer não repete o logo.

### Alterado

- Drawer mobile sem logo (header mínimo com título acessível `sr-only`)

## v5.1.0: 2026-08-19

Polish pós-cutover: 404 alinhado ao visual v5, menu de contexto, e limpeza de chrome.

### Adicionado

- 404 v5 (`NotFoundView`, global + locale + catch-all)
- Menu de contexto (botão direito) no shell

### Removido

- Cursor personalizado

### Alterado

- CTAs da home, contato e footer
- Nav e menu de contexto sem Serviços
- CI: pnpm via `packageManager`, generate de content no typecheck

## v5.0.0: cutover

Geração unificada: um App Router locale-scoped serve portfólio e blog.

### Adicionado

- App Router com `[locale]`, next-intl, Content Collections por pastas
- Meta centralizada, motion na home, chrome sticky
- Visual glow/grid do tema v5

### Removido / substituído

- Monorepo apps legados como fonte do site público
- Dependência do companion blog para o core

## v4.1.0: 2026-07-12

Freeze estável pós-cisão. Companion: `personal--blog@v4.1.0`.

### Adicionado

- Motion nas seções da home
- Página `/servicos` e teasers na home (retirados da nav na v5)
- i18n pt/en com cookie de locale e rotas `/en`
- Docs e changelog deste projeto no blog (`/blog/…`)
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
