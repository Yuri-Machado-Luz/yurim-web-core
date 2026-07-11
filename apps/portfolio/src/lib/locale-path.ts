import type { LocaleCode } from "./i18n";

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

/** Strip `/en` prefix to get the canonical path. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Detect locale from pathname (path wins). */
export function localeFromPath(pathname: string): LocaleCode {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

/** Swap locale while keeping the same logical page. */
export function switchLocalePath(pathname: string, next: LocaleCode): string {
  const base = stripLocalePrefix(pathname);
  return localizedPath(base, next);
}
