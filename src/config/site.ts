export const SITE = {
  name: "Yuri Machado Luz",
  shortName: "Yuri Machado",
  titleDefault: "Yuri Machado Luz",
  titleTemplate: "%s · Yuri Machado Luz",
  description: "Sistemas web, APIs e automações.",
  descriptionBlog:
    "Devlogs, notas técnicas e documentação de projetos: sistemas web, APIs e automações.",
  locale: "pt-BR",
  localeOg: "pt_BR",
  siteUrl: "https://www.yurimachado.dev.br",
  author: "Yuri Machado Luz",
  jobTitle: "Full-stack developer / Independent consultant",
  social: {
    github: "https://github.com/Yuri-Machado-Luz",
    linkedin: "https://linkedin.com/in/yurimachadoluz",
    email: "yurimachadoluz@gmail.com",
  },
  og: {
    default: "/og/default",
    blog: "/og/blog",
    width: 1200,
    height: 630,
  },
  themeColor: "#050404",
} as const;

export type SiteConfig = typeof SITE;
