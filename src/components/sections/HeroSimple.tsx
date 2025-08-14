import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Recycle, Leaf, Factory, TrendingUp, Sparkles } from "lucide-react";

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
      {/* Enhanced Background with Video */}
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0"
      >
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/buisness1-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-15" />
        {/* Additional subtle overlay for consistent contrast */}
        <div className="absolute inset-0 bg-black/15 z-16" />
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
        className="container relative z-40 px-4 md:px-6 mt-28 md:mt-32 lg:mt-36"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column - Main Content */}
            <div ref={heroContentRef} className="text-left space-y-1 md:space-y-2 flex flex-col justify-center">
              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-tight relative">
                  <motion.span
                    className="block text-white drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Transforming
                  </motion.span>
                  <motion.span
                    className="block text-white drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Waste into
                  </motion.span>
                  <motion.span
                    className="block text-white drop-shadow-2xl relative"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Value
                  </motion.span>
                </h1>
              </div>

              {/* Horizontal Environmental Impact Ribbon (with label + KPIs) */}
              <div ref={countersRef} className="mt-3 md:mt-4">
                <div
                  className="w-full sm:w-auto max-w-sm flex flex-col items-start gap-2 bg-black/30 backdrop-blur-md border border-white/15 rounded-xl p-3 md:p-4 shadow-lg"
                  aria-label="Environmental Impact"
                >
                  {/* Label */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-green-500/20 border border-green-400/30">
                      {/* icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" className="text-green-300 fill-current">
                        <circle cx="12" cy="12" r="10" opacity="0.25" />
                        <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </span>
                    <span className="text-white font-extrabold text-base md:text-lg tracking-wide">
                      Environmental Impact
                    </span>
                  </div>

                  <div className="h-px w-full bg-white/15 my-1" />

                  {/* KPI: Tons Recycled */}
                  <div className="flex items-center gap-2">
                    <Factory className="w-5 h-5 md:w-6 md:h-6 text-green-300 shrink-0" />
                    <span className="counter-number text-xl md:text-2xl font-black text-white">0</span>
                    <span className="text-green-300 font-bold text-sm md:text-base">+</span>
                    <span className="text-green-100 text-xs md:text-sm font-medium ml-1">
                      Tons Recycled
                    </span>
                  </div>

                  {/* KPI: Tons CO₂ Saved */}
                  <div className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 md:w-6 md:h-6 text-emerald-300 shrink-0" />
                    <span className="counter-number text-xl md:text-2xl font-black text-white">0</span>
                    <span className="text-green-300 font-bold text-sm md:text-base">+</span>
                    <span className="text-green-100 text-xs md:text-sm font-medium ml-1">
                      Tons CO₂ Saved
                    </span>
                  </div>

                  {/* KPI: Happy Clients */}
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-teal-300 shrink-0" />
                    <span className="counter-number text-xl md:text-2xl font-black text-white">0</span>
                    <span className="text-green-300 font-bold text-sm md:text-base">+</span>
                    <span className="text-green-100 text-xs md:text-sm font-medium ml-1">
                      Happy Clients
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtitle */}
              <div className="text-sm md:text-base lg:text-lg text-green-200 font-medium max-w-xl">
                Leading the future of{" "}
                <span className="text-green-300 font-bold">
                  Sustainable Recycling Solutions
                </span>
              </div>

              {/* CTA Button */}
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

            {/* REMOVED: Right Column tall Environmental Impact panel */}
            {/* (The tall glassmorphism stats card was here; it has been removed to free space) */}
          </div>
        </div>
      </animated.div>
    </section>
  );
}
