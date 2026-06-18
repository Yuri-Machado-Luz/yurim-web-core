import { LogoText } from "@assets";
import type { NavLink } from "./types";

export const CONFIG = {
  meta: {
    author: "Yuri Machado Luz",
    suffix: " — Yuri Machado Luz",
    description:
      "Desenvolvedor full-stack especializado em arquitetura, automação e design de sistemas.",
    locale: "pt-BR",
    social: {
      github: "https://github.com/Yuri-Machado-Luz",
      linkedin: "https://linkedin.com/in/yurimachadoluz",
      email: "yurimachadoluz@gmail.com",
    },
  },

  nav: {
    logo: {
      href: "/",
      src: LogoText.src,
      alt: "Logotipo com link para página inicial",
    },
    pages: [
      { label: "Projetos", href: "/projetos" },
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato", cta: true },
    ],
  } satisfies NavLink,
};

export default CONFIG;
