"use client";

import Marquee from "react-fast-marquee";

import { ICON } from "@/assets";
import type { IconName } from "@/assets/icons";
import { Icon } from "@/components/ui/icon";

const TECHS: { name: string; icon: IconName }[] = [
  { name: "TypeScript", icon: ICON.typescript },
  { name: "React", icon: ICON.react },
  { name: "Next.js", icon: ICON.nextjs },
  { name: "Tailwind", icon: ICON.tailwind },
  { name: "Astro", icon: ICON.astro },
  { name: "HTML / CSS", icon: ICON.html5 },
  { name: "Framer Motion", icon: ICON.sparkles },
  { name: "Node.js", icon: ICON.nodejs },
  { name: "Python", icon: ICON.python },
  { name: "FastAPI", icon: ICON.fastapi },
  { name: "PostgreSQL", icon: ICON.postgresql },
  { name: "Supabase", icon: ICON.database },
  { name: "Figma", icon: ICON.figma },
  { name: "Vercel", icon: ICON.zap },
  { name: "Cloudflare", icon: ICON.cloudflare },
  { name: "Git", icon: ICON.git },
];

export function TechStack() {
  return (
    <aside className="space-y-4">
      <Marquee speed={35} gradient={false}>
        {[...TECHS, ...TECHS, ...TECHS].map((tech, idx) => (
          <div
            key={`${tech.name}-${idx}`}
            className="mx-3 inline-flex items-center gap-2.5 rounded-lg border border-border bg-secondary/50 px-4 py-2 text-sm font-medium text-foreground"
          >
            <Icon name={tech.icon} className="h-5 w-5" />
            {tech.name}
          </div>
        ))}
      </Marquee>
    </aside>
  );
}
