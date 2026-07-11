---
title: Portfólio
description: Site editorial em Next.js. Apresentação, projetos, serviços e contato.
status: ativo
type: project
github: "https://github.com/Yuri-Machado-Luz/personal--portfolio"
live: "https://www.yurimachado.dev.br"
documentation: /posts/portfolio/sobre
featured: true
draft: false
order: 1
tags: [nextjs, react, tailwind, typescript, vercel, shadcn]
---

Documentação do **portfólio** em `www.yurimachado.dev.br`. O blog (este site, Astro) é um deploy separado: notas, automações e docs de projetos.

## Stack

| Camada | Tecnologia |
| -------- | ------ |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Shadcn (`radix-luma`) |
| Estilo | Tailwind CSS v4 + `brand-tokens.css` compartilhado com o blog |
| i18n | Rotas `/en`, cookie de locale |
| Tema | Cookie cross-subdomain (`.yurimachado.dev.br`) |
| Deploy | Vercel |

## Rotas principais

- `/` home com hero, projetos, sobre, serviços e CTA
- `/projetos`, `/sobre`, `/servicos`, `/contato`
- Prefixo `/en/*` para inglês

## Relação com o blog

| Site | Papel |
| ---- | ----- |
| Portfólio (Next) | Vitrine e contato |
| Blog (Astro) | Devlogs, docs e **changelog do portfólio** em `/posts/portfolio/changelog` |

Tokens de marca e tema são compartilhados; versionamento e stack não.
