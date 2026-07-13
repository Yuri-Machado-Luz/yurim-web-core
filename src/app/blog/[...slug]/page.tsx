import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost, listAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return listAllPosts().map((post) => ({
    slug: [post.collection, post.slug],
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [collection, postSlug] = slug;
  if (!collection || !postSlug || slug.length !== 2) return {};

  const post = getPost(collection, postSlug);
  if (!post) return {};

  return pageMetadata({
    title: post.title,
    description: post.description ?? post.title,
    path: post.href,
    og: "blog",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [collection, postSlug] = slug;

  if (!collection || !postSlug || slug.length !== 2) notFound();

  const post = getPost(collection, postSlug);
  if (!post) notFound();

  const { default: Post } = await import(
    `../../../../content/posts/${post.collection}/${post.slug}.${post.extension}`
  );

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-24">
      <header className="flex flex-col gap-3">
        <p className="font-heading text-muted-foreground text-sm tracking-wide uppercase">
          {post.collection}
        </p>
        <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
          {post.title}
        </h1>
        {post.description ? (
          <p className="text-muted-foreground max-w-prose text-lg">
            {post.description}
          </p>
        ) : null}
        {post.pubDate ? (
          <p className="text-muted-foreground text-sm">{post.pubDate}</p>
        ) : null}
      </header>

      <article className="max-w-prose">
        <Post />
      </article>

      <nav className="flex gap-4 text-sm">
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/blog"
        >
          Blog
        </Link>
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/"
        >
          Portfólio
        </Link>
      </nav>
    </main>
  );
}
