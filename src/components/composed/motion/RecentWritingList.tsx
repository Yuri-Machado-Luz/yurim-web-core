"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type RecentWritingItem = {
  slug: string;
  href: string;
  title: string;
  description?: string;
  pubDate?: string;
  featured?: boolean;
};

type RecentWritingListProps = {
  posts: RecentWritingItem[];
  heading: string;
  viewAllLabel: string;
};

export function RecentWritingList({
  posts,
  heading,
  viewAllLabel,
}: RecentWritingListProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-border/50 mt-4 flex flex-col gap-3 border-t pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {heading}
        </h3>
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors duration-300 ease-out hover:underline"
        >
          {viewAllLabel}
        </Link>
      </div>
      <ul className="flex flex-col gap-2">
        {posts.map((post) => {
          const isFeatured = Boolean(post.featured);
          const body = (
            <Link
              href={post.href}
              className={cn(
                "group flex transition-[border-color,background-color,color] duration-300 ease-out",
                isFeatured
                  ? "surface-glass card-glow-subtle border-primary/40 hover:border-primary/60 flex-col gap-3 rounded-2xl border px-5 py-5 sm:flex-row sm:items-end sm:justify-between"
                  : "border-border/40 bg-card/30 hover:border-primary/35 items-baseline justify-between gap-4 rounded-xl border px-4 py-3 backdrop-blur-sm",
              )}
            >
              <div className="flex min-w-0 flex-col gap-2">
                <span
                  className={cn(
                    "text-foreground group-hover:text-primary font-medium transition-colors duration-300 ease-out",
                    isFeatured && "font-heading text-lg md:text-xl",
                  )}
                >
                  {post.title}
                </span>
                {isFeatured && post.description ? (
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {post.description}
                  </p>
                ) : null}
              </div>
              {post.pubDate ? (
                <time
                  className="text-muted-foreground shrink-0 text-xs"
                  dateTime={post.pubDate}
                >
                  {post.pubDate}
                </time>
              ) : null}
            </Link>
          );

          if (reduceMotion) {
            return <li key={post.slug}>{body}</li>;
          }

          return (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={easeOut}
            >
              {body}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

type SectionShellProps = {
  children: ReactNode;
  className?: string;
};

export function MotionSection({ children, className }: SectionShellProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={easeOut}
    >
      {children}
    </motion.section>
  );
}
