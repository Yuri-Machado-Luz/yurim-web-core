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
    <Section id="about-teaser" spacing="lg">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.55 }}
        viewport={viewport}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow mb-3">{t.eyebrow}</p>
        <h2 className="heading-section sm:text-4xl mb-5">{t.title}</h2>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          {t.body}
        </p>
        <Button
          asChild
          size="lg"
          className="min-w-[10.5rem] tracking-wide"
        >
          <Link href={localizedPath("/sobre", locale)}>{t.cta}</Link>
        </Button>
      </motion.div>
    </Section>
  );
}
