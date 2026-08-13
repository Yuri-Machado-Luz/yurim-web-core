"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { easeOut, staggerDelay, viewportOnce } from "@/lib/motion";

type StaggerItemProps = {
  children: ReactNode;
  index: number;
  className?: string;
  as?: "li" | "div";
};

export function StaggerItem({
  children,
  index,
  className,
  as = "li",
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const Comp = as === "li" ? motion.li : motion.div;

  if (reduceMotion) {
    const Static = as === "li" ? "li" : "div";
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ ...easeOut, delay: staggerDelay(index) }}
      layout
    >
      {children}
    </Comp>
  );
}
