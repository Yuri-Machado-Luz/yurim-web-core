import type { Metadata } from "next";

import { PostCard } from "@/components/PostCard";
import { PageHeader } from "@/components/composed/PageHeader";
import { listPostMeta } from "@/lib/content";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  // CORREÇÃO: Passando o locale explicitamente para gerar os metadados em inglês
  const blog = await getTranslations({ locale, namespace: "blog" });

  return pageMetadata({
    title: blog("title"),
    description: blog("description"),
    path: "/blog",
    locale,
    og: "blog",
  });
}

// CORREÇÃO: Recebendo a tipagem PageProps com os parâmetros da URL
export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params; // Aguarda a Promise do parâmetro de rota

  const posts = listPostMeta();
  // CORREÇÃO: Injetado { locale, namespace } para carregar os arquivos JSON corretos
  const blog = await getTranslations({ locale, namespace: "blog" });

  return (
    <>
      <PageHeader
        title={blog("title")}
        description={blog("description")}
        className="max-w-4xl pt-16 md:pt-20"
      />

      {posts.length === 0 ? (
        <p className="text-muted-foreground">{blog("empty")}</p>
      ) : (
        <ul className="mt-4 grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </>
  );
}
