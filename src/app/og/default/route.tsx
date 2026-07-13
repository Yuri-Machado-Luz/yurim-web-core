import { SITE } from "@/config/site";
import { createOgImage } from "@/lib/og-image";

export const runtime = "edge";

export function GET() {
  return createOgImage({
    eyebrow: "yurimachado.dev.br",
    title: SITE.shortName,
    description: SITE.description,
  });
}
