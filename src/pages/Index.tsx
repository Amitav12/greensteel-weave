
import SEO from "@/components/seo/SEO";
import Hero from "@/components/sections/Hero";
import ImpactCounters from "@/components/sections/ImpactCounters";
import ProductShowcase from "@/components/sections/ProductShowcase";
import LiveDataTicker from "@/components/sections/LiveDataTicker";
import TrustedBy from "@/components/sections/TrustedBy";

const Index = () => {
  return (
    <main>
      <SEO
        title="AAASHA TRADING LTD — Recycling & Steel Trading"
        description="Sustainable recycling and premium steel trading with a commitment to environmental responsibility."
        canonical="/"
      />
      <Hero />
      <TrustedBy />
      <ImpactCounters />
      <ProductShowcase />
      <LiveDataTicker />
    </main>
  );
};

export default Index;
