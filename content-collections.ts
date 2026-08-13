import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import rehypeExternalLinks from "rehype-external-links";
import {
  formatSchema,
  statusSchema,
  type Format,
} from "./src/lib/content-schema";

const FORMATS = formatSchema.options;

function parsePath(metaPath: string): { format: Format; slug: string } {
  const normalized = metaPath.replaceAll("\\", "/");
  const [folder, ...rest] = normalized.split("/");
  const slug = rest.join("/") || folder;

  if (!folder || rest.length === 0) {
    throw new Error(
      `Content must live under content/{${FORMATS.join("|")}}/{slug}.md (got: ${metaPath})`,
    );
  }

  const format = formatSchema.parse(folder);
  return { format, slug };
}

const posts = defineCollection({
  name: "posts",
  directory: "content",
  include: "*/*.md",
  schema: z.object({
    draft: z.boolean().default(true),
    title: z.string(),
    description: z.string().optional(),
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
    const { format, slug } = parsePath(post._meta.path);
    const mdx = await compileMDX(context, post, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          { target: "_blank", rel: ["noopener", "noreferrer"] },
        ],
      ],
    });

    return {
      ...post,
      format,
      slug,
      href: `/blog/${slug}`,
      mdx,
    };
  },
});

export default defineConfig({
  content: [posts],
});
