import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Play, X, Recycle, Leaf, Factory, TrendingUp, Award, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <section className="py-20 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.05),transparent_50%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
      
      <div className="container relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-green-200/50 mb-6">
            <Recycle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700">Sustainable Products</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Recycled Materials
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming waste tyres and iron into premium quality materials through innovative recycling processes
          </p>
        </motion.div>

        {/* Main Product Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left: Featured Product Display */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="eco-gradient-glass" className="overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.name}
                    src={current.image}
                    alt={`${current.name} product image`}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6 }}
                  />
                </AnimatePresence>

                {/* Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Eco Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Badge className="bg-green-500/90 text-white backdrop-blur-xl">
                    <Leaf className="w-3 h-3 mr-1" />
                    {current.recycledContent} Recycled
                  </Badge>
                  <Badge className="bg-emerald-500/90 text-white backdrop-blur-xl">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {current.co2Saved} CO₂ Saved
                  </Badge>
                </div>

                {/* Quick View Button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Button 
                    size="sm" 
                    variant="glass" 
                    onClick={() => setShowModal(true)}
                    className="h-12 w-12 p-0 backdrop-blur-2xl"
                    greenTint="light"
                  >
                    <Eye className="w-5 h-5" />
                  </Button>
                </motion.div>

                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    key={current.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/20"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-green-400">
                        {current.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{current.name}</h3>
                        <p className="text-green-300 text-sm font-medium">{current.category}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 right-6 flex gap-2">
                  {products.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === index 
                          ? 'bg-green-400 scale-125 shadow-lg shadow-green-400/50' 
                          : 'bg-white/50 hover:bg-white/70 hover:scale-110'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-3 border-green-400/50 text-green-700">
                  {current.category}
                </Badge>
                <h3 className="text-3xl font-black text-gray-900 mb-4">
                  {current.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {current.description}
                </p>
              </motion.div>

              {/* Environmental Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card variant="eco-mint" size="sm">
                  <CardContent className="text-center">
                    <div className="text-2xl font-black text-green-600 mb-1">
                      {current.recycledContent}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      Recycled Content
                    </div>
                  </CardContent>
                </Card>
                <Card variant="eco-mint" size="sm">
                  <CardContent className="text-center">
                    <div className="text-2xl font-black text-green-600 mb-1">
                      {current.co2Saved}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      CO₂ Reduction
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Key Features:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {current.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="eco-gradient" 
                  size="lg"
                  className="flex-1"
                  greenTint="medium"
                  ecoGlow
                >
                  <Award className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
                <Button 
                  variant="eco-leaf" 
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowModal(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Product Range
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our full range of recycled materials and sustainable solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card 
                  variant="eco-leaf" 
                  className="group cursor-pointer h-full"
                  hover
                  greenTint="light"
                  ecoTexture
                  onClick={() => {
                    setIndex(i);
                    setShowModal(true);
                  }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="glass" size="lg" greenTint="medium">
                        <Eye className="w-5 h-5 mr-2" />
                        View Details
                      </Button>
                    </div>

                    {/* Eco Badges */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500/90 text-white text-xs">
                        <Recycle className="w-3 h-3 mr-1" />
                        {product.recycledContent}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-green-600">
                        {product.icon}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Leaf className="w-4 h-4" />
                        <span className="font-medium">{product.co2Saved} CO₂ saved</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600">
                        <Shield className="w-4 h-4" />
                        <span className="font-medium">Certified</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

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
                  variant="glass"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="h-10 w-10 p-0"
                  greenTint="light"
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
                      <Button variant="eco-gradient" size="lg" className="gap-2" ecoGlow>
                        <Play className="w-5 h-5" />
                        Play Demo
                      </Button>
                    </div>
                  </div>
                  
                  {/* Environmental Impact */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card variant="eco-mint" size="sm">
                      <CardContent className="text-center">
                        <div className="text-xl font-black text-green-600 mb-1">
                          {current.recycledContent}
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          Recycled Content
                        </div>
                      </CardContent>
                    </Card>
                    <Card variant="eco-mint" size="sm">
                      <CardContent className="text-center">
                        <div className="text-xl font-black text-green-600 mb-1">
                          {current.co2Saved}
                        </div>
                        <div className="text-xs font-medium text-gray-600">
                          CO₂ Reduction
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Right: Details */}
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {current.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Key Features:</h4>
                      <div className="space-y-2">
                        {current.features.map((feature, i) => (
                          <div key={feature} className="flex items-center gap-3 text-gray-300">
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    <Button variant="eco-gradient" className="flex-1" ecoGlow>
                      <Award className="w-4 h-4 mr-2" />
                      Request Quote
                    </Button>
                    <Button variant="eco-leaf" className="flex-1">
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
    </section>
  );
}