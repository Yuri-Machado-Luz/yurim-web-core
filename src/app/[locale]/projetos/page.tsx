import type { Metadata } from "next";
import { Icon } from "@/components/composed/Icons";
import { PageHeader } from "@/components/composed/PageHeader";
import { Badge } from "@/components/ui/badge";
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
import { STATUS_KEY_MAP, type Format } from "@/i18n/types";
import { listByFormat } from "@/lib/content";
import {
  createPageMetadata,
  type LocalePageProps,
} from "@/meta";
import { cn } from "@/lib/utils";
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
            const statusKey = project.status
              ? STATUS_KEY_MAP[project.status]
              : undefined;
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
                      {statusKey ? (
                        <Badge variant="secondary" className="text-xs">
                          {shared(`status.${statusKey}`)}
                        </Badge>
                      ) : null}
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
                            <Icon name="github" className="h-4 w-4" />
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
