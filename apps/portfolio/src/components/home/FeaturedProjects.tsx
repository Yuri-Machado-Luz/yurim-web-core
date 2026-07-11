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
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay },
          viewport,
        };

  return (
    <Section id="work" spacing="lg">
      <motion.header {...motionProps()} className="mb-10 max-w-2xl">
        <p className="eyebrow mb-2">{messages.projects.eyebrow}</p>
        <h2 className="heading-section sm:text-4xl mb-4">
          {messages.projects.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {messages.projects.description}
        </p>
      </motion.header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            {...motionProps(idx * 0.08)}
            className="h-full"
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              status={project.status}
              tags={project.tags ?? []}
              badge={project.badge ? messages.projects.demoSoon : undefined}
              github={project.github}
              live={project.live}
              documentation={project.documentation}
            />
          </motion.div>
        ))}
      </div>

      <motion.div {...motionProps(0.12)} className="mt-12 text-center sm:mt-14">
        <Button asChild variant="outline" size="lg">
          <Link href={localizedPath("/projetos", locale)}>
            {messages.projects.cta}
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
