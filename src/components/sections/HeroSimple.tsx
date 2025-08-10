import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recycle, ArrowRight, Leaf, Factory, TrendingUp, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-recycling-steel.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSimple() {
  const [counters, setCounters] = useState({
    recycled: 0,
    co2Saved: 0,
    clients: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const countersRef = useRef(null);

  // React Spring animations
  const heroSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9) translateY(100px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    config: config.slow,
    delay: 300
  });

  const backgroundSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
    delay: 100
  });

  // GSAP Animations
  useEffect(() => {
    setIsLoaded(true);
    
    const tl = gsap.timeline();
    
    // Hero content animation
    if (heroContentRef.current) {
      tl.fromTo(heroContentRef.current.children, 
        { 
          y: 100, 
          opacity: 0, 
          scale: 0.8,
          rotationX: 45 
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }

    // Counter animation with GSAP
    if (countersRef.current) {
      const counterElements = countersRef.current.querySelectorAll('.counter-number');
      const targets = [50000, 25000, 500];
      
      counterElements.forEach((element, index) => {
        gsap.fromTo({ value: 0 }, 
          { 
            value: targets[index],
            duration: 3,
            delay: 2 + (index * 0.3),
            ease: "power2.out",
            onUpdate: function() {
              element.textContent = Math.floor(this.targets()[0].value).toLocaleString();
            }
          }
        );
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-black">
      {/* Background Image with React Spring */}
      <animated.div 
        style={backgroundSpring}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Recycling and steel operations"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="eager"
        />
      </animated.div>

      {/* Glass Morphism Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-green-500/10 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Main Content */}
      <animated.div 
        style={heroSpring}
        className="container relative z-10 py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <div ref={heroContentRef} className="text-left space-y-8">
              {/* Company Badge */}
              <div className="inline-flex items-center rounded-full px-8 py-4 text-sm font-bold bg-white/10 backdrop-blur-2xl text-white shadow-2xl border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Recycle className="w-6 h-6 mr-4 text-green-400" />
                </motion.div>
                <div className="text-lg font-black">
                  AAASHA TRADING LTD
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-tight">
                  <span className="block text-white">Transforming</span>
                  <span className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                    Waste into
                  </span>
                  <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                    Value
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="text-2xl md:text-3xl text-green-300 font-medium">
                Leading the future of{" "}
                <span className="text-green-400 font-bold">
                  Sustainable Recycling Solutions
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/products">
                  <Button 
                    variant="eco-gradient"
                    size="xl"
                    className="text-xl px-12 py-6 font-bold"
                    greenTint="medium"
                    ecoGlow
                  >
                    <Recycle className="w-6 h-6 mr-2" />
                    Explore Solutions
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="glass"
                    size="xl"
                    className="text-xl px-12 py-6 font-bold"
                    greenTint="light"
                  >
                    <ArrowRight className="w-6 h-6 mr-2" />
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Column - Glass Morphism Impact Dashboard */}
            <div className="lg:text-right">
              <div className="bg-white/5 backdrop-blur-3xl rounded-3xl p-10 border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Glass effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1),transparent_70%)]" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-8">
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white mb-10 text-center">
                    <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Environmental Impact
                    </span>
                  </h3>
                  <div className="text-center mb-8">
                    <p className="text-green-300 text-sm font-medium">
                      Transforming Tyres & Iron into Sustainable Solutions
                    </p>
                  </div>
                  
                  <div ref={countersRef} className="space-y-8">
                    <motion.div 
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Factory className="w-10 h-10 text-green-400 mr-4" />
                        <span className="counter-number text-5xl md:text-6xl font-black text-white">
                          0
                        </span>
                        <span className="text-3xl font-bold text-green-400 ml-2">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-xl">Tons Recycled</p>
                      <p className="text-green-400/80 text-sm font-medium">Tyres & Steel Materials</p>
                      <div className="w-full bg-white/10 rounded-full h-3 mt-3 relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: "85%" }}
                          transition={{ duration: 2, delay: 2 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Leaf className="w-10 h-10 text-green-400 mr-4" />
                        <span className="counter-number text-5xl md:text-6xl font-black text-white">
                          0
                        </span>
                        <span className="text-3xl font-bold text-green-400 ml-2">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-xl">Tons CO₂ Saved</p>
                      <p className="text-green-400/80 text-sm font-medium">Environmental Protection</p>
                      <div className="w-full bg-white/10 rounded-full h-3 mt-3 relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-emerald-400 to-teal-500 h-3 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: "92%" }}
                          transition={{ duration: 2, delay: 2.3 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <TrendingUp className="w-10 h-10 text-green-400 mr-4" />
                        <span className="counter-number text-5xl md:text-6xl font-black text-white">
                          0
                        </span>
                        <span className="text-3xl font-bold text-green-400 ml-2">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-xl">Happy Clients</p>
                      <p className="text-green-400/80 text-sm font-medium">Sustainable Partnerships</p>
                      <div className="w-full bg-white/10 rounded-full h-3 mt-3 relative overflow-hidden">
                        <motion.div 
                          className="bg-gradient-to-r from-teal-400 to-green-500 h-3 rounded-full relative"
                          initial={{ width: 0 }}
                          animate={{ width: "78%" }}
                          transition={{ duration: 2, delay: 2.6 }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-xl bg-white/10"
        >
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-4 bg-green-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}