import type { Metadata } from "next";
import { PageHeader } from "@/components/composed/PageHeader";
import { ServicesList } from "@/components/composed/ServicesList";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
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
      <div className="border-t-border mt-10 flex justify-center gap-4 border-t pt-10">
        <Button size="4xl" asChild>
          <Link href="/contato">{copy("cta")}</Link>
        </Button>
      </div>
    </>
  );
}
