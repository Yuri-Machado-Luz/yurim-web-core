# yurim-web-core

Monorepo for [yurimachado.dev.br](https://www.yurimachado.dev.br) (www) and [blog.yurimachado.dev.br](https://blog.yurimachado.dev.br).

## Layout

| Path | Role |
|------|------|
| `apps/portfolio` | Portfolio site (www) |
| `apps/blog` | Blog site |
| `apps/docs` | Archived docs site |

## Branches & tags

- **`main`** — freeze line (v4.1.0 lineage content imported from the legacy repos).
- **`development/v5`** — Next monorepo work (created in a later phase).
- Tag **`v5.0.0-alpha.0`** lands on `development/v5` when that branch exists.

Do **not** delete the legacy remotes:

- `personal--portfolio`
- `personal--blog`
- `personal--docs`

Freeze companions were tagged **`v4.1.0`** on those remotes.

## Vercel

Two projects:

| Project | Root Directory | Production Branch |
|---------|----------------|-------------------|
| Portfolio | `apps/portfolio` | `main` |
| Blog | `apps/blog` | `main` |

## Local path

Hub checkout: `_Hub/01_Sites/web-core`

## Run locally

```bash
pnpm --dir apps/portfolio install
pnpm --dir apps/portfolio dev
```

```bash
pnpm --dir apps/blog install
pnpm --dir apps/blog dev
```

Or from the repo root:

```bash
pnpm run dev:portfolio
pnpm run dev:blog
```
