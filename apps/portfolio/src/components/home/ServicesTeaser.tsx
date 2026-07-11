"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-10%" } as const;

export function ServicesTeaser() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const t = messages.services.teaser;

  return (
    <Section id="services-teaser" spacing="lg">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        viewport={viewport}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="eyebrow mb-2">{t.eyebrow}</p>
        <h2 className="heading-section sm:text-4xl mb-4">{t.title}</h2>
        <p className="mb-8 text-lg text-muted-foreground">{t.body}</p>
        <Button asChild variant="outline" size="lg">
          <Link href={localizedPath("/servicos", locale)}>{t.cta}</Link>
        </Button>
      </motion.div>
    </Section>
  );
}
