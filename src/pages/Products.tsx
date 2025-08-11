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



      {/* Full-Screen Video Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/api/placeholder/1920/1080"
        >
          <source src="/steel-production-process.mp4" type="video/mp4" />
          <source src="/steel-production-process.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center text-white px-4 sm:px-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6">
                Experience Our{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Steel Process
                </span>
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-green-200 leading-relaxed">
                Steel recycling and production workflow
              </p>
            </motion.div>
          </div>
        </div>


      </section>

      {/* Products Content Section - Below the video */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <ProductShowcase />
        </div>
      </section>
    </>
  );
}