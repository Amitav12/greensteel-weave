import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Download, Award, Recycle, Leaf, Factory, TrendingUp, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  video?: string;
  recycledContent: string;
  co2Saved: string;
  features: string[];
  specifications: { label: string; value: string }[];
  certifications: string[];
  icon: React.ReactNode;
  benefits: string[];
}

interface ProductCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductDetail[];
  initialProductId?: string;
}

export default function ProductCarousel({ isOpen, onClose, products, initialProductId }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (initialProductId) {
      const index = products.findIndex(p => p.id === initialProductId);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [initialProductId, products]);

  useEffect(() => {
    setImageIndex(0);
  }, [currentIndex]);

  const currentProduct = products[currentIndex];

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % currentProduct.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + currentProduct.images.length) % currentProduct.images.length);
  };

  if (!isOpen || !currentProduct) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white/10 backdrop-blur-3xl rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-white/20 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="text-green-400 text-2xl">
                {currentProduct.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentProduct.name}</h2>
                <p className="text-green-300 font-medium">{currentProduct.category}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                {currentIndex + 1} of {products.length}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Product Navigation */}
              <Button
                variant="outline"
                size="sm"
                onClick={prevProduct}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={products.length <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextProduct}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={products.length <= 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              {/* Close Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
            {/* Left: Images and Media */}
            <div className="space-y-6">
              {/* Main Image/Video */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${currentIndex}-${imageIndex}`}
                    src={currentProduct.images[imageIndex]}
                    alt={`${currentProduct.name} - Image ${imageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                {/* Image Navigation */}
                {currentProduct.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

                {/* Play Button for Video */}
                {currentProduct.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="gap-2 bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <Play className="w-6 h-6" />
                      Play Demo
                    </Button>
                  </div>
                )}

                {/* Image Indicators */}
                {currentProduct.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {currentProduct.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          i === imageIndex 
                            ? 'bg-green-400 scale-125' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Environmental Impact Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                >
                  <div className="text-2xl font-black text-green-400 mb-2">
                    {currentProduct.recycledContent}
                  </div>
                  <div className="text-sm font-medium text-gray-300">
                    Recycled Content
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: currentProduct.recycledContent }}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-xl p-4 text-center border border-white/10"
                >
                  <div className="text-2xl font-black text-green-400 mb-2">
                    {currentProduct.co2Saved}
                  </div>
                  <div className="text-sm font-medium text-gray-300">
                    CO₂ Reduction
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                    <div className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2 rounded-full w-4/5 transition-all duration-1000" />
                  </div>
                </motion.div>
              </div>

              {/* Certifications */}
              {currentProduct.certifications.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.certifications.map((cert, i) => (
                      <Badge 
                        key={cert} 
                        className="bg-green-500/20 text-green-300 border-green-400/30"
                      >
                        <Award className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="space-y-6">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {currentProduct.description}
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {currentProduct.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="font-bold text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {currentProduct.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-gray-300 p-2 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              {currentProduct.benefits.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Benefits
                  </h4>
                  <div className="space-y-2">
                    {currentProduct.benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 text-gray-300"
                      >
                        <Leaf className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {currentProduct.specifications.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-white flex items-center gap-2">
                    <Factory className="w-5 h-5 text-green-400" />
                    Specifications
                  </h4>
                  <div className="space-y-2">
                    {currentProduct.specifications.map((spec, i) => (
                      <div key={spec.label} className="flex justify-between items-center p-2 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-gray-400 text-sm">{spec.label}</span>
                        <span className="text-white font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Request Quote
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Specs
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}