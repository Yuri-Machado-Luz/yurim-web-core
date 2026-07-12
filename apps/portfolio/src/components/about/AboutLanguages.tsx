"use client";

import { useMessages } from "@/components/locale-provider";
import { languages } from "@/lib/data";

import { FadeIn } from "./FadeIn";

export function AboutLanguages() {
  const messages = useMessages();

  return (
    <section id="idiomas" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-8">
          {messages.about.sections.languages}
        </h2>
      </FadeIn>
      <div className="language-grid">
        {languages.map((lang, idx) => (
          <FadeIn key={lang.name} delay={idx * 0.07}>
            <article className="language-card">
              <span className="name">{lang.name}</span>
              <span className="level">{lang.level}</span>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
