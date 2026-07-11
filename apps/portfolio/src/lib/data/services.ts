import type { LocaleCode } from "@/lib/locale-cookie";

export type ServiceStatus = "available" | "limited" | "soon";

export type ServiceItem = {
  id: string;
  status: ServiceStatus;
  href: string;
  title: Record<LocaleCode, string>;
  description: Record<LocaleCode, string>;
  cta: Record<LocaleCode, string>;
};

export const serviceStatusLabel: Record<
  ServiceStatus,
  Record<LocaleCode, string>
> = {
  available: { pt: "Disponível", en: "Available" },
  limited: { pt: "Vagas limitadas", en: "Limited" },
  soon: { pt: "Em breve", en: "Soon" },
};

export const services: ServiceItem[] = [
  {
    id: "web-systems",
    status: "available",
    href: "/contato",
    title: {
      pt: "Sistema web sob medida",
      en: "Custom web system",
    },
    description: {
      pt: "App ou painel com autenticação, CRUD e deploy. Escopo fechado em discovery curto.",
      en: "App or dashboard with auth, CRUD, and deploy. Scope locked in a short discovery.",
    },
    cta: {
      pt: "Pedir proposta",
      en: "Request a proposal",
    },
  },
  {
    id: "apis",
    status: "available",
    href: "/contato",
    title: {
      pt: "API e integrações",
      en: "API and integrations",
    },
    description: {
      pt: "REST/webhooks, sincronização entre ferramentas e contratos claros de erro e retry.",
      en: "REST/webhooks, tool sync, and clear error/retry contracts.",
    },
    cta: {
      pt: "Descrever integração",
      en: "Describe the integration",
    },
  },
  {
    id: "automation",
    status: "available",
    href: "/contato",
    title: {
      pt: "Automação operacional",
      en: "Ops automation",
    },
    description: {
      pt: "Scripts e fluxos que cortam trabalho manual — Python, Power Automate, jobs agendados.",
      en: "Scripts and flows that cut manual work — Python, Power Automate, scheduled jobs.",
    },
    cta: {
      pt: "Mapear processo",
      en: "Map the process",
    },
  },
  {
    id: "docs-design",
    status: "limited",
    href: "/contato",
    title: {
      pt: "Docs técnicos e UI",
      en: "Technical docs and UI",
    },
    description: {
      pt: "Documentação de produto, identidade leve e prototipagem para times pequenos.",
      en: "Product docs, light identity, and prototyping for small teams.",
    },
    cta: {
      pt: "Combinar escopo",
      en: "Align on scope",
    },
  },
  {
    id: "audit",
    status: "soon",
    href: "/contato",
    title: {
      pt: "Auditoria rápida de stack",
      en: "Quick stack audit",
    },
    description: {
      pt: "Revisão de arquitetura, riscos e próximos passos em relatório curto.",
      en: "Architecture review, risks, and next steps in a short report.",
    },
    cta: {
      pt: "Lista de espera",
      en: "Join waitlist",
    },
  },
];
