"use client";

import { useTranslations } from "next-intl";

import { SocialLinks } from "./SocialLinks";
import { Link, usePathname } from "@/i18n/navigation";
import { breakPoints, cn } from "@/lib/utils";
import { SITE } from "@/meta";

export function Footer() {
  const t = useTranslations("shared.footer");
  const pathname = usePathname();
  const year = new Date().getFullYear();
  const hideSocial = pathname === "/contato";
  const isContact = hideSocial;

  return (
    <footer
      className={cn(
        "border-border/60 relative z-[1] border-t",
        "bg-background/80 backdrop-blur-md",
        isContact ? "py-4 md:py-5" : "py-8 md:py-10",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full flex-col items-center justify-between px-6",
          "sm:flex-row sm:items-center",
          "transition-[max-width] duration-300 ease-out",
          isContact ? "gap-3" : "gap-6",
          breakPoints,
        )}
      >
        <p className="text-muted-foreground text-center text-sm sm:text-left">
          <span className="text-foreground/90 pr-1 font-medium">
            {SITE.author}
          </span>
          <span>
            © {year}. {t("rights")}
          </span>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5 sm:justify-end">
          <Link
            href="/blog/changelog"
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors duration-300 ease-out hover:underline"
          >
            {t("changelog")}
          </Link>
          <SocialLinks size="sm" className={cn(hideSocial && "hidden")} />
        </div>
      </div>
    </footer>
  );
}
