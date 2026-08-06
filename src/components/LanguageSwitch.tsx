"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation"; // Garanta que aponta para o seu arquivo de navigation

export function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Define o próximo idioma
  const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";

  return (
    <Link
      href={pathname}
      locale={nextLocale}
      className="border-border bg-background hover:bg-accent hover:text-accent-foreground items-end justify-end rounded-md border px-2 py-1 text-xs font-medium transition-colors"
    >
      {locale === "pt-BR" ? (
        <div className="flex items-center gap-1">
          <span className="fi fi-us rounded-full"></span>
          ᴜѕ-ᴇɴ
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <span className="fi fi-br rounded-full"></span>
          ᴘᴛ-ʙʀ
        </div>
      )}
    </Link>
  );
}
