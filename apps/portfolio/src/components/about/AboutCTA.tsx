"use client";

import Link from "next/link";

import { Button, Section } from "@/components";
import { pt } from "@/lib/i18n";

import { FadeIn } from "./FadeIn";

export function AboutCTA() {
  return (
    <Section
      as="section"
      id="contato"
      spacing="none"
      className="mb-16 mt-24 flex flex-col items-center gap-6 text-center h-[65vh] justify-center"
    >
      <FadeIn>
        <h2 className="heading-section mb-2">{pt.about.ctaTitle}</h2>
        <Button asChild size="lg">
          <Link href="/contato">{pt.cta.button}</Link>
        </Button>
      </FadeIn>
    </Section>
  );
}
