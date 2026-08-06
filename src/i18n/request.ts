import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function isValidLocale(
  locale: string,
): locale is (typeof routing.locales)[number] {
  return routing.locales.includes(locale as (typeof routing.locales)[number]);
}

export default getRequestConfig(async ({ locale }) => {
  // Garante que o locale seja resolvido de forma estrita
  let resolvedLocale = locale ?? routing.defaultLocale;

  if (!isValidLocale(resolvedLocale)) {
    resolvedLocale = routing.defaultLocale;
  }

  // Importações explícitas para evitar falhas no empacotador do Next.js
  const [shared, home, blog, post, projects, services, about, contact, resume] =
    await Promise.all([
      import(`./contents/${resolvedLocale}/shared.json`).then((m) => m.default),
      import(`./contents/${resolvedLocale}/home.json`).then((m) => m.default),
      import(`./contents/${resolvedLocale}/blog.json`).then((m) => m.default),
      import(`./contents/${resolvedLocale}/post.json`).then((m) => m.default),
      import(`./contents/${resolvedLocale}/projects.json`).then(
        (m) => m.default,
      ),
      import(`./contents/${resolvedLocale}/services.json`).then(
        (m) => m.default,
      ),
      import(`./contents/${resolvedLocale}/about.json`).then((m) => m.default),
      import(`./contents/${resolvedLocale}/contact.json`).then(
        (m) => m.default,
      ),
      import(`./contents/${resolvedLocale}/resume.json`).then((m) => m.default),
    ]);

  return {
    locale: resolvedLocale,
    messages: {
      shared,
      home,
      blog,
      post,
      projects,
      services,
      about,
      contact,
      resume,
    },
  };
});
