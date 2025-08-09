
import SEO from "@/components/seo/SEO";
import Hero from "@/components/sections/Hero";
import LiveDataTicker from "@/components/sections/LiveDataTicker";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ImpactCounters from "@/components/sections/ImpactCounters";
import TrustedBy from "@/components/sections/TrustedBy";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen">
      <SEO 
        title="AAASHA TRADING LTD - Sustainable Steel Trading & Recycling"
        description="Leading steel trading and recycling company focused on sustainability and environmental responsibility. Premium steel products and eco-friendly solutions."
        keywords="steel trading, recycling, sustainability, steel coils, pipes, structural steel, currency exchange, live rates"
      />
      
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <LiveDataTicker />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProductShowcase />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ImpactCounters />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <TrustedBy />
      </motion.div>
    </div>
  );
}
