# UI layers — naming

Target layout on `development`:

| Piece | Path | Role |
| --- | --- | --- |
| shadcn alias `ui` | `@/components/ui` (`components.json`) | Generated primitives + barrel `index.ts` |
| folder `components/composed` | product widgets + shell/nav | Logo, Navbar, PostCard, forms, … + barrels |

## Rules

1. **`src/components/ui`** — shadcn/Radix primitives only (`pnpm ui:add`). Prefer barrel **`@/components/ui`** (or leaf `@/components/ui/<name>`).
2. **`src/components/composed`** — product UI + shell/nav. Prefer barrel **`@/components/composed`** from `src/app`; motion via `@/components/composed/motion`. Inside `composed`, use relative peers to avoid cycles.
3. **Aliases**
   - Keep `@/components/*` and `@/*`.
   - No `@/ui/*` or `@/raw/*` or phantom `@/hooks` until a real `src/hooks/` exists.

## Why not `raw`

Non-standard for shadcn; fights the official `ui` alias.
