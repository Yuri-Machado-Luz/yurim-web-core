import { ServicesPageContent } from "@/components/services/ServicesPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.services.pageTitle,
  messages.services.pageLead,
  "servicos",
  { locale: "en", path: "/servicos" },
);

export default function EnServicesPage() {
  return <ServicesPageContent />;
}
