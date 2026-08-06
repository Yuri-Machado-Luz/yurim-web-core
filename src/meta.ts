import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { routing } from "@/i18n/routing";

export const SITE = {
  name: "Yuri Machado Luz",
  shortName: "Yuri Machado",
  titleDefault: "Yuri Machado Luz",
  titleTemplate: "%s · Yuri Machado Luz",
  description: "Sistemas web, APIs e automações.",
  locale: "pt-BR",
  localeOg: "pt_BR",
  siteUrl: "https://www.yurimachado.dev.br",
  author: "Yuri Machado Luz",
  jobTitle: "Full-stack developer / Independent consultant",
  social: {
    github: "https://github.com/Yuri-Machado-Luz",
    linkedin: "https://linkedin.com/in/yurimachadoluz",
    email: "yurimachadoluz@gmail.com",
  },
  themeColor: "#050404",
} as const;

export const ASSETS = {
  favicon: {
    href: "/favicon.svg",
    type: "image/svg+xml",
  },
  og: {
    size: {
      width: 1200,
      height: 630,
    },
    images: {
      default: {
        url: "/og/default.svg",
        alt: SITE.titleDefault,
      },
      blog: {
        url: "/og/blog.svg",
        alt: "Blog",
      },
    },
  },
} as const;

export const SITE_ICONS = {
  icon: [{ url: ASSETS.favicon.href, type: ASSETS.favicon.type }],
  shortcut: [ASSETS.favicon.href],
  apple: [{ url: ASSETS.favicon.href, type: ASSETS.favicon.type }],
};

export const SEO_KEYWORDS = [
  "Yuri Machado",
  "full-stack",
  "Next.js",
  "APIs",
  "automações",
  "sistemas web",
  "São Paulo",
] as const;

export const OG_SIZE = ASSETS.og.size;

export function getOgImage(kind: keyof typeof ASSETS.og.images = "default") {
  return ASSETS.og.images[kind];
}

function absoluteUrl(path: string): string {
  const base = SITE.siteUrl.replace(/\/$/, "");
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function rootMetadata(locale?: string): Metadata {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] =
      loc === routing.defaultLocale
        ? absoluteUrl("/")
        : absoluteUrl(`/${loc}`);
  }

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
    keywords: [...SEO_KEYWORDS],
    category: "technology",
    icons: SITE_ICONS,
    alternates: {
      canonical:
        locale && locale !== routing.defaultLocale
          ? absoluteUrl(`/${locale}`)
          : absoluteUrl("/"),
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : SITE.localeOg,
      url: SITE.siteUrl,
      siteName: SITE.name,
      title: SITE.titleDefault,
      description: SITE.description,
      images: [
        {
          url: getOgImage("default").url,
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
      images: [getOgImage("default").url],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  locale?: string;
  og?: "default" | "blog";
}) {
  const image = getOgImage(input.og ?? "default");
  const routePath =
    input.locale && input.locale !== routing.defaultLocale
      ? `/${input.locale}${input.path}`
      : input.path;
  const url = absoluteUrl(routePath);

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] =
      loc === routing.defaultLocale
        ? absoluteUrl(input.path)
        : absoluteUrl(`/${loc}${input.path}`);
  }

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      locale:
        input.locale === "en"
          ? "en_US"
          : SITE.localeOg,
      url,
      siteName: SITE.name,
      title: `${input.title} · ${SITE.shortName}`,
      description: input.description,
      images: [
        {
          url: image.url,
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
      images: [image.url],
    },
  };
}

export type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function createPageMetadata(
  params: Promise<{ locale: string }>,
  namespace: string,
  opts: {
    path: string;
    titleKey?: string;
    descriptionKey?: string;
    og?: "default" | "blog";
  },
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace });
  return pageMetadata({
    title: t(opts.titleKey ?? "title"),
    description: t(opts.descriptionKey ?? "description"),
    path: opts.path,
    locale,
    og: opts.og,
  });
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
