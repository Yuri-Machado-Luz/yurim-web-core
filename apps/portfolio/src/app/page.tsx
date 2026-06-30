import { Hero } from '@/components/home/Hero';
import { AboutSection } from '@/components/home/AboutSection';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedProjects />
      <CTASection />
    </>
  );
}
