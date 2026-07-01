export interface NavLink {
  pages: {
    label: string;
    href: string;
    cta?: boolean;
  }[];
}

export interface HeroStat {
  label: string;
  value?: string;
  icon?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  detail: string;
  description?: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export interface QuickFact {
  icon: string;
  text: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  status: "ativo" | "dev" | "arquivado" | "beta";
  featured?: boolean;
  github?: string;
  live?: string;
  documentation?: string;
  tags?: string[];
}
