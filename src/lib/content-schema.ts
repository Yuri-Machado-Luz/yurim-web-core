import { z } from "zod";

export const formatSchema = z.enum([
  "nota",
  "pensamento",
  "projeto",
  "planejamento",
]);

export const statusSchema = z
  .enum(["ativo", "desatualizado", "arquivado", "beta", "em desenvolvimento"])
  .default("em desenvolvimento");

export type Format = z.infer<typeof formatSchema>;
export type Status = z.infer<typeof statusSchema>;

export const STATUS_KEY_MAP = {
  ativo: "active",
  desatualizado: "outdated",
  arquivado: "archived",
  beta: "beta",
  "em desenvolvimento": "inDevelopment",
} as const satisfies Record<Status, string>;
