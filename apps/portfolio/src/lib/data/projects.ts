import CONFIG from "@/lib/config";
import type { ProjectItem } from "@/types";

export const projects: ProjectItem[] = [
  {
    id: "portfolio",
    title: "Portfólio",
    description:
      "Site pessoal com apresentação, histórico de projetos e seções de contato.",
    status: "ativo",
    featured: true,
    github: "https://github.com/Yuri-Machado-Luz/personal--portfolio",
    live: "https://www.yurimachado.dev.br",
    documentation: `${CONFIG.sites.blog}/posts/portfolio/sobre`,
    tags: ["Next.js", "React", "Tailwind", "TypeScript", "Vercel"],
  },
  {
    id: "blog",
    title: "Blog",
    description:
      "Devlogs, notas técnicas e publicações sobre desenvolvimento web, APIs e automações.",
    status: "ativo",
    featured: true,
    github: "https://github.com/Yuri-Machado-Luz/personal--blog",
    live: CONFIG.sites.blog,
    tags: ["Astro", "MDX", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    id: "sistema-gestao-loja-games",
    title: "Gestão: loja de games",
    description:
      "Backoffice para loja de consoles, jogos e acessórios: catálogo, estoque, manutenção e técnicos. MVP como PWA.",
    status: "beta",
    featured: true,
    badge: "Demonstração pública em breve",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "TanStack Query",
      "Zustand",
    ],
  },
];
