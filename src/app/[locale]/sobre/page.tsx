import type { Metadata } from "next";
import { Button } from "@/components/raw";
import { Badge } from "@/components/raw";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/raw/card";
import { SITE } from "@/meta";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/components/ui/Icons";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const copy = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({
    title: copy("title"),
    path: "/sobre",
    locale,
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const copy = await getTranslations({ locale, namespace: "about" });
  const resume = await getTranslations({ locale, namespace: "resume" });

  const bio = copy.raw("bio") as string[];
  const sections = copy.raw("sections") as {
    bio: string;
    skills: string;
    skillsLead: string;
    experience: string;
    education: string;
    languages: string;
  };

  return (
    <>
      {/* HEADER */}
      <header className="flex flex-col gap-4 pt-16">
        <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          {SITE.name}
        </h1>
        <p className="text-muted-foreground max-w-2xl text-lg">
          {copy("description")}
        </p>
        <ul className="text-muted-foreground flex flex-col gap-1 text-sm">
          {(resume.raw("quickFacts") as string[]).map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <nav className="flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm" className="px-5">
            <Link
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" className="h-6 w-6" /> GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="px-5">
            <Link
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" className="h-6 w-6" /> LinkedIn
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="px-5">
            <Link
              href={`mailto:${SITE.social.email}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="E-mail"
            >
              <Icon name="gmail" className="h-6 w-6" /> Gmail
            </Link>
          </Button>
        </nav>
      </header>

      {/* BIO */}
      <section className="border-border/60 pt-4 pb-6">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.bio}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bio.map((paragraph) => (
              <p
                key={paragraph}
                className="text-muted-foreground max-w-4xl text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* SKILLS */}
      <section className="border-border/60 pb-4">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.skills}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              {sections.skillsLead}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(
              resume.raw("skillCategories") as Array<{
                label: string;
                skills: string[];
              }>
            ).map((category) => (
              <div key={category.label} className="space-y-2">
                <h3 className="text-foreground text-sm font-medium">
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
          </CardContent>
        </Card>
      </section>

      {/* EXPERIENCE */}
      <section className="border-border/60 pb-4">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.experience}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {(
              resume.raw("experience") as Array<{
                role: string;
                company: string;
                period: string;
                bullets: string[];
              }>
            ).map((item) => (
              <div
                key={`${item.company}-${item.role}`}
                className="border-border/40 space-y-2 border-b pb-6 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-foreground font-medium">
                    {item.role}
                    <span className="text-muted-foreground font-normal">
                      {" · "}
                      {item.company}
                    </span>
                  </h3>
                  <p className="text-muted-foreground text-sm">{item.period}</p>
                </div>
                <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm leading-relaxed">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* EDUCATION */}
      <section className="border-border/60 pb-4">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.education}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {(
              resume.raw("education") as Array<{
                degree: string;
                institution: string;
                detail: string;
                description?: string;
              }>
            ).map((item) => (
              <div
                key={item.degree}
                className="border-border/40 space-y-1 border-b pb-4 last:border-0 last:pb-0"
              >
                <h3 className="text-foreground font-medium">{item.degree}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.institution}
                  {" · "}
                  {item.detail}
                </p>
                {item.description && (
                  <p className="text-muted-foreground/80 text-sm">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* LANGUAGES */}
      <section className="border-border/60 pb-4">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.languages}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {(
                resume.raw("languages") as Array<{
                  name: string;
                  level: string;
                }>
              ).map((item) => (
                <li key={item.name} className="text-muted-foreground text-sm">
                  <span className="text-foreground font-medium">
                    {item.name}
                  </span>
                  {" · "}
                  {item.level}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="border-border/60 mt-10 flex flex-col items-center gap-4 border-t pt-24 pb-4">
        <h2 className="font-heading text-foreground text-2xl font-semibold">
          {copy("ctaTitle")}
        </h2>
        <Button asChild size="lg">
          <Link href="/contato">{copy("cta")}</Link>
        </Button>
      </section>
    </>
  );
}
