import { Helmet } from "react-helmet-async";
import ProductShowcase from "@/components/sections/ProductShowcase";
import { motion } from "framer-motion";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products - AAASHA TRADING LTD | Premium Steel & Recycled Materials</title>
        <meta
          name="description"
          content="Explore our comprehensive range of high-quality steel products and recycled materials. Premium steel coils, sheets, structural steel, and sustainable recycling solutions."
        />
        <meta name="keywords" content="steel products, steel coils, steel sheets, structural steel, recycled materials, sustainable steel" />
      </Helmet>



      {/* Products Content Section - Below the video */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <ProductShowcase />
        </div>
      </section>
    </>
  );
}