import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { ProjectCard } from "@components/ui/ProjectCard";
import { PageHeader } from "@sections/PageHeader";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export function ProjectsPage({ projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const featured = projects.filter((p) => p.data.featured);
  const others = projects.filter((p) => !p.data.featured);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener("astro:page-load", refresh);
    return () => document.removeEventListener("astro:page-load", refresh);
  }, []);

  useGSAP(
    () => {
      gsap.set(".projects-header", { autoAlpha: 0, y: 32 });
      gsap.set(".project-card", { autoAlpha: 0, y: 24 });

      gsap.to(".projects-header", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });

      ScrollTrigger.batch(".project-card", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.07,
            ease: "power3.out",
          }),
        once: true,
        start: "top 88%",
      });
    },
    { scope: containerRef },
  );

  return (
    <main ref={containerRef}>
      <PageHeader
        eyebrow="Portfólio"
        title="Projetos em Destaque"
        lead="Sites, ferramentas, automações e bases de conhecimento — do beta ao produto final."
        className="projects-header"
      />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="container mb-20">
          <div
            className="featured-grid"
            style={featured.length === 1 ? { gridTemplateColumns: "1fr" } : undefined}
          >
            {featured.map((entry) => (
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
        </section>
      )}

      {/* Others */}
      {others.length > 0 && (
        <section className="container mb-20">
          {featured.length > 0 && (
            <h2 className="section-title mb-6">Outros Projetos</h2>
          )}
          <div className="projects-grid">
            {others.map((entry) => (
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
        </section>
      )}

      {projects.length === 0 && (
        <section className="container mb-20">
          <p style={{ color: "var(--color-muted)" }}>
            Nenhum projeto disponível no momento.
          </p>
        </section>
      )}
    </main>
  );
}
