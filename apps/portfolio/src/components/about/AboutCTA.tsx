"use client";

import Link from "next/link";

import { Button, Section } from "@/components";
import { useLocale, useMessages } from "@/components/locale-provider";
import { localizedPath } from "@/lib/locale-path";

import { FadeIn } from "./FadeIn";

export function AboutCTA() {
  const messages = useMessages();
  const locale = useLocale();

  return (
    <Section
      as="section"
      id="contato"
      spacing="none"
      className="mb-16 mt-24 flex flex-col items-center gap-6 text-center h-[65vh] justify-center"
    >
      <FadeIn>
        <h2 className="heading-section mb-2">{messages.about.ctaTitle}</h2>
        <Button asChild size="lg">
          <Link href={localizedPath("/contato", locale)}>
            {messages.cta.button}
          </Link>
        </Button>
      </FadeIn>
    </Section>
  );
}
