import type { Metadata } from "next";

import { PageHeader } from "@/components/composed/PageHeader";
import { ProjectCard } from "@/components/composed/ProjectCard";
import { FadeIn } from "@/components/composed/motion/FadeIn";
import { StaggerItem } from "@/components/composed/motion/StaggerItem";
import { STATUS_KEY_MAP, type Format } from "@/i18n/types";
import { listByFormat } from "@/lib/content";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  return createPageMetadata(params, "projects", { path: "/projetos" });
}

export default async function ProjectsPage({ params }: LocalePageProps) {
  const { locale } = await params;
  const projectFormat: Format = "projeto";
  const projects = listByFormat(projectFormat).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );

  const [shared, copy] = await Promise.all([
    getTranslations({ locale, namespace: "shared" }),
    getTranslations({ locale, namespace: "projects" }),
  ]);

  return (
    <>
      <FadeIn>
        <PageHeader
          title={copy("title")}
          description={copy("description")}
          className="pt-16 md:pt-20"
        />
      </FadeIn>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">{copy("empty")}</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const statusKey = project.status
              ? STATUS_KEY_MAP[project.status]
              : undefined;

            return (
              <StaggerItem key={project.slug} index={index} className="h-full">
                <ProjectCard
                  project={project}
                  labels={{
                    format: shared("formats.projeto"),
                    status: statusKey
                      ? shared(`status.${statusKey}`)
                      : undefined,
                    github: copy("github"),
                    live: copy("live"),
                  }}
                />
              </StaggerItem>
            );
          })}
        </ul>
      )}
    </>
  );
}
