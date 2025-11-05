import Hero from "@/components/Hero";
import { SEO, seoConfigs } from "@/components/SEO";
import { PersonStructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <SEO {...seoConfigs.home} />
      <PersonStructuredData />
      <Hero />
    </>
  );
}
