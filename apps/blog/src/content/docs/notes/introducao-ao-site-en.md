---
title: Introduction to the site
description: Architecture decisions that guide the site — layouts, routing, content collections, and why each choice was made.
pubDate: 2026-06-07
updatedAt: 2026-07-10
draft: false
tags: [devlog, architecture]
---

This post documents the site’s architecture decisions. It is not a tutorial — it is a record of the reasoning behind each structural choice.

## Why Astro

The blog needs to be fast, static, and easy to maintain. Astro delivers that with native SSG, zero JS by default, and first-class content collections with Zod. React islands appear only where there is real interactivity — forms, GSAP animations, controlled components.

## Layouts

Two main layouts, split by intent:

**Base** — editorial pages (home). No sidebar, no TOC. Focused on typographic hierarchy and entrance motion.

**Content** — documentation and notes. Sidebar built dynamically from active collections; TOC extracted from H2/H3 headings in the rendered content. The layout knows which item is active from the current URL.

The split is intentional: it keeps docs complexity from leaking into pages that do not need it.

## Content Collections

Four collections with distinct schemas — `portfolio`, `automation`, `sandbox`, `notes`. Each has its own required and optional fields validated by Zod at build time.

The `portfolio` collection accepts sub-pages via `type: "project" | "changelog" | "doc"`. Changelogs live inside the project folder (`portfolio-hub/changelog.md`) but do not appear in listing queries — only in `/docs/` routing and the consolidated changelog page.

## Routing

Static pages in `src/pages/`. Dynamic content via `src/pages/docs/[...slug].astro`, which maps all collections to `/docs/{collection}/{slug}`.

Each entry’s slug comes from the Astro loader based on the file path — no extra configuration.

## Current state

The ecosystem is split across two sites:

- **Portfolio** (`www.yurimachado.dev.br`) — Next.js: home, projects, about, services, contact, and `/en` routes.
- **Blog** (`blog.yurimachado.dev.br`) — Astro: notes, project docs, automations, changelog, and English home.

Content collections and the `Content` layout (sidebar + TOC) stay on the blog. Brand tokens, the theme cookie, and the locale cookie (`locale`, Domain=`.yurimachado.dev.br`) are shared across subdomains. New sections land when they are ready — this record tracks decisions, not final documentation.
