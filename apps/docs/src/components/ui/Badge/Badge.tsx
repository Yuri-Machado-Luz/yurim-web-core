import { cm } from "@lib";

type BadgeVariant = "ativo" | "dev" | "arquivado" | "beta";

const styles: Record<BadgeVariant, string> = {
  ativo: "bg-green-500/15 text-green-400 border-green-500/30",
  dev: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
  arquivado: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
  beta: "bg-shock-400/15 text-shock-300 border-shock-400/30",
};

const labels: Record<BadgeVariant, string> = {
  ativo: "Ativo",
  dev: "Em desenvolvimento",
  arquivado: "Arquivado",
  beta: "Beta",
};

type BadgeProps = {
  variant: BadgeVariant;
  label?: string;
  className?: string;
};

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cm(
        "inline-flex items-center text-xs px-2 py-0.5 rounded-full border font-medium",
        styles[variant],
        className,
      )}
    >
      {label ?? labels[variant]}
    </span>
  );
}
