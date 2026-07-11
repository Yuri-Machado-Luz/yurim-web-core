export const pt = {
  meta: {
    description:
      "Devlogs, notas técnicas e documentação de projetos — sistemas web, APIs e automações.",
    siteName: "Yuri Machado Luz",
    brand: "Yuri Machado Luz",
  },
  nav: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    blog: "Blog",
    contact: "Contato",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleLocale: "Switch to English",
    toggleTheme: "Alternar tema",
  },
  home: {
    brand: "Yuri Machado Luz",
    headline: "Registro técnico do que construo",
    lead: "Devlogs, decisões de arquitetura e documentação de projetos — sistemas web, APIs e automações.",
    portfolioCta: "Ir para o portfólio →",
    changelogCta: "Ver changelog →",
  },
  collections: {
    notes: {
      title: "Notas",
      empty: "Nenhuma nota publicada ainda.",
    },
    portfolio: {
      title: "Portfólio",
      empty: "Nenhum projeto documentado ainda.",
    },
    automation: {
      title: "Automação",
      empty: "Nenhuma ferramenta publicada ainda.",
    },
  },
  changelog: {
    title: "Changelog",
    lead: "Histórico consolidado de versões e mudanças.",
    teaserTitle: "Changelog",
    teaserLead: "Versões e mudanças dos projetos documentados aqui.",
    teaserCta: "Ver changelog →",
    empty: "Nenhuma entrada de changelog ainda.",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
  locale: {
    code: "PT",
    other: "EN",
  },
  /** @deprecated Legacy portfolio-home copy — components retained but unused */
  hero: {
    badge: "Full-Stack Developer",
    paragraph:
      "Consultor e desenvolvedor independente, com passagens pela IBM, Cielo e Santander.",
    cta: { primary: "Currículo", secondary: "Projetos" },
  },
  about: {
    title: "Sobre mim",
    bio: [
      "Desenvolvedor full-stack autônomo. Sistemas web, APIs e automações, do back-end à interface.",
      "Em 2024-2025, passei pela IBM, redesenhando o onboarding e reduzindo o tempo de integração de 7 para 3 dias (−57%).",
      "Paralelo ao desenvolvimento: identidade visual, prototipagem UI/UX e documentação técnica.",
    ],
    cta: "Ver histórico completo →",
  },
  projects: {
    eyebrow: "Projetos",
    title: "Projetos em Destaque",
    description: "Uma seleção de projetos em produção e em andamento.",
    cta: "Ver todos →",
  },
  notes: {
    eyebrow: "Notas",
    title: "Publicações recentes",
    empty: "Nenhuma publicação disponível ainda.",
    cta: "Ver publicações →",
  },
  cta: {
    title: "Tem um projeto em mente ou quer conversar?",
    button: "Entre em contato",
  },
} as const;

export type Messages = typeof pt;
