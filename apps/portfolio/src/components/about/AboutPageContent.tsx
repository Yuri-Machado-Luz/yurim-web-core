"use client";

import { Section } from "@/components";

import { AboutBio } from "./AboutBio";
import { AboutCTA } from "./AboutCTA";
import { AboutEducation } from "./AboutEducation";
import { AboutHeader } from "./AboutHeader";
import { AboutLanguages } from "./AboutLanguages";
import { AboutSkills } from "./AboutSkills";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function AboutPageContent() {
  return (
    <main id="sobre-main" className="space-y-16">
      <Section as="div" spacing="none">
        <AboutHeader />
        <AboutBio />
        <AboutSkills />
        <ExperienceTimeline />
        <AboutEducation />
        <AboutLanguages />
      </Section>
      <AboutCTA />
    </main>
  );
}
