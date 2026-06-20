import { getCollection } from "astro:content";

export async function getFeaturedProjects() {
  const entries = await getCollection(
    "portfolio",
    ({ data }) => !data.draft && data.featured && data.type === "project",
  );
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getRecentNotes(limit = 5) {
  const entries = await getCollection("notes", ({ data }) => !data.draft);
  return entries
    .sort((a, b) => {
      const aDate = a.data.pubDate?.getTime() ?? 0;
      const bDate = b.data.pubDate?.getTime() ?? 0;
      return bDate - aDate;
    })
    .slice(0, limit);
}

export async function getAllProjects() {
  const entries = await getCollection(
    "portfolio",
    ({ data }) => !data.draft && data.type === "project",
  );
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getAllTools() {
  const entries = await getCollection("automation", ({ data }) => !data.draft);
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getAllNotes() {
  const entries = await getCollection("notes", ({ data }) => !data.draft);
  return entries.sort((a, b) => {
    const aDate = a.data.pubDate?.getTime() ?? 0;
    const bDate = b.data.pubDate?.getTime() ?? 0;
    return bDate - aDate;
  });
}

export async function getAllDocs() {
  const [notes, portfolio, sandbox, automation] = await Promise.all([
    getCollection("notes", ({ data }) => !data.draft),
    getCollection("portfolio", ({ data }) => !data.draft && data.type === "project"),
    getCollection("sandbox", ({ data }) => !data.draft),
    getCollection("automation", ({ data }) => !data.draft),
  ]);
  return { notes, portfolio, sandbox, automation };
}
