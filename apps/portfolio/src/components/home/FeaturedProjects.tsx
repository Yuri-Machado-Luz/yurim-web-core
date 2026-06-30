'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { pt } from '@/lib/i18n';
import { projects } from '@/lib/data/projects';
import { Code, Zap, FileText } from 'lucide-react';

const statusVariants = {
  ativo: 'default',
  dev: 'secondary',
  arquivado: 'outline',
  beta: 'secondary',
} as const;

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  if (featured.length === 0) {
    return null;
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <Badge variant={statusVariants[project.status]}>
                    {project.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <div className="px-6 pb-6 border-t border-border pt-4 flex gap-2">
                {project.live && (
                  <Button asChild variant="ghost" size="sm" className="flex-1">
                    <Link href={project.live} target="_blank" rel="noopener noreferrer">
                      <Zap className="h-4 w-4 mr-2" />
                      Live
                    </Link>
                  </Button>
                )}
                {project.github && (
                  <Button asChild variant="ghost" size="sm" className="flex-1">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      <Code className="h-4 w-4 mr-2" />
                      GitHub
                    </Link>
                  </Button>
                )}
                {project.documentation && (
                  <Button asChild variant="ghost" size="sm" className="flex-1">
                    <Link href={project.documentation}>
                      <FileText className="h-4 w-4 mr-2" />
                      Docs
                    </Link>
                  </Button>
                )}
              </div>
            </Card>
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
          <Link href="/projetos">
            {pt.projects.cta}
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
