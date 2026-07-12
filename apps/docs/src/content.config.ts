import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const portfolio = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/docs/portfolio",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    type: z.enum(["project", "changelog", "doc"]).default("project"),
    status: z.enum(["ativo", "dev", "arquivado", "beta"]).default("dev"),
    featured: z.boolean().default(false),
    order: z.number().optional(),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    documentation: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const sandbox = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/docs/sandbox",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    status: z.enum(["ativo", "dev", "arquivado", "beta"]).default("beta"),
    order: z.number().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const automation = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/docs/automation",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    status: z.enum(["ativo", "dev", "arquivado", "beta"]).default("beta"),
    order: z.number().optional(),
    github: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { notes, portfolio, sandbox, automation };
