import { ChangelogPageContent } from "@/components/changelog/ChangelogPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.changelog.pageTitle,
  messages.changelog.pageLead,
  "portfolio",
  { locale: "pt", path: "/changelog" },
);

export default function ChangelogPage() {
  return <ChangelogPageContent />;
}
