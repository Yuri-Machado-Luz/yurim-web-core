"use client";

import { useEffect, useState } from "react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  isContact?: boolean;
};

type MobileNavProps = {
  items: NavItem[];
  openLabel: string;
  closeLabel: string;
};

export function MobileNav({ items, openLabel, closeLabel }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close);
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="lg:hidden">
      <button
        className="flex flex-col items-center justify-center gap-1.5 p-2"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? closeLabel : openLabel}
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
          {items.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              className={item.isContact ? "w-auto justify-end" : "w-auto text-center"}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
