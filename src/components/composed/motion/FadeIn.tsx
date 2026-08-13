"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ComponentProps, ReactNode } from "react";

import { easeOut, viewportOnce } from "@/lib/motion";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function FadeIn({
  children,
  delay = 0,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  transition = easeOut,
  viewport = viewportOnce,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div {...(props as ComponentProps<"div">)}>{children}</div>;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      transition={{ ...transition, delay }}
      viewport={viewport}
      {...props}
    >
      {children}
    </motion.div>
  );
}
