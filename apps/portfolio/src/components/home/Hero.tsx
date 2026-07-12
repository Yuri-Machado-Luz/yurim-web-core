"use client";

import { motion, useReducedMotion } from "framer-motion";
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
import { useLocale, useMessages } from "@/components/locale-provider";
import CONFIG from "@/lib/config";
import { localizedPath } from "@/lib/locale-path";

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
  const messages = useMessages();
  const locale = useLocale();
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative mx-auto flex w-full max-w-6xl flex-col items-center overflow-x-hidden px-4 sm:px-6 mt-20 pt-12 pb-20 md:mt-4 md:min-h-[calc(100svh-5rem)] md:justify-center md:pb-32 md:pt-20"
    >
      <div className="relative z-10 grid w-full max-w-6xl gap-12 lg:grid-cols-[2fr_1fr] lg:items-center">
        <motion.div
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
        >
          <motion.div
            variants={reduceMotion ? undefined : item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium text-foreground">
              {messages.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={reduceMotion ? undefined : container}
            className="mb-6 heading-page md:text-6xl"
          >
            {WORDS.map((word, idx) => (
              <Fragment key={idx}>
                <motion.span
                  variants={reduceMotion ? undefined : wordVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
                {idx < WORDS.length - 1 && " "}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mb-4 max-w-xl text-lg text-muted-foreground"
          >
            {messages.meta.description}
          </motion.p>

          <motion.p
            variants={reduceMotion ? undefined : item}
            className="mb-10 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            {messages.hero.paragraph}
          </motion.p>

          <motion.div
            variants={reduceMotion ? undefined : item}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button asChild size="lg">
              <Link href={localizedPath("/sobre", locale)}>
                {messages.hero.cta.primary}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localizedPath("/projetos", locale)}>
                {messages.hero.cta.secondary}
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.1 }}
          className="hidden overflow-visible lg:flex lg:items-center lg:justify-center"
        >
          <div className="hero-picture-wrap shrink-0">
            <span className="picture-ring" aria-hidden="true" />
            <span className="picture-ring picture-ring-b" aria-hidden="true" />
            <Avatar className="h-64 w-64 border border-border xl:h-72 xl:w-72">
              <AvatarImage src={profilePicture.src} alt={CONFIG.meta.author} />
              <AvatarFallback>YM</AvatarFallback>
            </Avatar>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.8 }}
        className="relative z-10 mt-24 w-full lg:mt-32 mask-[linear-gradient(to_right,transparent_10%,black_20%,black_80%,transparent_90%)]"
      >
        <TechStack />
      </motion.div>
    </section>
  );
}
