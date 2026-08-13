"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  easeOut,
  fadeLeftVariants,
  fadeRightVariants,
  staggerDelay,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

type ExperienceTimelineProps = {
  items: ExperienceItem[];
};

/** Item locks as active when its top crosses this viewport ratio. */
const LOCK_RATIO = 0.4;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function ExperienceCard({
  item,
  isActive,
  reduceMotion,
}: {
  item: ExperienceItem;
  isActive: boolean;
  reduceMotion: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-glass border-border/60 rounded-2xl border p-6 md:min-h-[11rem] md:p-8",
        "transition-[border-color,box-shadow,opacity,transform] duration-300 ease-out",
        isActive
          ? "border-primary/45 card-glow-subtle opacity-100 shadow-[var(--shadow-card-hover-subtle)]"
          : "opacity-45",
        !reduceMotion && isActive && "md:scale-[1.015]",
      )}
    >
      <h3
        className={cn(
          "text-lg font-semibold transition-colors duration-300 md:text-xl",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {item.role}
      </h3>
      <div className="text-muted-foreground mt-1 mb-4 flex flex-wrap gap-x-3 gap-y-1 text-sm md:text-base">
        <span className="text-foreground/80 font-medium">{item.company}</span>
        <span>{item.period}</span>
      </div>
      <ul className="flex flex-col gap-2">
        {item.bullets.map((bullet) => (
          <li
            key={bullet}
            className={cn(
              "relative pl-4 text-sm leading-relaxed before:absolute before:left-0 before:font-bold before:content-['·'] md:text-[0.95rem]",
              isActive
                ? "text-muted-foreground before:text-primary"
                : "text-muted-foreground/65 before:text-primary/35",
            )}
          >
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const updateFromScroll = useCallback(() => {
    const count = items.length;
    if (count === 0) return;

    const lockY = window.innerHeight * LOCK_RATIO;
    const tops: number[] = [];

    for (let i = 0; i < count; i++) {
      const el = itemRefs.current[i];
      tops.push(el ? el.getBoundingClientRect().top : Number.POSITIVE_INFINITY);
    }

    // Active = last item whose top has passed the lock line (with small slack)
    let nextActive = 0;
    for (let i = 0; i < count; i++) {
      if (tops[i] <= lockY + 12) nextActive = i;
    }
    setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));

    // Line growth: 0 when first item top is at lockY, 1 when last is at lockY
    const first = tops[0];
    const last = tops[count - 1];
    const span = last - first;
    if (span === 0 || !Number.isFinite(span)) {
      setProgress(nextActive === count - 1 ? 1 : 0);
      return;
    }
    setProgress(clamp((lockY - first) / span, 0, 1));
  }, [items.length]);

  useEffect(() => {
    updateFromScroll();
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", updateFromScroll);
    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", updateFromScroll);
    };
  }, [updateFromScroll]);

  const lineHeightPct = reduceMotion ? 100 : progress * 100;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-14 md:gap-20"
    >
      {/* Center spine (md+) / left spine (mobile) */}
      <div
        className="pointer-events-none absolute top-4 bottom-4 left-[0.6875rem] w-px overflow-hidden md:left-1/2 md:-translate-x-px"
        aria-hidden
      >
        <div className="bg-border absolute inset-0" />
        <div
          className={cn(
            "bg-primary absolute top-0 left-0 w-full origin-top",
            "shadow-[0_0_14px_color-mix(in_srgb,var(--primary)_50%,transparent)]",
            !reduceMotion && "transition-[height] duration-150 ease-out",
          )}
          style={{ height: `${lineHeightPct}%` }}
        />
      </div>

      {items.map((item, idx) => {
        const side: "left" | "right" = idx % 2 === 0 ? "left" : "right";
        const isActive = reduceMotion || activeIndex === idx;
        const enterVariants =
          side === "left" ? fadeLeftVariants : fadeRightVariants;

        const article = (
          <>
            <div className="relative z-[1] flex justify-center pt-7 md:col-start-2 md:row-start-1">
              <span
                className={cn(
                  "size-3 rounded-full transition-[background-color,box-shadow,transform] duration-300 ease-out",
                  isActive
                    ? "bg-primary scale-150 shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_60%,transparent)]"
                    : "bg-background ring-border size-2.5 ring-2",
                )}
                aria-hidden
              />
            </div>

            <div
              className={cn(
                "min-w-0 md:row-start-1",
                side === "left"
                  ? "col-start-2 md:col-start-1"
                  : "col-start-2 md:col-start-3",
              )}
            >
              <ExperienceCard
                item={item}
                isActive={isActive}
                reduceMotion={Boolean(reduceMotion)}
              />
            </div>

            <div
              className={cn(
                "hidden md:row-start-1 md:block",
                side === "left" ? "md:col-start-3" : "md:col-start-1",
              )}
              aria-hidden
            />
          </>
        );

        const className =
          "relative grid grid-cols-[1.5rem_1fr] items-start gap-5 md:grid-cols-[1fr_1.5rem_1fr] md:gap-10";

        if (reduceMotion) {
          return (
            <article
              key={`${item.company}-${item.role}`}
              ref={(el) => {
                itemRefs.current[idx] = el;
              }}
              className={className}
              style={{ scrollMarginTop: "40vh" }}
            >
              {article}
            </article>
          );
        }

        return (
          <motion.article
            key={`${item.company}-${item.role}`}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className={className}
            style={{ scrollMarginTop: "40vh" }}
            variants={enterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-8%" }}
            transition={{ ...easeOut, delay: staggerDelay(idx, 0.04) }}
          >
            {article}
          </motion.article>
        );
      })}
    </div>
  );
}
