import { SITE } from "@/config/site";
import { createOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = SITE.titleDefault;
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createOgImage({
    eyebrow: "yurimachado.dev.br",
    title: SITE.shortName,
    description: SITE.description,
  });
}
