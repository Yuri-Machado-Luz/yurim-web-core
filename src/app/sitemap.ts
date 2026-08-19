import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import { listPostMeta } from "@/lib/content";
import { SITE } from "@/meta";

const STATIC_PATHS = ["/", "/blog", "/projetos", "/sobre", "/contato"] as const;

function localizedUrl(locale: string, path: string) {
  const base = SITE.siteUrl.replace(/\/$/, "");
  if (locale === routing.defaultLocale) {
    return `${base}${path === "/" ? "" : path}` || base;
  }
  return `${base}/${locale}${path === "/" ? "" : path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = listPostMeta();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: localizedUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: path === "/blog" ? "weekly" : "monthly",
        priority: path === "/" ? 1 : 0.7,
      });
    }

    for (const post of posts) {
      entries.push({
        url: localizedUrl(locale, post.href),
        lastModified: post.updatedAt
          ? new Date(post.updatedAt)
          : post.pubDate
            ? new Date(post.pubDate)
            : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
