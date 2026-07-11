"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { Badge, Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { projects } from "@/lib/data";
import { localizedPath } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

const viewport = { once: true, margin: "-10%" } as const;

const stackOffsets = [
  { x: -28, y: 18, rotate: -7, scale: 0.92, blur: 2.5, opacity: 0.38, z: 1 },
  { x: 18, y: 8, rotate: 4, scale: 0.96, blur: 1.2, opacity: 0.62, z: 2 },
  { x: 0, y: 0, rotate: 0, scale: 1, blur: 0, opacity: 1, z: 3 },
] as const;

export function FeaturedProjects() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start end", "end start"],
  });
  const yBack = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [28, -28],
  );
  const yMid = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [14, -14],
  );
  const yFront = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [4, -4],
  );
  const yValues = [yBack, yMid, yFront];

  if (featured.length === 0) return null;

  const layers = featured.map((project, i) => ({
    project,
    style: stackOffsets[Math.min(i, stackOffsets.length - 1)],
    y: yValues[Math.min(i, yValues.length - 1)],
  }));

  return (
    <Section id="work" spacing="lg" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto h-64 w-[min(42rem,90%)] rounded-full bg-primary/8 blur-3xl"
      />

      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55 }}
        viewport={viewport}
        className="mb-10 max-w-2xl"
      >
        <p className="eyebrow mb-2">{messages.projects.eyebrow}</p>
        <h2 className="heading-section sm:text-4xl mb-4">
          {messages.projects.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {messages.projects.description}
        </p>
      </motion.header>

      <div
        ref={stackRef}
        className="relative mx-auto mb-12 h-[22rem] w-full max-w-xl sm:h-[24rem]"
      >
        {layers.map(({ project, style, y }) => (
          <motion.article
            key={project.id}
            style={{
              y,
              x: style.x,
              rotate: style.rotate,
              scale: style.scale,
              opacity: style.opacity,
              filter: style.blur ? `blur(${style.blur}px)` : undefined,
              zIndex: style.z,
            }}
            className={cn(
              "absolute inset-x-4 top-6 flex h-[17.5rem] flex-col gap-3 rounded-2xl border border-border bg-card/95 p-6 shadow-lg backdrop-blur-sm sm:inset-x-8 sm:h-[19rem]",
              style.z === 3 && "card-glow-subtle border-primary/35",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </h3>
              <Badge variant="secondary" className="shrink-0">
                {project.status}
              </Badge>
            </div>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>
            {project.tags && project.tags.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {project.badge && style.z === 3 && (
              <Badge variant="outline" className="w-fit font-normal">
                {messages.projects.demoSoon}
              </Badge>
            )}
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.1 }}
        viewport={viewport}
        className="text-center"
      >
        <Button asChild variant="outline" size="lg">
          <Link href={localizedPath("/projetos", locale)}>
            {messages.projects.cta}
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
