import SEO from "@/components/seo/SEO";
import HeroSimple from "@/components/sections/HeroSimple";
import CurrencyExchangeWithChart from "../components/sections/CurrencyExchangeWithChart";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import ContactModal from "@/components/ui/ContactModal";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Award, Shield, Recycle, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Index() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactAnchor, setContactAnchor] = useState<{ x: number; y: number } | null>(null);
  const [anchorSide, setAnchorSide] = useState<"above" | "below">("below");

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <SEO 
        title="AAASHA TRADING LTD - Leading Steel Trading & Sustainable Recycling Solutions" 
        description="Transform your business with AAASHA TRADING LTD - India's premier steel trading and recycling company. Sustainable solutions, competitive prices, and exceptional service since inception." 
        keywords="steel trading, recycling, sustainability, steel coils, pipes, structural steel, currency exchange, live rates, India steel trading, sustainable recycling" 
      />

      {/* Hero Section */}
      <HeroSimple />

      {/* Featured Videos Section */}
      <FeaturedVideos 
        autoplay={true} 
        muted={true} 
        onVideoStart={(videoId) => {
          // Analytics tracking can be added here
          console.log('Featured video started:', videoId);
        }} 
        onVideoComplete={(videoId) => {
          // Analytics tracking can be added here
          console.log('Featured video completed:', videoId);
        }} 
        onAllVideosComplete={() => {
          // Analytics tracking can be added here
          console.log('All featured videos completed');
        }} 
      />

      {/* Live Market Data Section - Mobile Responsive */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            
            
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Currency Rates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <CurrencyExchangeWithChart />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section - Mobile Responsive */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">
              Why Choose <span className="text-green-600 dark:text-green-400">AAASHA TRADING?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 transition-colors duration-300">
              Your trusted partner in sustainable steel trading and recycling solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: Award,
                title: "Industry Leader",
                description: "Recognized expertise in steel trading and recycling solutions",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: Shield,
                title: "Quality Assured",
                description: "Certified materials with comprehensive quality guarantees",
                color: "from-green-500 to-green-600"
              },
              {
                icon: Recycle,
                title: "Eco-Friendly",
                description: "Sustainable environmental practices that protect our planet",
                color: "from-emerald-500 to-emerald-600"
              },
              {
                icon: TrendingUp,
                title: "Best Pricing",
                description: "Competitive rates with transparent pricing structure",
                color: "from-teal-500 to-teal-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section - Streamlined */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1),transparent_70%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              className="text-3xl md:text-5xl font-black text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl text-green-300 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join hundreds of satisfied clients who trust AAASHA TRADING for sustainable steel solutions.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/products">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  View Commodities
                </Button>
              </Link>
              <Button 
                onClick={(e) => {
                  const btn = e.currentTarget as HTMLButtonElement;
                  const isMobile = window.innerWidth <= 768;
  
                  if (!isMobile) {
                    // Desktop: keep nice scroll + anchor above the button
                    btn.scrollIntoView({ block: "center", behavior: "smooth" });
                    setAnchorSide("above");
                    setTimeout(() => {
                      const rect = btn.getBoundingClientRect();
                      setContactAnchor({ x: rect.left + rect.width / 2, y: rect.top });
                      requestAnimationFrame(() => setIsContactModalOpen(true));
                    }, 350);
                  } else {
                    // Mobile: scroll to top and open modal there (no manual scrolling needed)
                    setAnchorSide("above");
                    setContactAnchor(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setTimeout(() => {
                      requestAnimationFrame(() => setIsContactModalOpen(true));
                    }, 400);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Contact Us
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        anchorPosition={contactAnchor}
        anchorSide={anchorSide}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppFloat 
        phoneNumbers={[
          { number: "447446643043", label: "Primary Contact" }
        ]} 
        defaultMessage="Hello AAASHA TRADING! I'm interested in your steel trading and recycling services. Could you please provide more information about your commodities and pricing?" 
      />
    </div>
  );
}