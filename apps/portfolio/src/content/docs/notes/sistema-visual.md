---
title: Sistema visual do projeto
description: Notas sobre tokens, componentes e a direção estética adotada no site.
createdAt: 2024-08-15
updatedAt: 2026-06-06
draft: true
featured: false
---

## Decisões

O sistema visual é construído sobre Tailwind CSS com design tokens definidos via `@theme` no CSS global. Todas as cores, tipografia e espaçamentos vêm de variáveis CSS que o Tailwind consome diretamente.

Os componentes reutilizáveis vivem em `@layer components`, permitindo classes semânticas como `.btn-primary`, `.card`, `.eyebrow` — sem depender de bibliotecas externas.

## Paleta

A paleta usa um fundo escuro quase-preto (`#050404`) com vermelho primário (`#E82828`) e ciano accent (`#1BD19A`). O contraste alto garante legibilidade, e o tom de fundo com gradiente sutil dá profundidade sem distração.

## Tipografia

A fonte principal é Be Vietnam — moderna, legível e com bom tracking para títulos. Monospace usa Fira Code para blocos de código.

## Direção

O foco está em hierarquia clara, cards que funcionam bem em múltiplos contextos e uma identidade visual consistente entre as seções de portfólio, notas e documentação.
