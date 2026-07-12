/** Cross-subdomain locale persistence for *.yurimachado.dev.br */

export const LOCALE_COOKIE = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
export const LOCALE_COOKIE_DOMAIN = ".yurimachado.dev.br";

export type LocaleCode = "pt" | "en";

export function isProdDomain(hostname: string): boolean {
  return (
    hostname === "yurimachado.dev.br" ||
    hostname.endsWith(".yurimachado.dev.br")
  );
}

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

export function writeLocaleCookie(locale: LocaleCode): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${locale}; ${localeCookieAttributes(window.location.hostname)}`;
}

export function readLocaleCookie(cookieString: string): LocaleCode | null {
  const match = cookieString.match(/(?:^|;\s*)locale=(pt|en)(?:;|$)/);
  return match ? (match[1] as LocaleCode) : null;
}

export function localeFromPath(pathname: string): LocaleCode {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

export function withLocale(pathname: string, locale: LocaleCode): string {
  const base = stripLocalePrefix(pathname);
  if (locale === "pt") return base;
  if (base === "/") return "/en";
  return `/en${base}`;
}
