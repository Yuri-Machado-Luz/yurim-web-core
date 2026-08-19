import { buttonVariants } from "@/components/ui/button";

export type NotFoundViewProps = {
  code: string;
  title: string;
  description: string;
  backHome: string;
  homeHref: string;
  illustrationAlt: string;
};

export function NotFoundView({
  code,
  title,
  description,
  backHome,
  homeHref,
  illustrationAlt,
}: NotFoundViewProps) {
  return (
    <section className="relative isolate z-[1] flex min-h-[65svh] flex-1 flex-col items-center justify-center overflow-hidden py-24">
      <img
        src="/not-found/404.svg"
        alt={illustrationAlt}
        width={320}
        height={320}
        className="pointer-events-none absolute -z-10 size-80 -translate-y-10 opacity-25"
      />
      <div className="surface-glass border-border/60 flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border px-8 py-10 text-center shadow-[var(--shadow-card-subtle)]">
        <p className="font-heading text-primary text-sm font-semibold tracking-[0.35em]">
          {code}
        </p>
        <h1 className="font-heading text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
          {title}
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed md:text-base">
          {description}
        </p>
        <a
          href={homeHref}
          className={buttonVariants({ variant: "default", size: "sm" })}
        >
          {backHome}
        </a>
      </div>
    </section>
  );
}
