'use client';

import Marquee from 'react-fast-marquee';

const TECHS = [
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'React',      icon: '/icons/react.svg' },
  { name: 'Next.js',   icon: '/icons/nextjs.svg' },
  { name: 'Tailwind',  icon: '/icons/tailwind.svg' },
  { name: 'Astro',     icon: '/icons/astro.svg' },
  { name: 'Node.js',   icon: '/icons/nodejs.svg' },
  { name: 'Python',    icon: '/icons/python.svg' },
  { name: 'FastAPI',   icon: '/icons/fastapi.svg' },
  { name: 'Git',       icon: '/icons/git.svg' },
];

export function TechStack() {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
        Tecnologias
      </p>
      <Marquee speed={35} pauseOnHover gradient={false}>
        {TECHS.map((tech) => (
          <div
            key={tech.name}
            className="mx-3 inline-flex items-center gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
          >
            <img src={tech.icon} alt="" aria-hidden className="h-5 w-5" />
            {tech.name}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
