
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import coils from "@/assets/product-steel-coils.jpg";
import pipes from "@/assets/product-steel-pipes.jpg";
import beams from "@/assets/product-structural-steel.jpg";

const products = [
  { name: "Steel Coils", image: coils, video: "/placeholder.svg" },
  { name: "Steel Pipes", image: pipes, video: "/placeholder.svg" },
  { name: "Structural Steel", image: beams, video: "/placeholder.svg" },
];

export default function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % products.length), 4000);
    return () => clearInterval(id);
  }, []);

  const current = products[index];

  return (
    <section className="container py-14">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground mt-2">Interactive showcase with 3D effects</p>
      </motion.div>

      <div className="mx-auto max-w-4xl">
        <motion.div 
          className="group relative aspect-[16/9] rounded-2xl overflow-hidden glass-card-hover transition-all duration-500"
          whileHover={{ 
            scale: 1.02,
            rotateX: 2,
            rotateY: 2
          }}
          style={{
            transformStyle: 'preserve-3d',
            perspective: 1000
          }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={current.name}
              src={current.image}
              alt={`${current.name} product image`}
              className="h-full w-full object-cover"
              loading="lazy"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          
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
              className="h-10 w-10 p-0"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </motion.div>

          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              key={current.name}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-lg px-4 py-2 inline-block"
            >
              <span className="font-semibold">{current.name}</span>
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="absolute bottom-6 right-6 flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-card rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{current.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="relative aspect-video rounded-lg overflow-hidden glass-card mb-4">
                <img 
                  src={current.image} 
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="hero" size="lg" className="gap-2">
                    <Play className="w-4 h-4" />
                    Play Demo
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">
                Experience our premium {current.name.toLowerCase()} with industry-leading specifications and quality assurance.
              </p>
              
              <div className="flex gap-3">
                <Button variant="hero" className="flex-1">Request Quote</Button>
                <Button variant="glass" className="flex-1">Download Specs</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
