"use client";

import { useTheme } from "next-themes";

import { Icon } from "@/components";
import { useMessages } from "@/components/locale-provider";
import { writeThemeCookie } from "@/lib/theme-cookie";

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const messages = useMessages();

  return (
    <button
      type="button"
      className="nav-icon-btn"
      aria-label={messages.nav.toggleTheme}
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        setTheme(next);
        writeThemeCookie(next);
      }}
    >
      <Icon name="sun" data-theme-icon="sun" />
      <Icon name="moon" data-theme-icon="moon" />
    </button>
  );
}
