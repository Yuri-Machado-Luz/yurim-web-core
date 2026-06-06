import type { NavLink } from "./types";

export const config = {
  site: {
    author: "Yuri Machado Luz",
    titleSuffix: " — Yuri Machado Luz",
    description:
      "Full-Stack Developer focado em arquitetura, automação e design de sistemas.",
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
      src: "/src/assets/text-logo-light.svg",
      alt: "Logotipo com link para página inicial",
    },
    pages: [
      { label: "Projetos", href: "/projects" },
      { label: "Publicações", href: "/content" },
      { label: "Sobre", href: "/sobre" },
    ],
  } satisfies NavLink,
};

export default config;
