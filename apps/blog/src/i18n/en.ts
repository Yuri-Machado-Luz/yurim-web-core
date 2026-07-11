import type { Messages } from "./pt";

export const en = {
  meta: {
    description:
      "Devlogs, technical notes, and project docs — web systems, APIs, and automations.",
    siteName: "Yuri Machado Luz",
    brand: "Yuri Machado Luz",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleLocale: "Mudar para português",
    toggleTheme: "Toggle theme",
  },
  home: {
    brand: "Yuri Machado Luz",
    headline: "A technical record of what I build",
    lead: "Devlogs, architecture decisions, and project documentation — web systems, APIs, and automations.",
    portfolioCta: "Go to portfolio →",
    changelogCta: "View changelog →",
  },
  collections: {
    notes: {
      title: "Notes",
      empty: "No notes published yet.",
    },
    portfolio: {
      title: "Portfolio",
      empty: "No projects documented yet.",
    },
    automation: {
      title: "Automation",
      empty: "No tools published yet.",
    },
  },
  changelog: {
    title: "Changelog",
    lead: "Consolidated version history and changes.",
    teaserTitle: "Changelog",
    teaserLead: "Versions and changes for projects documented here.",
    teaserCta: "View changelog →",
    empty: "No changelog entries yet.",
  },
  footer: {
    rights: "All rights reserved.",
  },
  locale: {
    code: "EN",
    other: "PT",
  },
  hero: {
    badge: "Full-Stack Developer",
    paragraph:
      "Independent consultant and developer, with experience at IBM, Cielo, and Santander.",
    cta: { primary: "Resume", secondary: "Projects" },
  },
  about: {
    title: "About me",
    bio: [
      "Independent full-stack developer. Web systems, APIs, and automations — from back-end to interface.",
      "In 2024–2025 at IBM, I redesigned onboarding and cut integration time from 7 to 3 days (−57%).",
      "Alongside development: visual identity, UI/UX prototyping, and technical documentation.",
    ],
    cta: "See full history →",
  },
  projects: {
    eyebrow: "Projects",
    title: "Featured projects",
    description: "A selection of projects in production and in progress.",
    cta: "View all →",
  },
  notes: {
    eyebrow: "Notes",
    title: "Recent posts",
    empty: "No posts available yet.",
    cta: "View posts →",
  },
  cta: {
    title: "Got a project in mind, or want to talk?",
    button: "Get in touch",
  },
} as const satisfies Messages;
