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


      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 py-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/20 backdrop-blur-xl rounded-full border border-green-400/30 mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 text-green-400"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
              </motion.div>
              <span className="text-green-400 font-bold text-lg">Premium Steel Products</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6"
            >
              Sustainable{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Steel Solutions
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8"
            >
              Transforming recycled materials into premium quality steel products through innovative processes and cutting-edge technology
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>85% Recycled Content</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-200"></div>
                <span>ISO 9001:2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-400"></div>
                <span>Carbon Neutral Process</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-green-400/20 rounded-full"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${30 + (i * 10)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + (i * 0.5),
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </section>

      {/* Products Content Section - Below the video */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <ProductShowcase />
        </div>
      </section>
    </>
  );
}