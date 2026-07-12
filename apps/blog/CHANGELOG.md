# Changelog

**Linhagem:** v1 CRA → v2 Quartz → v3 Astro unificado → v4 cisão (portfolio Next + blog Astro standalone). A partir da v4, tags vivem em cada repo, com major alinhado à geração pós-cisão.

## v4.1.0: 2026-07-12

Freeze estável do blog Astro standalone. Companion: `personal--portfolio@v4.1.0`.

### Adicionado

- Alternância entre tema claro e escuro
- Imagem `og:image` dedicada
- Script `sync:tokens:check` (parity com o portfólio)
- TL;DR nas notas de migração de arquitetura (pt/en)

### Alterado

- Navbar redesenhada com drawer lateral
- Footer: links sociais extraídos em componente
- Headline da home: “Registros técnicos” / “Devlogs & notes”
- Fundo da página usa tokens de marca (sem `#0a0707` hardcoded)
- Tokens sincronizados com o portfólio (`container-x`, z-index, motion)
- Notas de intro e sistema visual atualizadas (Base layout, paths do vault)
- Currículo YAML alinhado ao portfólio

### Removido

- Componentes e dados legados da home (pré–posts-only)

## v4.0.0: 2026-06

Marco da cisão: blog deixa de carregar o portfólio e passa a ser site só de posts em `blog.yurimachado.dev.br`.

### Adicionado

- Deploy e domínio dedicados do blog
- Content collections (`notes`, `portfolio`, `automation`, `sandbox`) como núcleo do site

### Removido

- Rotas e UI de portfólio acopladas ao monólito Astro

## Ancestral (compartilhado com o portfólio)

### v3.0: 2026-06-15

Site unificado Astro 6 (portfólio + docs no mesmo deploy). Tag de referência no monólito: `v3.1.0` (repo portfolio).

### v2.0: 2024

Quartz / digital garden. Tag de arquivo: `archive-v2-quartz`.

### v1.0: 2022

SPA React (CRA) — origem do ecossistema. Tag de arquivo: `archive-v1-react`.
