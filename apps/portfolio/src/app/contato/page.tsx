import { Button, ContactForm } from "@/components";
import CONFIG from "@/lib/config";
import { Code, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

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
    <div className="space-y-20">
      {/* Page Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Contato
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Vamos conversar
        </h1>
        <p className="text-xl text-muted-foreground">
          Entre em contato para projetos de desenvolvimento web, automação ou
          consultoria.
        </p>
      </section>

      {/* Contact Form Grid */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-4">
                {/* Email */}
                <Link
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-secondary transition-colors group"
                >
                  <Mail className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
                  <Phone className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
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
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                Redes Sociais
              </h3>
              <div className="flex gap-3">
                <Button asChild size="icon" variant="outline">
                  <Link href={github} target="_blank" rel="noopener noreferrer">
                    <Code className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="icon" variant="outline">
                  <Link
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="icon" variant="outline">
                  <Link href={`mailto:${email}`}>
                    <Mail className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h3 className="font-semibold text-foreground mb-6">
              Envie uma Mensagem
            </h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
