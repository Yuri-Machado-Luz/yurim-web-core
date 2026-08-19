"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { easeOut, staggerDelay, viewportOnce } from "@/lib/motion";

type StaggerItemProps = {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "li" | "div" | "article" | "p";
  /** Inherit parent StaggerGroup variants instead of independent whileInView. */
  nested?: boolean;
};

export function StaggerItem({
  children,
  index = 0,
  className,
  as = "li",
  nested = false,
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Comp =
    as === "li"
      ? motion.li
      : as === "article"
        ? motion.article
        : as === "p"
          ? motion.p
          : motion.div;

  if (reduceMotion) {
    const Static =
      as === "li"
        ? "li"
        : as === "article"
          ? "article"
          : as === "p"
            ? "p"
            : "div";
    return <Static className={className}>{children}</Static>;
  }

  if (nested) {
    return (
      <Comp
        className={className}
        variants={{
          hidden: { opacity: 0, y: 16 },
          visible: { opacity: 1, y: 0, transition: easeOut },
        }}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...easeOut, delay: staggerDelay(index) }}
    >
      {children}
    </Comp>
  );
}
