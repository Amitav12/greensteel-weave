import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Factory, TrendingUp, Leaf } from "lucide-react";
import { useResponsive } from "@/hooks/useResponsive";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function HeroSimple() {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);
  const countersRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();

  // React Spring animations - adjusted for mobile
  const heroSpring = useSpring({
    from: { opacity: 0, transform: isMobile ? 'scale(0.95) translateY(30px)' : 'scale(0.9) translateY(50px)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0px)' },
    config: isMobile ? config.gentle : config.slow,
    delay: isMobile ? 200 : 300
  });

  const backgroundSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
    delay: 100
  });

  // GSAP Animations - mobile optimized
  useEffect(() => {
    // Reduce animation complexity on mobile for better performance
    if (isMobile) {
      // Simplified mobile animations
      if (heroContentRef.current && heroContentRef.current.children.length > 0) {
        const children = Array.from(heroContentRef.current.children) as HTMLElement[];
        children.forEach((child, index) => {
          gsap.fromTo(child,
            {
              y: 50,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out"
            }
          );
        });
      }
    } else {
      // Keep existing desktop animations
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
    }

    // Counter animation with GSAP - adjusted timing for mobile
    if (countersRef.current) {
      const counterElements = countersRef.current.querySelectorAll('.counter-number');
      const targets = [50000, 25000, 500];
      const duration = isMobile ? 2 : 3;
      const baseDelay = isMobile ? 1.5 : 2;

      counterElements.forEach((element: HTMLElement, index: number) => {
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targets[index],
          duration: duration,
          delay: baseDelay + (index * 0.2),
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
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-start justify-start overflow-hidden bg-transparent">
      {/* Enhanced Background with Video */}
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0"
      >
        {/* Background Video - optimized for mobile */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "metadata" : "auto"}
          poster="/placeholder.svg"
        >
          <source src="/buisness1-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Enhanced dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50 z-15" />
        {/* Additional subtle overlay for consistent contrast */}
        <div className="absolute inset-0 bg-black/15 z-16" />
      </animated.div>

      {/* Floating Particles Effect - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden z-30">
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-green-400/8 rounded-full"
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

      {/* Main Content - Fixed positioning for better viewport control */}
      <animated.div
        style={heroSpring}
        className="container relative z-40 px-4 sm:px-6 lg:px-8 flex items-start justify-start w-full h-full"
      >
        <div className="max-w-7xl w-full flex items-start justify-start h-full pt-20 sm:pt-24 md:pt-28 lg:pt-32 xl:pt-36">
          <div className="flex items-start justify-start w-full h-full">
            {/* Left Column - Main Content - Positioned at top-left with proper spacing */}
            <div className="w-full max-w-4xl flex flex-col justify-start h-full">
              <div ref={heroContentRef} className="text-left space-y-4 sm:space-y-6 md:space-y-6 lg:space-y-8">
                {/* Headline */}
                <div className="space-y-2 sm:space-y-3">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-tight">
                    <motion.span
                      className="block text-white drop-shadow-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      Transforming
                    </motion.span>
                    <motion.span
                      className="block text-white drop-shadow-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      Waste into
                    </motion.span>
                    <motion.span
                      className="block text-white drop-shadow-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      Value
                    </motion.span>
                  </h1>
                </div>

                {/* Environmental Impact Stats Card - Positioned below headline */}
                <div ref={countersRef} className="mt-4 sm:mt-6">
                  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-black/30 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-4 md:p-5 shadow-lg">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <span className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-md bg-green-500/20 border border-green-400/30">
                        <svg width="10" height="10" viewBox="0 0 24 24" className="text-green-300 fill-current sm:w-3 sm:h-3 md:w-3.5 md:h-3.5">
                          <circle cx="12" cy="12" r="10" opacity="0.25" />
                          <path d="M7 13l3 3 7-7" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                      </span>
                      <span className="text-white font-extrabold text-xs sm:text-sm md:text-base lg:text-lg tracking-wide">
                        Environmental Impact
                      </span>
                    </div>

                    <div className="h-px w-full bg-white/15 mb-3 sm:mb-4" />

                    <div className="space-y-2 sm:space-y-3">
                      {/* KPI: Tons Recycled */}
                      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                        <Factory className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-green-300 shrink-0" />
                        <span className="counter-number text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white">0</span>
                        <span className="text-green-300 font-bold text-xs sm:text-sm md:text-base">+</span>
                        <span className="text-green-100 text-xs sm:text-sm font-medium ml-0.5 sm:ml-1">
                          Tons Recycled
                        </span>
                      </div>

                      {/* KPI: Tons CO₂ Saved */}
                      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                        <Leaf className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-emerald-300 shrink-0" />
                        <span className="counter-number text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white">0</span>
                        <span className="text-green-300 font-bold text-xs sm:text-sm md:text-base">+</span>
                        <span className="text-green-100 text-xs sm:text-sm font-medium ml-0.5 sm:ml-1">
                          Tons CO₂ Saved
                        </span>
                      </div>

                      {/* KPI: Happy Clients */}
                      <div className="flex items-center gap-1.5 sm:gap-2 w-full">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-teal-300 shrink-0" />
                        <span className="counter-number text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white">0</span>
                        <span className="text-green-300 font-bold text-xs sm:text-sm md:text-base">+</span>
                        <span className="text-green-100 text-xs sm:text-sm font-medium ml-0.5 sm:ml-1">
                          Happy Clients
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtitle */}
                <div className="text-xs sm:text-sm md:text-base lg:text-lg text-green-200 font-medium max-w-sm sm:max-w-md md:max-w-xl mt-3 sm:mt-4">
                  Leading the future of{" "}
                  <span className="text-green-300 font-bold">
                    Sustainable Recycling Solutions
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </section>
  );
}
