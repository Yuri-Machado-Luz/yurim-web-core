import { ChangelogPageContent } from "@/components/changelog/ChangelogPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.changelog.pageTitle,
  messages.changelog.pageLead,
  "portfolio",
  { locale: "en", path: "/changelog" },
);

export default function EnChangelogPage() {
  return <ChangelogPageContent />;
}
