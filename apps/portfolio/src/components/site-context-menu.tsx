"use client";

import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import type { IconName } from "@/assets/icons";
import { Icon } from "@/components/ui";
import CONFIG from "@/lib/config";
import { cn } from "@/lib/utils";

function isFormField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;

  return Boolean(
    target.closest("input, textarea, select, [contenteditable='true']"),
  );
}

const NAV_ITEMS: {
  label: string;
  href: string;
  icon: IconName;
  external?: boolean;
}[] = [
  { label: "Início", href: "/", icon: "layout" },
  { label: "Projetos", href: "/projetos", icon: "briefcase" },
  { label: "Sobre", href: "/sobre", icon: "brain" },
  { label: "Blog", href: CONFIG.sites.blog, icon: "book-open", external: true },
  { label: "Contato", href: "/contato", icon: "envelope" },
];

type MenuState = {
  x: number;
  y: number;
};

const MENU_PADDING = 8;

const menuPanelClass =
  "z-50 min-w-52 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95";

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground outline-none select-none hover:bg-secondary";

export function SiteContextMenu({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState<MenuState | null>(null);
  const [position, setPosition] = useState<MenuState | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

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
    setCopied(true);
    closeMenu();
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <>
      {children}

      {mounted &&
        menu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Menu de navegação"
            className={cn(menuPanelClass, "fixed")}
            style={{
              left: position?.x ?? menu.x,
              top: position?.y ?? menu.y,
            }}
          >
            <p className="px-2.5 py-1.5 text-xs font-semibold text-muted-foreground">
              Navegar para
            </p>
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={menuItemClass}
                  onClick={closeMenu}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                  <Icon
                    name="external-link"
                    className="ml-auto h-3 w-3 opacity-60"
                  />
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={menuItemClass}
                  onClick={closeMenu}
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </Link>
              ),
            )}
            <div className="my-1 h-px bg-border" role="separator" />
            <button
              type="button"
              role="menuitem"
              className={menuItemClass}
              onClick={handleShare}
            >
              <Icon name="share" className="h-4 w-4" />
              Compartilhar
            </button>
          </div>,
          document.body,
        )}

      {copied && (
        <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-border bg-popover px-4 py-2 text-sm text-popover-foreground shadow-lg">
          Link copiado!
        </div>
      )}
    </>
  );
}
