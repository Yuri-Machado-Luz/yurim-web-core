import { techIcons, type TechIconName } from "@/assets/icons/tech";
import { cn } from "@/lib/utils";

const TECHS: { name: string; icon: TechIconName }[] = [
  { name: "TypeScript", icon: "typescript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Astro", icon: "astro" },
  { name: "HTML / CSS", icon: "html5" },
  { name: "Motion", icon: "sparkles" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "python" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Supabase", icon: "database" },
  { name: "Figma", icon: "figma" },
  { name: "Vercel", icon: "zap" },
  { name: "Cloudflare", icon: "cloudflare" },
  { name: "Git", icon: "git" },
];

function TechChip({
  name,
  icon,
  className,
}: {
  name: string;
  icon: TechIconName;
  className?: string;
}) {
  const Svg = techIcons[icon];
  return (
    <div
      className={cn(
        "border-border bg-secondary/50 text-foreground inline-flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2 text-sm font-medium",
        className,
      )}
    >
      <Svg className="size-5 shrink-0" aria-hidden="true" />
      {name}
    </div>
  );
}

/** CSS marquee — duplicated track for seamless loop (no hover pause). */
export function TechStack({ className }: { className?: string }) {
  const track = TECHS.map((tech) => (
    <TechChip
      key={tech.name}
      name={tech.name}
      icon={tech.icon}
      className="mx-3"
    />
  ));

  return (
    <aside
      className={cn(
        "tech-marquee relative w-full overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
      aria-label="Tech stack"
    >
      <div className="tech-marquee-track">
        <div className="tech-marquee-group">{track}</div>
        <div className="tech-marquee-group" aria-hidden="true">
          {track}
        </div>
      </div>
    </aside>
  );
}
