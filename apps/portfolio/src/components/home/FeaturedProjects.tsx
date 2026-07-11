"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button, ProjectCard, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { projects } from "@/lib/data";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-10%" } as const;

export function FeaturedProjects() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((p) => p.featured);

  if (featured.length === 0) return null;

  const motionProps = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
          viewport,
        };

  return (
    <Section id="work" spacing="lg">
      <motion.header {...motionProps()} className="mb-12">
        <p className="eyebrow mb-2">{messages.projects.eyebrow}</p>
        <h2 className="heading-section sm:text-4xl mb-4">
          {messages.projects.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {messages.projects.description}
        </p>
      </motion.header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            {...motionProps(idx * 0.1)}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              status={project.status}
              tags={project.tags ?? []}
              github={project.github}
              live={project.live}
              documentation={project.documentation}
            />
          </motion.div>
        ))}
      </div>

      <motion.div {...motionProps()} className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href={localizedPath("/projetos", locale)}>
            {messages.projects.cta}
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
