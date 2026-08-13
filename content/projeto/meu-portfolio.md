---
title: Portfólio
description: Site editorial em Next.js. Apresentação, projetos, serviços e contato.
format: projeto
draft: false
status: desatualizado
order: 1
github: "https://github.com/Yuri-Machado-Luz/personal--portfolio"
liveLink: "https://www.yurimachado.dev.br"
---

Documentação do **portfólio** em `www.yurimachado.dev.br`. O blog agora vive no mesmo app Next.js: notas, automações e docs de projetos.

## Stack

| Camada    | Tecnologia                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router)                         |
| UI        | React 19 + Shadcn                               |
| Estilo    | Tailwind CSS v4 + tokens de marca               |
| i18n      | Rotas `/en`, cookie de locale                   |
| Deploy    | Vercel                                          |

## Rotas principais

- `/` home com hero, projetos, sobre, serviços e CTA
- `/projetos`, `/sobre`, `/servicos`, `/contato`
- `/blog`, `/blog/{format}/{slug}`, `/blog/tags/{tag}`
- Prefixo `/en/*` para inglês
