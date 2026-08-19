import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { NotFoundView } from "@/components/composed/NotFoundView";
import { getPathname } from "@/i18n/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("shared.notFound");

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("shared.notFound");
  const homeHref = getPathname({ href: "/", locale });

  return (
    <NotFoundView
      code={t("code")}
      title={t("title")}
      description={t("description")}
      backHome={t("backHome")}
      homeHref={homeHref}
      illustrationAlt={t("illustrationAlt")}
    />
  );
}
