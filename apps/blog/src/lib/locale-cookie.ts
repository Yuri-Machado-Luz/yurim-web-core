/** Cross-subdomain locale persistence for *.yurimachado.dev.br */

import { isProdDomain } from "./theme-cookie";

export type LocaleCode = "pt" | "en";

export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const LOCALE_COOKIE_DOMAIN = ".yurimachado.dev.br";

export function isLocaleCode(value: string): value is LocaleCode {
  return value === "pt" || value === "en";
}

/** Cookie write attributes (client-side). */
export function localeCookieAttributes(hostname: string): string {
  const parts = [
    `Path=/`,
    `Max-Age=${LOCALE_COOKIE_MAX_AGE}`,
    `SameSite=Lax`,
  ];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    parts.push("Secure");
  }
  if (isProdDomain(hostname)) {
    parts.push(`Domain=${LOCALE_COOKIE_DOMAIN}`);
  }
  return parts.join("; ");
}

export function readLocaleCookie(cookieString: string): LocaleCode | null {
  const match = cookieString.match(/(?:^|;\s*)locale=(pt|en)(?:;|$)/);
  if (!match) return null;
  return isLocaleCode(match[1]) ? match[1] : null;
}

export function writeLocaleCookie(locale: LocaleCode): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; ${localeCookieAttributes(window.location.hostname)}`;
}

/** Detect locale from pathname (path wins). */
export function localeFromPath(pathname: string): LocaleCode {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

/** Map a locale-agnostic path to the correct prefixed URL. */
export function localizedPath(path: string, locale: LocaleCode): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === "en") {
    if (normalized === "/") return "/en";
    if (normalized.startsWith("/en/") || normalized === "/en") return normalized;
    return `/en${normalized}`;
  }

  if (normalized === "/en") return "/";
  if (normalized.startsWith("/en/")) return normalized.slice(3) || "/";
  return normalized;
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

export function switchLocalePath(pathname: string, next: LocaleCode): string {
  const base = stripLocalePrefix(pathname);
  return localizedPath(base, next);
}
