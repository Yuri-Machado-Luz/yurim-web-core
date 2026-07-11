import {
  AboutTeaser,
  CTASection,
  FeaturedProjects,
  Hero,
  ServicesTeaser,
} from "@/components";
import { pageMetadata } from "@/lib/metadata";
import { getMessages } from "@/lib/i18n";

const messages = getMessages("pt");

export const metadata = pageMetadata(
  messages.meta.homeTitle,
  messages.meta.description,
  "portfolio",
  { locale: "pt", path: "/" },
);

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutTeaser />
      <ServicesTeaser />
      <CTASection />
    </>
  );
}
