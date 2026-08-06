import { MDXContent } from "@content-collections/mdx/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/composed/PageHeader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { STATUS_KEY_MAP } from "@/i18n/types";
import { getPost, listPostMeta } from "@/lib/content";
import { proseClassName } from "@/lib/prose";
import { capitalize } from "@/lib/utils";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";

type PageProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listPostMeta().flatMap((post) =>
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
  const { locale, slug } = await params;
  if (slug.length !== 1) notFound();

  const post = getPost(slug[0]);
  if (!post) notFound();

  const [shared, postCopy] = await Promise.all([
    getTranslations({ locale, namespace: "shared" }),
    getTranslations({ locale, namespace: "post" }),
  ]);

  const outdatedDisclaimer = postCopy.raw(
    "outdatedProjectDisclaimer",
  ) as string[];
  const statusKey = post.status ? STATUS_KEY_MAP[post.status] : undefined;

  return (
    <>
      <Breadcrumb className="pt-10">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/blog">{shared("navigation.blog")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{post.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageHeader
        title={post.title}
        description={post.description}
        className="pt-6 md:pt-8"
      />

      <section className="my-4 flex flex-wrap items-center gap-2">
        {statusKey ? (
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

      <Separator className="mb-6" />

      {post.format === "projeto" && post.status === "desatualizado" ? (
        <Alert className="mb-6">
          <AlertTitle>{shared(`status.${statusKey}`)}</AlertTitle>
          <AlertDescription>
            {outdatedDisclaimer.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <Link
                href="/blog/planejamento"
                className="text-foreground font-medium"
              >
                {postCopy("outdatedProjectLink")}
              </Link>
            </p>
          </AlertDescription>
        </Alert>
      ) : null}

      <article className={proseClassName}>
        <MDXContent code={post.mdx} />
      </article>

      <footer className="mt-10">
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
