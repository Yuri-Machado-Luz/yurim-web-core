import type { Metadata } from "next";

import { ExperienceTimeline } from "@/components/composed/ExperienceTimeline";
import { ResumeDownloads } from "@/components/composed/ResumeDownloads";
import { SocialLinks } from "@/components/composed/SocialLinks";
import { FadeIn } from "@/components/composed/motion/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { createPageMetadata, type LocalePageProps } from "@/meta";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "about", { path: "/sobre" });
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

        <FadeIn delay={0.12}>
          <aside
            className={cn(
              "surface-glass card-glow-subtle shrink-0 rounded-xl px-5 py-5",
              "border-border/60",
            )}
          >
            <ul className="flex flex-col gap-2.5">
              {quickFacts.map((fact, i) => (
                <li
                  key={fact}
                  className="text-muted-foreground flex items-center gap-2 text-sm"
                >
                  <span
                    className={cn(
                      "bg-primary size-1.5 shrink-0 rounded-full",
                      i === 0 && "animate-pulse motion-reduce:animate-none",
                    )}
                    aria-hidden="true"
                  />
                  <span
                    className={cn(i === 0 && "text-foreground font-medium")}
                  >
                    {fact}
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </FadeIn>
      </header>

      <FadeIn>
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.bio}
          </h2>
          <div className="flex flex-col gap-5">
            {bio.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground max-w-4xl text-lg leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
              {sections.skills}
            </h2>
            <p className="text-muted-foreground mt-2">{sections.skillsLead}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <div
                key={category.label}
                className="surface-glass card-glow-subtle border-border/60 flex h-full flex-col gap-4 rounded-2xl border p-6"
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
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <section className="flex flex-col gap-8">
        <FadeIn>
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.experience}
          </h2>
        </FadeIn>
        <ExperienceTimeline items={experience} />
      </section>

      <FadeIn>
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.education}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <article
                key={item.degree}
                className="surface-glass card-glow-subtle border-border/60 flex h-full flex-col gap-1 rounded-xl border p-5"
              >
                <p className="text-foreground text-base font-semibold">
                  {item.degree}
                </p>
                <p className="text-muted-foreground">{item.institution}</p>
                <p className="text-muted-foreground/70 text-sm">
                  {item.detail}
                </p>
                {item.description ? (
                  <p className="text-muted-foreground/60 mt-2 text-sm">
                    {item.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="flex flex-col gap-6">
          <h2 className="font-heading text-foreground text-2xl font-semibold md:text-3xl">
            {sections.languages}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {languages.map((item) => (
              <article
                key={item.name}
                className="surface-glass card-glow-subtle border-border/60 flex flex-col gap-1 rounded-xl border px-5 py-4"
              >
                <span className="text-foreground text-base font-semibold">
                  {item.name}
                </span>
                <span className="text-muted-foreground text-sm">
                  {item.level}
                </span>
              </article>
            ))}
          </div>
        </section>
      </FadeIn>

      <Separator />

      <FadeIn>
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
