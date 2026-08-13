import type { Metadata } from "next";

import { FadeIn } from "@/components/composed/motion/FadeIn";
import {
  HeroActions,
  HeroPhoto,
  HeroTitle,
} from "@/components/composed/motion/HeroMotion";
import {
  MotionSection,
  RecentWritingList,
} from "@/components/composed/motion/RecentWritingList";
import { StaggerItem } from "@/components/composed/motion/StaggerItem";
import { ProjectCard } from "@/components/composed/ProjectCard";
import { SocialLinks } from "@/components/composed/SocialLinks";
import { TechStack } from "@/components/composed/TechStack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { STATUS_KEY_MAP } from "@/i18n/types";
import { listByFormat, listPostMeta } from "@/lib/content";
import { createPageMetadata, SITE, type LocalePageProps } from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "home", {
    path: "/",
    titleKey: "metaTitle",
  });
}

export default async function HomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  const featuredProjects = listByFormat("projeto")
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
    .slice(0, 6);
  const recentWriting = listPostMeta()
    .filter((p) => p.format !== "projeto")
    .slice(0, 3);

  const [home, projects, shared] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "projects" }),
    getTranslations({ locale, namespace: "shared" }),
  ]);

  const aboutTeaser = home.raw("aboutTeaser") as {
    title: string;
    body: string;
    cta: string;
  };

  return (
    <>
      <section className="relative flex min-h-[70svh] flex-col py-12 select-none md:min-h-[calc(100svh-var(--navbar-height,4rem))] md:py-16">
        <div className="bg-primary/15 pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-64 blur-3xl" />

        <div className="grid w-full flex-1 content-center gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <FadeIn delay={0.05}>
              <div className="border-border bg-secondary/50 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 motion-reduce:animate-none" />
                  <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                </span>
                <span className="text-foreground text-sm font-medium">
                  {home("badge")}
                </span>
              </div>
            </FadeIn>

            <HeroTitle
              title={home("title")}
              className="font-heading text-foreground max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl"
            />
            <FadeIn delay={0.25}>
              <p className="text-muted-foreground max-w-xl text-lg">
                {home("description")}
              </p>
            </FadeIn>
            <FadeIn delay={0.32}>
              <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
                {home("paragraph")}
              </p>
            </FadeIn>
            <HeroActions className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch">
              <SocialLinks size="4xl" />
              <Button asChild variant="outline" size="4xl">
                <Link href="/projetos">{home("secondaryAction")}</Link>
              </Button>
              <Button asChild size="4xl">
                <Link href="/sobre">{home("primaryAction")}</Link>
              </Button>
            </HeroActions>
          </div>

          <HeroPhoto className="items-center justify-center overflow-visible">
            <div className="hero-picture-wrap shrink-0">
              <span className="picture-ring" aria-hidden="true" />
              <span
                className="picture-ring picture-ring-b"
                aria-hidden="true"
              />
              <Avatar className="border-border size-64 border xl:size-72">
                <AvatarImage src="/profile-picture.png" alt={SITE.author} />
                <AvatarFallback>YM</AvatarFallback>
              </Avatar>
            </div>
          </HeroPhoto>
        </div>

        <FadeIn
          delay={0.55}
          className="mt-20 w-full shrink-0 pt-4 sm:mt-24 md:mt-28 lg:mt-32"
        >
          <TechStack />
        </FadeIn>
      </section>

      <MotionSection className="flex flex-col gap-6 pt-8 pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-foreground text-3xl font-semibold md:text-4xl">
              {home("featuredHeading")}
            </h2>
            <p className="text-muted-foreground mt-2 text-base md:text-lg">
              {home("featuredDescription")}
            </p>
          </div>
          <Link
            href="/projetos"
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors duration-300 ease-out hover:underline"
          >
            {home("viewAllFeatured")}
          </Link>
        </div>

        {featuredProjects.length === 0 ? (
          <p className="text-muted-foreground">{projects("empty")}</p>
        ) : (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => {
              const statusKey = project.status
                ? STATUS_KEY_MAP[project.status]
                : undefined;
              return (
                <StaggerItem
                  key={project.slug}
                  index={index}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    labels={{
                      format: shared("formats.projeto"),
                      status: statusKey
                        ? shared(`status.${statusKey}`)
                        : undefined,
                      github: projects("github"),
                      live: projects("live"),
                    }}
                  />
                </StaggerItem>
              );
            })}
          </ul>
        )}

        {recentWriting.length > 0 ? (
          <RecentWritingList
            heading={home("recentWritingHeading")}
            viewAllLabel={home("viewAllPosts")}
            posts={recentWriting.map((post) => ({
              slug: post.slug,
              href: post.href,
              title: post.title,
              description: post.description,
              pubDate: post.pubDate,
              featured: post.featured,
            }))}
          />
        ) : null}
      </MotionSection>

      <MotionSection className="flex flex-col items-center gap-5 py-16 text-center md:py-24">
        <h2 className="font-heading text-foreground max-w-xl text-3xl font-semibold md:text-4xl">
          {aboutTeaser.title}
        </h2>
        <Button asChild size="lg" className="min-w-42 tracking-wide">
          <Link href="/sobre">{aboutTeaser.cta}</Link>
        </Button>
      </MotionSection>
    </>
  );
}
