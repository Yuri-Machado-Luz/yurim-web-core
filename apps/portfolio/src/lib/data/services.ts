import type { LocaleCode } from "@/lib/locale-cookie";

export type ServiceStatus = "available" | "limited" | "soon";

export type ServiceItem = {
  id: string;
  status: ServiceStatus;
  title: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
};

export const serviceStatusLabel: Record<
  ServiceStatus,
  Record<LocaleCode, string>
> = {
  available: { pt: "Disponível", en: "Available" },
  limited: { pt: "Disponibilidade limitada", en: "Limited availability" },
  soon: { pt: "Em breve", en: "Soon" },
};

export const services: ServiceItem[] = [
  {
    id: "web-systems",
    status: "available",
    title: {
      pt: "Sistema web sob medida",
      en: "Custom web system",
    },
    description: {
      pt: "App ou painel com autenticação, CRUD e deploy. Escopo fechado em discovery curto.",
      en: "App or dashboard with auth, CRUD, and deploy. Scope locked in a short discovery.",
    },
  },
  {
    id: "apis",
    status: "available",
    title: {
      pt: "API e integrações",
      en: "API and integrations",
    },
    description: {
      pt: "REST/webhooks, sincronização entre ferramentas e contratos claros de erro e retry.",
      en: "REST/webhooks, tool sync, and clear error/retry contracts.",
    },
  },
  {
    id: "automation",
    status: "available",
    title: {
      pt: "Automação operacional",
      en: "Ops automation",
    },
    description: {
      pt: "Scripts e fluxos que cortam trabalho manual: Python, Power Automate, jobs agendados.",
      en: "Scripts and flows that cut manual work: Python, Power Automate, scheduled jobs.",
    },
  },
  {
    id: "docs-design",
    status: "limited",
    title: {
      pt: "Docs técnicos e UI",
      en: "Technical docs and UI",
    },
    description: {
      pt: "Documentação de produto, identidade leve e prototipagem para times pequenos.",
      en: "Product docs, light identity, and prototyping for small teams.",
    },
  },
  {
    id: "audit",
    status: "soon",
    title: {
      pt: "Auditoria rápida de stack",
      en: "Quick stack audit",
    },
    description: {
      pt: "Revisão de arquitetura, riscos e próximos passos em relatório curto.",
      en: "Architecture review, risks, and next steps in a short report.",
    },
  },
];
