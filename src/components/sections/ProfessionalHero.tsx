import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Recycle, ArrowRight, Factory, TrendingUp, Leaf, Award } from "lucide-react";
import heroImage from "@/assets/hero-recycling-steel.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Typewriter hook
function useTypewriter(words: string[], speed = 50, delay = 1500) {
  const [text, setText] = useState('');
  const [cursor, setCursor] = useState('|');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const shouldDelete = isDeleting && text.length > 0;
    const shouldType = !isDeleting && text.length < currentWord.length;

    if (shouldType) {
      const timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }

    if (shouldDelete) {
      const timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length - 1));
      }, speed / 2);
      return () => clearTimeout(timeout);
    }

    if (!shouldType && !shouldDelete) {
      const timeout = setTimeout(() => {
        if (isDeleting) {
          setWordIndex((prev) => (prev + 1) % words.length);
          setIsDeleting(false);
        } else {
          setIsDeleting(true);
        }
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [text, isDeleting, wordIndex, words, speed, delay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prev => prev === '|' ? '' : '|');
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return { text, cursor };
}

// Product showcase data
const products = [
  {
    name: "Steel Coils",
    category: "Steel Products"
  },
  {
    name: "Structural Steel",
    category: "Construction Materials"
  },
  {
    name: "Recycled Materials",
    category: "Sustainable Solutions"
  }
];

export default function ProfessionalHero() {
  const { text, cursor } = useTypewriter([
    "Sustainable Steel Trading",
    "Environmental Responsibility", 
    "Premium Recycling Solutions",
    "Green Manufacturing"
  ], 80, 2000);

  const [currentProduct, setCurrentProduct] = useState(0);
  const [impactCounters, setImpactCounters] = useState({
    recycled: 0,
    co2Saved: 0,
    clients: 0
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  // Auto-slide products
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(prev => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations
  useEffect(() => {
    // Counter animations
    if (countersRef.current) {
      const counterElements = countersRef.current.querySelectorAll('.counter-number');
      const targets = [125000, 890000, 350];
      
      counterElements.forEach((element: any, index: number) => {
        gsap.fromTo({ value: 0 }, { value: targets[index] }, {
          duration: 2.5,
          delay: 1 + (index * 0.3),
          ease: "power2.out",
          onUpdate: function () {
            element.textContent = Math.floor(this.targets()[0].value).toLocaleString();
          },
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          }
        });
      });
    }

    // Parallax effect
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Image with Green Overlay */}
      <div 
        ref={heroRef}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Steel recycling and trading operations"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        {/* Semi-transparent green overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32]/80 via-[#2E7D32]/60 to-[#4CAF50]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Main Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-8"
            >
              {/* Company Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center rounded-full px-6 py-3 bg-white/20 backdrop-blur-xl text-white shadow-xl border border-white/30"
              >
                <Recycle className="w-5 h-5 mr-3 text-[#81C784]" />
                <span className="font-bold text-lg">AAASHA TRADING LTD</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
                  Leading in
                  <br />
                  <span className="bg-gradient-to-r from-[#81C784] via-white to-[#4CAF50] bg-clip-text text-transparent">
                    {text}
                  </span>
                  <span className="text-[#81C784] animate-pulse">{cursor}</span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed"
              >
                Transforming the steel industry through sustainable practices and environmental responsibility. Your trusted partner in premium steel trading and recycling solutions.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/products">
                  <Button 
                    size="lg"
                    className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold px-8 py-4 text-lg rounded-xl shadow-2xl hover:shadow-[#4CAF50]/50 transition-all duration-300 hover:scale-105"
                  >
                    <Factory className="w-5 h-5 mr-2" />
                    Explore Products
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white hover:text-[#2E7D32] font-bold px-8 py-4 text-lg rounded-xl backdrop-blur-xl bg-white/10 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Contact Us
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Column - Product Showcase & Impact Counters */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="space-y-8"
            >
              {/* 3D Product Showcase */}
              <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentProduct}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                      >
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                          <Factory className="w-24 h-24 text-green-600" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="bg-white/20 backdrop-blur-xl rounded-lg p-4 border border-white/30">
                            <h3 className="text-xl font-bold text-white mb-1">
                              {products[currentProduct].name}
                            </h3>
                            <p className="text-white/80 text-sm">
                              {products[currentProduct].category}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Product Navigation Dots */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {products.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentProduct(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentProduct 
                              ? 'bg-[#81C784] scale-125' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact Counters */}
              <div ref={countersRef} className="grid grid-cols-3 gap-4">
                <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Factory className="w-8 h-8 text-[#81C784] mx-auto mb-2" />
                    <div className="counter-number text-2xl font-black text-white">0</div>
                    <p className="text-white/80 text-sm font-medium">Tons Recycled</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Leaf className="w-8 h-8 text-[#81C784] mx-auto mb-2" />
                    <div className="counter-number text-2xl font-black text-white">0</div>
                    <p className="text-white/80 text-sm font-medium">CO₂ Saved (kg)</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl">
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-[#81C784] mx-auto mb-2" />
                    <div className="counter-number text-2xl font-black text-white">0</div>
                    <p className="text-white/80 text-sm font-medium">Happy Clients</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-xl bg-white/10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-[#81C784] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}