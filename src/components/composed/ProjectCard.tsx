import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";

import { Icon } from "./Icons";
import { Link } from "@/i18n/navigation";
import type { ContentMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

export type ProjectCardLabels = {
  format: string;
  status?: string;
  github: string;
  live: string;
};

type ProjectCardProps = {
  project: ContentMeta;
  labels: ProjectCardLabels;
  className?: string;
};

export function ProjectCard({ project, labels, className }: ProjectCardProps) {
  const hasActions = Boolean(project.github || project.liveLink);

  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <Link href={project.href} className="group/title inline-block">
            <CardTitle
              className={cn(
                "text-xl font-semibold tracking-tight",
                "text-foreground group-hover/title:text-primary transition-colors duration-300 ease-out",
              )}
            >
              {project.title}
            </CardTitle>
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="text-xs">
            {labels.format}
          </Badge>
          {labels.status ? (
            <Badge variant="secondary" className="text-xs">
              {labels.status}
            </Badge>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        {project.description ? (
          <CardDescription className="text-muted-foreground line-clamp-3 text-sm">
            {project.description}
          </CardDescription>
        ) : null}
      </CardContent>

      {hasActions ? (
        <CardFooter className="flex flex-wrap items-center gap-2 pt-2">
          {project.github ? (
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="github" className="h-4 w-4" />
                {labels.github}
              </a>
            </Button>
          ) : null}
          {project.liveLink ? (
            <Button asChild size="sm" className="gap-1.5">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.live}
              </a>
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
