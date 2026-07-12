import { AboutPageContent } from "@/components/about";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.nav.about,
  messages.about.lead,
  "sobre",
  { locale: "en", path: "/sobre" },
);

export default function EnAboutPage() {
  return <AboutPageContent />;
}
