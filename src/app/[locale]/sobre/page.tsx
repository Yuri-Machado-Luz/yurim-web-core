import type { Metadata } from "next";

import {
  ExperienceTimeline,
  ResumeDownloads,
  SocialLinks,
} from "@/components/composed";
import {
  FadeIn,
  StaggerGroup,
  StaggerItem,
} from "@/components/composed/motion";
import { Badge, Button, Separator } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { createPageMetadata, type LocalePageProps } from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "about", {
    path: "/sobre",
    og: "sobre",
  });
}

export default async function AboutPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const [copy, resume] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "resume" }),
  ]);

  const bio = copy.raw("bio") as string[];
  const sections = copy.raw("sections") as {
    bio: string;
    skills: string;
    skillsLead: string;
    experience: string;
    education: string;
    languages: string;
  };
  const experience = resume.raw("experience") as Array<{
    role: string;
    company: string;
    period: string;
    bullets: string[];
  }>;
  const education = resume.raw("education") as Array<{
    degree: string;
    institution: string;
    detail: string;
    description?: string;
  }>;
  const skillCategories = resume.raw("skillCategories") as Array<{
    label: string;
    skills: string[];
  }>;
  const languages = resume.raw("languages") as Array<{
    name: string;
    level: string;
  }>;
  const quickFacts = resume.raw("quickFacts") as string[];

  return (
    <div className="flex flex-col gap-16 md:gap-20">
      <header className="grid items-start gap-8 pt-16 md:grid-cols-[1fr_auto] md:pt-20">
        <FadeIn className="flex flex-col gap-4">
          <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
            {copy("title")}
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {copy("description")}
          </p>
          <div className="mt-2 flex flex-col gap-3">
            <SocialLinks showEmail showLabels size="sm" />
            <ResumeDownloads
              labels={{
                navLabel: copy("downloads.navLabel"),
                pdf: copy("downloads.pdf"),
                docx: copy("downloads.docx"),
                json: copy("downloads.json"),
              }}
            />
          </div>
        </FadeIn>

        <aside
          className={cn(
            "surface-glass shrink-0 rounded-xl px-5 py-5",
            "border-border/60 shadow-(--shadow-card-subtle)",
          )}
        >
          <StaggerGroup as="ul" className="flex flex-col gap-2.5">
            {quickFacts.map((fact, i) => (
              <StaggerItem
                key={fact}
                nested
                className="text-muted-foreground flex items-center gap-2 text-sm"
              >
                <span
                  className="bg-primary size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                <span className={cn(i === 0 && "text-foreground font-medium")}>
                  {fact}
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </aside>
      </header>

      <section className="flex flex-col gap-6">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.bio}
          </h2>
        </FadeIn>
        <StaggerGroup className="flex flex-col gap-5">
          {bio.map((paragraph) => (
            <StaggerItem
              key={paragraph}
              nested
              as="p"
              className="text-muted-foreground max-w-4xl text-lg leading-[1.8]"
            >
              {paragraph}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="flex flex-col gap-6">
        <FadeIn>
          <div>
            <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
              {sections.skills}
            </h2>
            <p className="text-muted-foreground mt-2">{sections.skillsLead}</p>
          </div>
        </FadeIn>
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <StaggerItem
              key={category.label}
              nested
              as="div"
              className="surface-glass border-border/60 flex h-full flex-col gap-4 rounded-2xl border p-6 shadow-(--shadow-card-subtle)"
            >
              <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                {category.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="flex flex-col gap-8">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.experience}
          </h2>
        </FadeIn>
        <ExperienceTimeline items={experience} />
      </section>

      <section className="flex flex-col gap-6">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.education}
          </h2>
        </FadeIn>
        <StaggerGroup className="grid gap-4 sm:grid-cols-2">
          {education.map((item) => (
            <StaggerItem
              key={item.degree}
              nested
              as="article"
              className="surface-glass border-border/60 flex h-full flex-col gap-1 rounded-xl border p-5 shadow-(--shadow-card-subtle)"
            >
              <p className="text-foreground text-base font-semibold">
                {item.degree}
              </p>
              <p className="text-muted-foreground">{item.institution}</p>
              <p className="text-muted-foreground/70 text-sm">{item.detail}</p>
              {item.description ? (
                <p className="text-muted-foreground/60 mt-2 text-sm">
                  {item.description}
                </p>
              ) : null}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="flex flex-col gap-6">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.languages}
          </h2>
        </FadeIn>
        <StaggerGroup className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {languages.map((item) => (
            <StaggerItem
              key={item.name}
              nested
              as="article"
              className="surface-glass border-border/60 flex flex-col gap-1 rounded-xl border px-5 py-4 shadow-(--shadow-card-subtle)"
            >
              <span className="text-foreground text-base font-semibold">
                {item.name}
              </span>
              <span className="text-muted-foreground text-sm">
                {item.level}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Separator />

      <FadeIn
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <section className="flex min-h-[40vh] flex-col items-center justify-center gap-6 py-16 text-center">
          <h2 className="font-heading text-foreground text-3xl font-semibold md:text-4xl">
            {copy("ctaTitle")}
          </h2>
          <Button asChild size="lg">
            <Link href="/contato">{copy("cta")}</Link>
          </Button>
        </section>
      </FadeIn>
    </div>
  );
}
