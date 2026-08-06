import type { Metadata } from "next";
import { PageHeader } from "@/components/composed/PageHeader";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { STATUS_KEY_MAP, type Status } from "@/i18n/types";
import { listByFormat } from "@/lib/content";
import { pageMetadata } from "@/meta";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";

type PageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const projects = await getTranslations({ locale, namespace: "projects" });
  return pageMetadata({
    title: projects("title"),
    description: projects("description"),
    path: "/projetos",
    locale,
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  const projectFormat: Parameters<typeof listByFormat>[0] = "projeto";
  const projects = listByFormat(projectFormat).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99),
  );

  const shared = await getTranslations({ locale, namespace: "shared" });
  const copy = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <PageHeader
        title={copy("title")}
        description={copy("description")}
        className="pt-16 md:pt-20"
      />

      {projects.length === 0 ? (
        <p className="text-muted-foreground">{copy("empty")}</p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const statusKey = STATUS_KEY_MAP[project.status as Status];
            const hasActions = project.github || project.liveLink;

            return (
              <li key={project.slug}>
                <Card
                  className={cn(
                    "border-border/60 flex h-full flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
                    "bg-background/50 backdrop-blur-sm",
                  )}
                >
                  <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
                    <div className="flex-1">
                      <Link
                        href={project.href}
                        className="group/title inline-block"
                      >
                        <CardTitle
                          className={cn(
                            "text-xl font-semibold tracking-tight",
                            "text-foreground group-hover/title:text-primary transition-colors",
                          )}
                        >
                          {project.title}
                        </CardTitle>
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-xs">
                        {shared("formats.projeto")}
                      </Badge>
                      {project.status && (
                        <Badge variant="secondary" className="text-xs">
                          {shared(`status.${statusKey}`)}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1">
                    {project.description && (
                      <CardDescription className="text-muted-foreground text-sm">
                        {project.description}
                      </CardDescription>
                    )}
                  </CardContent>

                  {hasActions && (
                    <CardFooter className="flex flex-wrap items-center gap-2 pt-2">
                      {project.github && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="gap-1.5"
                        >
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="sr-only">GitHub</span>
                            <svg
                              className="h-4 w-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {copy("github")}
                          </a>
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="gap-1.5"
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                            {copy("live")}
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  )}
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
