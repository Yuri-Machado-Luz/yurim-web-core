import type { ProjectItem } from "@/types";

export const projects: ProjectItem[] = [
  {
    id: "portfolio",
    title: "Portfólio",
    description:
      "Site pessoal com apresentação, histórico de projetos e seções de contato.",
    status: "dev",
    featured: true,
    github: "https://github.com/Yuri-Machado-Luz/portfolio",
    live: "https://www.yurimachado.dev.br",
    tags: ["Next.js", "React", "Tailwind", "TypeScript", "Vercel"],
  },
  {
    id: "sistema-gestao-loja-games",
    title: "Sistema de Gestão — Loja de Games & Eletrônicos",
    description:
      "Backoffice completo para loja de consoles, jogos, computadores e acessórios: catálogo CRUD, controle de estoque, histórico de manutenção e gestão de técnicos. MVP entregue como PWA com Service Worker.",
    status: "beta",
    featured: true,
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
