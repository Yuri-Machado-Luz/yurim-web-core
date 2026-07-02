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
  Section,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  ThemeToggle,
} from "@/components";
import CONFIG from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = CONFIG.nav.pages.filter((p) => !("cta" in p && p.cta));
const ctaPage = CONFIG.nav.pages.find((p) => "cta" in p && p.cta);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const lastAnimDir = useRef<"up" | "down" | null>(null);
  const pathname = usePathname();

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
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const renderNavLink = (
    page: (typeof navLinks)[number],
    className: string,
    onClick?: () => void,
  ) => {
    const active = isActive(page.href, "external" in page && page.external);
    const classes = cn(className, active && "nav-link-active");

    if ("external" in page && page.external) {
      return (
        <a href={page.href} className={classes} onClick={onClick}>
          {page.label}
        </a>
      );
    }

    return (
      <Link href={page.href} className={classes} onClick={onClick}>
        {page.label}
      </Link>
    );
  };

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
          href="/"
          aria-label="Início"
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
              <Link href={ctaPage.href}>{ctaPage.label}</Link>
            </Button>
          )}
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-lg border border-border text-muted-foreground hover:text-primary md:hidden"
                aria-label="Abrir menu"
              >
                <Icon name="menu" className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100%,20rem)] flex-col gap-0 border-border bg-background/97 p-0 backdrop-blur-2xl"
            >
              <nav className="flex flex-col gap-1 px-4 pt-6">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className={cn(
                      "mobile-nav-link",
                      pathname === "/" && "mobile-nav-link-active",
                    )}
                  >
                    Início
                  </Link>
                </SheetClose>
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
                        <Link href={ctaPage.href}>{ctaPage.label}</Link>
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
