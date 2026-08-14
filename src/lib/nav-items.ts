export const NAV_ITEMS = [
  { translationKey: "about", href: "/sobre" },
  { translationKey: "projects", href: "/projetos" },
  { translationKey: "services", href: "/servicos" },
  { translationKey: "blog", href: "/blog" },
  { translationKey: "contact", href: "/contato" },
] as const;

export const NAV_ITEMS_MOBILE = [
  { translationKey: "blog", href: "/blog" },
  { translationKey: "about", href: "/sobre" },
  { translationKey: "projects", href: "/projetos" },
  { translationKey: "services", href: "/servicos" },
  { translationKey: "contact", href: "/contato" },
] as const;

export const CONTEXT_NAV_ITEMS = [
  { translationKey: "home", href: "/" },
  ...NAV_ITEMS,
] as const;

export type NavTranslationKey =
  (typeof CONTEXT_NAV_ITEMS)[number]["translationKey"];
