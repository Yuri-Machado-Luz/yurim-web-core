import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { listAllPosts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: SITE.descriptionBlog,
  path: "/blog",
  og: "blog",
});

export default function BlogHomePage() {
  const posts = listAllPosts();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-24">
      <header className="flex flex-col gap-4">
        <p className="font-heading text-muted-foreground text-sm tracking-wide uppercase">
          Blog
        </p>
        <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
          Posts
        </h1>
        <p className="text-muted-foreground max-w-prose text-lg">
          Conteúdo em <code className="text-sm">content/posts</code>, rotas em{" "}
          <code className="text-sm">/blog/[collection]/[slug]</code>.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Nenhum post publicado.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li
              key={`${post.collection}/${post.slug}`}
              className="flex flex-col gap-1"
            >
              <span className="text-muted-foreground text-xs tracking-wide uppercase">
                {post.collection}
              </span>
              <Link
                href={post.href}
                className="text-foreground font-medium underline-offset-4 hover:underline"
              >
                {post.title}
              </Link>
              {post.description ? (
                <span className="text-muted-foreground text-sm">
                  {post.description}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <nav className="flex gap-4 text-sm">
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
