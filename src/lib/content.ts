import { allPosts } from "content-collections";

import type { Format } from "@/i18n/types";

type FullPost = (typeof allPosts)[number];

/** List/card meta — excludes compiled MDX body. */
export type ContentMeta = Omit<FullPost, "mdx" | "content">;

/** Full post including MDX for detail pages. */
export type ContentPost = FullPost;

function toMeta({ mdx: _mdx, content: _content, ...meta }: FullPost): ContentMeta {
  return meta;
}

function publishedPosts(): FullPost[] {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.pubDate ?? "").localeCompare(a.pubDate ?? "");
    });
}

/** Lightweight list API — no MDX payload. */
export function listPostMeta(): ContentMeta[] {
  return publishedPosts().map(toMeta);
}

/** @deprecated Prefer listPostMeta() for lists; kept as alias. */
export function listAllPosts(): ContentMeta[] {
  return listPostMeta();
}

export function listByFormat(format: Format): ContentMeta[] {
  return listPostMeta().filter((post) => post.format === format);
}

export function getPost(slug: string): ContentPost | null {
  return publishedPosts().find((post) => post.slug === slug) ?? null;
}
