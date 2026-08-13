import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { ContactFormSection } from "@/components/composed/ContactFormSection";
import { Icon } from "@/components/composed/Icons";
import { PageHeader } from "@/components/composed/PageHeader";
import { SocialLinks } from "@/components/composed/SocialLinks";
import { FadeIn } from "@/components/composed/motion/FadeIn";
import { SITE } from "@/meta";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "contact", {
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
    <div className="flex flex-col gap-10 md:gap-14">
      <FadeIn>
        <PageHeader
          title={contact("title")}
          description={contact("lead")}
          className="pt-16 md:pt-20"
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        <FadeIn className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
              {contact("infoTitle")}
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${SITE.social.email}`}
                  className="surface-glass surface-row card-glow-subtle"
                >
                  <Mail className="text-muted-foreground size-5 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="field-label block">
                      {contact("emailLabel")}
                    </span>
                    <span className="text-foreground block font-medium">
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
                  className="surface-glass surface-row card-glow-subtle"
                >
                  <Icon
                    name="whatsapp"
                    className="text-muted-foreground size-5"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="field-label block">
                      {contact("whatsappLabel")}
                    </span>
                    <span className="text-foreground block font-medium">
                      {SITE.social.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <address className="surface-glass surface-tint card-glow-subtle flex items-center gap-3 p-4 not-italic">
                  <MapPin className="text-muted-foreground size-5 shrink-0" />
                  <span>
                    <span className="field-label block">
                      {contact("locationLabel")}
                    </span>
                    <span className="text-foreground block font-medium">
                      {contact("location")}
                    </span>
                  </span>
                </address>
              </li>
            </ul>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
              {contact("socialTitle")}
            </h2>
            <SocialLinks size="sm" showLabels className="mt-1" />
          </section>
        </FadeIn>

        <FadeIn delay={0.1} className="flex flex-col gap-4">
          <h2 className="font-heading text-foreground text-xl font-semibold md:text-2xl">
            {contact("formTitle")}
          </h2>
          <ContactFormSection
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
      </div>
    </div>
  );
}
