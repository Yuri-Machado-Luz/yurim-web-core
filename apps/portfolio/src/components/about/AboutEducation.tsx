"use client";

import { education } from "@/lib/data";
import { pt } from "@/lib/i18n";

import { FadeIn } from "./FadeIn";

export function AboutEducation() {
  return (
    <section id="formacao" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-8">{pt.about.sections.education}</h2>
      </FadeIn>
      <div className="education-list">
        {education.map((edu, idx) => (
          <FadeIn key={edu.degree} delay={idx * 0.07}>
            <article className="education-item h-full">
              <p className="degree">{edu.degree}</p>
              <p className="institution">{edu.institution}</p>
              {edu.detail && <p className="detail">{edu.detail}</p>}
              {edu.description && (
                <p className="description">{edu.description}</p>
              )}
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
