"use client";

import { BRAND } from "@/assets";
import {
  Button,
  Sheet,
  SheetContent,
  SheetTrigger,
  ThemeToggle,
} from "@/components";
import CONFIG from "@/lib/config";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
      className={`sticky top-0 z-40 w-full border-b transition-all ${
        isScrolled
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-background"
      }`}
    >
      <nav className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
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
            className="h-6 w-auto hidden dark:block"
          />
        </Link>
        <div className="flex-1"></div>
        {/* Right: CTA (desktop) + ThemeToggle + Sheet (mobile) */}
        <div className="flex items-end justify-end gap-1">
          <div className="hidden items-end gap-1 md:flex">
            {navLinks.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(page.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
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
              <div className="mt-8 flex flex-col gap-4">
                {CONFIG.nav.pages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(page.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
