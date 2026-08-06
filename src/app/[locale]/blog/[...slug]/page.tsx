import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/ui/PageHeader";
import { Badge } from "@/components/raw";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { STATUS_KEY_MAP, type Status } from "@/i18n/types";
import { getPost, listAllPosts } from "@/lib/content";
import { pageMetadata } from "@/meta";
import { capitalize } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import { proseClassName } from "../../../../../mdx-components";

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listAllPosts().flatMap((post) =>
    routing.locales.map((locale) => ({
      locale,
      slug: [post.slug],
    })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (slug.length !== 1) return {};

  const post = getPost(slug[0]);
  if (!post) return {};

  return pageMetadata({
    title: capitalize(post.title),
    description: post.description ?? post.title,
    path: post.href,
    locale,
    og: "blog",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params; // 1. Desestrutura o locale e o slug
  if (slug.length !== 1) notFound();

  const post = getPost(slug[0]);
  if (!post) notFound();

  const shared = await getTranslations({ locale, namespace: "shared" });
  const postCopy = await getTranslations({ locale, namespace: "post" });

  const outdatedDisclaimer = postCopy.raw(
    "outdatedProjectDisclaimer",
  ) as string[];
  const statusKey = STATUS_KEY_MAP[post.status as Status];

  return (
    <>
      <PageHeader
        title={post.title}
        description={post.description}
        className="pt-16 md:pt-18"
      />
      <section className="my-4 flex flex-wrap items-center gap-2">
        {post.status ? (
          <Badge variant="destructive">{shared(`status.${statusKey}`)}</Badge>
        ) : null}
        {post.pubDate ? (
          <time
            className="text-muted-foreground text-sm"
            dateTime={post.pubDate}
          >
            {post.pubDate}
          </time>
        ) : null}
      </section>

      {post.format === "projeto" && post.status === "desatualizado" ? (
        <div className="border-border bg-muted/40 text-muted-foreground mb-6 flex flex-col gap-1 rounded-md border px-4 py-3 text-sm">
          {outdatedDisclaimer.map((line) => (
            <p key={line}>{line}</p>
          ))}
          <p>
            <Link
              href="/blog/planejamento"
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              {postCopy("outdatedProjectLink")}
            </Link>
          </p>
        </div>
      ) : null}

      <article className={proseClassName}>
        <MDXContent code={post.mdx} />
      </article>

      <footer>
        <nav className="flex gap-4 text-sm">
          <Link
            className="text-primary underline-offset-4 hover:underline"
            href="/blog"
          >
            {postCopy("backToBlog")}
          </Link>
          <Link
            className="text-primary underline-offset-4 hover:underline"
            href="/"
          >
            {postCopy("backToPortfolio")}
          </Link>
        </nav>
      </footer>
    </>
  );
}
