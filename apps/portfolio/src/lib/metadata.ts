import type { Metadata } from "next";

import CONFIG from "./config";
import type { LocaleCode } from "./i18n";
import { localizedPath } from "./locale-path";

const OG_SIZE = { width: 1200, height: 630 } as const;

type OgKey = keyof typeof CONFIG.meta.og;

function absoluteUrl(path: string): string {
  const base = CONFIG.meta.siteUrl.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Build hreflang alternates for a locale-agnostic path (e.g. `/sobre`). */
export function languageAlternates(canonicalPath: string): Metadata["alternates"] {
  const ptPath = localizedPath(canonicalPath, "pt");
  const enPath = localizedPath(canonicalPath, "en");

  return {
    canonical: absoluteUrl(ptPath === "/" ? "/" : ptPath),
    languages: {
      "pt-BR": absoluteUrl(ptPath),
      en: absoluteUrl(enPath),
      "x-default": absoluteUrl(ptPath),
    },
  };
}

export function pageMetadata(
  title: string,
  description: string,
  ogKey: OgKey,
  options?: {
    locale?: LocaleCode;
    path?: string;
  },
): Metadata {
  const image = CONFIG.meta.og[ogKey];
  const fullTitle = `${title}${CONFIG.meta.suffix}`;
  const locale = options?.locale ?? "pt";
  const ogLocale =
    locale === "en" ? CONFIG.meta.localeEn : CONFIG.meta.locale;

  const alternates = options?.path
    ? languageAlternates(options.path)
    : undefined;

  if (options?.path && locale === "en" && alternates) {
    const enPath = localizedPath(options.path, "en");
    return {
      title,
      description,
      alternates: {
        ...alternates,
        canonical: absoluteUrl(enPath),
      },
      openGraph: {
        title: fullTitle,
        description,
        locale: ogLocale,
        images: [
          {
            url: image,
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            alt: fullTitle,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: fullTitle,
        description,
        images: [image],
      },
    };
  }

  return {
    title,
    description,
    alternates,
    openGraph: {
      title: fullTitle,
      description,
      locale: ogLocale,
      images: [
        {
          url: image,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

export function defaultOgImage(ogKey: OgKey = "portfolio") {
  const image = CONFIG.meta.og[ogKey];
  const alt = `Portfólio${CONFIG.meta.suffix}`;

  return {
    openGraph: {
      type: "website" as const,
      locale: CONFIG.meta.locale,
      images: [
        {
          url: image,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      images: [image],
    },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: CONFIG.meta.author,
    url: CONFIG.meta.siteUrl,
    email: CONFIG.meta.social.email,
    jobTitle: "Full-stack developer / Independent consultant",
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Paulo",
      addressCountry: "BR",
    },
    sameAs: [CONFIG.meta.social.github, CONFIG.meta.social.linkedin],
  };
}
