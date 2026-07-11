export const pt = {
  meta: {
    description:
      "Devlogs, notas técnicas e documentação de projetos: sistemas web, APIs e automações.",
    siteName: "Yuri Machado Luz",
    brand: "Yuri Machado Luz",
  },
  nav: {
    portfolio: "Portfólio",
    projects: "Projetos",
    about: "Sobre",
    services: "Serviços",
    blog: "Blog",
    contact: "Contato",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleLocale: "Mudar para inglês",
    toggleTheme: "Alternar tema",
  },
  home: {
    author: "Autor: Yuri Machado Luz",
    headline: "Registros de Jornada",
    lead: "Devlogs, decisões de arquitetura e documentação de projetos: sistemas web, APIs e automações.",
    portfolioCta: "Ir para o portfólio",
    changelogCta: "Ver changelog",
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
    teaserCta: "Ver changelog",
    empty: "Nenhuma entrada de changelog ainda.",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
  locale: {
    code: "PT",
    other: "EN",
  },
} as const;

export type Messages = typeof pt;
