import type { ReactNode } from "react";

import { Footer } from "@/components/composed/Footer";
import { MainSurface } from "@/components/composed/MainSurface";
import { Navbar } from "@/components/composed/Navbar";

type PageShellProps = {
  children: ReactNode;
  className?: string;
};

export function PageShell({ children, className }: PageShellProps) {
  return (
    <div className="relative z-[1] flex min-h-full flex-1 flex-col">
      <Navbar />
      <MainSurface className={className}>{children}</MainSurface>
      <Footer />
    </div>
  );
}
