import Link from "next/link";

import { ICON } from "@/assets";
import { Badge, Button, Icon } from "@/components";
import { cn } from "@/lib/utils";

const statusVariants = {
  ativo: "default",
  dev: "secondary",
  arquivado: "outline",
  beta: "secondary",
} as const;

interface ProjectCardProps {
  title: string;
  description?: string;
  status: "ativo" | "dev" | "arquivado" | "beta";
  tags: string[];
  badge?: string;
  github?: string;
  live?: string;
  documentation?: string;
}

export function ProjectCard({
  title,
  description,
  status,
  tags,
  badge,
  github,
  live,
  documentation,
}: ProjectCardProps) {
  const hasLinks = Boolean(live || github || documentation);

  return (
    <article
      className={cn(
        "card-glow-subtle flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5",
        hasLinks
          ? "hover:border-primary/50 hover:shadow-[var(--shadow-card-hover-subtle)]"
          : "hover:border-primary/35 hover:shadow-[var(--shadow-card-subtle)]",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>
        <Badge variant={statusVariants[status]} className="shrink-0">
          {status}
        </Badge>
      </div>

      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {(badge || hasLinks) && (
        <div className="mt-auto flex flex-wrap items-center justify-end gap-2 pt-2">
          {badge && (
            <Badge variant="outline" className="font-normal">
              {badge}
            </Badge>
          )}
          {live && (
            <Button asChild variant="default" size="sm">
              <Link href={live} target="_blank" rel="noopener noreferrer">
                <Icon name="external-link" className="h-3.5 w-3.5" />
                Live
              </Link>
            </Button>
          )}
          {github && (
            <Button asChild variant="outline" size="sm">
              <Link href={github} target="_blank" rel="noopener noreferrer">
                <Icon name={ICON.github} className="h-3.5 w-3.5" />
                GitHub
              </Link>
            </Button>
          )}
          {documentation && (
            <Button asChild variant="outline" size="sm">
              <Link href={documentation}>
                <Icon name="book-open" className="h-3.5 w-3.5" />
                Docs
              </Link>
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
