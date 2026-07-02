import Link from "next/link";

import { ICON } from "@/assets";
import { ContactForm, Icon, Section, SocialLinks } from "@/components";
import CONFIG from "@/lib/config";

import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Contato",
  "Entre em contato com Yuri Machado Luz para projetos de desenvolvimento web, automação ou consultoria.",
  "contato",
);

export default function ContactPage() {
  const { email, phone, whatsapp } = CONFIG.meta.social;
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim através do seu portfólio e gostaria de conversar.",
  );
  const whatsappHref = `https://wa.me/${whatsapp}?text=${whatsappMessage}`;

  return (
    <>
      <Section as="header" spacing="none" className="pt-12">
        <h1 className="heading-page mb-4">Vamos conversar</h1>
        <p className="lead">
          Entre em contato para projetos de desenvolvimento web, automação ou
          consultoria.
        </p>
      </Section>

      <Section spacing="none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="heading-sub mb-4">Informações de Contato</h3>
              <ul className="space-y-4">
                <li>
                  <Link href={`mailto:${email}`} className="surface-row">
                    <Icon name={ICON.envelope} className="h-5 w-5" />
                    <span className="flex-1">
                      <span className="block field-label">Email</span>
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
                      <span className="block field-label">WhatsApp</span>
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
                      <span className="block field-label">Localização</span>
                      <span className="block font-medium text-foreground">
                        São Paulo, Brasil
                      </span>
                    </span>
                  </address>
                </li>
              </ul>
            </div>

            <section>
              <h3 className="heading-sub mb-2">Redes Sociais</h3>
              <SocialLinks
                channels={["github", "linkedin"]}
                variant="boxed"
                size="sm"
              />
            </section>
          </div>

          <div>
            <h3 className="heading-sub mb-6">Envie uma Mensagem</h3>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
