"use client";

import { motion } from "framer-motion";

import { useMessages } from "@/components/locale-provider";
import { experience } from "@/lib/data";

import { FadeIn } from "./FadeIn";

export function ExperienceTimeline() {
  const messages = useMessages();

  return (
    <section id="experiencia" className="mb-20">
      <FadeIn>
        <h2 className="heading-section mb-10">
          {messages.about.sections.experience}
        </h2>
      </FadeIn>
      <div className="experience-list">
        {experience.map((item, idx) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            className="experience-item"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: idx * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="timeline">
              <div className="timeline-dot" />
              {idx < experience.length - 1 && <div className="timeline-line" />}
            </div>
            <div className="body">
              <h3 className="role">{item.role}</h3>
              <div className="meta">
                <span className="company">{item.company}</span>
                <span className="period">{item.period}</span>
              </div>
              <ul className="bullets">
                {item.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx} className="bullet">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
