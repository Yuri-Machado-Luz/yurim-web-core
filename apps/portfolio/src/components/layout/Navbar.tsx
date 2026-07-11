"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { BRAND } from "@/assets";
import {
  Button,
  Icon,
  LocaleToggle,
  Section,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  ThemeToggle,
} from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import CONFIG from "@/lib/config";
import { localizedPath, stripLocalePrefix } from "@/lib/locale-path";
import { cn } from "@/lib/utils";

type NavKey = (typeof CONFIG.nav.pages)[number]["key"];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const lastAnimDir = useRef<"up" | "down" | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const messages = useMessages();
  const basePath = stripLocalePrefix(pathname);

  const navLinks = CONFIG.nav.pages.filter((p) => !("cta" in p && p.cta));
  const ctaPage = CONFIG.nav.pages.find((p) => "cta" in p && p.cta);

  const labelFor = (key: NavKey) => messages.nav[key];

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 0);

      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (Math.abs(delta) < 4) return;

      if (delta > 0 && y > 60) {
        if (lastAnimDir.current === "down") return;
        lastAnimDir.current = "down";
        setNavHidden(true);
      } else if (delta < 0) {
        if (lastAnimDir.current === "up") return;
        lastAnimDir.current = "up";
        setNavHidden(false);
      }
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastAnimDir.current = null;
    const frame = requestAnimationFrame(() => setNavHidden(false));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string, external?: boolean) => {
    if (external) return false;
    const localized = localizedPath(href, locale);
    const targetBase = stripLocalePrefix(localized);
    return basePath === targetBase || basePath.startsWith(`${targetBase}/`);
  };

  const renderNavLink = (
    page: (typeof navLinks)[number],
    className: string,
    onClick?: () => void,
  ) => {
    const external = "external" in page && page.external;
    const active = isActive(page.href, external);
    const classes = cn(className, active && "nav-link-active");
    const label = labelFor(page.key);

    if (external) {
      return (
        <a href={page.href} className={classes} onClick={onClick}>
          {label}
        </a>
      );
    }

    return (
      <Link
        href={localizedPath(page.href, locale)}
        className={classes}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  const homeHref = localizedPath("/", locale);

  return (
    <motion.header
      id="navbar"
      className={cn(
        "navbar fixed top-0 left-0 z-50 w-full backdrop-blur-3xl will-change-transform",
        isScrolled && "is-scrolled",
      )}
      initial={false}
      animate={{ y: navHidden ? "-100%" : "0%" }}
      transition={{
        duration: 0.3,
        ease: navHidden ? [0.4, 0, 1, 1] : [0, 0, 0.2, 1],
      }}
    >
      <Section
        as="nav"
        spacing="none"
        className="flex items-center justify-between py-4 font-medium md:py-5"
      >
        <Link
          href={homeHref}
          aria-label={messages.nav.home}
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src={BRAND.textLogoDark}
            loading="eager"
            alt="YML"
            className="h-8 w-auto md:h-10 dark:hidden"
          />
          <Image
            src={BRAND.textLogoLight}
            loading="eager"
            alt="YML"
            className="hidden h-8 w-auto md:h-10 dark:block"
          />
        </Link>

        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((page) => (
              <span key={page.href}>{renderNavLink(page, "nav-link")}</span>
            ))}
          </div>
          {ctaPage && (
            <Button asChild className="ml-2 hidden md:inline-flex">
              <Link href={localizedPath(ctaPage.href, locale)}>
                {labelFor(ctaPage.key)}
              </Link>
            </Button>
          )}
          <LocaleToggle />
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="nav-icon-btn border border-border md:hidden"
                aria-label={messages.nav.openMenu}
              >
                <Icon name="menu" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100%,20rem)] flex-col gap-0 border-border bg-background/97 p-0 backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-1 px-4 pt-6">
                {navLinks.map((page) => (
                  <span key={page.href}>
                    {renderNavLink(page, "mobile-nav-link", () =>
                      setMobileOpen(false),
                    )}
                  </span>
                ))}
              </nav>
              {ctaPage && (
                <>
                  <Separator className="mx-4 my-3" />
                  <SheetFooter className="px-4 pb-6">
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href={localizedPath(ctaPage.href, locale)}>
                          {labelFor(ctaPage.key)}
                        </Link>
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </Section>
    </motion.header>
  );
}
