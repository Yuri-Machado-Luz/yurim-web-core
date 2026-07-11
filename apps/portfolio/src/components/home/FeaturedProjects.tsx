"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Button, ProjectCard, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { projects } from "@/lib/data";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-10%" } as const;

const stackLayers = [
  { offset: "-translate-x-3 -translate-y-4 rotate-[-4deg]", blur: "blur-[2px]", opacity: "opacity-40", z: "z-0" },
  { offset: "translate-x-2 -translate-y-2 rotate-[3deg]", blur: "blur-[1px]", opacity: "opacity-55", z: "z-10" },
  { offset: "translate-x-0 translate-y-0 rotate-0", blur: "", opacity: "opacity-100", z: "z-20" },
] as const;

function ProjectStackVisual() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yBack = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [18, -18]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [10, -10]);
  const yFront = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [4, -4]);
  const yValues = [yBack, yMid, yFront];

  return (
    <div
      ref={ref}
      className="relative mx-auto mb-14 hidden h-36 w-full max-w-md sm:block"
      aria-hidden="true"
    >
      {stackLayers.map((layer, i) => (
        <motion.div
          key={i}
          style={{ y: yValues[i] }}
          className={`absolute inset-x-8 top-4 h-24 rounded-xl border border-border bg-card shadow-sm ${layer.offset} ${layer.blur} ${layer.opacity} ${layer.z}`}
        >
          <div className="flex h-full flex-col justify-between p-4">
            <div className="h-2.5 w-1/3 rounded-full bg-muted" />
            <div className="space-y-2">
              <div className="h-2 w-full rounded-full bg-muted/80" />
              <div className="h-2 w-2/3 rounded-full bg-muted/60" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

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

      <ProjectStackVisual />

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
              badge={project.badge ? messages.projects.demoSoon : undefined}
              github={project.github}
              live={project.live}
              documentation={project.documentation}
            />
          </motion.div>
        ))}
      </div>

      <motion.div {...motionProps()} className="mt-10 text-center sm:mt-14">
        <Button asChild variant="outline" size="lg">
          <Link href={localizedPath("/projetos", locale)}>
            {messages.projects.cta}
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
