import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("mx-auto w-full px-4 sm:px-6", {
  variants: {
    spacing: {
      none: "",
      sm: "py-12 md:py-16",
      md: "py-16 md:py-20",
      lg: "py-20 md:py-28",
    },
    width: {
      default: "max-w-6xl",
      narrow: "max-w-4xl",
    },
  },
  defaultVariants: {
    spacing: "md",
    width: "default",
  },
});

type SectionProps = ComponentPropsWithoutRef<"section"> &
  VariantProps<typeof sectionVariants> & {
    as?: "section" | "header" | "footer" | "article" | "div";
  };

export function Section({
  as,
  spacing,
  width,
  className,
  ...props
}: SectionProps) {
  const Comp: ElementType = as ?? "section";

  return (
    <Comp className={cn(sectionVariants({ spacing, width, className }))} {...props} />
  );
}
