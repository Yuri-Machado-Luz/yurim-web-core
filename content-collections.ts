import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import rehypeExternalLinks from "rehype-external-links";
import { formatSchema, statusSchema } from "./src/lib/content-schema";

// Configuração === Zod Schema

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "*.md",
  schema: z.object({
    draft: z.boolean().default(true),
    title: z.string(),
    description: z.string().optional(),
    format: formatSchema,
    status: statusSchema,
    featured: z.boolean().default(false),
    order: z.number().optional(),
    github: z.string().optional(),
    pubDate: z.string().optional(),
    updatedAt: z.string().optional(),
    liveLink: z.string().optional(),
    content: z.string(),
  }),
  transform: async (post, context) => {
    const slug = post._meta.path;

    return {
      ...post,
      slug,
      href: `/blog/${slug}`,
      mdx: await compileMDX(context, post, {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypeExternalLinks,
            { target: "_blank", rel: ["noopener", "noreferrer"] },
          ],
        ],
      }),
    };
  },
});

export default defineConfig({
  content: [posts],
});
