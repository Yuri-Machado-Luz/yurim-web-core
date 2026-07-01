"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BRAND } from "@/assets";
import {
  Button,
  Section,
  Sheet,
  SheetContent,
  SheetTrigger,
  ThemeToggle,
} from "@/components";
import CONFIG from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = CONFIG.nav.pages.filter((p) => !("cta" in p && p.cta));
const ctaPage = CONFIG.nav.pages.find((p) => "cta" in p && p.cta);

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b transition-all",
        isScrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <Section
        as="nav"
        spacing="none"
        className="flex h-16 items-center justify-between"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Início"
          className="transition-opacity hover:opacity-80"
        >
          <Image
            src={BRAND.textLogoDark}
            loading="eager"
            alt="YML"
            className="h-6 w-auto dark:hidden"
          />
          <Image
            src={BRAND.textLogoLight}
            loading="eager"
            alt="YML"
            className="hidden h-6 w-auto dark:block"
          />
        </Link>

        {/* Right: nav links + CTA (desktop) + ThemeToggle + Sheet (mobile) */}
        <div className="flex items-center gap-1">
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  "nav-link",
                  isActive(page.href) && "text-foreground",
                )}
              >
                {page.label}
              </Link>
            ))}
          </div>
          {ctaPage && (
            <Button asChild className="ml-2 hidden md:inline-flex">
              <Link href={ctaPage.href}>{ctaPage.label}</Link>
            </Button>
          )}
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="mt-8 flex flex-col gap-4">
                {CONFIG.nav.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={cn(
                      "nav-link",
                      isActive(page.href) && "text-foreground",
                    )}
                  >
                    {page.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </Section>
    </header>
  );
}
