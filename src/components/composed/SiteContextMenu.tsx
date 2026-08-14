"use client";

import {
  BookOpen,
  Briefcase,
  House,
  Mail,
  Server,
  Share2,
  UserRound,
} from "lucide-react";
import { useTranslations } from "next-intl";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

import { Link } from "@/i18n/navigation";
import {
  CONTEXT_NAV_ITEMS,
  type NavTranslationKey,
} from "@/lib/nav-items";
import { cn } from "@/lib/utils";

const MENU_PADDING = 8;

const NAV_ICONS: Record<
  NavTranslationKey,
  ComponentType<{ className?: string }>
> = {
  home: House,
  about: UserRound,
  projects: Briefcase,
  services: Server,
  blog: BookOpen,
  contact: Mail,
};

function isFormField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']"),
  );
}

type MenuPoint = {
  x: number;
  y: number;
};

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground outline-none select-none hover:bg-muted/60 focus-visible:bg-muted/60";

export function SiteContextMenu() {
  const t = useTranslations("shared");
  const [menu, setMenu] = useState<MenuPoint | null>(null);
  const [position, setPosition] = useState<MenuPoint | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openAt = (event: MouseEvent) => {
      if (isFormField(event.target)) return;
      event.preventDefault();
      setMenu({ x: event.clientX, y: event.clientY });
    };

    const close = () => setMenu(null);

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (menuRef.current?.contains(event.target as Node)) return;
      close();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("contextmenu", openAt);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("scroll", close, true);

    return () => {
      document.removeEventListener("contextmenu", openAt);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("scroll", close, true);
    };
  }, []);

  useLayoutEffect(() => {
    if (!menu || !menuRef.current) {
      setPosition(menu);
      return;
    }

    const rect = menuRef.current.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - MENU_PADDING;
    const maxY = window.innerHeight - rect.height - MENU_PADDING;

    setPosition({
      x: Math.max(MENU_PADDING, Math.min(menu.x, maxX)),
      y: Math.max(MENU_PADDING, Math.min(menu.y, maxY)),
    });
  }, [menu]);

  function closeMenu() {
    setMenu(null);
    setPosition(null);
  }

  async function handleShare() {
    const shareData = { title: document.title, url: window.location.href };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // usuário cancelou o compartilhamento
      }
      closeMenu();
      return;
    }

    await navigator.clipboard.writeText(shareData.url);
    toast.success(t("contextMenu.linkCopied"));
    closeMenu();
  }

  if (!menu) return null;

  return createPortal(
    <div
      ref={menuRef}
      role="menu"
      aria-label={t("contextMenu.label")}
      className={cn(
        "fixed z-[var(--z-overlay)] min-w-52 overflow-hidden rounded-lg p-1",
        "border-border/60 bg-popover/90 text-popover-foreground backdrop-blur-sm",
        "shadow-[var(--shadow-card-subtle)] ring-1 ring-foreground/5",
      )}
      style={{
        left: position?.x ?? menu.x,
        top: position?.y ?? menu.y,
      }}
    >
      <p className="px-2.5 py-1.5 text-xs font-semibold text-muted-foreground">
        {t("contextMenu.navigateTo")}
      </p>
      {CONTEXT_NAV_ITEMS.map((item) => {
        const Icon = NAV_ICONS[item.translationKey];
        return (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className={menuItemClass}
            onClick={closeMenu}
          >
            <Icon className="size-4 opacity-80" />
            {t(`navigation.${item.translationKey}`)}
          </Link>
        );
      })}
      <div className="my-1 h-px bg-border/80" role="separator" />
      <button
        type="button"
        role="menuitem"
        className={menuItemClass}
        onClick={handleShare}
      >
        <Share2 className="size-4 opacity-80" />
        {t("contextMenu.share")}
      </button>
    </div>,
    document.body,
  );
}
