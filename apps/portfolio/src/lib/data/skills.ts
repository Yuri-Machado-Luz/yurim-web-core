import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    label: "Frontend & UI",
    skills: [
      { icon: "react", name: "React" },
      { icon: "code", name: "TypeScript" },
      { icon: "layout", name: "HTML / CSS" },
      { icon: "wind", name: "Tailwind CSS" },
      { icon: "flame", name: "Astro" },
      { icon: "sparkles", name: "Framer Motion" },
      { icon: "figma", name: "Figma" },
    ],
  },
  {
    label: "Backend & Dados",
    skills: [
      { icon: "server", name: "Node.js" },
      { icon: "terminal", name: "Python" },
      { icon: "network", name: "Express" },
      { icon: "zap", name: "FastAPI" },
      { icon: "database", name: "PostgreSQL" },
      { icon: "database", name: "Supabase" },
      { icon: "table", name: "Pandas" },
    ],
  },
  {
    label: "Ferramentas",
    skills: [
      { icon: "git-branch", name: "Git" },
      { icon: "infinity", name: "CI/CD" },
      { icon: "settings-2", name: "Power Automate" },
      { icon: "monitor", name: "Linux / CLI" },
      { icon: "terminal", name: "Shell (Bash/Zsh)" },
      { icon: "zap", name: "Vercel" },
      { icon: "flame", name: "Cloudflare" },
    ],
  },
];
