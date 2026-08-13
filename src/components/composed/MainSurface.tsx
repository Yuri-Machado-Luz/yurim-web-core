"use client";

import type { ReactNode } from "react";

import { usePathname } from "@/i18n/navigation";
import { breakPoints, cn } from "@/lib/utils";

type MainSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export function MainSurface({ children, className }: MainSurfaceProps) {
  const pathname = usePathname();
  const isContact = pathname === "/contato";

  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-1 flex-col px-6",
        "transition-[max-width] duration-300 ease-out",
        isContact ? "gap-4 pb-4 md:gap-5 md:pb-5" : "gap-8 pb-10 md:pb-12",
        breakPoints,
        className,
      )}
    >
      {children}
    </main>
  );
}
