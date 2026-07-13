import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const CONTENT_ROOT = path.join(process.cwd(), "content", "posts");

export const CONTENT_COLLECTIONS = [
  "notes",
  "portfolio",
  "sandbox",
  "automation",
] as const;

export type ContentCollection = (typeof CONTENT_COLLECTIONS)[number];

export type ContentMeta = {
  slug: string;
  collection: ContentCollection;
  title: string;
  description?: string;
  draft?: boolean;
  pubDate?: string;
  tags?: string[];
  extension: "md" | "mdx";
  href: string;
  [key: string]: unknown;
};

function isCollection(value: string): value is ContentCollection {
  return (CONTENT_COLLECTIONS as readonly string[]).includes(value);
}

function readPostFile(
  collection: ContentCollection,
  file: string,
): ContentMeta | null {
  if (!/\.(md|mdx)$/.test(file) || file.startsWith("_")) return null;

  const raw = fs.readFileSync(
    path.join(CONTENT_ROOT, collection, file),
    "utf8",
  );
  const { data } = matter(raw);
  const extension = file.endsWith(".mdx") ? "mdx" : "md";
  const slug = file.replace(/\.(md|mdx)$/, "");

  return {
    ...data,
    slug,
    collection,
    title: String(data.title ?? slug),
    description: data.description ? String(data.description) : undefined,
    draft: Boolean(data.draft),
    pubDate: data.pubDate ? String(data.pubDate) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    extension,
    href: `/blog/${collection}/${slug}`,
  };
}

export function listCollection(collection: ContentCollection): ContentMeta[] {
  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .map((file) => readPostFile(collection, file))
    .filter((post): post is ContentMeta => Boolean(post) && !post!.draft)
    .sort((a, b) =>
      String(b.pubDate ?? "").localeCompare(String(a.pubDate ?? "")),
    );
}

export function listAllPosts(): ContentMeta[] {
  return CONTENT_COLLECTIONS.flatMap((collection) =>
    listCollection(collection),
  );
}

export function getPost(collection: string, slug: string): ContentMeta | null {
  if (!isCollection(collection)) return null;

  const dir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(dir)) return null;

  for (const extension of ["mdx", "md"] as const) {
    const file = `${slug}.${extension}`;
    if (!fs.existsSync(path.join(dir, file))) continue;
    const post = readPostFile(collection, file);
    if (post && !post.draft) return post;
  }

  return null;
}

/** Relative import path used by `@next/mdx` dynamic import. */
export function postImportPath(post: ContentMeta): string {
  return `content/posts/${post.collection}/${post.slug}.${post.extension}`;
}
