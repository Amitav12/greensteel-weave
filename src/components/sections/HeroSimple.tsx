import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recycle, Leaf, Factory, TrendingUp, Sparkles } from "lucide-react";
import SimpleImageCarousel from "@/components/ui/SimpleImageCarousel";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSimple() {
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
    // Hero content animation
    if (heroContentRef.current && heroContentRef.current.children.length > 0) {
      const children = Array.from(heroContentRef.current.children) as HTMLElement[];
      children.forEach((child, index) => {
        gsap.fromTo(child,
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
            delay: index * 0.2,
            ease: "back.out(1.7)"
          }
        );
      });
    }

    // Counter animation with GSAP
    if (countersRef.current) {
      const counterElements = countersRef.current.querySelectorAll('.counter-number');
      const targets = [50000, 25000, 500];

      counterElements.forEach((element: HTMLElement, index: number) => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targets[index],
          duration: 3,
          delay: 2 + (index * 0.3),
          ease: "power2.out",
          onUpdate: function () {
            element.textContent = Math.floor(obj.value).toLocaleString();
          }
        });
      });
    }

    // Cleanup function
    return () => {
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen flex items-start justify-center overflow-hidden bg-transparent pt-8">
      {/* Enhanced Background with Image Carousel */}
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0"
      >
        {/* Enhanced Image Carousel with only the 5 new industrial images */}
        <SimpleImageCarousel 
          images={[
            "/lovable-uploads/b388c060-872e-4f0e-bfbc-528b4f713584.png",
            "/lovable-uploads/c731af5f-b373-492b-8a87-5f5bb800df2b.png",
            "/lovable-uploads/2ea524d3-9629-4e45-a879-2e407f5cc008.png",
            "/lovable-uploads/cb1ebe87-f93f-43ef-875a-ecee4a3223ec.png",
            "/lovable-uploads/68d07f7b-3ac2-47a4-a5cb-b1ae1872ad90.png"
          ]}
          interval={5000}
          className="z-10"
          pauseOnHover={true}
          respectReducedMotion={true}
        />
        
        {/* Dark overlay for text readability - removed white background */}
        <div className="absolute inset-0 bg-black/20 z-15" />
      </animated.div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden z-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/8 rounded-full"
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <animated.div
        style={heroSpring}
        className="container relative z-40 px-4 md:px-6 -mt-40 md:-mt-36 lg:-mt-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column - Main Content */}
            <div ref={heroContentRef} className="text-left space-y-1 md:space-y-2 flex flex-col justify-center">
              {/* Company Badge - removed white/glass background */}
              <div className="inline-flex items-center rounded-full px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-sm font-bold bg-black/40 backdrop-blur-2xl text-white shadow-2xl border border-green-400/30 -mt-8 md:-mt-6 lg:-mt-4 -mb-4 md:-mb-3 lg:-mb-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <Recycle className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-2 md:mr-3 lg:mr-4 text-green-400" />
                </motion.div>
                <div className="text-sm md:text-base lg:text-lg font-black">
                  AAASHA TRADING LTD
                </div>
              </div>

              {/* Enhanced Main Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight relative">
                  <motion.span
                    className="block text-white drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Transforming
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 text-white/20 blur-sm">Transforming</div>
                  </motion.span>

                  <motion.span
                    className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Waste into
                    {/* Animated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text text-transparent animate-pulse opacity-50">
                      Waste into
                    </div>
                  </motion.span>

                  <motion.span
                    className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Value
                    {/* Glowing underline */}
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60 blur-sm" />
                  </motion.span>
                </h1>
              </div>

              {/* Subtitle */}
              <div className="text-sm md:text-base lg:text-lg text-green-300 font-medium max-w-xl">
                Leading the future of{" "}
                <span className="text-green-400 font-bold">
                  Sustainable Recycling Solutions
                </span>
              </div>

              {/* Enhanced CTA Button */}
              <div className="flex justify-start">
                <Link to="/products">
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      y: -3
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="group relative"
                  >
                    {/* Glowing background effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-75 blur-lg transition-all duration-500" />

                    <Button
                      variant="eco-gradient"
                      size="lg"
                      className="text-sm md:text-base px-4 md:px-6 py-2 md:py-3 font-bold relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/50 border-2 border-green-400/30 hover:border-green-300/60"
                      greenTint="medium"
                    >
                      {/* Animated background shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      {/* Button content */}
                      <div className="flex items-center relative z-10">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.8 }}
                        >
                          <Recycle className="w-4 h-4 mr-2 drop-shadow-lg" />
                        </motion.div>
                        <span className="text-white drop-shadow-lg tracking-wide">
                          Explore Products
                        </span>
                      </div>

                      {/* Pulsing inner glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Right Column - Enhanced Glass Morphism Impact Dashboard */}
            <div className="lg:text-right mt-40 md:mt-36 lg:mt-32">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-black/20 backdrop-blur-3xl rounded-lg md:rounded-xl p-2 md:p-3 lg:p-4 border border-green-400/30 shadow-2xl relative overflow-hidden hover:border-green-300/50 transition-all duration-500 max-w-sm mx-auto"
              >
                {/* Enhanced glass effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-400/10 to-teal-500/15" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.2),transparent_70%)]" />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/20 via-emerald-500/20 to-teal-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 blur-sm" />

                {/* Floating orbs */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-green-400/60 rounded-full animate-pulse" />
                <div className="absolute bottom-6 left-6 w-2 h-2 bg-emerald-400/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4 md:mb-6">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </motion.div>
                  </div>

                  <h3 className="text-lg md:text-xl font-black text-white mb-3 md:mb-4 text-center">
                    <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Environmental Impact
                    </span>
                  </h3>
                  <div className="text-center mb-3 md:mb-4">
                    <p className="text-green-300 text-xs md:text-sm font-medium">
                      Transforming Tyres & Iron into Sustainable Solutions
                    </p>
                  </div>

                  <div ref={countersRef} className="space-y-3 md:space-y-4">
                    <motion.div
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05, y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <Factory className="w-5 h-5 md:w-6 md:h-6 text-green-400 mr-2" />
                        <span className="counter-number text-xl md:text-2xl font-black text-white">
                          0
                        </span>
                        <span className="text-lg md:text-xl font-bold text-green-400 ml-1">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-sm md:text-base">Tons Recycled</p>
                      <p className="text-green-400/80 text-xs font-medium">Tyres & Steel Materials</p>
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
                      <div className="flex items-center justify-center mb-2">
                        <Leaf className="w-5 h-5 md:w-6 md:h-6 text-green-400 mr-2" />
                        <span className="counter-number text-xl md:text-2xl font-black text-white">
                          0
                        </span>
                        <span className="text-lg md:text-xl font-bold text-green-400 ml-1">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-sm md:text-base">Tons CO₂ Saved</p>
                      <p className="text-green-400/80 text-xs font-medium">Environmental Protection</p>
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
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-green-400 mr-2" />
                        <span className="counter-number text-xl md:text-2xl font-black text-white">
                          0
                        </span>
                        <span className="text-lg md:text-xl font-bold text-green-400 ml-1">+</span>
                      </div>
                      <p className="text-green-300 font-bold text-sm md:text-base">Happy Clients</p>
                      <p className="text-green-400/80 text-xs font-medium">Sustainable Partnerships</p>
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
              </motion.div>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
}
