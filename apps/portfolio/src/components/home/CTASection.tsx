"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { ICON } from "@/assets";
import { Button } from "@/components";
import CONFIG from "@/lib/config";
import { pt } from "@/lib/i18n";

export function CTASection() {
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <section className="mx-auto h-[70vh] max-w-4xl px-4 sm:px-6 text-center flex flex-col items-center justify-center">
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

        <div className="flex items-center justify-center gap-4">
          <Link
            href={`mailto:${email}`}
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="Email"
          >
            <Image
              src={ICON.envelope}
              alt="Email"
              className="h-6 w-6 dark:invert"
            />
          </Link>
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="GitHub"
          >
            <Image
              src={ICON.github}
              alt="GitHub"
              className="h-6 w-6 dark:invert"
            />
          </Link>
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <Image
              src={ICON.linkedin}
              alt="LinkedIn"
              className="h-6 w-6 dark:invert"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
