"use client";

import { useTheme } from "next-themes";

import { Button, Icon } from "@/components";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Alternar tema"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        const next = isDark ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        setTheme(next);
      }}
    >
      <Icon name="sun" data-theme-icon="sun" className="h-5 w-5" />
      <Icon name="moon" data-theme-icon="moon" className="h-5 w-5" />
    </Button>
  );
}
