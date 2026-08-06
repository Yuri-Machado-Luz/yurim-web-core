# semantic-release

Versionamento automático a partir de [Conventional Commits](https://www.conventionalcommits.org/). O pacote é `private: true` e **não** publica no npm.

Config: [`release.config.mjs`](../release.config.mjs) · script: `pnpm release` · CI: [`.github/workflows/release.yml`](../.github/workflows/release.yml)

---

## A) Tipos de commit → resultado de release

`@semantic-release/commit-analyzer` está **sem** `releaseRules` nem `preset` customizados. Vale o default do plugin (regras Angular / Conventional Commits relevantes abaixo).

| Prefixo / sinal | Bump | Notas |
| --- | --- | --- |
| `feat:` | **minor** | Nova funcionalidade |
| `fix:` | **patch** | Correção |
| `perf:` | **patch** | Melhoria de performance |
| `feat!:` / `fix!:` / qualquer `tipo!:` | **major** | `!` no tipo = breaking |
| `BREAKING CHANGE:` no rodapé do commit | **major** | Independente do tipo |
| `revert:` (commits de revert detectados) | **patch** | Default do analyzer |
| `docs:`, `chore:`, `refactor:`, `style:`, `test:`, `ci:`, `build:` | **sem release** | Só geram bump se forem breaking (`!` ou `BREAKING CHANGE:`) |

Exemplos:

```text
feat: add blog catch-all route          → minor (ou x.y.z-alpha.N em development/v5)
fix: type metadata exports as Metadata → patch
perf: cache post listing                 → patch
feat!: drop light theme support          → major
chore: bump eslint                       → sem release
docs: update README                      → sem release
```

Em `development/v5`, o mesmo bump vira prerelease `alpha` (ex.: `5.1.0-alpha.1`), não versão estável.

Não há commitlint, husky, lefthook nem commitizen neste repo — o formato Conventional Commits **não é enforced** localmente; commits fora do padrão tendem a não disparar release.

---

## B) Configurações → o que fazem

### `release.config.mjs`

| Peça | Valor / papel |
| --- | --- |
| `repositoryUrl` | `https://github.com/Yuri-Machado-Luz/yurim-web-core` |
| `tagFormat` | `v${version}` → tags como `v5.0.0-alpha.0` |
| `branches` | `main` = release estável; `development/v5` com `prerelease: "alpha"` |
| Plugins (ordem) | Ver tabela abaixo |

| Plugin | Função neste projeto |
| --- | --- |
| `@semantic-release/commit-analyzer` | Decide se há release e o tipo de bump |
| `@semantic-release/release-notes-generator` | Gera notas da release |
| `@semantic-release/changelog` | Escreve/atualiza `CHANGELOG.md` |
| `@semantic-release/npm` | `npmPublish: false` — só atualiza `version` em `package.json`, **sem** publish |
| `@semantic-release/github` | Cria GitHub Release + anexa notas |
| `@semantic-release/git` | Commita `CHANGELOG.md` + `package.json` com mensagem `chore(release): ${version} [skip ci]` |

`[skip ci]` no commit de release evita loop do workflow de release.

### `package.json`

| Campo / script | Papel |
| --- | --- |
| `"private": true` | Pacote não destinado ao registry público |
| `"version"` | Atualizado pelo plugin npm na release (hoje: `5.0.0-alpha.0`) |
| `"release": "semantic-release"` | Entrada local/CI (`pnpm release` ou `pnpm exec semantic-release`) |
| DevDeps `@semantic-release/*` + `semantic-release` | Stack instalada e referenciada em `release.config.mjs` |

### Variáveis de ambiente

| Variável | Obrigatória? | Uso |
| --- | --- | --- |
| `GITHUB_TOKEN` | Sim (no Actions) | Auth do `@semantic-release/github` e push do `@semantic-release/git`. No workflow usa `secrets.GITHUB_TOKEN` |
| `GH_TOKEN` | Não neste setup | Alternativa comum do semantic-release; **não** é a usada no workflow atual |
| `NPM_TOKEN` | Não | Publish desligado (`npmPublish: false`) |

Permissões do job Release: `contents: write`, `issues: write`, `pull-requests: write`.

### CI / CD

| Workflow | Trigger | Papel |
| --- | --- | --- |
| `.github/workflows/release.yml` | `push` em `main` e `development/v5` | Checkout com `fetch-depth: 0` → `pnpm install` → `pnpm exec semantic-release` |
| `.github/workflows/ci.yml` | push/PR nas mesmas branches | Lint, format, typecheck, test, build — **separado** do release |
| `.github/dependabot.yml` | semanal npm / mensal Actions | PRs de dependências; não dispara release sozinho |

Release e CI não estão encadeados (não há `needs:` entre eles). Concurrency do release: `cancel-in-progress: false`.

### Local

```bash
pnpm release
```

Requer histórico git completo (tags + commits desde a última release) e token GitHub com permissão de contents se for criar release/push de verdade. Em CI, `fetch-depth: 0` + `GITHUB_TOKEN` cobrem isso.

---

## C) Estado atual

| Item | Estado |
| --- | --- |
| Wiring | **Sim** — `release.config.mjs`, deps, script `release` e workflow `Release` presentes e alinhados |
| Última tag local | `v5.0.0-alpha.0` (também no remote); HEAD tipicamente 1 commit depois (`git describe` ≈ `v5.0.0-alpha.0-1-g…`) |
| Versão em `package.json` | `5.0.0-alpha.0` |
| Outras tags locais | `v4.1.0` (só local; **não** está no remote), `v1.0.0-alpha.1` (local + remote) |
| Branch ativa típica | `development/v5` (canal alpha) |
| `CHANGELOG.md` na raiz | **Ausente** — será criado na próxima release que gerar notas |
| Commitlint / husky / lefthook | **Ausentes** — sem gate de mensagem de commit |
| Docs anteriores | `docs/semantic-release.md`, `docs/README.md` e `.github/README.md` existiam no scaffold `d5fc1e2` e foram removidos no working tree da refatoração; este arquivo restaura o guia de releases |

### Lacunas / riscos (refatoração em curso)

- Working tree com muitas mudanças uncommitted (app i18n, content flat, remoção de `docs/` etc.) — o automation de release está wired, mas o produto em si está mid-refactor.
- `CHANGELOG.md` ainda não existe na raiz (só conteúdo editorial em `content/changelog.md`, fora do pipeline semantic-release).
- Workflow fixa pnpm `11.12.0` enquanto `packageManager` em `package.json` é `pnpm@11.18.0` — possível atrito de lockfile/CI.
- Sem enforcement de Conventional Commits: `chore`/`docs` etc. não liberam versão; commits mal formatados também não.
- Tag `v4.1.0` local sem correspondente no origin — histórico legado, não o canal v5 atual.
- Restauro de `.github/README.md` / índice `docs/README.md` **fora do escopo** deste documento (eram índices genéricos do scaffold, não parte do runtime de release).

### Veredito

**semantic-release está configurado e executável via CI e `pnpm release`.** Canal atual de trabalho: prerelease **alpha** em `development/v5`, última versão conhecida **`v5.0.0-alpha.0`**. Falta o artefato `CHANGELOG.md` (ainda não gerado nesta linha) e não há lint de commits; o restante da stack de release está coerente com “versionar o app privado + GitHub Release, sem npm publish”.
`)