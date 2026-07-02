# Theme toggle (Astro)

The blog mirrors the portfolio's light/dark scheme using a `.dark` class on `<html>` and the same `localStorage` key (`theme`) as [next-themes](https://github.com/pacocoursey/next-themes) on the portfolio site.

## How it works

1. **Blocking script** (`src/layouts/Head.astro`) runs before paint:
   - Reads `localStorage.getItem("theme")`
   - Falls back to `prefers-color-scheme` when unset
   - Toggles `document.documentElement.classList` with `dark`

2. **CSS tokens** (`src/components/styles/base/tokens.css`):
   - Light semantic colors on `:root` / `@theme`
   - Dark overrides on `.dark` (aligned with portfolio `globals.css`)

3. **Toggle UI** (`src/components/ui/ThemeToggle.astro`):
   - Client script imports helpers from `src/components/shared/handlers/theme.ts`
   - Click calls `toggleTheme()` → updates class + `localStorage`
   - Re-syncs on `astro:page-load` and `astro:after-swap` (View Transitions)

4. **Tailwind** (`src/components/styles/global.css`):
   - `@custom-variant dark (&:is(.dark *));` enables `dark:` utilities

## Shared preference with portfolio

Both sites use the `theme` key with values `light` or `dark`. When hosted on the same origin (or during local dev on different ports, preference is per-origin), switching theme on one site persists for the other after navigation.

## Files

| File | Role |
|------|------|
| `Head.astro` | FOUC-prevention inline script |
| `theme.ts` | `applyTheme`, `setTheme`, `toggleTheme` helpers |
| `ThemeToggle.astro` | Sun/moon button + client wiring |
| `tokens.css` | Light/dark color tokens |
| `reset.css` | Body gradient, orb, grid per theme |
