import type { Metadata } from "next";

import CONFIG from "./config";

const OG_SIZE = { width: 1200, height: 630 } as const;

type OgKey = keyof typeof CONFIG.meta.og;

export function pageMetadata(
  title: string,
  description: string,
  ogKey: OgKey,
): Metadata {
  const image = CONFIG.meta.og[ogKey];
  const fullTitle = `${title}${CONFIG.meta.suffix}`;

  return {
    title,
    description,
    openGraph: {
      title: fullTitle,
      description,
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
