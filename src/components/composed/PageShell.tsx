import { breakPoints, cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <Navbar />
      <main
        className={cn(
          "mx-auto flex w-full flex-1 flex-col gap-8 px-6 pb-10 md:pb-12",
          "transition-[max-width] duration-300 ease-out",
          breakPoints,
          className,
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
