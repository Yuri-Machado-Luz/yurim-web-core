"use client";

import { ProjectCard, Section } from "@/components";
import { useMessages } from "@/components/locale-provider";
import { projects } from "@/lib/data";

export function ProjectsPageContent() {
  const messages = useMessages();
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <>
      <Section as="header" spacing="none" className="pb-16 pt-16">
        <h1 className="heading-page mb-4">{messages.projects.pageTitle}</h1>
        <p className="lead">{messages.projects.pageLead}</p>
      </Section>

      {featured.length > 0 && (
        <Section spacing="none" className="pb-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags ?? []}
                badge={project.badge ? messages.projects.demoSoon : undefined}
                github={project.github}
                live={project.live}
                documentation={project.documentation}
              />
            ))}
          </div>
        </Section>
      )}

      {others.length > 0 && (
        <Section spacing="none" className="pb-12">
          <h2 className="heading-group mb-6">{messages.projects.others}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags ?? []}
                badge={project.badge ? messages.projects.demoSoon : undefined}
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
            {messages.projects.empty}
          </p>
        </Section>
      )}
    </>
  );
}
