"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const POINTER_SELECTOR =
  'a, button, [role="button"], [data-cursor="pointer"]';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(finePointer.matches && !reduceMotion.matches);
    };

    sync();
    finePointer.addEventListener("change", sync);
    reduceMotion.addEventListener("change", sync);
    return () => {
      finePointer.removeEventListener("change", sync);
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (raf.current != null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        const el = cursorRef.current;
        if (!el) return;
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      });
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    const over = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      setHovering(Boolean(target.closest(POINTER_SELECTOR)));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseover", over, { passive: true });

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseover", over);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] will-change-transform"
    >
      <span
        className={cn(
          "block h-6 w-6 rounded-full border-2 border-primary/45",
          pressed
            ? "custom-cursor-press"
            : hovering
              ? "custom-cursor-idle custom-cursor-pointer"
              : "custom-cursor-idle",
        )}
      />
    </div>
  );
}
