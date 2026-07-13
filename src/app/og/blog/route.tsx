import { SITE } from "@/config/site";
import { createOgImage } from "@/lib/og-image";

export const runtime = "edge";

export function GET() {
  return createOgImage({
    eyebrow: "Blog",
    title: "Notas e posts",
    description: SITE.descriptionBlog,
  });
}
