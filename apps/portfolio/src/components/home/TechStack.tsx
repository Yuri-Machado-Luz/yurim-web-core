"use client";

import { ICON } from "@/assets";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const TECHS = [
  { name: "TypeScript", icon: ICON.typescript },
  { name: "React", icon: ICON.react },
  { name: "Next.js", icon: ICON.nextjs },
  { name: "Tailwind", icon: ICON.tailwind },
  { name: "Astro", icon: ICON.astro },
  { name: "Node.js", icon: ICON.nodejs },
  { name: "Python", icon: ICON.python },
  { name: "FastAPI", icon: ICON.fastapi },
  { name: "Git", icon: ICON.git },
];

export function TechStack() {
  return (
    <aside className="space-y-4">
      <Marquee speed={35} pauseOnHover gradient={false}>
        {[...TECHS, ...TECHS, ...TECHS].map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="mx-3 inline-flex items-center gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
          >
            <Image
              src={tech.icon}
              alt=""
              aria-hidden
              className="h-5 w-5 dark:invert"
            />
            {tech.name}
          </div>
        ))}
      </Marquee>
    </aside>
  );
}
