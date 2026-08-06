import type { Metadata } from "next";

import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/raw";
import { Link } from "@/i18n/navigation";
import { listAllPosts } from "@/lib/content";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";
import { Icon } from "@/ui/Icons";
import { SITE } from "@/meta";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // Passamos o locale explicitamente para os metadados funcionarem no /en
  const home = await getTranslations({ locale, namespace: "home" });

  return pageMetadata({
    title: home("metaTitle"),
    description: home("description"),
    path: "/",
    locale,
  });
}

// CORREÇÃO: Adicionado PageProps para capturar o locale da URL
export default async function HomePage({ params }: PageProps) {
  const { locale } = await params; // Aguarda a Promise do parâmetro de rota

  const recent = listAllPosts().slice(0, 5);

  // CORREÇÃO: Passamos o escopo completo com o idioma atual para buscar o JSON correto
  const home = await getTranslations({ locale, namespace: "home" });
  const blog = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[70svh] flex-col justify-center gap-6 py-12 select-none md:min-h-[calc(100svh-8rem)] md:py-20">
        <div className="bg-primary/15 pointer-events-none absolute inset-x-0 top-1/4 -z-10 h-64 blur-3xl" />
        <p className="inline-flex w-fit items-center gap-2 text-sm font-medium">
          <span className="relative flex size-2">
            <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-60" />
            <span className="bg-primary relative inline-flex size-2 rounded-full" />
          </span>
          <span className="text-foreground">{home("eyebrow")}</span>
        </p>
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
          <Button asChild variant="outline" size="4xl" className="px-5">
            <Link
              href={SITE.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Icon name="github" className="h-6 w-6" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="4xl" className="px-5">
            <Link
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Icon name="linkedin" className="h-6 w-6" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="4xl">
            <Link href="/projetos">{home("secondaryAction")}</Link>
          </Button>
          <Button asChild size="4xl">
            <Link href="/sobre">{home("primaryAction")}</Link>
          </Button>
        </div>
      </section>

      {/* Recent Posts Section */}
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
              <PostCard key={post.slug} post={post} />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
