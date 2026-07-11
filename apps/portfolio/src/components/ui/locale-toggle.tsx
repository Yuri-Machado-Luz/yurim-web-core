"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useLocale, useMessages } from "@/components/locale-provider";
import { writeLocaleCookie } from "@/lib/locale-cookie";
import { switchLocalePath } from "@/lib/locale-path";

export function LocaleToggle() {
  const locale = useLocale();
  const messages = useMessages();
  const pathname = usePathname();
  const next = locale === "pt" ? "en" : "pt";
  const href = switchLocalePath(pathname, next);

  return (
    <Link
      href={href}
      aria-label={messages.nav.toggleLocale}
      onClick={() => writeLocaleCookie(next)}
      className="nav-icon-btn font-mono text-xs font-semibold tracking-wide"
    >
      {messages.locale.other}
    </Link>
  );
}
