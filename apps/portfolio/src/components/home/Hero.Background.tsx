export function HeroBG() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-140 w-140 -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-bg-grid h-220 w-220 -translate-x-1/2 -translate-y-1/4 left-1/4"
      />
    </>
  );
}
