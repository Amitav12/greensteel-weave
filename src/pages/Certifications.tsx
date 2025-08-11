import SEO from "@/components/seo/SEO";
import CertificateCarousel from "@/components/sections/CertificateCarousel";

export default function Certifications() {
  return (
    <>
      <SEO 
        title="Certifications & Memberships - AAASHA TRADING LTD | Quality & Compliance" 
        description="Explore our comprehensive certifications and industry memberships that validate our commitment to quality, safety, and environmental responsibility in steel trading." 
        keywords="ISO certification, quality management, environmental certification, steel industry memberships, compliance, safety standards"
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Certifications &{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Memberships
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Validated by industry leaders and regulatory bodies, our certifications demonstrate 
              our unwavering commitment to quality, safety, and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Content Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <CertificateCarousel />
        </div>
      </section>
    </>
  );
}
