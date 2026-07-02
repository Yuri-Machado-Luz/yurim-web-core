export interface NavLink {
  logo: {
    href: string;
    label?: string;
    src?: string | ImageMetadata;
    alt?: string;
  };
  pages: {
    label: string;
    href: string;
    cta?: boolean;
    external?: boolean;
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

export interface ProjectStatus {
  label: string;
  badge: string;
}

// Content Schema Types
export interface SidebarLink {
  type: "link";
  label: string;
  href: string;
  isCurrent?: boolean;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
}

export interface SidebarGroup {
  type: "group";
  label: string;
  entries: SidebarEntry[];
  collapsed?: boolean;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
  alignBottom?: boolean;
}

export interface SidebarSeparator {
  type: "separator";
  label: string;
  entries: SidebarEntry[];
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
  alignBottom?: boolean;
}

export type SidebarEntry = SidebarLink | SidebarGroup | SidebarSeparator;

export interface SidebarBadge {
  text: string;
  variant?:
    | "development"
    | "note"
    | "tip"
    | "caution"
    | "danger"
    | "success"
    | "default";
  class?: string;
}

export interface SidebarConfig {
  order?: number;
  label?: string;
  hidden?: boolean;
  badge?: SidebarBadge | string;
  attrs?: Record<string, string | boolean>;
  collapsed?: boolean;
}

export interface BaseContent {
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  draft?: boolean;
  featured?: boolean;
  image?: string;
  canonicalUrl?: string;
  sidebar?: SidebarConfig;
}

export interface ProjectContent extends BaseContent {
  fmContentType: "project";
  tags?: string[];
  status: "ativo" | "dev" | "arquivado" | "beta";
  github?: string;
  live?: string;
  documentation?: string;
  order?: number;
}

export interface NoteContent extends BaseContent {
  fmContentType: "note";
}
declare global {
  interface Window {
    swup?: any;
  }
}

export {};
