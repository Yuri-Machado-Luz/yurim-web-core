"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-12%" } as const;

export function AboutTeaser() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const t = messages.about.teaser;

  return (
    <Section id="about-teaser" spacing="lg" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block"
      />
      <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.6 }}
          viewport={viewport}
        >
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="heading-section sm:text-4xl md:text-5xl mb-5 max-w-xl">
            {t.title}
          </h2>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            {t.body}
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.08 }}
          viewport={viewport}
          className="rounded-2xl border border-border/80 bg-card/40 p-8 backdrop-blur-sm md:justify-self-end md:p-10"
        >
          <p className="font-heading text-5xl font-semibold tracking-tight text-primary/90 md:text-6xl">
            2020
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {locale === "en"
              ? "Independent work since then: systems, APIs, and the craft between them."
              : "Trabalho autônomo desde então: sistemas, APIs e o ofício entre eles."}
          </p>
          <Button asChild variant="outline" size="lg" className="mt-8">
            <Link href={localizedPath("/sobre", locale)}>{t.cta}</Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
