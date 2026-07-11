"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
};

export function FadeIn({
  children,
  delay = 0,
  initial = { opacity: 0, y: 20 },
  whileInView = { opacity: 1, y: 0 },
  transition = { duration: 0.6 },
  viewport = { once: true, margin: "-10%" },
  ...props
}: FadeInProps) {
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
