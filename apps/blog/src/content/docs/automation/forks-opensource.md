---
title: Explorer Sort
description: Contribuição open-source à extensão VS Code Explorer Sort. Implementei file nesting, drag & drop reordering e suporte pt-BR.
createdAt: 2026-06-08
updatedAt: 2026-06-16
status: ativo
type: project
github: https://github.com/Yuri-Machado-Luz/forks.opensource
featured: false
draft: false
order: 3
tags: [vscode, typescript, open-source, extensao]
---

Contribuição ao projeto [Explorer Sort](https://github.com/Jinchanghyeok/explorer-sort) — extensão VS Code para ordenação de arquivos e pastas por regras e prioridades configuráveis.

## Contribuições

Três features adicionadas ao projeto upstream:

### File Nesting

Agrupamento de arquivos relacionados com padrões glob e suporte a `${capture}`. Permite colapsar arquivos como `Component.tsx`, `Component.test.tsx` e `Component.stories.tsx` em uma entrada única no Explorer, reduzindo ruído visual em projetos com muitos arquivos por componente.

### Drag & Drop Reordering

Reorganização intuitiva por arraste, incluindo o nível raiz do workspace. As prioridades de ordenação são salvas automaticamente em `.vscode/settings.json` — sem precisar editar o JSON manualmente após reorganizar.

### Suporte pt-BR

Internacionalização para português do Brasil adicionada como terceiro idioma ao lado do inglês e coreano. Inclui `package.nls.pt-br.json` com todas as strings da extensão traduzidas.

## Sobre a extensão

Explorer Sort permite ordenação baseada em condições JavaScript (`name === 'app'`, `name.endsWith('.ts')`) com prioridades numéricas e posicionamento relativo via `offset`. Útil para projetos com arquitetura de diretórios rígida, como FSD (Feature-Sliced Design).

```json
{
  "explorerSort.rules": [
    {
      "name": "FSD",
      "pathPattern": "**/src/**",
      "priorities": [
        { "condition": "name === 'app'",      "priority": 1000 },
        { "condition": "name === 'pages'",    "priority": 999  },
        { "condition": "name === 'features'", "priority": 998  },
        { "condition": "name === 'entities'", "priority": 996  },
        { "condition": "name === 'shared'",   "priority": 995  }
      ]
    }
  ]
}
```

## Stack

TypeScript, VS Code Extension API, `micromatch` (glob patterns), `node-ignore` (parsing de `.gitignore`).
