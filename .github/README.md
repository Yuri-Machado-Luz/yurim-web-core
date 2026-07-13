# GitHub repository config

| Path               | Role                                 |
| ------------------ | ------------------------------------ |
| `workflows/ci.yml` | Lint + build on push/PR              |
| `dependabot.yml`   | Weekly npm + monthly Actions updates |

Vercel deploys remain the source of truth for production env vars. Local secrets live in `.env.local` (gitignored), typically via `pnpm dlx vercel env pull`.
