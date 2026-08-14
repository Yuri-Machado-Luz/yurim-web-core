import { Logo } from "@/components/composed/Logo";
import { LangSwitcher } from "@/components/composed/LangSwitcher";
import { MobileNav } from "@/components/composed/MobileNav";
import { NavbarChrome } from "@/components/composed/NavbarChrome";
import { NavLink } from "@/components/composed/NavLink";
import { NAV_ITEMS, NAV_ITEMS_MOBILE } from "@/lib/nav-items";
import { cn, breakPoints } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

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
