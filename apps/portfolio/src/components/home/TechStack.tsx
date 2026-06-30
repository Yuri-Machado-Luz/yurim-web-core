'use client';

export function TechStack() {
  const techs = [
    'TypeScript',
    'React',
    'Astro',
    'Node.js',
    'Python',
    'Next.js',
    'Tailwind CSS',
    'Git',
    'FastAPI',
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
        Tecnologias
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {techs.map((tech) => (
          <div
            key={tech}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
          >
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
