import { Helmet } from "react-helmet";
import SEO from "@/components/seo/SEO";
import { BusinessProcessVideo } from "@/components/sections/BusinessProcessVideo";
import HeroSimple from "@/components/sections/HeroSimple";
import ServicesOverviewSimple from "@/components/sections/ServicesOverviewSimple";
import EnhancedProductCards from "@/components/sections/EnhancedProductCards";
import TrustedBy from "@/components/sections/TrustedBy";
import ImpactCounters from "@/components/sections/ImpactCounters";
import LiveDataTickerSimple from "@/components/sections/LiveDataTickerSimple";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

export default function Index() {
  return (
    <>
      <SEO 
        title="Aaasha Trading - Premium Steel Trading & Recycling Solutions"
        description="Leading provider of sustainable steel trading and recycling services. Quality materials, environmental responsibility, and exceptional customer service."
        keywords="steel trading, recycling, sustainable materials, metal processing, industrial solutions"
        ogImage="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&h=630&fit=crop"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Aaasha Trading Ltd",
            "description": "Premium steel trading and recycling solutions",
            "url": "https://www.aashatrading.com",
            "logo": "https://www.aashatrading.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-234-567-8900",
              "contactType": "customer service"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <HeroSimple />
        
        {/* Services Overview */}
        <ServicesOverviewSimple />
        
        {/* Product Showcase */}
        <EnhancedProductCards />
        
        {/* Business Process Video */}
        <BusinessProcessVideo />
        
        {/* Trust & Impact Section */}
        <TrustedBy />
        <ImpactCounters />
        
        {/* Live Data Ticker */}
        <LiveDataTickerSimple />
        
        {/* WhatsApp Float */}
        <WhatsAppFloat />
      </div>
    </>
  );
}
