import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.nav.contact,
  messages.contact.lead,
  "contato",
  { locale: "en", path: "/contato" },
);

export default function EnContactPage() {
  return <ContactPageContent />;
}
