import { SITE } from "@/config/site";
import { createOgImage, ogImageSize } from "@/lib/og-image";

export const runtime = "edge";
export const alt = `Blog · ${SITE.shortName}`;
export const size = ogImageSize;
export const contentType = "image/png";

export default function BlogTwitterImage() {
  return createOgImage({
    eyebrow: "Blog",
    title: "Notas e posts",
    description: SITE.descriptionBlog,
  });
}
