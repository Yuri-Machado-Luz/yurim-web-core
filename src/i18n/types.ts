export type Format = "nota" | "pensamento" | "projeto" | "planejamento";

export type Status =
  "ativo" | "desatualizado" | "arquivado" | "beta" | "em desenvolvimento";

export const STATUS_KEY_MAP = {
  ativo: "active",
  desatualizado: "outdated",
  arquivado: "archived",
  beta: "beta",
  "em desenvolvimento": "inDevelopment",
} as const satisfies Record<Status, string>;
