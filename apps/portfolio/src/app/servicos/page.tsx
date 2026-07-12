import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.services.pageTitle,
  messages.services.pageLead,
  "servicos",
  { locale: "pt", path: "/servicos" },
);

export default function ServicesPage() {
  return <ServicesPageContent />;
}
