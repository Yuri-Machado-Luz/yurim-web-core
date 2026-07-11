import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.projects.pageTitle,
  messages.projects.pageLead,
  "projetos",
  { locale: "en", path: "/projetos" },
);

export default function EnProjectsPage() {
  return <ProjectsPageContent />;
}
