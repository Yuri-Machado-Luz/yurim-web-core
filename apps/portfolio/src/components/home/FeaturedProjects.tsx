'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCard } from '@/components/ui/project-card';
import { pt } from '@/lib/i18n';
import { projects } from '@/lib/data/projects';

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {pt.projects.eyebrow}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          {pt.projects.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {pt.projects.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-8">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
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

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Button asChild variant="outline" size="lg">
          <Link href="/projetos">{pt.projects.cta}</Link>
        </Button>
      </motion.div>
    </section>
  );
}
