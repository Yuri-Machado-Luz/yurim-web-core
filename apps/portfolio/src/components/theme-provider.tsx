"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";
import { useEffect } from "react";

import {
  THEME_STORAGE_KEY,
  type ThemeValue,
  writeThemeCookie,
} from "@/lib/theme-cookie";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    try {
      const ls = localStorage.getItem(THEME_STORAGE_KEY);
      if (ls === "light" || ls === "dark" || ls === "system") {
        writeThemeCookie(ls);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <NextThemesProvider storageKey={THEME_STORAGE_KEY} {...props}>
      {children}
    </NextThemesProvider>
  );
}
