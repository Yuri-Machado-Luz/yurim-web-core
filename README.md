# yurim-web-core

Site público de [yurimachado.dev.br](https://www.yurimachado.dev.br): portfólio, projetos, serviços, contato e registros técnicos.

Escopo: sistemas web, APIs e automações.

## Stack

- Next.js App Router, React 19, TypeScript
- Tailwind CSS v4, shadcn/ui, Typography
- Content Collections (`@content-collections/*`)
- Deploy na Vercel

## Estrutura

```text
content/          # posts flat: *.md
content-collections.ts
src/
  app/
  components/
  config/
  lib/
  styles/
public/
  og/
```

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm test
```

## Conteúdo

Posts em `content/{formato}/{slug}.md`. O **formato** vem da pasta (`nota`, `pensamento`, `projeto`, `planejamento`), não do frontmatter. Exemplo:

```text
content/planejamento/dando-um-tempo.md → format: planejamento, /blog/dando-um-tempo
content/projeto/meu-portfolio.md       → format: projeto,       /blog/meu-portfolio
```

Frontmatter canônico: `title`, `description`, `pubDate`, `draft`, depois opcionais (`updatedAt`, `status`, `order`, `github`, `liveLink`, `featured`, …).

## Ambiente

Formulário de contato (EmailJS):

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```
