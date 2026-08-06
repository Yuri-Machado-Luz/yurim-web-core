import type { Metadata } from "next";

import { PostCard } from "@/components/composed/PostCard";
import { SocialLinks } from "@/components/composed/SocialLinks";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { STATUS_KEY_MAP } from "@/i18n/types";
import { listPostMeta } from "@/lib/content";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
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
  const recent = listPostMeta().slice(0, 5);
  const [home, blog, shared] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "shared" }),
  ]);

  return (
    <>
      <section className="relative flex min-h-[70svh] flex-col justify-center gap-6 py-12 select-none md:min-h-[calc(100svh-8rem)] md:py-20">
        <div className="bg-primary/15 pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-64 blur-3xl" />
        <h1 className="font-heading text-foreground max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl">
          {home("title")}
        </h1>
        <p className="text-muted-foreground max-w-xl text-lg">
          {home("description")}
        </p>
        <p className="text-muted-foreground max-w-xl text-base sm:text-lg">
          {home("paragraph")}
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <SocialLinks size="4xl" />
          <Button asChild variant="outline" size="4xl">
            <Link href="/projetos">{home("secondaryAction")}</Link>
          </Button>
          <Button asChild size="4xl">
            <Link href="/sobre">{home("primaryAction")}</Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-4 pt-12 pb-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="font-heading text-foreground text-4xl font-semibold">
            {home("recentPostsHeading")}
          </h1>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground self-end text-right text-sm underline-offset-4 hover:underline"
          >
            {home("viewAllPosts")}
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="text-muted-foreground">{blog("empty")}</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4">
            {recent.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                labels={{
                  featured: shared("actions.featured"),
                  readPost: shared("actions.readPost"),
                  format: shared(`formats.${post.format}`),
                  status: post.status
                    ? shared(`status.${STATUS_KEY_MAP[post.status]}`)
                    : undefined,
                }}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
