import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { skills } from "@lib";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set(".skill-card", { autoAlpha: 0, y: 20 });

      ScrollTrigger.batch(".skill-card", {
        onEnter: (els) =>
          gsap.to(els, {
            autoAlpha: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
            overwrite: true,
          }),
        once: true,
        start: "top 90%",
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((category) => (
        <div
          key={category.label}
          className="skill-card rounded-2xl p-6"
          style={{
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <h3
            className="text-sm font-semibold uppercase tracking-wider mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            {category.label}
          </h3>
          <ul className="flex flex-col gap-2">
            {category.skills.map((skill) => (
              <li
                key={skill.name}
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--color-text)" }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-primary-500 shrink-0"
                  aria-hidden="true"
                />
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
