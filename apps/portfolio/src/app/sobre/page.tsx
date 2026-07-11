import { AboutPageContent } from "@/components/about";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.nav.about,
  messages.about.lead,
  "sobre",
  { locale: "pt", path: "/sobre" },
);

export default function AboutPage() {
  return <AboutPageContent />;
}
