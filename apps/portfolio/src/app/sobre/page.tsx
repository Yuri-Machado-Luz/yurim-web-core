import { Metadata } from 'next';
import { Code, ExternalLink, Mail, Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CONFIG from '@/lib/config';
import { quickFacts } from '@/lib/data/stats';
import { iconMap } from '@/lib/icons';
import { skills } from '@/lib/data/skills';
import { experience } from '@/lib/data/experience';
import { education } from '@/lib/data/education';
import { languages } from '@/lib/data/languages';

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Desenvolvedor Full-Stack com formação em Psicologia e ADS. Freelancer desde 2020, ex-IBM. São Paulo.',
};

export default function AboutPage() {
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <div className="space-y-20">
      {/* Header */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Sobre
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          {CONFIG.meta.author}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Desenvolvedor Full-Stack · Analista de Sistemas · São Paulo, Brasil
        </p>

        {/* Quick Facts Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-3">
            {quickFacts.map((fact, idx) => {
              const Icon = iconMap[fact.icon];
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg border border-border ${
                    idx === 0 ? 'bg-primary/10 animate-pulse' : 'bg-secondary/30'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 text-primary flex-shrink-0" />}
                  <span className="font-medium text-foreground">{fact.text}</span>
                </div>
              );
            })}
          </div>

          {/* Social Links & Downloads */}
          <div className="space-y-3">
            <div className="flex gap-2 mb-4">
              <Button asChild size="icon" variant="outline">
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  <Code className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="outline">
                <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="icon" variant="outline">
                <Link href={`mailto:${email}`}>
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <Button asChild variant="outline" size="sm" className="w-full justify-start">
              <Link href="/curriculo-yuri-machado.pdf" target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Currículo PDF
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section id="bio" className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold mb-8">Bio</h2>
        <div className="space-y-6 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            Desenvolvedor full-stack autônomo desde 2020. Construo sistemas web, APIs e automações para pequenas empresas e projetos próprios — do back-end à interface.
          </p>
          <p className="text-lg leading-relaxed">
            Em 2024-2025, passei pela IBM como Assistente Administrativo, redesenhando o onboarding e reduzindo o tempo de integração de 7 para 3 dias (−57%). Automatizei arquivamento em massa com Python e desenvolvi dashboard de KPIs em Excel/VBA.
          </p>
          <p className="text-lg leading-relaxed">
            Paralelo ao desenvolvimento: identidade visual, prototipagem UI/UX e produção de conteúdo técnico e acadêmico para clientes sob NDA.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold mb-4">Habilidades</h2>
        <p className="text-muted-foreground mb-8">
          Stack e ferramentas que uso em produção.
        </p>
        <div className="space-y-8">
          {skills.map((category) => (
            <div key={category.label}>
              <h3 className="font-semibold text-foreground mb-4">{category.label}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border bg-secondary/30 hover:bg-secondary transition-colors"
                    >
                      {Icon && <Icon className="h-4 w-4 text-primary flex-shrink-0" />}
                      <span className="text-sm font-medium">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold mb-8">Experiência</h2>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <Card key={idx}>
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
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <li key={bulletIdx}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section id="formacao" className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold mb-8">Formação</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <Card key={idx}>
              <CardHeader>
                <CardTitle className="text-lg">{edu.degree}</CardTitle>
                <CardDescription>{edu.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{edu.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section id="idiomas" className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="font-display text-3xl font-bold mb-8">Idiomas</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <Card key={lang.name} className="text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">{lang.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{lang.level}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-center border-t border-border">
        <h2 className="font-display text-3xl font-bold mb-8">Pronto para começar?</h2>
        <Button asChild size="lg">
          <Link href="/contato">Entre em contato</Link>
        </Button>
      </section>
    </div>
  );
}
