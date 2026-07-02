# blog.yurimachado.dev.br

Site pessoal — portfólio, devlogs e documentação de projetos.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Astro 6 (SSG) |
| UI | Astro Components + React 19 islands |
| Estilo | Tailwind CSS v4 + tokens via `@theme` |
| Animações | GSAP 3 + ScrollTrigger |
| Conteúdo | Markdown + Content Collections (Zod) |
| Deploy | Vercel (`@astrojs/vercel`) |

## Estrutura

```text
src/
  components/
    home/         # seções da landing page
    shared/       # handlers, utils, types
    styles/       # tokens, prose, utilitários
    ui/           # componentes reutilizáveis
  content/
    docs/
      portfolio/  # projetos principais (type: project | changelog | doc)
      automation/ # ferramentas e contribuições open-source
      notes/      # devlogs e registros técnicos
      sandbox/    # experimentos
  i18n/           # strings em pt-BR
  layouts/        # Base, Content (docs com sidebar + TOC)
  pages/          # rotas estáticas + [slug] dinâmico
```

## Desenvolvimento

```bash
pnpm install
pnpm dev   # http://localhost:5000
pnpm build
```

Em dev, links para o portfólio (navbar, logo, redirects) apontam para `http://localhost:3000` (override via `PUBLIC_PORTFOLIO_URL` em `.env.development`). Produção: `https://www.yurimachado.dev.br`.

## Versões

- **v3** (atual) — Astro 6, Tailwind CSS v4, React 19 islands
- **v2** — Quartz + Preact
- **v1** — React SPA (CRA)
