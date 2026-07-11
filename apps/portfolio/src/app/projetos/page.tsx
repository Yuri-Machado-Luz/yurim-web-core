import { ProjectsPageContent } from "@/components/projects/ProjectsPageContent";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.projects.pageTitle,
  messages.projects.pageLead,
  "projetos",
  { locale: "pt", path: "/projetos" },
);

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
