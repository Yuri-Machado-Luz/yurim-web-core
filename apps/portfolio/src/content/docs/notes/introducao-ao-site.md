---
title: Introdução ao site
description: Decisões de arquitetura que guiam o desenvolvimento do site — layouts, routing, content collections e o porquê de cada escolha.
pubDate: 2026-06-07
updatedAt: 2026-06-19
draft: false
tags: [devlog, arquitetura]
---

Este post documenta as decisões de arquitetura do site. Não é um tutorial — é um registro do raciocínio por trás de cada escolha estrutural.

## Por que Astro

O site precisa ser rápido, estático e fácil de manter. Astro resolve isso com SSG nativo, zero JS por padrão e suporte de primeira classe a content collections com Zod. React islands aparecem apenas onde há interatividade real — formulários, animações com GSAP, componentes controlados.

## Layouts

Dois layouts principais, separados por intenção:

**RootLayout** — páginas editoriais (home, `/sobre`, `/contato`, `/projetos`). Sem sidebar, sem TOC. Focado em hierarquia tipográfica e animações de entrada.

**Content** — páginas de documentação e notas. Sidebar gerada dinamicamente a partir das collections ativas; TOC extraída dos headings H2/H3 do conteúdo renderizado. O layout sabe qual item está ativo pela URL atual.

A separação é intencional: evita que a complexidade do layout de docs "vaze" para páginas que não precisam dela.

## Content Collections

Quatro collections com schemas distintos — `portfolio`, `automation`, `sandbox`, `notes`. Cada uma tem seu próprio conjunto de campos obrigatórios e opcionais validados por Zod em tempo de build.

A collection `portfolio` aceita sub-páginas via campo `type: "project" | "changelog" | "doc"`. Changelogs ficam fisicamente dentro da pasta do projeto (`portfolio-hub/changelog.md`) mas não aparecem nas queries de listagem — apenas no routing de `/docs/`.

## Routing

Pages estáticas em `src/pages/`. Conteúdo dinâmico via `src/pages/docs/[...slug].astro`, que mapeia todas as collections para URLs no padrão `/docs/{collection}/{slug}`.

O slug de cada entrada é gerado pelo loader Astro com base no caminho do arquivo — sem configuração adicional.

## Estado atual

O site está em desenvolvimento ativo. Novas seções e projetos são adicionados conforme ficam prontos. A estrutura de docs existe para registrar decisões técnicas enquanto o projeto evolui — não como documentação final.
