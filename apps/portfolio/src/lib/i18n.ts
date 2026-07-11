export type LocaleCode = "pt" | "en";

export const pt = {
  meta: {
    homeTitle: "Portfólio",
    description:
      "Sistemas web, APIs e automações, do back-end à interface.",
  },
  hero: {
    badge: "Full-Stack Developer",
    paragraph:
      "Consultor e desenvolvedor independente. Sistemas web, APIs e automações — do back-end à interface. Passagens pela IBM, Cielo e Santander.",
    cta: {
      primary: "Sobre",
      secondary: "Projetos",
    },
  },
  about: {
    eyebrow: "Sobre",
    title: "Sobre mim",
    lead: "Desenvolvedor Full-Stack · Analista de Sistemas · São Paulo, Brasil",
    bio: [
      "Desenvolvedor full-stack autônomo desde 2020. Construo sistemas web, APIs e automações para pequenas empresas e projetos próprios — do back-end à interface.",
      "Em 2024–2025, na IBM, redesenhei o onboarding e reduzi o tempo de integração de 7 para 3 dias (−57%). Automatizei arquivamento em massa com Python e montei dashboard de KPIs em Excel/VBA.",
      "Em paralelo: identidade visual, prototipagem UI/UX e documentação técnica para clientes sob NDA.",
    ],
    teaser: {
      eyebrow: "Sobre",
      title: "Quem constrói",
      body: "Histórico, stack e formação — o que construí e onde atuei.",
      cta: "Ver sobre completo →",
    },
    sections: {
      bio: "Bio",
      skills: "Habilidades",
      skillsLead: "Stack e ferramentas que uso em produção.",
      experience: "Experiência",
      education: "Formação",
      languages: "Idiomas",
    },
    cta: "Ver histórico completo →",
    ctaTitle: "Vamos conversar?",
  },
  projects: {
    eyebrow: "Projetos",
    title: "Trabalho selecionado",
    description:
      "Projetos em produção e em andamento — com escopo e stack claros.",
    cta: "Ver todos →",
    pageTitle: "Projetos",
    pageLead: "Seleção de trabalho em produção, em andamento e ferramentas.",
    others: "Outros",
    empty: "Nenhum projeto listado no momento.",
  },
  services: {
    eyebrow: "Serviços",
    title: "Serviços",
    pageTitle: "Serviços",
    pageLead:
      "Ofertas self-service com escopo definido. Escolha o que precisa; o restante alinhamos no contato.",
    teaser: {
      eyebrow: "Serviços",
      title: "O que posso entregar",
      body: "Sistemas, APIs, automações e documentação — pacotes com entrega clara.",
      cta: "Ver serviços →",
    },
    empty: "Nenhum serviço listado no momento.",
  },
  contact: {
    title: "Contato",
    lead: "Conte o problema e o prazo. Respondo com próximo passo concreto.",
    infoTitle: "Informações",
    emailLabel: "E-mail",
    whatsappLabel: "WhatsApp",
    locationLabel: "Local",
    location: "São Paulo, Brasil",
    socialTitle: "Redes",
    formTitle: "Mensagem",
    whatsappMessage: "Olá, Yuri — vi o portfólio e quero conversar sobre um projeto.",
  },
  notes: {
    eyebrow: "Notas",
    title: "Publicações recentes",
    empty: "Nenhuma publicação disponível ainda.",
    cta: "Ver publicações →",
  },
  cta: {
    title: "Tem um projeto em mente?",
    button: "Entrar em contato",
  },
  nav: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    services: "Serviços",
    blog: "Blog",
    contact: "Contato",
    openMenu: "Abrir menu",
    toggleTheme: "Alternar tema",
    toggleLocale: "Mudar idioma para inglês",
  },
  locale: {
    other: "EN",
  },
  footer: {
    rights: "Todos os direitos reservados.",
  },
};

export type Messages = typeof pt;

export const en: Messages = {
  meta: {
    homeTitle: "Portfolio",
    description: "Web systems, APIs, and automations — from back-end to interface.",
  },
  hero: {
    badge: "Full-Stack Developer",
    paragraph:
      "Independent consultant and developer. Web systems, APIs, and automations — from back-end to interface. Experience at IBM, Cielo, and Santander.",
    cta: {
      primary: "About",
      secondary: "Projects",
    },
  },
  about: {
    eyebrow: "About",
    title: "About me",
    lead: "Full-Stack Developer · Systems Analyst · São Paulo, Brazil",
    bio: [
      "Independent full-stack developer since 2020. I build web systems, APIs, and automations for small businesses and my own products — from back-end to interface.",
      "In 2024–2025 at IBM, I redesigned onboarding and cut integration time from 7 to 3 days (−57%). I automated bulk archiving with Python and built a KPI dashboard in Excel/VBA.",
      "Alongside engineering: visual identity, UI/UX prototyping, and technical documentation for NDA clients.",
    ],
    teaser: {
      eyebrow: "About",
      title: "Who builds this",
      body: "Background, stack, and education — what I built and where I worked.",
      cta: "Full about page →",
    },
    sections: {
      bio: "Bio",
      skills: "Skills",
      skillsLead: "Stack and tools I use in production.",
      experience: "Experience",
      education: "Education",
      languages: "Languages",
    },
    cta: "See full background →",
    ctaTitle: "Want to talk?",
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    description: "Shipped and in-progress projects — clear scope and stack.",
    cta: "View all →",
    pageTitle: "Projects",
    pageLead: "Work in production, in progress, and tooling.",
    others: "Other",
    empty: "No projects listed right now.",
  },
  services: {
    eyebrow: "Services",
    title: "Services",
    pageTitle: "Services",
    pageLead:
      "Self-service offerings with defined scope. Pick what you need; we align the rest on contact.",
    teaser: {
      eyebrow: "Services",
      title: "What I can deliver",
      body: "Systems, APIs, automations, and docs — packages with clear delivery.",
      cta: "View services →",
    },
    empty: "No services listed right now.",
  },
  contact: {
    title: "Contact",
    lead: "Share the problem and the deadline. I’ll reply with a concrete next step.",
    infoTitle: "Details",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    locationLabel: "Location",
    location: "São Paulo, Brazil",
    socialTitle: "Social",
    formTitle: "Message",
    whatsappMessage:
      "Hi Yuri — I saw your portfolio and want to talk about a project.",
  },
  notes: {
    eyebrow: "Notes",
    title: "Recent posts",
    empty: "No posts available yet.",
    cta: "View posts →",
  },
  cta: {
    title: "Got a project in mind?",
    button: "Get in touch",
  },
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    services: "Services",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Open menu",
    toggleTheme: "Toggle theme",
    toggleLocale: "Switch language to Portuguese",
  },
  locale: {
    other: "PT",
  },
  footer: {
    rights: "All rights reserved.",
  },
};


const dictionaries: Record<LocaleCode, Messages> = {
  pt,
  en,
};

export function getMessages(locale: LocaleCode = "pt"): Messages {
  return dictionaries[locale] ?? pt;
}
