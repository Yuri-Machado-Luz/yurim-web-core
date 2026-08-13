"use client";

import { useLocale } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const FLAG_PT = (
  <svg viewBox="0 0 640 480" className="size-3.5 rounded-[2px]" aria-hidden>
    <rect width="640" height="480" fill="#009c3b" />
    <path fill="#ffdf00" d="m320 60 220 180-220 180L100 240z" />
    <circle cx="320" cy="240" r="90" fill="#002776" />
  </svg>
);

const FLAG_US = (
  <svg viewBox="0 0 640 480" className="size-3.5 rounded-[2px]" aria-hidden>
    <path fill="#bd3d44" d="M0 0h640v480H0" />
    <path
      stroke="#fff"
      strokeWidth="37"
      d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"
    />
    <path fill="#192f5d" d="M0 0h247v259H0" />
  </svg>
);

export function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";
  const isPt = locale === "pt-BR";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        // outline defaults to dark:bg-transparent + rounded-4xl; on a dark bar that
        // reads as side-only arcs. Keep sm height (match Contato) with a solid chip.
        "h-8 gap-1.5 rounded-full border-border bg-secondary px-2.5 font-medium tracking-wide",
        "hover:bg-muted dark:bg-secondary dark:hover:bg-muted",
      )}
      aria-label={isPt ? "Switch to English" : "Mudar para Português"}
    >
      {isPt ? (
        <>
          {FLAG_US}
          <span>EN</span>
        </>
      ) : (
        <>
          {FLAG_PT}
          <span>PT</span>
        </>
      )}
    </Link>
  );
}
