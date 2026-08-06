import type { Metadata } from "next";

import { ContactFormSection } from "@/components/contact-form-section";
import { PageHeader } from "@/ui/PageHeader";
import { SITE } from "@/meta";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // CORREÇÃO: Passando o locale explicitamente para gerar os metadados em inglês
  const contact = await getTranslations({ locale, namespace: "contact" });

  return pageMetadata({
    title: contact("title"),
    description: contact("description"),
    path: "/contato",
    locale,
  });
}

// CORREÇÃO: Recebendo a tipagem PageProps com os parâmetros da URL
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params; // Aguarda a Promise do parâmetro de rota

  // CORREÇÃO: Injetado { locale, namespace } para buscar o JSON do idioma ativo
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
