import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { MainSurface } from "./MainSurface";
import { Navbar } from "./Navbar";

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
