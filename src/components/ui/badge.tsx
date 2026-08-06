import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    // #region Layout e Estrutura
    "group/badge inline-flex h-5 w-fit shrink-0 items-center",
    "justify-center gap-1 overflow-hidden rounded-3xl",
    "border border-transparent px-2 py-3 text-center",
    // #endregion
    // #region Tipografia e Transições
    "text-xs font-medium whitespace-nowrap transition-all",
    // #endregion
    // #region Estados de Foco
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    // #endregion
    // #region Ícones (inline-end/start)
    "has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
    // #endregion
    // #region Estados de Validação (aria-invalid)
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "dark:aria-invalid:ring-destructive/40",
    // #endregion
    // #region Estilos para SVG filhos
    "[&>svg]:pointer-events-none [&>svg]:size-3!",
    // #endregion
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "[a]:hover:bg-primary/80",
        ].join(" "),

        secondary: [
          "bg-black/60 text-secondary-foreground",
          "[a]:hover:bg-secondary/80",
        ].join(" "),

        destructive: [
          "bg-destructive/10 text-destructive",
          "focus-visible:ring-destructive/20",
          "dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
          "[a]:hover:bg-destructive/20",
        ].join(" "),

        outline: [
          "border-border text-foreground",
          "[a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ].join(" "),

        ghost: [
          "hover:bg-muted hover:text-muted-foreground",
          "dark:hover:bg-muted/50",
        ].join(" "),

        link: ["text-primary underline-offset-4", "hover:underline"].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
