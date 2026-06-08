import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BookOpen, ExternalLink } from "lucide-react";
import { Badge } from "../Badge";

type ProjectCardProps = {
  title: string;
  description?: string;
  status: "ativo" | "dev" | "arquivado" | "beta";
  tags: string[];
  github?: string;
  live?: string;
  documentation?: string;
};

export function ProjectCard({
  title,
  description,
  status,
  tags,
  github,
  live,
  documentation,
}: ProjectCardProps) {
  return (
    <article className="card card-interactive flex flex-col gap-4 p-6 h-full">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
          {title}
        </h3>
        <Badge variant={status} />
      </div>

      {description && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
          {description}
        </p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                border: "1px solid var(--color-border)",
                color: "var(--color-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex gap-4 pt-2">
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ExternalLink size={14} />
            Live
          </a>
        )}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--color-muted)" }}
          >
            <FontAwesomeIcon icon={faGithub} style={{ width: 14, height: 14 }} />
            GitHub
          </a>
        )}
        {documentation && (
          <a
            href={documentation}
            className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
            style={{ color: "var(--color-muted)" }}
          >
            <BookOpen size={14} />
            Docs
          </a>
        )}
      </div>
    </article>
  );
}
