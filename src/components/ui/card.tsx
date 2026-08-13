import * as React from "react";
import { cn } from "@/lib/utils";

function Card({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        // #region Estrutura e Layout
        "group/card flex flex-col gap-(--card-spacing)",
        "overflow-hidden rounded-xl py-(--card-spacing) text-sm",
        // #endregion

        // #region Cores, Sombras e Anéis (glass + glow)
        "border-border/60 bg-card/55 text-card-foreground backdrop-blur-sm",
        "shadow-[var(--shadow-card-subtle)] ring-1 ring-foreground/5",
        "card-glow-subtle",
        // #endregion

        // #region Animações e Performance
        "transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-card-hover-subtle)]",
        // #endregion

        // #region Variáveis CSS e Estados (Data Attributes)
        "[--card-spacing:--spacing(6)]",
        "data-[size=sm]:[--card-spacing:--spacing(4)]",
        "data-[size=lg]:[--card-spacing:--spacing(6)]",
        "data-[size=lg]:py-8",
        // #endregion

        // #region Estilos condicionais baseados nos filhos (img)
        "has-[>img:first-child]:pt-0",
        "*:[img:first-child]:rounded-t-4xl",
        "*:[img:last-child]:rounded-b-4xl",
        // #endregion

        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // #region Estrutura e Layout
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5",
        "rounded-t-4xl px-(--card-spacing)",
        // #endregion

        // #region Estados baseados em filhos (slot)
        "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        "has-data-[slot=card-description]:grid-rows-[auto_auto]",
        // #endregion

        // #region Borda condicional
        "[.border-b]:pb-(--card-spacing)",
        // #endregion

        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        // #region Tipografia
        "text-base font-medium",
        // #endregion
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        // #region Tipografia
        "text-muted-foreground text-sm",
        // #endregion
        className,
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        // #region Posicionamento no Grid
        "col-start-2 row-span-2 row-start-1",
        "self-start justify-self-end",
        // #endregion
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        // #region Espaçamento
        "px-(--card-spacing)",
        // #endregion
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        // #region Estrutura e Layout
        "flex items-center rounded-b-4xl px-(--card-spacing)",
        // #endregion

        // #region Borda condicional
        "[.border-t]:pt-(--card-spacing)",
        // #endregion

        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
