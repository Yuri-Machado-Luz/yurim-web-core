"use client";

import { useMessages } from "@/components/locale-provider";

import { FadeIn } from "./FadeIn";

export function AboutBio() {
  const messages = useMessages();

  return (
    <section id="bio" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-8">{messages.about.sections.bio}</h2>
      </FadeIn>
      <div className="flex flex-col gap-5 leading-[1.8] text-muted-foreground">
        {messages.about.bio.map((paragraph, idx) => (
          <FadeIn key={idx} delay={idx * 0.05}>
            <p className="text-lg">{paragraph}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
