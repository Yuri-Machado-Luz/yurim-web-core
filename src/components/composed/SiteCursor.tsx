"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not(:disabled)",
  "[role='button']:not([aria-disabled='true'])",
  "[role='link']",
  "summary",
  "label[for]",
  "select:not(:disabled)",
  "input[type='checkbox']:not(:disabled)",
  "input[type='radio']:not(:disabled)",
  "input[type='submit']:not(:disabled)",
  "input[type='button']:not(:disabled)",
  "input[type='reset']:not(:disabled)",
  "input[type='text']",
  "input[type='email']",
  "input[type='search']",
  "input[type='url']",
  "input[type='tel']",
  "input[type='password']",
  "input[type='number']",
  "textarea",
  "[contenteditable='true']",
  ".cursor-pointer",
].join(",");

const HOTSPOT_X = 7;
const HOTSPOT_Y = 7;

function canUseCustomCursor() {
  return (
    window.matchMedia("(hover: hover)").matches &&
    window.matchMedia("(pointer: fine)").matches
  );
}

export function SiteCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover)");
    const fineMq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(canUseCustomCursor());
    sync();
    hoverMq.addEventListener("change", sync);
    fineMq.addEventListener("change", sync);
    return () => {
      hoverMq.removeEventListener("change", sync);
      fineMq.removeEventListener("change", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!enabled || !root) {
      delete document.documentElement.dataset.customCursor;
      return;
    }

    document.documentElement.dataset.customCursor = "";

    const onMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      root.style.transform = `translate3d(${clientX - HOTSPOT_X}px, ${clientY - HOTSPOT_Y}px, 0)`;

      const el = document.elementFromPoint(clientX, clientY);
      if (!(el instanceof Element)) {
        root.classList.remove("is-hover", "is-hidden");
        return;
      }

      const overDisabled = Boolean(
        el.closest(":disabled, [aria-disabled='true']"),
      );
      const overInteractive =
        !overDisabled && Boolean(el.closest(INTERACTIVE_SELECTOR));

      root.classList.toggle("is-hidden", overDisabled);
      root.classList.toggle("is-hover", overInteractive);
    };

    const onLeave = () => {
      root.classList.add("is-hidden");
      root.classList.remove("is-hover");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      delete document.documentElement.dataset.customCursor;
      root.classList.remove("is-hover", "is-hidden");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="site-cursor pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <div className="site-cursor__stack">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="site-cursor__glow"
          src="/cursor/Normal.cur"
          alt=""
          width={32}
          height={32}
          draggable={false}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="site-cursor__glyph"
          src="/cursor/Normal.cur"
          alt=""
          width={32}
          height={32}
          draggable={false}
        />
      </div>
    </div>
  );
}
