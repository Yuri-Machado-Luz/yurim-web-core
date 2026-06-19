import { LogoText } from "@assets";
import type { NavLink } from "./types";

export const CONFIG = {
  meta: {
    author: "Yuri Machado Luz",
    suffix: " — Yuri Machado Luz",
    description:
      "Desenvolvedor full-stack independente — sistemas web, APIs e automações do back-end à interface, com documentação e entrega.",
    locale: "pt-BR",
    social: {
      github: "https://github.com/Yuri-Machado-Luz",
      linkedin: "https://linkedin.com/in/yurimachadoluz",
      email: "yurimachadoluz@gmail.com",
      phone: "+55 (11) 94935-9394",
      whatsapp: "5511949359394",
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
