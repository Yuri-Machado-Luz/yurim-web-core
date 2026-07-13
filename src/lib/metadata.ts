import type { Metadata } from "next";

import { SITE } from "@/config/site";

const OG_SIZE = {
  width: SITE.og.width,
  height: SITE.og.height,
} as const;

function absoluteUrl(path: string): string {
  const base = SITE.siteUrl.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE.siteUrl),
    title: {
      default: SITE.titleDefault,
      template: SITE.titleTemplate,
    },
    description: SITE.description,
    applicationName: SITE.shortName,
    authors: [{ name: SITE.author, url: SITE.siteUrl }],
    creator: SITE.author,
    publisher: SITE.author,
    keywords: [
      "Yuri Machado",
      "full-stack",
      "Next.js",
      "APIs",
      "automações",
      "sistemas web",
      "São Paulo",
    ],
    category: "technology",
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      shortcut: ["/favicon.svg"],
      apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    alternates: {
      canonical: absoluteUrl("/"),
    },
    openGraph: {
      type: "website",
      locale: SITE.localeOg,
      url: SITE.siteUrl,
      siteName: SITE.name,
      title: SITE.titleDefault,
      description: SITE.description,
      images: [
        {
          url: SITE.og.default,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: SITE.titleDefault,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE.titleDefault,
      description: SITE.description,
      images: [SITE.og.default],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  og?: "default" | "blog";
}): Metadata {
  const ogKey = input.og ?? "default";
  const image = SITE.og[ogKey];
  const url = absoluteUrl(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: SITE.localeOg,
      url,
      siteName: SITE.name,
      title: `${input.title} · ${SITE.shortName}`,
      description: input.description,
      images: [
        {
          url: image,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} · ${SITE.shortName}`,
      description: input.description,
      images: [image],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author,
    url: SITE.siteUrl,
    email: SITE.social.email,
    jobTitle: SITE.jobTitle,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressCountry: "BR",
    },
    sameAs: [SITE.social.github, SITE.social.linkedin],
  };
}
