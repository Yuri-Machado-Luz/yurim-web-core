import { MapPin } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ICON } from "@/assets";
import { Button, ContactForm } from "@/components";
import CONFIG from "@/lib/config";

const whatsappIcon = ICON.whatsapp;
const githubIcon = ICON.github;
const linkedinIcon = ICON.linkedin;
const { envelope } = ICON;

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Yuri Machado Luz para projetos de desenvolvimento web, automação ou consultoria.",
};

export default function ContactPage() {
  const { email, phone, whatsapp, github, linkedin } = CONFIG.meta.social;
  const whatsappMessage = encodeURIComponent(
    "Olá! Vim através do seu portfólio e gostaria de conversar.",
  );

  return (
    <>
      {/* Page Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-6 mb-6 md:mb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Vamos conversar
        </h1>
        <p className="text-xl text-muted-foreground">
          Entre em contato para projetos de desenvolvimento web, automação ou
          consultoria.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <div className="hidden md:block">
              <h3 className="font-semibold text-foreground mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {/* Email */}
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors group"
                >
                  <Image
                    src={envelope}
                    alt="Email"
                    className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors dark:invert"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{email}</p>
                  </div>
                </Link>

                {/* WhatsApp */}
                <Link
                  href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors group"
                >
                  <Image
                    src={whatsappIcon}
                    alt="WhatsApp"
                    className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors dark:invert"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <p className="font-medium text-foreground">{phone}</p>
                  </div>
                </Link>

                {/* Location */}
                <div className="flex items-center gap-3 p-4 rounded-lg border border-border bg-secondary/30">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Localização</p>
                    <p className="font-medium text-foreground">
                      São Paulo, Brasil
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <section>
              <h3 className="hidden md:block font-semibold text-foreground my-2">
                Redes Sociais
              </h3>
              <nav className="flex gap-3">
                <Button asChild size="icon" variant="outline">
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={githubIcon}
                      alt="GitHub"
                      className="h-4 w-4 dark:invert"
                    />
                  </Link>
                </Button>
                <Button asChild size="icon" variant="outline">
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={linkedinIcon}
                      alt="LinkedIn"
                      className="h-4 w-4 dark:invert"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="md:hidden"
                >
                  <Link
                    href={`https://wa.me/${whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={whatsappIcon}
                      alt="WhatsApp"
                      className="h-4 w-4 dark:invert"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="md:hidden"
                >
                  <Link href={email} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={envelope}
                      alt="Email"
                      className="h-4 w-4 dark:invert"
                    />
                  </Link>
                </Button>
                <div className="flex items-center gap-3 px-2 rounded-lg border border-border bg-secondary/30 md:hidden">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      São Paulo, Brasil
                    </p>
                  </div>
                </div>
              </nav>
            </section>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">
              Envie uma Mensagem
            </h3>
            <ContactForm />
          </div>
        </section>
      </section>
    </>
  );
}
