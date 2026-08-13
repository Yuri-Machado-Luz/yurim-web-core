"use client";

import { useEffect, useState } from "react";

const DELTA_THRESHOLD = 8;
const TOP_OFFSET = 16;

type NavbarScrollState = {
  hidden: boolean;
  scrolled: boolean;
};

/**
 * Hides the navbar on scroll-down and shows it on scroll-up.
 * Disabled when the user prefers reduced motion.
 */
export function useNavbarScroll(): NavbarScrollState {
  const [state, setState] = useState<NavbarScrollState>({
    hidden: false,
    scrolled: false,
  });

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = window.scrollY;
    let hidden = false;
    let frame = 0;

    const apply = (next: NavbarScrollState) => {
      hidden = next.hidden;
      setState((prev) => {
        if (prev.hidden === next.hidden && prev.scrolled === next.scrolled) {
          return prev;
        }
        return next;
      });
    };

    const update = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      const scrolled = y > TOP_OFFSET;

      if (motionQuery.matches) {
        apply({ hidden: false, scrolled });
        lastY = y;
        return;
      }

      if (y <= TOP_OFFSET) {
        hidden = false;
      } else if (delta > DELTA_THRESHOLD) {
        hidden = true;
      } else if (delta < -DELTA_THRESHOLD) {
        hidden = false;
      }

      apply({ hidden, scrolled });
      lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    motionQuery.addEventListener("change", onScroll);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      motionQuery.removeEventListener("change", onScroll);
    };
  }, []);

  return state;
}
