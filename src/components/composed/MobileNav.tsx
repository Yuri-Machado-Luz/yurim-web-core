"use client";

import { MenuIcon } from "lucide-react";

import { Logo } from "@/components/composed/Logo";
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label={openLabel}
          className="border-border/80"
        >
          <MenuIcon className="size-4" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(100%,20rem)] gap-0 p-0">
        <SheetHeader className="border-border/60 flex-row items-center border-b px-5 py-4 pr-14">
          <SheetTitle className="sr-only">{openLabel}</SheetTitle>
          <SheetClose asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 py-5">
          {items.map((item) => (
            <SheetClose key={item.href} asChild>
              <NavLink
                item={item}
                className={
                  item.isContact
                    ? "mt-3 w-full justify-center"
                    : "hover:bg-muted/60 w-full justify-center rounded-lg px-3 py-2.5 text-base after:hidden"
                }
              />
            </SheetClose>
          ))}
        </nav>
        <span className="sr-only">{closeLabel}</span>
      </SheetContent>
    </Sheet>
  );
}
