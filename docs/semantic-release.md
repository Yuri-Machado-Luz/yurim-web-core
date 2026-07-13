# semantic-release

Versionamento automático a partir de [Conventional Commits](https://www.conventionalcommits.org/). Não publica no npm (`private: true`).

## O que faz

Em push para `main` ou `development/v5`:

1. Analisa commits desde a última release
2. Calcula a próxima versão semver
3. Atualiza `CHANGELOG.md` + `package.json`
4. Cria GitHub Release + tag
5. Commit `chore(release): … [skip ci]`

## Branches

| Branch           | Canal                                     |
| ---------------- | ----------------------------------------- |
| `main`           | release estável                           |
| `development/v5` | prerelease `alpha` (ex.: `5.1.0-alpha.1`) |

Config: [`release.config.mjs`](../release.config.mjs) · workflow: [`.github/workflows/release.yml`](../.github/workflows/release.yml)

## Commits que disparam bump

| Prefixo                                           | Bump                         |
| ------------------------------------------------- | ---------------------------- |
| `fix:`                                            | patch                        |
| `feat:`                                           | minor                        |
| `feat!:` / `BREAKING CHANGE:`                     | major                        |
| `chore:`, `docs:`, `style:`, `refactor:`, `test:` | sem release (salvo breaking) |

Exemplos:

```
feat: add blog catch-all route
fix: type metadata exports as Metadata
feat!: drop light theme support
```

## Local

```bash
pnpm release
```

Requer histórico git completo e `GITHUB_TOKEN` com permissão de contents (no Actions o token padrão basta, se a branch permitir push do bot).

## CI

Workflow `Release` roda em push nas branches acima, **depois** do histórico completo (`fetch-depth: 0`). O job `CI` (lint/test/build) continua separado.
