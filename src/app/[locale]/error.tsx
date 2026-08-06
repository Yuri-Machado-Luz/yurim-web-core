"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[50svh] w-full max-w-2xl flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <h1 className="font-heading text-foreground text-3xl font-semibold">
        Something went wrong
      </h1>
      <p className="text-muted-foreground max-w-md text-sm">
        An unexpected error occurred while rendering this page.
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
