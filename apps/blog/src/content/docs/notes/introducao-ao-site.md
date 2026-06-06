---
title: Introdução ao site
description: Como organizei a base do projeto, os layouts e o sistema visual.
createdAt: 2024-08-01
updatedAt: 2026-05-02
draft: true
featured: false
---

## Objetivo

Este post registra a base do projeto e as decisões de arquitetura que guiam o desenvolvimento do site.

A ideia central é separar páginas simples (sem sidebar) de páginas de conteúdo (com sidebar e TOC), mantendo o layout previsível e reutilizável.

## Estrutura adotada

O site usa Astro com layouts específicos para cada tipo de página. Páginas de portfólio e sobre usam `RootLayout`, enquanto documentação e notas usam layouts com navegação lateral.

## Resultado

A separação de layouts torna o site mais fácil de manter e permite evoluir cada seção de forma independente.
