"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-10%" } as const;

export function CTASection() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id="cta"
      width="narrow"
      spacing="none"
      className="relative mb-20 mt-20 overflow-hidden rounded-3xl border border-border/60 bg-card/30 px-6 py-20 text-center sm:px-10 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_65%)]"
      />
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.55 }}
        viewport={viewport}
      >
        <h2 className="heading-section sm:text-4xl md:text-5xl mb-8">
          {messages.cta.title}
        </h2>
        <Button asChild size="lg">
          <Link href={localizedPath("/contato", locale)}>
            {messages.cta.button}
          </Link>
        </Button>
      </motion.div>
    </Section>
  );
}
