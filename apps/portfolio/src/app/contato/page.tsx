import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.nav.contact,
  messages.contact.lead,
  "contato",
  { locale: "pt", path: "/contato" },
);

export default function ContactPage() {
  return <ContactPageContent />;
}
