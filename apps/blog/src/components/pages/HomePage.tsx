import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { Hero } from "@sections/Hero";
import { TechStack } from "@sections/TechStack";
import { AboutSection } from "@sections/AboutSection";
import { FeaturedProjects } from "@sections/FeaturedProjects";
import { NotesSection } from "@sections/NotesSection";
import { CTASection } from "@sections/CTASection";

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

type NoteEntry = {
  id: string;
  data: {
    title: string;
    description?: string;
    pubDate?: Date | null;
  };
};

type HomePageProps = {
  projects: ProjectEntry[];
  recentNotes: NoteEntry[];
};

export function HomePage({ projects, recentNotes }: HomePageProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const main = mainRef.current;
      if (!main) return;

      const panels = gsap.utils.toArray<HTMLElement>(".section-panel");
      const lastPanel = panels[panels.length - 1];

      panels.forEach((panel, i) => {
        if (panel === lastPanel) return;

        gsap.to(panel, {
          rotateX: -18,
          opacity: 0,
          transformOrigin: "center bottom",
          transformPerspective: 1200,
          ease: "none",
          scrollTrigger: {
            id: `panel-${i}`,
            trigger: panel,
            start: "top top",
            end: "+=50%",
            pin: true,
            pinSpacing: false,
            scrub: 1,
          },
        });
      });
    },
    { scope: mainRef },
  );

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener("astro:page-load", refresh);
    return () => document.removeEventListener("astro:page-load", refresh);
  }, []);

  return (
    <main ref={mainRef}>
      <Hero />
      <TechStack />
      <AboutSection />
      <FeaturedProjects projects={projects} />
      <NotesSection notes={recentNotes} />
      <CTASection />
    </main>
  );
}
