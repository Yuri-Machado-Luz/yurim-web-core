"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { staggerContainer, viewportOnce } from "@/lib/motion";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "section";
};

export function StaggerGroup({
  children,
  className,
  as = "div",
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();
  const Comp =
    as === "ul" ? motion.ul : as === "section" ? motion.section : motion.div;

  if (reduceMotion) {
    const Static = as === "ul" ? "ul" : as === "section" ? "section" : "div";
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}
