import type { Metadata } from "next";

import { BlogFeed } from "@/components/composed/BlogFeed";
import { PageHeader } from "@/components/composed/PageHeader";
import { FadeIn } from "@/components/composed/motion/FadeIn";
import { STATUS_KEY_MAP, type Format } from "@/i18n/types";
import { listPostMeta } from "@/lib/content";
import { createPageMetadata, type LocalePageProps } from "@/meta";
import { getTranslations } from "next-intl/server";

const FORMATS: Format[] = ["nota", "pensamento", "projeto", "planejamento"];

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "blog", {
    path: "/blog",
    og: "blog",
  });
}

export default async function BlogPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const posts = listPostMeta();
  const [blog, shared] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "shared" }),
  ]);

  return (
    <>
      <FadeIn>
        <PageHeader
          title={blog("title")}
          description={blog("description")}
          className="max-w-4xl pt-16 md:pt-20"
        />
      </FadeIn>

      <FadeIn delay={0.1}>
        <BlogFeed
          items={posts.map((post) => ({
            post,
            labels: {
              readPost: shared("actions.readPost"),
              format: shared(`formats.${post.format}`),
              status: post.status
                ? shared(`status.${STATUS_KEY_MAP[post.status]}`)
                : undefined,
            },
          }))}
          emptyLabel={blog("empty")}
          viewAllLabel={blog("viewAll")}
          filterLabel={blog("filterLabel")}
          tabs={FORMATS.map((format) => ({
            value: format,
            label: shared(`formatsPlural.${format}`),
          }))}
        />
      </FadeIn>
    </>
  );
}
