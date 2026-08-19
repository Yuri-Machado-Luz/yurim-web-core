import type { Metadata } from "next";
import { PageHeader } from "@/components/composed/PageHeader";
import { ServicesList } from "@/components/composed/ServicesList";
import { createPageMetadata, type LocalePageProps } from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "services", { path: "/servicos" });
}

export default async function ServicesPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const copy = await getTranslations({ locale, namespace: "services" });
  const items = copy.raw("items") as Array<{
    slug: string;
    title: string;
    body: string;
    specs: string[];
  }>;

  return (
    <>
      <PageHeader
        title={copy("title")}
        description={copy("description")}
        className="pt-12"
      />
      <ServicesList
        items={items}
        specsHeading={copy("specsHeading")}
        ctaLabel={copy("cta")}
      />
    </>
  );
}
