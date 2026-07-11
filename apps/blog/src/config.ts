import type { NavLink } from "./types";

const defaultPortfolioUrl = import.meta.env.DEV
  ? "http://localhost:3000"
  : "https://www.yurimachado.dev.br";

const portfolioBase = (
  import.meta.env.PUBLIC_PORTFOLIO_URL ?? defaultPortfolioUrl
).replace(/\/$/, "");

export function portfolioUrl(path = ""): string {
  if (!path) return portfolioBase;
  return `${portfolioBase}${path.startsWith("/") ? path : `/${path}`}`;
}

export const CONFIG = {
  meta: {
    author: "Yuri Machado Luz",
    suffix: " — Yuri Machado Luz",
    description:
      "Devlogs, notas técnicas e documentação de projetos — sistemas web, APIs e automações.",
    locale: "pt-BR",
    og: {
      default: "/og/blog.png",
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
    portfolio: portfolioBase,
  },

  nav: {
    logo: {
      href: portfolioUrl(),
      alt: "Logotipo — ir para o portfólio",
    },
    pages: [
      { label: "Início", href: portfolioUrl(), external: true },
      { label: "Projetos", href: portfolioUrl("/projetos"), external: true },
      { label: "Sobre", href: portfolioUrl("/sobre"), external: true },
      { label: "Blog", href: "/" },
      {
        label: "Contato",
        href: portfolioUrl("/contato"),
        external: true,
        cta: true,
      },
    ],
  } satisfies NavLink,
};

export default CONFIG;
