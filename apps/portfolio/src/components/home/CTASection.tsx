"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button, Section, SocialLinks } from "@/components";
import { pt } from "@/lib/i18n";

export function CTASection() {
  return (
    <Section
      width="narrow"
      spacing="none"
      className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
          {pt.cta.title}
        </h2>
        <Button asChild size="lg" className="mb-12">
          <Link href="/contato">{pt.cta.button}</Link>
        </Button>

        <SocialLinks variant="boxed" className="justify-center" />
      </motion.div>
    </Section>
  );
}
