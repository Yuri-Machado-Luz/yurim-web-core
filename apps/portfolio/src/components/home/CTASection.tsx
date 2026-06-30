'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { pt } from '@/lib/i18n';
import CONFIG from '@/lib/config';
import { Mail, Code, ExternalLink } from 'lucide-react';

export function CTASection() {
  const { email, github, linkedin } = CONFIG.meta.social;

  return (
    <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
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
          <Link href="/contato">
            {pt.cta.button}
          </Link>
        </Button>

        <div className="flex items-center justify-center gap-4">
          <Link
            href={`mailto:${email}`}
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="Email"
          >
            <Mail className="h-6 w-6" />
          </Link>
          <Link
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="GitHub"
          >
            <Code className="h-6 w-6" />
          </Link>
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
            aria-label="LinkedIn"
          >
            <ExternalLink className="h-6 w-6" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
