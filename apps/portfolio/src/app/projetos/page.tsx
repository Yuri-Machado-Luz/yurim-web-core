import { ProjectCard, Section } from "@/components";
import { projects } from "@/lib/data";

import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Projetos",
  "Sites, ferramentas e contribuições open-source.",
  "projetos",
);

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      {/* Page Header */}
      <Section as="header" spacing="none" className="pb-16 pt-16">
        <h1 className="heading-page mb-4">Projetos</h1>
        <p className="lead">Sites, ferramentas e contribuições open-source.</p>
      </Section>

      {/* Featured */}
      {featured.length > 0 && (
        <Section spacing="none" className="pb-12">
          <h2 className="heading-group mb-6">
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
        <Section spacing="none" className="pb-12">
          <h2 className="heading-group mb-6">
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
        <Section spacing="none" className="pb-16 text-center">
          <p className="text-lg text-muted-foreground">
            Nenhum projeto adicionado ainda.
          </p>
        </Section>
      )}
    </>
  );
}
