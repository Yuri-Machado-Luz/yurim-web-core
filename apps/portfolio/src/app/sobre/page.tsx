import { AboutPageContent } from "@/components/about";

import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Sobre",
  "Desenvolvedor Full-Stack com formação em Psicologia e ADS. Freelancer desde 2020, ex-IBM. São Paulo.",
  "sobre",
);

export default function AboutPage() {
  return <AboutPageContent />;
}
