# yurimachado.dev.br

Site pessoal — portfólio.

> Este repositório foi separado do blog. Devlogs, documentação e conteúdo em Markdown agora vivem em `01_Sites/blog` (Astro). Aqui fica apenas o site principal — Home, Sobre, Projetos e Contato.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 + shadcn/ui (Radix primitives) |
| Estilo | Tailwind CSS v4 |
| Animações | Framer Motion |
| Formulário | React Hook Form + Zod |
| Deploy | Vercel |

## Estrutura

```text
src/
  app/            # rotas: /, /sobre, /projetos, /contato
  components/
    home/         # seções da landing page
    layout/       # Navbar, Footer, SocialLinks, Section
    ui/           # shadcn/ui + componentes próprios
  lib/
    data/         # experience, education, projects, skills, stats
    config.ts     # metadados, nav, contato
    i18n.ts
  assets/         # ícones, imagens, brand
  types/
```

## Desenvolvimento

```bash
pnpm install
pnpm dev
pnpm build
```

## Versões

- **v4** (atual) — Next.js 16, Tailwind CSS v4, React 19, shadcn/ui. Portfolio separado do blog (que segue em Astro, repositório próprio)
- **v3** — Astro 6, Tailwind CSS v4, React 19 islands (stack compartilhada com o blog antes da separação)
- **v2** — Quartz + Preact
- **v1** — React SPA (CRA)
