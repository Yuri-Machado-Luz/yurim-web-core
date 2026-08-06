import { Logo } from "@/components/composed/Logo";
import { LangSwitcher } from "@/components/LanguageSwitch";
import { MobileNav } from "@/components/MobileNav";
import { NavLink } from "@/components/NavLink";
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
    <header className="border-border/60 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md select-none">
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between gap-4 px-6 py-4",
          "transition-[max-width] duration-300 ease-in-out",
          breakPoints,
        )}
      >
        <Logo className="text-muted-foreground hover:text-foreground transition-colors duration-300" />

        <nav className="hidden items-center gap-x-6 gap-y-1 lg:flex">
          {desktopItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <LangSwitcher />
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher />
          <MobileNav
            items={mobileItems}
            openLabel={t("actions.openMenu")}
            closeLabel={t("actions.closeMenu")}
          />
        </div>
      </div>
    </header>
  );
}
