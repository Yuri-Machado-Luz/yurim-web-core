import { getCollection } from "astro:content";
import type { SidebarEntry, SidebarGroup } from "../../../types";

type CollectionName = "notes" | "portfolio" | "sandbox" | "automation";

const COLLECTION_LABELS: Record<CollectionName, string> = {
  notes: "Notas",
  portfolio: "Portfólio",
  sandbox: "Sandbox",
  automation: "Ferramentas",
};

async function buildGroup(
  collectionName: CollectionName,
  currentPath?: string,
): Promise<SidebarGroup | null> {
  const entries = await getCollection(collectionName, ({ data }) => !data.draft);
  if (entries.length === 0) return null;

  const sorted = entries.sort(
    (a, b) => ((a.data as any).order ?? 99) - ((b.data as any).order ?? 99),
  );

  return {
    type: "group",
    label: COLLECTION_LABELS[collectionName],
    entries: sorted.map((entry) => {
      const cleanId = entry.id.replace(/\/index$/, "");
      const href = `/docs/${collectionName}/${cleanId}`;
      return {
        type: "link",
        label: entry.data.title,
        href,
        isCurrent: currentPath === href,
      };
    }),
  };
}

export async function buildDocsSidebar(currentPath?: string): Promise<SidebarEntry[]> {
  const collections: CollectionName[] = ["notes", "portfolio", "sandbox", "automation"];
  const groups = await Promise.all(
    collections.map((col) => buildGroup(col, currentPath)),
  );
  return groups.filter((g): g is SidebarGroup => g !== null);
}
