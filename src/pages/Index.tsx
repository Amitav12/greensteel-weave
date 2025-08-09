
import SEO from "@/components/seo/SEO";
import Hero from "@/components/sections/Hero";
import LiveDataTicker from "@/components/sections/LiveDataTicker";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ImpactCounters from "@/components/sections/ImpactCounters";
import TrustedBy from "@/components/sections/TrustedBy";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="AAASHA TRADING LTD - Sustainable Steel Trading & Recycling"
        description="Leading steel trading and recycling company focused on sustainability and environmental responsibility. Premium steel products and eco-friendly solutions."
        keywords="steel trading, recycling, sustainability, steel coils, pipes, structural steel"
      />
      
      <Hero />
      <LiveDataTicker />
      <ProductShowcase />
      <ImpactCounters />
      <TrustedBy />
    </div>
  );
}
