import { allPosts } from "content-collections";

import type { Format } from "@/i18n/types";

export type ContentMeta = (typeof allPosts)[number];

export function listAllPosts(): ContentMeta[] {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return (b.pubDate ?? "").localeCompare(a.pubDate ?? "");
    });
}

export function listByFormat(format: Format): ContentMeta[] {
  return listAllPosts().filter((post) => post.format === format);
}

export function getPost(slug: string): ContentMeta | null {
  return listAllPosts().find((post) => post.slug === slug) ?? null;
}
