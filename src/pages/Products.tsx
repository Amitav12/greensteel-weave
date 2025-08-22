import { Helmet } from "react-helmet-async";
import ProductShowcase from "@/components/sections/ProductShowcase";
import { motion } from "framer-motion";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Commodities - AAASHA TRADING LTD | Premium Steel & Recycled Materials</title>
        <meta 
          name="description" 
          content="Explore our comprehensive range of high-quality steel commodities and recycled materials. Premium steel coils, sheets, structural steel, and sustainable recycling solutions."
        />
        <meta name="keywords" content="steel commodities, steel coils, steel sheets, structural steel, recycled materials, sustainable steel" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Commodities Content Section - Below the video */}
        <ProductShowcase />
      </div>
    </>
  );
}