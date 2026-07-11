---
title: Introdução ao site
description: "Decisões de arquitetura que guiam o desenvolvimento do site: layouts, routing, content collections e o porquê de cada escolha."
pubDate: 2026-06-07
updatedAt: 2026-07-10
draft: false
tags: [devlog, arquitetura]
---

Este post documenta as decisões de arquitetura do site. Não é um tutorial: é um registro do raciocínio por trás de cada escolha estrutural.

## Por que Astro

O site precisa ser rápido, estático e fácil de manter. Astro resolve isso com SSG nativo, zero JS por padrão e suporte de primeira classe a content collections com Zod. React islands aparecem apenas onde há interatividade real: formulários, animações com GSAP, componentes controlados.

## Layouts

Dois layouts principais, separados por intenção:

**RootLayout**: páginas editoriais (home, `/sobre`, `/contato`, `/projetos`). Sem sidebar, sem TOC. Focado em hierarquia tipográfica e animações de entrada.

**Content**: páginas de documentação e notas. Sidebar gerada dinamicamente a partir das collections ativas; TOC extraída dos headings H2/H3 do conteúdo renderizado. O layout sabe qual item está ativo pela URL atual.

A separação é intencional: evita que a complexidade do layout de docs "vaze" para páginas que não precisam dela.

## Content Collections

Quatro collections com schemas distintos: `portfolio`, `automation`, `sandbox`, `notes`. Cada uma tem seu próprio conjunto de campos obrigatórios e opcionais validados por Zod em tempo de build.

A collection `portfolio` guarda docs do site Next.js: `sobre` e `changelog` em `/posts/portfolio/`. Changelogs também entram na página agregada `/posts/changelog`.

## Routing

Pages estáticas em `src/pages/`. Conteúdo dinâmico via `src/pages/posts/[...slug].astro`, que mapeia todas as collections para URLs no padrão `/posts/{collection}/{slug}`.

O slug de cada entrada é gerado pelo loader Astro com base no caminho do arquivo: sem configuração adicional.

## Estado atual

O ecossistema está dividido em dois sites:

- **Portfólio** (`www.yurimachado.dev.br`): Next.js: home, projetos, sobre, serviços, contato e rotas `/en`.
- **Blog** (`blog.yurimachado.dev.br`): Astro: notas, docs de projetos, automações, changelog e home em inglês.

As content collections e o layout `Content` (sidebar + TOC) continuam no blog. Tokens de marca, cookie de tema e cookie de locale (`locale`, Domain=`.yurimachado.dev.br`) são compartilhados entre os subdomínios. Novas seções entram conforme ficam prontas: este registro acompanha as decisões, não pretende ser documentação final.
