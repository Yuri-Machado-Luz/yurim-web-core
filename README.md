# yurim-web-core

Site unificado de [yurimachado.dev.br](https://www.yurimachado.dev.br): portfólio + blog no mesmo Next.js.

Escopo: sistemas web, APIs e automações.

## Stack

- Next.js 16 App Router, React 19, TypeScript
- next-intl (`pt-BR` default, `en`)
- Content Collections (`@content-collections/*`)
- Tailwind CSS v4, shadcn/ui (Radix), Motion
- EmailJS (formulário de contato)
- semantic-release + GitHub Actions
- Deploy na Vercel
- pnpm (`packageManager` no `package.json`)

## Branches

| Branch        | Papel                               |
| ------------- | ----------------------------------- |
| `main`        | Estável — tags `vX.Y.Z`             |
| `development` | Prerelease alpha — `vX.Y.Z-alpha.N` |

Trabalho diário em `development`; fast-forward para `main` quando for soltar estável.

## Estrutura

```text
content/{nota|pensamento|projeto|planejamento}/*.md
content-collections.ts
src/app/[locale]/…
src/components/{ui,composed}/
src/i18n/{contents,navigation,routing,request}.ts
src/styles/
src/meta.ts
src/lib/
public/
.github/workflows/{ci,release}.yml
release.config.mjs
```

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

## Scripts

| Script                              | Uso                                       |
| ----------------------------------- | ----------------------------------------- |
| `pnpm dev`                          | Dev server                                |
| `pnpm build` / `pnpm start`         | Produção                                  |
| `pnpm lint`                         | ESLint                                    |
| `pnpm typecheck`                    | Gera content collections + `tsc --noEmit` |
| `pnpm content:generate`             | Só gera collections                       |
| `pnpm format` / `pnpm format:check` | Prettier                                  |
| `pnpm test`                         | Vitest                                    |
| `pnpm release`                      | semantic-release (local/CI)               |
| `pnpm ui:add`                       | Adiciona componente shadcn                |

## Conteúdo

Formato pela pasta (`nota`, `pensamento`, `projeto`, `planejamento`), não pelo frontmatter. Exemplos:

```text
content/planejamento/dando-um-tempo.md → /blog/dando-um-tempo
content/projeto/meu-portfolio.md       → /blog/meu-portfolio
```

Frontmatter canônico: `title`, `description`, `pubDate`, `draft`, depois opcionais (`updatedAt`, `status`, `order`, `github`, `liveLink`, `featured`, …).

Changelog editorial do site: [`content/planejamento/changelog.md`](content/planejamento/changelog.md) → `/blog/changelog`.

## i18n

- Locales: `pt-BR` (default), `en`
- `localePrefix: as-needed` (URLs em português sem prefixo; inglês em `/en/...`)
- Mensagens em `src/i18n/contents/{locale}/`

## Release

Conventional Commits (preset Angular). Detalhes em [`_docs/semantic-release.md`](_docs/semantic-release.md).

- `feat:` → minor · `fix:` → patch · `BREAKING CHANGE:` no rodapé → major
- `chore:` / `ci:` / `docs:` / `refactor:` → sem bump
- `CHANGELOG.md` na raiz é **gerado pelo bot**; narrativa humana fica no post `/blog/changelog`

## Ambiente

Formulário de contato (EmailJS):

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
```
