"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Logo } from "@/ui/Logo";
import { LangSwitcher } from "@/components/LanguageSwitch";
import { cn, breakPoints } from "@/lib/utils";
import { buttonVariants } from "@/components/raw/button";

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

export function Navbar() {
  const pathname = usePathname();
  const t = useTranslations("shared");
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLinkClick = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <header className="border-border/60 bg-background/80 selection-none sticky top-0 z-40 border-b backdrop-blur-md">
      <div
        className={cn(
          "mx-auto flex w-full items-center justify-between gap-4 px-6 py-4",
          "transition-[max-width] duration-300 ease-in-out",
          breakPoints,
        )}
      >
        <Logo
          className={cn(
            "transition-colors duration-300",
            isActive("/")
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-x-6 gap-y-1 lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const isContact = item.translationKey === "contact";

            const linkClasses = cn(
              "relative text-sm font-medium transition-colors",
              "hover:text-foreground underline-offset-4",
              active
                ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                : "text-muted-foreground hover:underline",
            );

            const buttonClasses = buttonVariants({
              variant: active ? "secondary" : "default",
              size: "sm",
            });

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isContact ? buttonClasses : linkClasses}
                aria-current={active ? "page" : undefined}
              >
                {t(`navigation.${item.translationKey}`)}
              </Link>
            );
          })}
          <LangSwitcher />
        </nav>

        {/* Mobile: LangSwitcher + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher />
          <button
            className="flex flex-col items-center justify-center gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            <span
              className={cn(
                "bg-foreground block h-0.5 w-6 rounded-full transition-transform duration-300",
                isOpen ? "translate-y-2 rotate-45" : "",
              )}
            />
            <span
              className={cn(
                "bg-foreground block h-0.5 w-6 rounded-full transition-opacity duration-300",
                isOpen ? "opacity-0" : "",
              )}
            />
            <span
              className={cn(
                "bg-foreground block h-0.5 w-6 rounded-full transition-transform duration-300",
                isOpen ? "-translate-y-2 -rotate-45" : "",
              )}
            />
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        <div
          className={cn(
            "absolute top-full right-0 z-50 overflow-hidden",
            "bg-background/95 w-1/2 backdrop-blur-md",
            "transition-all duration-300 ease-in-out",
            isOpen
              ? "border-border/60 max-h-[80vh] border-b border-l opacity-100 shadow-lg"
              : "max-h-0 border-0 opacity-0 shadow-none",
          )}
        >
          <nav className="flex flex-col items-center gap-4 px-6 py-6">
            {NAV_ITEMS_MOBILE.map((item) => {
              const active = isActive(item.href);
              const isContact = item.translationKey === "contact";

              const linkClasses = cn(
                "relative w-auto text-center text-sm font-medium transition-colors",
                "hover:text-foreground underline-offset-4",
                active
                  ? "text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                  : "text-muted-foreground hover:underline",
              );

              const buttonClasses = buttonVariants({
                variant: active ? "secondary" : "default",
                size: "sm",
                className: "w-auto justify-end",
              });

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isContact ? buttonClasses : linkClasses}
                  aria-current={active ? "page" : undefined}
                  onClick={handleLinkClick}
                >
                  {t(`navigation.${item.translationKey}`)}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
