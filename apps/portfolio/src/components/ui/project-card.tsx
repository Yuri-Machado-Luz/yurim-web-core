import { BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ICON } from "@/assets";
import { Badge } from "@/components";

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
  github?: string;
  live?: string;
  documentation?: string;
}

export function ProjectCard({
  title,
  description,
  status,
  tags,
  github,
  live,
  documentation,
}: ProjectCardProps) {
  const hasLinks = live || github || documentation;

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md">
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

      {hasLinks && (
        <div className="mt-auto flex gap-5 pt-2">
          {live && (
            <Link
              href={live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary transition-opacity hover:opacity-70"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              Live
            </Link>
          )}
          {github && (
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-opacity hover:opacity-70"
            >
              <Image
                src={ICON.github}
                alt="GitHub"
                className="h-3.5 w-3.5 dark:invert"
              />
              GitHub
            </Link>
          )}
          {documentation && (
            <Link
              href={documentation}
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-opacity hover:opacity-70"
            >
              <BookOpen className="h-3.5 w-3.5 dark:invert" aria-hidden />
              Docs
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
