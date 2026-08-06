import type { Metadata } from "next";

import { ContactFormSection } from "@/components/composed/ContactFormSection";
import { PageHeader } from "@/components/composed/PageHeader";
import { SITE } from "@/meta";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "contact", { path: "/contato" });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const contact = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-6 lg:min-w-5xl">
      <PageHeader
        title={contact("title")}
        description={contact("description")}
        className="pt-16 text-center md:pt-20"
      />

      <ContactFormSection
        labels={{
          name: contact("form.name"),
          email: contact("form.email"),
          message: contact("form.message"),
          submit: contact("form.submit"),
          success: contact("success"),
          error: contact("error"),
        }}
      />

      <p className="text-muted-foreground text-center text-sm">
        {contact("emailFallback")}{" "}
        <a
          className="text-primary underline-offset-4 hover:underline"
          href={`mailto:${SITE.social.email}`}
        >
          {SITE.social.email}
        </a>
      </p>
    </div>
  );
}
