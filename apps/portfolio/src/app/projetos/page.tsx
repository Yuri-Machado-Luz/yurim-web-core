import { Metadata } from "next";

import { ProjectCard, Section } from "@/components";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Sites, ferramentas e contribuições open-source.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-20">
      {/* Page Header */}
      <Section as="header" spacing="sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Portfólio
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Projetos
        </h1>
        <p className="text-xl text-muted-foreground">
          Sites, ferramentas e contribuições open-source.
        </p>
      </Section>

      {/* Featured */}
      {featured.length > 0 && (
        <Section spacing="none">
          <h2 className="font-display text-2xl font-bold mb-6 text-muted-foreground">
            Em Destaque
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags ?? []}
                github={project.github}
                live={project.live}
                documentation={project.documentation}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Others */}
      {others.length > 0 && (
        <Section spacing="none">
          <h2 className="font-display text-2xl font-bold mb-6 text-muted-foreground">
            Outros Projetos
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags ?? []}
                github={project.github}
                live={project.live}
                documentation={project.documentation}
              />
            ))}
          </div>
        </Section>
      )}

      {projects.length === 0 && (
        <Section spacing="none" className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            Nenhum projeto adicionado ainda.
          </p>
        </Section>
      )}
    </div>
  );
}
