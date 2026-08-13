"use client";

import type { ReactNode } from "react";

import { useNavbarScroll } from "@/hooks/use-navbar-scroll";
import { cn } from "@/lib/utils";

type NavbarChromeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Sticky shell + slide hide/show.
 * Transform lives on the sticky header (not the blur layer) so
 * `-translate-y-full` animates as a slide, not an instant clip/fade.
 */
export function NavbarChrome({ children, className }: NavbarChromeProps) {
  const { hidden, scrolled } = useNavbarScroll();

  return (
    <header
      data-slot="navbar"
      data-hidden={hidden ? "true" : "false"}
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "sticky top-0 z-[var(--z-navbar)] w-full",
        // One transform utility at a time (Tailwind source order ≠ className order).
        "transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden
          ? "pointer-events-none -translate-y-full"
          : "translate-y-0",
        className,
      )}
    >
      <div
        className={cn(
          "bg-background/80 flex w-full items-center border-b border-border/60",
          "backdrop-blur-md select-none",
          "transition-[border-color,box-shadow,background-color] duration-300 ease-out",
          "motion-reduce:transition-none",
          scrolled &&
            "border-border/80 bg-background/90 shadow-[var(--shadow-card-subtle)]",
        )}
      >
        {children}
      </div>
    </header>
  );
}
