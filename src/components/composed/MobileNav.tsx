"use client";

import { MenuIcon } from "lucide-react";

import { NavLink } from "@/components/composed/NavLink";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={openLabel}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-3/4 sm:max-w-xs">
          <SheetHeader>
            <SheetTitle className="sr-only">{openLabel}</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col items-stretch gap-3 px-6 pb-6">
            {items.map((item) => (
              <SheetClose key={item.href} asChild>
                <NavLink
                  item={item}
                  className={
                    item.isContact ? "w-full justify-center" : "w-full text-center"
                  }
                />
              </SheetClose>
            ))}
          </nav>
          <span className="sr-only">{closeLabel}</span>
        </SheetContent>
      </Sheet>
    </div>
  );
}
