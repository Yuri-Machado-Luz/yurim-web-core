"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button, Section } from "@/components";
import { pt } from "@/lib/i18n";

export function CTASection() {
  return (
    <Section
      width="narrow"
      spacing="none"
      className="mb-16 mt-24 flex flex-col items-center gap-6 text-center h-[65vh] justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="heading-section sm:text-4xl mb-8">{pt.cta.title}</h2>
        <Button asChild size="lg" className="mb-12">
          <Link href="/contato">{pt.cta.button}</Link>
        </Button>
      </motion.div>
    </Section>
  );
}
