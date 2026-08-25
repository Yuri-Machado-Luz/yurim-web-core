import { Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

import {
  ContactFormSection,
  Icon,
  PageHeader,
  SocialLinks,
} from "@/components/composed";
import { FadeIn } from "@/components/composed/motion";
import { createPageMetadata, SITE, type LocalePageProps } from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "contact", {
    og: "contato",
    path: "/contato",
    descriptionKey: "lead",
  });
}

export default async function ContactPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const contact = await getTranslations({ locale, namespace: "contact" });

  const whatsappMessage = encodeURIComponent(contact("whatsappMessage"));
  const whatsappHref = `https://wa.me/${SITE.social.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="flex flex-1 flex-col justify-center gap-4 py-2 md:gap-5 md:py-0 lg:gap-6">
      <FadeIn>
        <PageHeader
          title={contact("title")}
          description={contact("lead")}
          className="gap-1.5 pt-12 md:pt-16 [&_h1]:text-3xl md:[&_h1]:text-4xl [&_p]:text-base"
        />
      </FadeIn>

      <div className="grid flex-1 grid-cols-1 items-stretch gap-5 md:grid-cols-2 md:gap-8 lg:gap-10">
        <FadeIn delay={0.1} className="flex min-h-0 flex-col gap-2.5">
          <ContactFormSection
            compact
            labels={{
              name: contact("form.name"),
              email: contact("form.email"),
              message: contact("form.message"),
              submit: contact("form.submit"),
              success: contact("success"),
              error: contact("error"),
              namePlaceholder: contact("form.namePlaceholder"),
              emailPlaceholder: contact("form.emailPlaceholder"),
              messagePlaceholder: contact("form.messagePlaceholder"),
            }}
          />
        </FadeIn>
        <FadeIn className="flex flex-col gap-4 md:gap-5">
          <section className="flex flex-col gap-2.5">
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${SITE.social.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-glass surface-row card-glow-subtle p-3!"
                >
                  <Mail className="text-muted-foreground size-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="field-label block text-xs">
                      {contact("emailLabel")}
                    </span>
                    <span className="text-foreground block text-sm font-medium">
                      {SITE.social.email}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-glass surface-row card-glow-subtle p-3!"
                >
                  <Icon
                    name="whatsapp"
                    className="text-muted-foreground size-4"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="field-label block text-xs">
                      {contact("whatsappLabel")}
                    </span>
                    <span className="text-foreground block text-sm font-medium">
                      {SITE.social.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <address className="surface-glass surface-tint card-glow-subtle flex items-center gap-3 p-3! not-italic">
                  <MapPin className="text-muted-foreground size-4 shrink-0" />
                  <span>
                    <span className="field-label block text-xs">
                      {contact("locationLabel")}
                    </span>
                    <span className="text-foreground block text-sm font-medium">
                      {contact("location")}
                    </span>
                  </span>
                </address>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-2">
            <SocialLinks size="sm" showLabels className="mt-0.5" />
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
