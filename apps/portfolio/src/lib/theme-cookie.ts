/** Cross-subdomain theme persistence for *.yurimachado.dev.br */

export const THEME_COOKIE = "theme";
export const THEME_STORAGE_KEY = "theme";
export const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
export const THEME_COOKIE_DOMAIN = ".yurimachado.dev.br";

export type ThemeValue = "light" | "dark" | "system";

export function isProdDomain(hostname: string): boolean {
  return (
    hostname === "yurimachado.dev.br" ||
    hostname.endsWith(".yurimachado.dev.br")
  );
}

/** Cookie write attributes (client-side). */
export function themeCookieAttributes(hostname: string): string {
  const parts = [
    `Path=/`,
    `Max-Age=${THEME_COOKIE_MAX_AGE}`,
    `SameSite=Lax`,
  ];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    parts.push("Secure");
  }
  if (isProdDomain(hostname)) {
    parts.push(`Domain=${THEME_COOKIE_DOMAIN}`);
  }
  return parts.join("; ");
}

export function readThemeCookie(cookieString: string): ThemeValue | null {
  const match = cookieString.match(/(?:^|;\s*)theme=(light|dark|system)(?:;|$)/);
  return match ? (match[1] as ThemeValue) : null;
}

export function writeThemeCookie(theme: ThemeValue): void {
  if (typeof document === "undefined") return;
  document.cookie = `${THEME_COOKIE}=${theme}; ${themeCookieAttributes(window.location.hostname)}`;
}

export function resolveIsDark(
  stored: ThemeValue | null,
  prefersDark: boolean,
): boolean {
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return prefersDark;
}
