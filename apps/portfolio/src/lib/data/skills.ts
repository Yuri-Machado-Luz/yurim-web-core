import type { SkillCategory } from "@/types";

export const skills: SkillCategory[] = [
  {
    label: "Frontend & UI",
    skills: [
      { icon: "react", name: "React" },
      { icon: "typescript", name: "TypeScript" },
      { icon: "html5", name: "HTML / CSS" },
      { icon: "tailwind", name: "Tailwind CSS" },
      { icon: "astro", name: "Astro" },
      { icon: "sparkles", name: "Framer Motion" },
      { icon: "figma", name: "Figma" },
    ],
  },
  {
    label: "Backend & Dados",
    skills: [
      { icon: "nodejs", name: "Node.js" },
      { icon: "python", name: "Python" },
      { icon: "network", name: "Express" },
      { icon: "fastapi", name: "FastAPI" },
      { icon: "postgresql", name: "PostgreSQL" },
      { icon: "database", name: "Supabase" },
      { icon: "table", name: "Pandas" },
    ],
  },
  {
    label: "Ferramentas",
    skills: [
      { icon: "git", name: "Git" },
      { icon: "infinity", name: "CI/CD" },
      { icon: "settings-2", name: "Power Automate" },
      { icon: "monitor", name: "Linux / CLI" },
      { icon: "terminal", name: "Shell (Bash/Zsh)" },
      { icon: "zap", name: "Vercel" },
      { icon: "cloudflare", name: "Cloudflare" },
    ],
  },
];
