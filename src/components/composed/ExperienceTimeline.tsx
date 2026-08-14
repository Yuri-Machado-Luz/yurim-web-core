"use client";

import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { techIcons, type TechIconName } from "@/assets/icons/tech";
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

/** Viewport lock line — ball sits where this crosses the spine. */
const LOCK_RATIO = 0.5;
const LAST_LOCK_SLACK = 0.22;

const OPPOSITE_STACKS: TechIconName[][] = [
  ["react", "nextjs", "typescript", "tailwind"],
  ["nodejs", "figma", "sparkles"],
  ["python", "postgresql", "git"],
  ["zap", "fastapi", "astro"],
  ["html5", "css3", "cloudflare"],
];

const STACK_LAYOUT = [
  { size: "size-12", left: "6%", top: "8%", rot: "-18deg", duration: "14s", delay: "0s" },
  { size: "size-16", left: "58%", top: "42%", rot: "14deg", duration: "18s", delay: "1.2s" },
  { size: "size-10", left: "10%", top: "68%", rot: "-10deg", duration: "16s", delay: "2.4s" },
  { size: "size-10", left: "62%", top: "4%", rot: "20deg", duration: "20s", delay: "0.6s" },
] as const;

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function ExperienceCard({
  item,
  isActive,
}: {
  item: ExperienceItem;
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "surface-glass border-border/60 rounded-2xl border p-6 md:min-h-[11rem] md:p-8",
        "transition-[border-color,box-shadow,opacity] duration-300 ease-out",
        isActive
          ? "border-primary/45 opacity-100 shadow-[var(--shadow-card-hover-subtle)]"
          : "opacity-45",
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

function OppositeStacks({
  icons,
  isActive,
}: {
  icons: TechIconName[];
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        "relative hidden min-h-[14rem] md:block",
        "transition-opacity duration-500 ease-out",
        isActive ? "opacity-40" : "opacity-20",
      )}
      aria-hidden
    >
      {icons.map((name, i) => {
        const Svg = techIcons[name];
        const layout = STACK_LAYOUT[i] ?? STACK_LAYOUT[0];
        return (
          <Svg
            key={name}
            className={cn(
              "text-primary absolute stack-drift",
              layout.size,
            )}
            style={
              {
                left: layout.left,
                top: layout.top,
                "--stack-rot": layout.rot,
                "--stack-duration": layout.duration,
                "--stack-delay": layout.delay,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const reduceMotion = useReducedMotion();
  const spineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const frameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const sampleScroll = useCallback(() => {
    const count = items.length;
    if (count === 0) return;

    const lockY = window.innerHeight * LOCK_RATIO;
    const lastSlack = window.innerHeight * LAST_LOCK_SLACK;

    const spine = spineRef.current;
    if (spine) {
      const rect = spine.getBoundingClientRect();
      if (rect.height > 0) {
        setProgress(clamp((lockY - rect.top) / rect.height, 0, 1));
      }
    }

    let nextActive = 0;
    for (let i = 0; i < count; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      const slack = i === count - 1 ? lastSlack : 12;
      if (top <= lockY + slack) nextActive = i;
    }
    setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
  }, [items.length]);

  useEffect(() => {
    if (reduceMotion) return;

    const onScroll = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        sampleScroll();
      });
    };

    sampleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduceMotion, sampleScroll]);

  const lineScale = reduceMotion ? 1 : progress;

  return (
    <div className="relative flex flex-col gap-14 md:gap-20">
      <div
        ref={spineRef}
        className="pointer-events-none absolute top-4 bottom-4 left-[0.6875rem] w-3 -translate-x-[5px] md:left-1/2 md:-translate-x-1.5"
        aria-hidden
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-px overflow-hidden">
          <div
            className={cn(
              "bg-primary absolute inset-0 origin-top",
              "shadow-[0_0_14px_color-mix(in_srgb,var(--primary)_50%,transparent)]",
            )}
            style={{ transform: `scaleY(${lineScale})` }}
          />
        </div>
        <span
          className={cn(
            "bg-primary absolute left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
            "shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_60%,transparent)]",
          )}
          style={{ top: `${lineScale * 100}%` }}
        />
      </div>

      {items.map((item, idx) => {
        const side: "left" | "right" = idx % 2 === 0 ? "left" : "right";
        const isActive = reduceMotion || idx <= activeIndex;
        const enterVariants =
          side === "left" ? fadeLeftVariants : fadeRightVariants;

        const article = (
          <>
            <div
              className="relative z-[1] md:col-start-2 md:row-start-1"
              aria-hidden
            />

            <div
              className={cn(
                "min-w-0 md:row-start-1",
                side === "left"
                  ? "col-start-2 md:col-start-1"
                  : "col-start-2 md:col-start-3",
              )}
            >
              <ExperienceCard item={item} isActive={isActive} />
            </div>

            <div
              className={cn(
                "hidden md:row-start-1 md:block",
                side === "left" ? "md:col-start-3" : "md:col-start-1",
              )}
              aria-hidden
            >
              <OppositeStacks
                icons={OPPOSITE_STACKS[idx] ?? OPPOSITE_STACKS[0]}
                isActive={isActive}
              />
            </div>
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
              style={{ scrollMarginTop: "50vh" }}
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
            style={{ scrollMarginTop: "50vh" }}
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
