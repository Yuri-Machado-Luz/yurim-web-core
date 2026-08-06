import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/composed/PageHeader";
import { SocialLinks } from "@/components/composed/SocialLinks";
import { Link } from "@/i18n/navigation";
import { createPageMetadata, type LocalePageProps } from "@/meta";
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

  return (
    <>
      <div className="flex flex-col gap-4 pt-16">
        <PageHeader title={copy("title")} description={copy("description")} />
        <ul className="text-muted-foreground flex flex-col gap-1 text-sm">
          {(resume.raw("quickFacts") as string[]).map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <SocialLinks showEmail showLabels size="sm" />
      </div>

      <section className="border-border/60 pt-4 pb-6">
        <Card className="border-border/60 bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-heading text-2xl font-semibold">
              {sections.bio}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          <CardContent className="flex flex-col gap-6">
            {(
              resume.raw("skillCategories") as Array<{
                label: string;
                skills: string[];
              }>
            ).map((category) => (
              <div key={category.label} className="flex flex-col gap-2">
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

      <section className="border-border/60 pb-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold">
          {sections.experience}
        </h2>
        <Accordion type="multiple" defaultValue={[experience[0]?.role ?? ""]}>
          {experience.map((item) => (
            <AccordionItem
              key={`${item.company}-${item.role}`}
              value={item.role}
            >
              <AccordionTrigger>
                <span className="flex flex-col items-start gap-0.5">
                  <span>
                    {item.role}
                    <span className="text-muted-foreground font-normal">
                      {" · "}
                      {item.company}
                    </span>
                  </span>
                  <span className="text-muted-foreground text-xs font-normal">
                    {item.period}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="text-muted-foreground flex list-disc flex-col gap-1 pl-5 leading-relaxed">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-border/60 pb-4">
        <h2 className="font-heading text-foreground mb-3 text-2xl font-semibold">
          {sections.education}
        </h2>
        <Accordion type="multiple" defaultValue={[education[0]?.degree ?? ""]}>
          {education.map((item) => (
            <AccordionItem key={item.degree} value={item.degree}>
              <AccordionTrigger>
                <span className="flex flex-col items-start gap-0.5">
                  <span>{item.degree}</span>
                  <span className="text-muted-foreground text-xs font-normal">
                    {item.institution}
                    {" · "}
                    {item.detail}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                {item.description ? (
                  <p className="text-muted-foreground">{item.description}</p>
                ) : null}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

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

      <Separator className="mt-10" />
      <section className="flex flex-col items-center gap-4 pt-16 pb-4">
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
