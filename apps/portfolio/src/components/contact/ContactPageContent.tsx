"use client";

import Link from "next/link";

import { ICON } from "@/assets";
import { ContactForm, Icon, Section, SocialLinks } from "@/components";
import { useMessages } from "@/components/locale-provider";
import CONFIG from "@/lib/config";

export function ContactPageContent() {
  const messages = useMessages();
  const { email, phone, whatsapp } = CONFIG.meta.social;
  const whatsappMessage = encodeURIComponent(messages.contact.whatsappMessage);
  const whatsappHref = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <Section as="header" spacing="none" className="pt-12">
        <h1 className="heading-page mb-4">{messages.contact.title}</h1>
        <p className="lead">{messages.contact.lead}</p>
      </Section>

      <Section spacing="none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="heading-sub mb-4">{messages.contact.infoTitle}</h3>
              <ul className="space-y-4">
                <li>
                  <Link href={`mailto:${email}`} className="surface-row">
                    <Icon name={ICON.envelope} className="h-5 w-5" />
                    <span className="flex-1">
                      <span className="block field-label">
                        {messages.contact.emailLabel}
                      </span>
                      <span className="block font-medium text-foreground">
                        {email}
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="surface-row"
                  >
                    <Icon name={ICON.whatsapp} className="h-5 w-5" />
                    <span className="flex-1">
                      <span className="block field-label">
                        {messages.contact.whatsappLabel}
                      </span>
                      <span className="block font-medium text-foreground">
                        {phone}
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <address className="surface-tint flex items-center gap-3 p-4 not-italic">
                    <Icon
                      name="map-pin"
                      className="h-5 w-5 shrink-0 text-muted-foreground"
                    />
                    <span>
                      <span className="block field-label">
                        {messages.contact.locationLabel}
                      </span>
                      <span className="block font-medium text-foreground">
                        {messages.contact.location}
                      </span>
                    </span>
                  </address>
                </li>
              </ul>
            </div>

            <section>
              <h3 className="heading-sub mb-2">{messages.contact.socialTitle}</h3>
              <SocialLinks
                channels={["github", "linkedin"]}
                variant="boxed"
                size="sm"
              />
            </section>
          </div>

          <div>
            <h3 className="heading-sub mb-6">{messages.contact.formTitle}</h3>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
