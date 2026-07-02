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
    suffix: " — Yuri Machado Luz",
    description: "Sistemas web, APIs e automações, do back-end à interface.",
    locale: "pt-BR",
    siteUrl: "https://www.yurimachado.dev.br",
    og: {
      portfolio: "/og/portfolio.png",
      projetos: "/og/projetos.png",
      sobre: "/og/sobre.png",
      contato: "/og/contato.png",
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
  },

  nav: {
    pages: [
      { label: "Projetos", href: "/projetos" },
      { label: "Sobre", href: "/sobre" },
      { label: "Blog", href: blogBase, external: true },
      { label: "Contato", href: "/contato", cta: true },
    ],
  },
} as const;

export default CONFIG;
