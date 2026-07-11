import {
  AboutTeaser,
  CTASection,
  FeaturedProjects,
  Hero,
  ServicesTeaser,
} from "@/components";
import { getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

const messages = getMessages("en");

export const metadata = pageMetadata(
  messages.meta.homeTitle,
  messages.meta.description,
  "portfolio",
  { locale: "en", path: "/" },
);

export default function EnHome() {
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
