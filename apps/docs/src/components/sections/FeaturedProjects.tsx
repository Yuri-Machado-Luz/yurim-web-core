import { ProjectCard } from "@components/ui/ProjectCard";

type ProjectEntry = {
  id: string;
  data: {
    title: string;
    description?: string;
    status: "ativo" | "dev" | "arquivado" | "beta";
    tags: string[];
    github?: string;
    live?: string;
    documentation?: string;
    order?: number;
    featured?: boolean;
  };
};

type Props = {
  projects: ProjectEntry[];
};

export function FeaturedProjects({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <section className="section-panel">
      <div className="section-inner container py-24">
        <div className="mb-12">
          <p className="eyebrow mb-3">Projetos</p>
          <h2 className="section-title mb-2">Projetos em Destaque</h2>
          <p style={{ color: "var(--color-muted)" }}>
            Alguns dos projetos que desenvolvi e mantenho.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((entry) => (
            <div key={entry.id} className="project-card">
              <ProjectCard
                title={entry.data.title}
                description={entry.data.description}
                status={entry.data.status}
                tags={entry.data.tags}
                github={entry.data.github}
                live={entry.data.live}
                documentation={entry.data.documentation}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/projetos"
            className="text-sm transition-colors duration-200 hover:text-primary-400"
            style={{ color: "var(--color-muted)" }}
          >
            Ver todos →
          </a>
        </div>
      </div>
    </section>
  );
}
