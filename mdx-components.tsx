import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

const components = {
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cn(
        "font-heading text-foreground mt-8 mb-4 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cn(
        "font-heading text-foreground mt-8 mb-3 text-2xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className={cn(
        "font-heading text-foreground mt-6 mb-2 text-xl font-semibold",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p
      className={cn("text-muted-foreground mb-4 leading-relaxed", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className={cn(
        "text-muted-foreground mb-4 list-disc space-y-1 pl-5",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className={cn(
        "text-muted-foreground mb-4 list-decimal space-y-1 pl-5",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code
      className={cn(
        "bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cn(
        "border-border bg-card text-foreground mb-4 overflow-x-auto rounded-2xl border p-4 font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
