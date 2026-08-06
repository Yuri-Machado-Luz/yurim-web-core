import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-3", className)}>
      {eyebrow ? (
        <p className="font-heading text-muted-foreground text-sm tracking-wide uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-heading text-foreground text-4xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground max-w-prose text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
