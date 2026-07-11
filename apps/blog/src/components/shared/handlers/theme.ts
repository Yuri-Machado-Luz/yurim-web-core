import {
  THEME_STORAGE_KEY,
  writeThemeCookie,
  type ThemeValue,
} from "@/lib/theme-cookie";

export { THEME_STORAGE_KEY };
export type Theme = "light" | "dark";

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function resolveTheme(stored: Theme | null, system: Theme): Theme {
  return stored ?? system;
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.theme = theme;
}

export function setTheme(theme: Theme) {
  applyTheme(theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  writeThemeCookie(theme as ThemeValue);
}

export function getCurrentTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function toggleTheme(): Theme {
  const next = getCurrentTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
