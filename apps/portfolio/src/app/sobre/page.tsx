import { Download } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ICON } from "@/assets";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Section,
} from "@/components";
import CONFIG from "@/lib/config";
import { education, experience, languages, skills } from "@/lib/data";
import { iconMap } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Desenvolvedor Full-Stack com formação em Psicologia e ADS. Freelancer desde 2020, ex-IBM. São Paulo.",
};

export default function AboutPage() {
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <>
      {/* Header */}
      <Section as="header" spacing="none" className="pt-16 pb-12">
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          {CONFIG.meta.author}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Desenvolvedor Full-Stack · Analista de Sistemas · São Paulo, Brasil
        </p>

        {/* Social Links & Downloads */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Image
                  src={ICON.github}
                  alt="GitHub"
                  className="h-4 w-4 dark:invert"
                />
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                <Image
                  src={ICON.linkedin}
                  alt="LinkedIn"
                  className="h-4 w-4 dark:invert"
                />
                LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`mailto:${email}`}>
                <Image
                  src={ICON.envelope}
                  alt="Email"
                  className="h-4 w-4 dark:invert"
                />
                Gmail
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-fit justify-start"
            >
              <Link href="/downloads/curriculo-yuri-machado.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-fit justify-start"
            >
              <Link
                href="/downloads/curriculo-yuri-machado.docx"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                DOCX
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-fit justify-start"
            >
              <Link
                href="/downloads/curriculo-yuri-machado.json"
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                JSON
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section as="article" id="bio" spacing="none" className="pb-16">
        <h2 className="font-display text-3xl font-bold mb-8">Bio</h2>
        <div className="space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Desenvolvedor full-stack autônomo desde 2020. Construo sistemas web,
            APIs e automações para pequenas empresas e projetos próprios — do
            back-end à interface.
          </p>
          <p className="text-lg leading-relaxed">
            Em 2024-2025, passei pela IBM como Assistente Administrativo,
            redesenhando o onboarding e reduzindo o tempo de integração de 7 para
            3 dias (−57%). Automatizei arquivamento em massa com Python e
            desenvolvi dashboard de KPIs em Excel/VBA.
          </p>
          <p className="text-lg leading-relaxed">
            Paralelo ao desenvolvimento: identidade visual, prototipagem UI/UX e
            produção de conteúdo técnico e acadêmico para clientes sob NDA.
          </p>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="habilidades" spacing="none" className="pt-16 pb-8">
        <h2 className="font-display text-3xl font-bold mb-4">Habilidades</h2>
        <p className="text-muted-foreground mb-8">
          Stack e ferramentas que uso em produção.
        </p>
        <div className="space-y-8">
          {skills.map((category) => (
            <div key={category.label}>
              <h3 className="font-semibold text-foreground mb-4">
                {category.label}
              </h3>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <li
                      key={skill.name}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary transition-colors"
                    >
                      {Icon && <Icon className="h-4 w-4 text-primary shrink-0" />}
                      <span className="text-sm font-medium">{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experiencia" spacing="none" className="pt-16 pb-8">
        <h2 className="font-display text-3xl font-bold mb-8">Experiência</h2>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <Card key={idx} className="gap-1">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription className="text-base mt-1">
                      {exp.company}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {exp.period}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-none text-sm text-muted-foreground">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Education Section */}
      <Section id="formacao" spacing="none" className="pt-16 pb-8">
        <h2 className="font-display text-3xl font-bold mb-8">Formação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <Card key={idx} className="gap-0">
              <CardHeader>
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <CardDescription>{edu.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{edu.detail}</p>
                {edu.description && (
                  <p className="text-sm text-muted-foreground/60 mt-2">
                    {edu.description}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Languages Section */}
      <Section id="idiomas" spacing="none" className="pt-16 pb-28">
        <h2 className="font-display text-3xl font-bold mb-8">Idiomas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <Card key={lang.name} className="text-center gap-0">
              <CardHeader className="pb-1">
                <CardTitle className="text-base">{lang.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section
        spacing="none"
        className="flex min-h-[60vh] flex-col items-center justify-center pb-24 text-center"
      >
        <h2 className="font-display text-3xl font-bold mb-8">
          Vamos conversar?
        </h2>
        <Button asChild size="lg">
          <Link href="/contato">Entre em contato</Link>
        </Button>
      </Section>
    </>
  );
}
