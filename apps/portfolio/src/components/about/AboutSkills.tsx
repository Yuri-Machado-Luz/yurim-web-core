"use client";

import { Icon } from "@/components/ui/icon";
import { skills } from "@/lib/data";
import { pt } from "@/lib/i18n";
import type { IconName } from "@/lib/icons";
import { iconMap } from "@/lib/icons";

import { FadeIn } from "./FadeIn";

export function AboutSkills() {
  return (
    <section id="habilidades" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-2">{pt.about.sections.skills}</h2>
        <p className="mb-10 text-muted-foreground">
          {pt.about.sections.skillsLead}
        </p>
      </FadeIn>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((category, idx) => (
          <FadeIn key={category.label} delay={idx * 0.06}>
            <div className="skill-card h-full">
              <h3>{category.label}</h3>
              <ul>
                {category.skills.map((skill) => {
                  const iconName = skill.icon as IconName;
                  const hasIcon = iconName in iconMap;
                  return (
                    <li key={skill.name}>
                      {hasIcon ? (
                        <Icon
                          name={iconName}
                          className="size-4 shrink-0 text-primary"
                        />
                      ) : (
                        <span
                          className="size-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                      )}
                      {skill.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
