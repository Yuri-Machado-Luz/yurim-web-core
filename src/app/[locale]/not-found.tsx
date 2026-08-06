import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50svh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-muted-foreground text-sm tracking-wide uppercase">
        404
      </p>
      <h1 className="font-heading text-foreground text-3xl font-semibold">
        Page not found
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        The page you requested does not exist or was moved.
      </p>
      <Link
        href="/"
        className="text-primary text-sm font-medium underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
