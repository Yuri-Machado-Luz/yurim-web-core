# semantic-release

Versionamento automático a partir de commits no estilo Angular / [Conventional Commits](https://www.conventionalcommits.org/). O pacote é `private: true` e **não** publica no npm.

| Peça | Caminho |
| --- | --- |
| Config | [`release.config.mjs`](../release.config.mjs) |
| Script | `pnpm release` → `semantic-release` |
| CI | [`.github/workflows/release.yml`](../.github/workflows/release.yml) |

---

## A) Tipos de commit → resultado de release

`@semantic-release/commit-analyzer` está **sem** `releaseRules` e **sem** `preset` customizados. Vale o default do plugin: preset **`angular`** + [`default-release-rules.js`](https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js).

Regras relevantes para este repo (convenção Angular):

| Prefixo / sinal | Bump | Notas |
| --- | --- | --- |
| `feat:` / `feat(escopo):` | **minor** | Nova funcionalidade |
| `fix:` / `fix(escopo):` | **patch** | Correção |
| `perf:` / `perf(escopo):` | **patch** | Performance |
| `BREAKING CHANGE:` no rodapé | **major** | Keyword do parser Angular (`noteKeywords: ['BREAKING CHANGE']`) |
| `revert:` (formato detectado pelo parser) | **patch** | Só se o corpo casar com o `revertPattern` do preset |
| `docs:`, `chore:`, `refactor:`, `style:`, `test:`, `ci:`, `build:` | **sem release** | Não entram nas default rules |
| Mensagem fora do padrão Angular | **sem release** | Analyzer não associa tipo de release |

### Atenção: `tipo!:` (bang) **não** gera major neste projeto

O preset Angular usa `headerPattern` **sem** suporte a `!`:

```text
/^(\w*)(?:\((.*)\))?: (.*)$/
```

Exemplos: `feat!: …` e `feat(api)!: …` **não** casam o header → não disparam release via bang. Para major, use rodapé:

```text
feat: remove suporte ao tema light

BREAKING CHANGE: clients devem migrar para o tema único.
```

### Exemplos

```text
feat: add blog catch-all route           → minor (em development: x.y.z-alpha.N)
fix: type metadata exports as Metadata  → patch
perf: cache post listing                  → patch
chore: bump eslint                        → sem release
docs: update README                       → sem release
feat!: drop light theme                   → sem release (bang ignorado pelo parser Angular)
```

Em `development` (`prerelease: "alpha"`), o mesmo bump vira prerelease (ex.: `5.2.0-alpha.1`), não versão estável. Em `main`, o bump é estável (`5.2.0`, etc.).

Não há commitlint, husky, lefthook nem commitizen — Conventional Commits **não é enforced** localmente.

---

## B) Configurações → o que fazem

### `release.config.mjs`

| Peça | Valor / papel |
| --- | --- |
| `repositoryUrl` | `https://github.com/Yuri-Machado-Luz/yurim-web-core` |
| `tagFormat` | `v${version}` → tags `v5.1.0`, `v5.1.1-alpha.1`, … |
| `branches` | `main` = release estável; `development` com `prerelease: "alpha"` |
| Plugins | Ordem abaixo |

| Plugin | Função neste projeto |
| --- | --- |
| `@semantic-release/commit-analyzer` | Decide se há release e o bump (major/minor/patch) |
| `@semantic-release/release-notes-generator` | Gera notas da release (preset Angular) |
| `@semantic-release/changelog` | Escreve/atualiza `CHANGELOG.md` na raiz |
| `@semantic-release/npm` | `npmPublish: false` — atualiza `version` em `package.json`, **sem** publish |
| `@semantic-release/github` | Cria GitHub Release + notas |
| `@semantic-release/git` | Commita `CHANGELOG.md` + `package.json` com `chore(release): ${nextRelease.version} [skip ci]` |

`[skip ci]` no commit de release evita loop do workflow de release.

### `package.json`

| Campo / script | Papel |
| --- | --- |
| `"private": true` | Pacote não destinado ao registry público |
| `"version"` | Atualizado pelo plugin npm na release |
| `"release": "semantic-release"` | Entrada local/CI |
| DevDeps `@semantic-release/*` + `semantic-release` | Stack alinhada a `release.config.mjs` |

### Variáveis de ambiente

| Variável | Neste setup | Uso |
| --- | --- | --- |
| `GITHUB_TOKEN` | Sim — `secrets.GITHUB_TOKEN` no Actions | Auth de `@semantic-release/github` e push de `@semantic-release/git` |
| `GH_TOKEN` / PAT | Não no workflow atual | Tentativa intermediária; descartada após liberar o ruleset |
| `NPM_TOKEN` | Não | Publish desligado |

Permissões do job Release: `contents: write`, `issues: write`, `pull-requests: write`.

### CI / CD

| Workflow | Trigger | Papel |
| --- | --- | --- |
| `.github/workflows/release.yml` | `push` em `main` e `development` | `fetch-depth: 0` → `pnpm install` → `pnpm exec semantic-release` |
| `.github/workflows/ci.yml` | push/PR nas mesmas branches | Lint, format, typecheck, test, build — **separado** do release |
| `.github/dependabot.yml` | npm semanal / Actions mensal | PRs de deps; commits `chore(deps):` **não** bumpam versão |

Release e CI **não** estão encadeados (`needs:`). Concurrency do release: `cancel-in-progress: false`.

Workflows usam `pnpm/action-setup` sem pin de versão; a versão vem de `packageManager` (`pnpm@11.18.0`).

### Local

```bash
pnpm release
```

Requer histórico git completo (tags + commits desde a última release) e token GitHub com permissão de contents para criar release/push. Em CI: `fetch-depth: 0` + `GITHUB_TOKEN`.

---

## C) Dois changelogs

| Arquivo | Quem escreve | Público |
| --- | --- | --- |
| [`CHANGELOG.md`](../CHANGELOG.md) (raiz) | **semantic-release** (plugin changelog) | Máquina: Angular, SHAs, compare links |
| [`content/planejamento/changelog.md`](../content/planejamento/changelog.md) | Humano | Site/blog em `/blog/changelog` — voz híbrida |

**Política da raiz:** não inventar seções manuais que o bot sobrescreve. Editar `CHANGELOG.md` só se o bot falhar; após cada release estável, a fonte da verdade é o output do plugin. Narrativa de produto fica no post editorial.

---

## D) Gaps 2026-08

| Gap | Detalhe |
| --- | --- |
| Tag `v5.0.0` manual | Cutover unificado marcado à mão; a partir de `v5.1.0` o canal estável volta a ser o bot |
| `v5.1.0` estável | Publicado com sucesso; `CHANGELOG.md` na raiz começa neste bloco |
| Chores pós-5.1.0 | Só `ci`/`chore` → Release “no relevant changes” (esperado) |
| Branch alpha | Antes `development/v5`; agora **`development`** → `x.y.z-alpha.N` |
| Auth Release | PAT/`GH_TOKEN` inválido ou desnecessário após remover **Restrict updates** do ruleset; workflow usa `GITHUB_TOKEN` |
| Como obter **5.1.1** | Exatamente um `fix:` (ex.: drawer mobile) desde `v5.1.0`; `docs:`/`refactor:`/`chore(deps):` não bumpam |

### Veredito

**semantic-release wired** em `main` (estável) e `development` (alpha). Stack: versionar app privado + GitHub Release, sem npm publish. Bang `!` no tipo **não** major — use `BREAKING CHANGE:` no rodapé.
