# Blog + MDX

Rota dinâmica alinhada ao guia oficial: [Using dynamic imports](https://nextjs.org/docs/app/guides/mdx#using-dynamic-imports).

## Layout de conteúdo

```
content/posts/
  notes/*.md(x)
  portfolio/*.md(x)
  automation/*.md(x)
  sandbox/*.md(x)
```

URL pública:

```
/blog/{collection}/{slug}
```

Exemplos:

- `content/posts/notes/introducao-ao-site.md` → `/blog/notes/introducao-ao-site`
- `content/posts/portfolio/changelog.md` → `/blog/portfolio/changelog`

Arquivos que começam com `_` (ex.: `_placeholder.md`) são ignorados.

## Frontmatter

YAML no topo do arquivo (lido por `gray-matter` no índice e por `remark-frontmatter` + `remark-mdx-frontmatter` no compile MDX):

```md
---
title: Título
description: Resumo curto
pubDate: 2026-06-07
draft: false
tags: [devlog]
---

Corpo do post em Markdown/MDX…
```

`draft: true` remove o post de listagens e de `generateStaticParams`.

## Rota App Router

| Arquivo                           | Papel                                           |
| --------------------------------- | ----------------------------------------------- |
| `src/app/blog/page.tsx`           | Índice                                          |
| `src/app/blog/[...slug]/page.tsx` | Post (`generateStaticParams` + import dinâmico) |

Padrão do post page:

```ts
const { default: Post } = await import(
  `../../../../content/posts/${collection}/${slug}.${extension}`
);
return <Post />;
```

`dynamicParams = false` → slug fora do set estático responde 404.

## Config relacionada

- `next.config.ts` — `@next/mdx` com `extension: /\.(md\|mdx)$/` e remark plugins (strings para Turbopack)
- `mdx-components.tsx` — tipografia base dos elementos MDX
- `src/types/mdx.d.ts` — tipagem de módulos `*.md` / `*.mdx`
- `src/lib/content.ts` — listagem / lookup / href

## Novo post (checklist)

1. Criar `content/posts/{collection}/{slug}.md` (ou `.mdx`)
2. Preencher frontmatter (`title`, `description`, `draft: false`)
3. `pnpm build` (gera params estáticos)
4. Abrir `/blog/{collection}/{slug}`
