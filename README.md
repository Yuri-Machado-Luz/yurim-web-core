# yurim-web-core

Next.js app for [yurimachado.dev.br](https://www.yurimachado.dev.br) — portfólio e blog no mesmo projeto.

## Layout

| Path                 | Role                                            |
| -------------------- | ----------------------------------------------- |
| `src/app/`           | Rotas Next (home + `/blog`) + OG/twitter images |
| `src/components/`    | UI (`ui/`, `forms/`, `layout/`)                 |
| `src/config/`        | Site meta, fonts, tokens, CSS global            |
| `src/assets/`        | Ícones fonte (SVG) + brand logos                |
| `public/sprite.svg`  | Sprite unificado dos ícones                     |
| `public/favicon.svg` | Favicon                                         |
| `public/` · `/og/*`  | OG PNG via route handlers                       |
| `src/lib/`           | Utilitários (`cn`, content, metadata)           |
| `content/posts/`     | Markdown/MDX do blog                            |
| `.github/`           | CI + Dependabot                                 |
| `_local/`            | Arquivo legado (**local only**)                 |
| `_docs/`             | Notas pessoais (**local only**)                 |
| `.cursor/`           | Rules/agents Cursor (**local only**)            |

Single-app na raiz. Não recriar `apps/` / `packages/` / Turbo.

## Install

```bash
pnpm install
```

`pnpm-workspace.yaml` exists only for pnpm 11 build allowlist (`sharp`, `unrs-resolver`) — not a monorepo.

## Docs

Guias versionados em [`docs/`](./docs/README.md) (blog MDX, semantic-release).

## Scripts

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm format
pnpm format:check
pnpm test
pnpm ui:add <component>
pnpm icons:sprite
pnpm release
```

## Env

Keys in `.env.example` (`NEXT_PUBLIC_EMAILJS_*`). Set the same names in Vercel Preview + Production.

## Vercel

| Setting           | Value                        |
| ----------------- | ---------------------------- |
| Root Directory    | `.` (repo root)              |
| Linked project    | `portfolio` (`yunilab-proj`) |
| Production Branch | `main`                       |

## Branches & tags

- **`main`** — freeze line (v4.1.0 lineage).
- **`development/v5`** — Next work (portfolio + blog unificado).

Do **not** delete the legacy remotes:

- `personal--portfolio`
- `personal--blog`
- `personal--docs`

## Local path

Hub checkout: `_Hub/01_Products/web-core`
