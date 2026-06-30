'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { pt } from '@/lib/i18n';
import { heroStats } from '@/lib/data/stats';
import { iconMap } from '@/lib/icons';
import CONFIG from '@/lib/config';
import profilePicture from '@/assets/imgs/profile-picture.png';

export function AboutSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Avatar className="h-16 w-16 mb-6 border border-border">
            <AvatarImage src={profilePicture.src} alt={CONFIG.meta.author} />
            <AvatarFallback>YM</AvatarFallback>
          </Avatar>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
            {pt.about.title}
          </h2>
          <div className="space-y-4 text-muted-foreground">
            {pt.about.bio.map((paragraph, idx) => (
              <p key={idx} className="text-base sm:text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <Button asChild variant="link" className="mt-8 pl-0">
            <Link href="/sobre">
              {pt.about.cta}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {heroStats.map((stat, idx) => {
            const Icon = stat.icon ? iconMap[stat.icon] : null;
            return (
              <div
                key={idx}
                className="flex gap-4 p-4 rounded-lg border border-border bg-secondary/30"
              >
                {Icon ? (
                  <div className="flex-shrink-0 flex items-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center">
                    <p className="font-semibold text-lg text-foreground">
                      {stat.value}
                    </p>
                  </div>
                )}
                <div className="flex flex-col justify-center">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
