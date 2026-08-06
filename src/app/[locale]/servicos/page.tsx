// app/[locale]/servicos/page.tsx
import type { Metadata } from "next";
import { PageHeader } from "@/ui/PageHeader";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/raw";
import { Link } from "@/i18n/navigation";
import { ServicesList } from "@/ui/ServicesList";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const services = await getTranslations({ locale, namespace: "services" });
  return pageMetadata({
    title: services("title"),
    description: services("description"),
    path: "/servicos",
    locale,
  });
}

export default async function ServicesPage({ params }: PageProps) {
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
      <PageHeader className="pt-12" />
      <ServicesList items={items} />
      <div className="border-t-border mt-10 flex justify-center gap-4 border-t pt-10">
        <Button size="4xl" asChild>
          <Link href="/contato">{copy("cta")}</Link>
        </Button>
      </div>
    </>
  );
}
