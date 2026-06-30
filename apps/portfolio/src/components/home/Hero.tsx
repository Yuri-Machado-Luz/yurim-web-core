'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { pt } from '@/lib/i18n';
import CONFIG from '@/lib/config';
import { TechStack } from './TechStack';

const WORDS = [
  'Yuri',
  'Machado',
  'Luz',
];

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 pt-16">
      {/* Available Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400"></span>
        </span>
        <span className="text-sm font-medium text-foreground">
          {pt.hero.badge}
        </span>
      </motion.div>

      {/* Hero Title */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-6 text-center"
      >
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          {WORDS.map((word, idx) => (
            <Fragment key={idx}>
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
              {idx < WORDS.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>
      </motion.div>

      {/* Hero Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8 max-w-2xl text-lg text-muted-foreground text-center"
      >
        {CONFIG.meta.description}
      </motion.p>

      {/* Hero Paragraph */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12 max-w-2xl text-base sm:text-lg text-muted-foreground text-center"
      >
        {pt.hero.paragraph}
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-16"
      >
        <Button asChild size="lg">
          <Link href="/sobre">
            {pt.hero.cta.primary}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/projetos">
            {pt.hero.cta.secondary}
          </Link>
        </Button>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="w-full"
      >
        <TechStack />
      </motion.div>
    </section>
  );
}
