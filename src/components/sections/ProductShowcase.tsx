import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Play, X, Recycle, Leaf, Factory, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EnhancedProductCards from "./EnhancedProductCards";
import coils from "@/assets/product-steel-coils.jpg";
import pipes from "@/assets/product-steel-pipes.jpg";
import beams from "@/assets/product-structural-steel.jpg";

const products = [
  {
    name: "Recycled Steel Coils",
    image: coils,
    video: "/placeholder.svg",
    category: "Steel Products",
    recycledContent: "85%",
    co2Saved: "2.5 tons",
    description: "Premium quality steel coils manufactured from recycled materials, maintaining industry standards while reducing environmental impact.",
    features: ["High tensile strength", "Corrosion resistant", "Eco-certified", "Cost-effective"],
    icon: <Factory className="w-6 h-6" />
  },
  {
    name: "Recycled Tyre Materials",
    image: pipes,
    video: "/placeholder.svg",
    category: "Tyre Recycling",
    recycledContent: "100%",
    co2Saved: "3.2 tons",
    description: "Transformed waste tyres into valuable rubber materials for various industrial applications and construction projects.",
    features: ["Rubber granules", "Steel wire extraction", "Textile fiber recovery", "Zero waste process"],
    icon: <Recycle className="w-6 h-6" />
  },
  {
    name: "Sustainable Iron Products",
    image: beams,
    video: "/placeholder.svg",
    category: "Iron & Steel",
    recycledContent: "90%",
    co2Saved: "4.1 tons",
    description: "High-grade iron products created through advanced recycling processes, perfect for construction and manufacturing.",
    features: ["Structural integrity", "Weather resistant", "Sustainable sourcing", "Quality assured"],
    icon: <Leaf className="w-6 h-6" />
  },
];

export default function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 5000);
    return () => clearInterval(id);
  }, []);

  const current = products[index];

  return (
    <div className="space-y-16">
      {/* Enhanced Product Cards with Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <EnhancedProductCards />
      </motion.div>

      {/* Animated Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="h-px bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"
      />

      {/* Featured Products Section with Enhanced Animations */}
      <div className="space-y-8">
        {/* Section Header with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200 mb-6"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Recycle className="w-5 h-5 text-green-600" />
            </motion.div>
            <span className="text-sm font-bold text-green-700">Featured Products</span>
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4"
          >
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Recycled Materials
            </span>{" "}
            Showcase
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
          >
            Transforming waste tyres and iron into premium quality materials through innovative recycling processes
          </motion.p>
        </motion.div>

        {/* Full-Width Product Display with Enhanced Animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="container mx-auto px-4 max-w-7xl"
        >
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={current.name}
                      src={current.image}
                      alt={`${current.name} product image`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.8 }}
                    />
                  </AnimatePresence>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Eco Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-green-500/90 text-white backdrop-blur-xl text-xs">
                      <Leaf className="w-3 h-3 mr-1" />
                      {current.recycledContent} Recycled
                    </Badge>
                    <Badge className="bg-emerald-500/90 text-white backdrop-blur-xl text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {current.co2Saved} CO₂ Saved
                    </Badge>
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.div
                      key={current.name}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white/10 backdrop-blur-2xl rounded-xl p-4 border border-white/20"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-green-400">
                            {current.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg">{current.name}</h4>
                            <p className="text-green-300 text-sm font-medium">{current.category}</p>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowModal(true)}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Pagination Dots */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {products.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index
                          ? 'bg-green-400 scale-125'
                          : 'bg-white/50 hover:bg-white/70'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <motion.div
                    key={current.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {current.description}
                    </p>

                    {/* Environmental Impact Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          {current.recycledContent}
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          Recycled Content
                        </div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center border border-green-100">
                        <div className="text-xl font-bold text-green-600 mb-1">
                          {current.co2Saved}
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          CO₂ Reduction
                        </div>
                      </div>
                    </div>

                    {/* View Details Button Only */}
                    <div className="flex justify-center pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-green-200 text-green-600 hover:bg-green-50"
                        onClick={() => setShowModal(true)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Enhanced Quick View Modal */}
              <AnimatePresence>
                {showModal && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xl z-50 flex items-center justify-center p-4"
                    onClick={() => setShowModal(false)}
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="bg-white/10 backdrop-blur-2xl rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto border border-white/20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="text-green-400">
                            {current.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white">{current.name}</h3>
                            <p className="text-green-300">{current.category}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowModal(false)}
                          className="h-10 w-10 p-0 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Modal Content */}
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Left: Image and Video */}
                        <div className="space-y-4">
                          <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                            <img
                              src={current.image}
                              alt={current.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button variant="outline" size="lg" className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
                                <Play className="w-5 h-5" />
                                Play Demo
                              </Button>
                            </div>
                          </div>

                          {/* Environmental Impact */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                              <div className="text-xl font-black text-green-400 mb-1">
                                {current.recycledContent}
                              </div>
                              <div className="text-xs font-medium text-gray-300">
                                Recycled Content
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4 text-center border border-white/10">
                              <div className="text-xl font-black text-green-400 mb-1">
                                {current.co2Saved}
                              </div>
                              <div className="text-xs font-medium text-gray-300">
                                CO₂ Reduction
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Details */}
                        <div className="space-y-6">
                          <div>
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                              {current.description}
                            </p>
                          </div>

                          {/* Download Specs Button Only */}
                          <div className="flex justify-center">
                            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              Download Specs
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}