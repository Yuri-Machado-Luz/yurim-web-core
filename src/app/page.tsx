import type { Metadata } from "next";
import Link from "next/link";

import { SITE } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Portfólio",
  description: SITE.description,
  path: "/",
  og: "default",
});

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-24">
      <p className="font-heading text-muted-foreground text-sm tracking-wide uppercase">
        yurimachado.dev.br
      </p>
      <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
        Portfólio
      </h1>
      <p className="text-muted-foreground max-w-prose text-lg">
        {SITE.description}
      </p>
      <nav className="flex gap-4 text-sm">
        <Link
          className="text-primary underline-offset-4 hover:underline"
          href="/blog"
        >
          Blog
        </Link>
      </nav>
    </main>
  );
}
