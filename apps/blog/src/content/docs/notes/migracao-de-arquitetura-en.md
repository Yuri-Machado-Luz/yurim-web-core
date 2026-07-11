---
title: Architecture migration
draft: false
description: Reflections on leaving Quartz for a custom system — motivations, technical challenges, and what the process actually involved.
updatedAt: 2026-07-10
tags: [devlog, reflection, architecture]
---

## The landscape

Let’s be clear: this blog could still run fine on Quartz. It was already a V2 of the previous architecture — the one based only on React. The current structure was “perfect” for integrating my Obsidian notes workflow into a cohesive SSR setup.

And yet. I look at that and think: what if I threw it out and built my own system?

Not exactly throwing everything away. But at minimum, rebuilding from scratch. This blog should also work as a technical example — and an example bolted onto someone else’s base with a few YAML tweaks is not exactly “wow.”

So the idea: leave the ready-made base and build a custom architecture. The voice of reason, of course, asked: “Are you sure you want to spend weeks debugging a remark plugin when you could just write?”

Short answer: yes. The justification is simple, and that is what I want to share here — it might help someone else, or, you know. It’s a blog. Reflecting on the journey is part of it.

## Why not stay on Quartz

If your only goal is to write content and have a nice site with zero headache, there is no reason not to use it. In my case the goal is different: knowledge. I want control over every stage of what I ship here. Markdown processing, wikilink resolution, image optimization, URL structure. More than that, I want to show I can build a generator from scratch.

And yes — pure masochism.

## Technical choices

I had not locked it in yet, but: why TypeScript + Vite (and not React, Vue, Svelte, or other popular libraries)?

Before deciding, a question almost made me quit: “If I use a library, isn’t that the same as staying on Quartz?”

It can feel similar. In short, Quartz is the finished car; libraries are buying an engine and wheels and building the rest. You still have freedom, but with a solid base.

I — and here comes the masochism — decided to go further. Instead of a framework, build the pipeline from scratch. Why? Simple: I want to learn for real. File scanning, compilation, all the logic we use daily without understanding the complexity behind it.

So the plan: use Vite only as bundler and dev server, and write the rest by hand.

## What is actually involved (or: the list I did not want to see)

Here is the draft I already have — and if you want something similar, you will probably need it too.

> Split into: flow + designed tools.  
> Fully subject to change. The blog will be updated along the way.

**A build pipeline**: recursive scan of markdown from the CMS, frontmatter extraction, .md → .html.

- Tools: Gray-matter + Remark + Rehype

**Wikilinks**: the annoying part. Logic to turn `[[file-name]]` into a working link, respecting `[[file|text]]` aliases and relative paths. Likely a custom Remark plugin. Will it take long? Yes.

**Routing**: logic so `/section/post` serves `dist/content/section/post/index.html`. Trying not to suffer in advance — it only *looks* simple.

**Other things to think about**:

- Backlinks
- Dev server with hot-reload
- Templates

And that is only the essentials. Not even thinking about image optimization, RSS, sitemap, assets yet. Oh heavens.

## Worth it? (depends on the masochism)

Given that I want to demonstrate command of the build ecosystem, AST parsing, TypeScript, and system architecture — yes.

If you just want to write — and have time left for that — do not follow me down this hole. I already imagine the headache ahead.

## A tip, if you are mid-path

Do what I am doing (glad I did this, honestly): keep a simple blog or CMS running while you build the parallel system. On my previous portfolio I left everything frozen with a dead build online. Do not do that. You keep publishing and avoid the pressure to finish fast.

## And the framework?

I still did not know. I was leaning toward Preact and JSX for templates. I had not decided whether to self-flagellate at that level for the whole pipeline, so maybe Next.js in SSG mode. Updates would come.

Anyway — that was the journey so far. If you are in the same doubt, I hope these reflections help you decide. And if you choose the full-madness path (like me), at least you know the hole you are walking into.

## **Update (June 2026)**

The migration landed on Astro 6. The custom build pipeline stayed on paper — Astro handles Markdown, routing, and bundling more solidly than anything I would build from scratch. Final call: Astro as the base, React islands where needed, Tailwind CSS v4 with native design tokens. The masochism found a reasonable limit.

## **Update (July 2026)**

The Astro portfolio+blog monolith was split: the portfolio moved to Next.js; the blog stays on Astro with content collections. Brand tokens, theme cookie, and favicon stay aligned between `www` and `blog`. The rule still holds: document the decision when it changes — do not pretend the original plan survived intact.
