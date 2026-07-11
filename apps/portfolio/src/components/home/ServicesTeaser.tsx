"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { services } from "@/lib/data/services";
import { localizedPath } from "@/lib/locale-path";

const viewport = { once: true, margin: "-12%" } as const;

export function ServicesTeaser() {
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();
  const t = messages.services.teaser;
  const preview = services.slice(0, 4);

  return (
    <Section id="services-teaser" spacing="lg" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 -z-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.55 }}
          viewport={viewport}
        >
          <p className="eyebrow mb-3">{t.eyebrow}</p>
          <h2 className="heading-section sm:text-4xl mb-4">{t.title}</h2>
          <p className="mb-8 max-w-md text-lg text-muted-foreground">{t.body}</p>
          <Button asChild size="lg">
            <Link href={localizedPath("/servicos", locale)}>{t.cta}</Link>
          </Button>
        </motion.div>

        <ul className="space-y-3">
          {preview.map((service, idx) => (
            <motion.li
              key={service.id}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion ? 0 : idx * 0.07,
              }}
              viewport={viewport}
              className="flex items-baseline justify-between gap-4 border-b border-border/70 py-4"
            >
              <span className="font-medium tracking-tight text-foreground">
                {service.title[locale]}
              </span>
              <span className="shrink-0 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
