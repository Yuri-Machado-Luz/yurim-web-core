const defaultBlogUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://blog.yurimachado.dev.br";

const blogBase = (
  process.env.NEXT_PUBLIC_BLOG_URL ?? defaultBlogUrl
).replace(/\/$/, "");

export const CONFIG = {
  meta: {
    author: "Yuri Machado Luz",
    suffix: ": Yuri Machado Luz",
    description: "Sistemas web, APIs e automações.",
    descriptionEn: "Web systems, APIs, and automations.",
    locale: "pt-BR",
    localeEn: "en-US",
    siteUrl: "https://www.yurimachado.dev.br",
    og: {
      portfolio: "/og/portfolio.png",
      projetos: "/og/projetos.png",
      sobre: "/og/sobre.png",
      contato: "/og/contato.png",
      servicos: "/og/projetos.png",
    },
    social: {
      github: "https://github.com/Yuri-Machado-Luz",
      linkedin: "https://linkedin.com/in/yurimachadoluz",
      email: "yurimachadoluz@gmail.com",
      phone: "+55 (11) 94935-9394",
      whatsapp: "5511949359394",
    },
  },

  sites: {
    blog: blogBase,
    changelog: `${blogBase}/posts/portfolio/changelog`,
  },

  nav: {
    pages: [
      { key: "projects" as const, href: "/projetos" },
      { key: "about" as const, href: "/sobre" },
      { key: "services" as const, href: "/servicos" },
      { key: "blog" as const, href: blogBase, external: true },
      { key: "contact" as const, href: "/contato", cta: true },
    ],
  },
} as const;

export default CONFIG;
