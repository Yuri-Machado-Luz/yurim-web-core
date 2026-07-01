"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment } from "react";

import { IMAGE } from "@/assets";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  TechStack,
} from "@/components";
import CONFIG from "@/lib/config";
import { pt } from "@/lib/i18n";

import { HeroBG } from "./Hero.Background";

const WORDS = ["Yuri", "Machado", "Luz"];
const profilePicture = IMAGE.profilePicture;

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, x: -16, y: 0 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const wordVariants = {
  hidden: { opacity: 0, x: -20, y: 0 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function Hero() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-4 sm:px-6 pt-6 pb-12 md:min-h-screen">
      <HeroBG />

      {/* Content grid: text left, photo right (desktop) */}
      <div className="relative z-10 mt-16 grid w-full max-w-6xl gap-12 lg:mt-28 lg:grid-cols-[2fr_1fr] lg:items-center">
        {/* Text column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-foreground">
              {pt.hero.badge}
            </span>
          </motion.div>

          {/* Title */}
          <motion.div variants={container} className="mb-6">
            <h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
              {WORDS.map((word, idx) => (
                <Fragment key={idx}>
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                  {idx < WORDS.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="mb-4 max-w-xl text-lg text-muted-foreground"
          >
            {CONFIG.meta.description}
          </motion.p>

          {/* Paragraph */}
          <motion.p
            variants={item}
            className="mb-10 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {pt.hero.paragraph}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href="/sobre">{pt.hero.cta.primary}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projetos">{pt.hero.cta.secondary}</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Photo column — hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden lg:flex lg:items-center lg:justify-center"
        >
          <div className="relative">
            <span className="picture-ring" />
            <span className="picture-ring picture-ring-b" />
            <Avatar className="relative z-10 h-64 w-64 border border-border xl:h-72 xl:w-72">
              <AvatarImage src={profilePicture.src} alt={CONFIG.meta.author} />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-24 w-full lg:mt-32 mask-[linear-gradient(to_right,transparent_10%,black_20%,black_80%,transparent_90%)]"
      >
        <TechStack />
      </motion.div>
    </section>
  );
}
