import { pt } from "@/lib/i18n";

import { FadeIn } from "./FadeIn";

export function AboutBio() {
  return (
    <section id="bio" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-8">{pt.about.sections.bio}</h2>
      </FadeIn>
      <div className="flex flex-col gap-5 leading-[1.8] text-muted-foreground">
        {pt.about.bio.map((paragraph, idx) => (
          <FadeIn key={idx} delay={idx * 0.05}>
            <p className="text-lg">{paragraph}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
