import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Zap, FileText } from 'lucide-react';
import { projects } from '@/lib/data/projects';

export const metadata: Metadata = {
  title: 'Projetos',
  description: 'Sites, ferramentas e contribuições open-source.',
};

const statusVariants = {
  ativo: 'default',
  dev: 'secondary',
  arquivado: 'outline',
  beta: 'secondary',
} as const;

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <div className="space-y-20">
      {/* Page Header */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          Portfólio
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Projetos
        </h1>
        <p className="text-xl text-muted-foreground">
          Sites, ferramentas e contribuições open-source.
        </p>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold mb-8">Em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((project) => (
              <Card key={project.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <Badge variant={statusVariants[project.status]}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 text-base">
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
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold mb-8">Outros Projetos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {others.map((project) => (
              <Card key={project.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle>{project.title}</CardTitle>
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
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 text-center">
          <p className="text-lg text-muted-foreground">
            Nenhum projeto adicionado ainda.
          </p>
        </section>
      )}
    </div>
  );
}
