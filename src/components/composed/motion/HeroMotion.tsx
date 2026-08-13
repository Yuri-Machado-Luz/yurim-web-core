"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

import {
  easeOut,
  heroWordContainer,
  heroWordItem,
  scaleInVariants,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeroTitleProps = {
  title: string;
  className?: string;
};

export function HeroTitle({ title, className }: HeroTitleProps) {
  const reduceMotion = useReducedMotion();
  const words = title.split(" ");

  if (reduceMotion) {
    return <h1 className={className}>{title}</h1>;
  }

  return (
    <motion.h1
      className={className}
      variants={heroWordContainer}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={heroWordItem}
          className="mr-[0.25em] inline-block last:mr-0"
        >
          {word}
        </motion.span>
      ))}
    </motion.h1>
  );
}

type HeroActionsProps = {
  children: ReactNode;
  className?: string;
};

export function HeroActions({ children, className }: HeroActionsProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...easeOut, delay: 0.45 }}
    >
      {children}
    </motion.div>
  );
}

type HeroPhotoProps = {
  children: ReactNode;
  className?: string;
};

/** Visible from `lg+` via CSS; motion entrance avoids matchMedia hydration flash. */
export function HeroPhoto({ children, className }: HeroPhotoProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className={cn("hidden lg:flex", className)}>{children}</div>
    );
  }

  return (
    <div className={cn("hidden lg:flex", className)}>
      <AnimatePresence>
        <motion.div
          key="hero-photo"
          className="flex items-center justify-center"
          variants={scaleInVariants}
          initial="hidden"
          animate="visible"
          transition={{ ...easeOut, delay: 0.35 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
