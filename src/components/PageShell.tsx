import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { cn, breakPoints } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  locale: string; // necessário para o Navbar
};

export function PageShell({ children, className, locale }: PageShellProps) {
  return (
    <>
      <Navbar locale={locale} />
      <main
        className={cn(
          "mx-auto w-full flex-1 flex-col gap-8 px-6 pb-16",
          "transition-[max-width] duration-300 ease-in-out",
          breakPoints,
          className,
        )}
      >
        {children}
      </main>
    </>
  );
}
