---
title: Sistema visual do projeto
description: Tokens CSS com Tailwind v4, paleta de cores, tipografia e componentes semânticos adotados no site.
pubDate: 2026-06-07
updatedAt: 2026-06-19
draft: false
tags: [devlog, design]
---

Documentação do sistema visual — como tokens, tipografia e componentes foram organizados para manter coerência visual sem acoplamento com frameworks externos.

## Tokens via Tailwind v4

O Tailwind v4 abandona o arquivo `tailwind.config.js` em favor de `@theme` no CSS. Os tokens são variáveis CSS nativas — não há processo de resolução em JavaScript.

```css
@theme {
  --color-bg:      #050404;
  --color-surface: #0e0d0d;
  --color-primary: #E82828;
  --color-accent:  #1BD19A;
  --color-muted:   #9ca3af;

  --font-sans: 'Be Vietnam', sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

Com isso, `text-primary`, `bg-accent`, `font-mono` funcionam como utilitárias nativas sem plugins adicionais. As variáveis também ficam disponíveis em qualquer CSS via `var(--color-primary)`.

## Paleta

| Token | Valor | Papel |
| --- | --- | --- |
| `--color-bg` | `#050404` | Fundo principal |
| `--color-surface` | `#0e0d0d` | Cards, painéis, inputs |
| `--color-primary` | `#E82828` | Destaque, CTAs, links ativos |
| `--color-accent` | `#1BD19A` | Accent secundário, badges |
| `--color-muted` | `#9ca3af` | Texto secundário, legendas |

O fundo usa `#050404` em vez de preto puro (`#000000`). A diferença é pequena visualmente mas o quasi-preto permite gradientes sutis e reduz fadiga em telas com brilho alto.

## Tipografia

**Be Vietnam Pro** — fonte principal. Boa legibilidade em tamanhos pequenos, tracking adequado para headings em uppercase. Sem serif, sem peso excessivo.

**Fira Code** — monospace para blocos de código. Suporta ligaduras (desativadas por padrão no site para consistência com output de terminais).

A escala tipográfica usa variáveis CSS em vez de classes do Tailwind (`--font-size-sm`, `--font-size-base`, `--font-size-lg`), o que permite ajustes granulares sem recompilar utilitárias.

## Componentes semânticos

Definidos em `@layer components` — classes com significado semântico em vez de acúmulo de utilitárias inline:

```css
@layer components {
  .btn-primary { ... }
  .btn-outline { ... }
  .card { ... }
  .eyebrow { ... }        /* label pequena acima de títulos */
  .section-title { ... }  /* H2 de seção */
  .page-title { ... }     /* H1 de página */
  .page-lead { ... }      /* subtítulo de página */
}
```

O benefício não é só reutilização — é que alterações de design são feitas em um lugar só, não espalhadas por todos os templates.
