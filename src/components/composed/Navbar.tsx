import { Logo } from "@/components/composed/Logo";
import { LangSwitcher } from "@/components/composed/LangSwitcher";
import { MobileNav } from "@/components/composed/MobileNav";
import { NavbarChrome } from "@/components/composed/NavbarChrome";
import { NavLink } from "@/components/composed/NavLink";
import { cn, breakPoints } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const NAV_ITEMS = [
  { translationKey: "about", href: "/sobre" },
  { translationKey: "projects", href: "/projetos" },
  { translationKey: "services", href: "/servicos" },
  { translationKey: "blog", href: "/blog" },
  { translationKey: "contact", href: "/contato" },
] as const;

const NAV_ITEMS_MOBILE = [
  { translationKey: "blog", href: "/blog" },
  { translationKey: "about", href: "/sobre" },
  { translationKey: "projects", href: "/projetos" },
  { translationKey: "services", href: "/servicos" },
  { translationKey: "contact", href: "/contato" },
] as const;

export async function Navbar() {
  const t = await getTranslations("shared");

  const desktopItems = NAV_ITEMS.map((item) => ({
    href: item.href,
    label: t(`navigation.${item.translationKey}`),
    isContact: item.translationKey === "contact",
  }));

  const mobileItems = NAV_ITEMS_MOBILE.map((item) => ({
    href: item.href,
    label: t(`navigation.${item.translationKey}`),
    isContact: item.translationKey === "contact",
  }));

  return (
    <NavbarChrome>
      <div
        className={cn(
          "mx-auto flex h-[var(--navbar-height)] w-full items-center justify-between gap-4 px-6",
          "transition-[max-width] duration-300 ease-in-out",
          breakPoints,
        )}
      >
        <Logo />

        <nav className="hidden h-full items-center gap-x-5 lg:flex">
          {desktopItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <div className="border-border/50 ml-1 flex h-full items-center border-l pl-4">
            <LangSwitcher />
          </div>
        </nav>

        <div className="flex h-full items-center gap-2 lg:hidden">
          <LangSwitcher />
          <MobileNav
            items={mobileItems}
            openLabel={t("actions.openMenu")}
            closeLabel={t("actions.closeMenu")}
          />
        </div>
      </div>
    </NavbarChrome>
  );
}
