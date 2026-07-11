import { getCollection } from "astro:content";

function postHref(collection: string, id: string) {
  return `/posts/${collection}/${id.replace(/\/index$/, "")}`;
}

export async function getFeaturedProjects() {
  const entries = await getCollection(
    "portfolio",
    ({ data }) => !data.draft && data.featured && data.type === "project",
  );
  return entries.sort((a, b) => (a.data.order ?? 99) - (b.data.order ?? 99));
}

export async function getRecentNotes(limit = 5) {
  const entries = await getCollection(
    "notes",
    ({ data, id }) => !data.draft && !id.endsWith("-en"),
  );
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

export async function getAllNotes(locale: "pt" | "en" = "pt") {
  const entries = await getCollection("notes", ({ data, id }) => {
    if (data.draft) return false;
    const isEn = id.endsWith("-en");
    return locale === "en" ? isEn : !isEn;
  });
  return entries.sort((a, b) => {
    const aDate = a.data.pubDate?.getTime() ?? 0;
    const bDate = b.data.pubDate?.getTime() ?? 0;
    return bDate - aDate;
  });
}

export async function getChangelogs() {
  const entries = await getCollection(
    "portfolio",
    ({ data }) => !data.draft && data.type === "changelog",
  );
  return entries.sort((a, b) => a.id.localeCompare(b.id));
}

export async function getLandingCollections(locale: "pt" | "en" = "pt") {
  const [notes, portfolio, automation] = await Promise.all([
    getAllNotes(locale),
    getAllProjects(),
    getAllTools(),
  ]);

  return {
    notes: notes.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: postHref("notes", entry.id),
      tags: entry.data.tags,
      pubDate: entry.data.pubDate,
    })),
    portfolio: portfolio.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: postHref("portfolio", entry.id),
      tags: entry.data.tags,
      status: entry.data.status,
    })),
    automation: automation.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      href: postHref("automation", entry.id),
      tags: entry.data.tags,
      status: entry.data.status,
    })),
  };
}

export async function getAllDocs() {
  const [notes, portfolio, sandbox, automation] = await Promise.all([
    getCollection("notes", ({ data }) => !data.draft),
    getCollection(
      "portfolio",
      ({ data }) => !data.draft && data.type === "project",
    ),
    getCollection("sandbox", ({ data }) => !data.draft),
    getCollection("automation", ({ data }) => !data.draft),
  ]);
  return { notes, portfolio, sandbox, automation };
}
