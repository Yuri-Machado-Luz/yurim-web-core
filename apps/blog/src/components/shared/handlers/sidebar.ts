import { getCollection } from "astro:content";
import type { SidebarEntry, SidebarGroup } from "../../../types";

type PublicCollection = "notes" | "portfolio" | "automation";

const COLLECTION_LABELS: Record<PublicCollection, string> = {
  notes: "Notas",
  portfolio: "Portfólio",
  automation: "Automação",
};

const PUBLIC_COLLECTIONS: PublicCollection[] = [
  "notes",
  "portfolio",
  "automation",
];

function postHref(collectionName: string, id: string) {
  return `/posts/${collectionName}/${id.replace(/\/index$/, "")}`;
}

async function buildGroup(
  collectionName: PublicCollection,
  currentPath?: string,
): Promise<SidebarGroup | null> {
  const entries = await getCollection(collectionName, ({ data, id }) => {
    if (data.draft) return false;
    if (collectionName === "notes" && id.endsWith("-en")) return false;
    if (collectionName === "portfolio" && "type" in data) {
      return (
        data.type === "project" ||
        data.type === "doc" ||
        data.type === "changelog"
      );
    }
    return true;
  });
  if (entries.length === 0) return null;

  if (collectionName === "portfolio") {
    const links = entries
      .map((entry) => {
        const type = "type" in entry.data ? entry.data.type : "doc";
        const href = postHref(collectionName, entry.id);
        const label = type === "changelog" ? "Changelog" : "Sobre";
        return {
          type: "link" as const,
          label,
          href,
          isCurrent: currentPath === href,
          _sort: type === "changelog" ? 1 : 0,
        };
      })
      .sort((a, b) => a._sort - b._sort)
      .map(({ _sort: _, ...link }) => link);

    return {
      type: "group",
      label: COLLECTION_LABELS.portfolio,
      entries: links,
    };
  }

  const sorted = entries.sort((a, b) => {
    const aOrder = "order" in a.data ? (a.data.order ?? 99) : 99;
    const bOrder = "order" in b.data ? (b.data.order ?? 99) : 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    const aDate =
      "pubDate" in a.data && a.data.pubDate ? a.data.pubDate.getTime() : 0;
    const bDate =
      "pubDate" in b.data && b.data.pubDate ? b.data.pubDate.getTime() : 0;
    return bDate - aDate;
  });

  return {
    type: "group",
    label: COLLECTION_LABELS[collectionName],
    entries: sorted.map((entry) => {
      const href = postHref(collectionName, entry.id);
      return {
        type: "link" as const,
        label: entry.data.title,
        href,
        isCurrent: currentPath === href,
      };
    }),
  };
}

export async function buildDocsSidebar(
  currentPath?: string,
): Promise<SidebarEntry[]> {
  const groups = await Promise.all(
    PUBLIC_COLLECTIONS.map((name) => buildGroup(name, currentPath)),
  );

  const entries: SidebarEntry[] = groups.filter(
    (g): g is SidebarGroup => g !== null,
  );

  entries.push({
    type: "link",
    label: "Changelog",
    href: "/posts/changelog",
    isCurrent: currentPath === "/posts/changelog",
  });

  return entries;
}
