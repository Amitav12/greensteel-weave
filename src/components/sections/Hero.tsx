import { useRef, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

import { SpringButton } from "@/components/animations/SpringButton";
import { AnimeText } from "@/components/animations/AnimeText";
import { useTypewriter } from "@/hooks/useTypewriter";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { CarouselErrorBoundary } from "@/components/ui/CarouselErrorBoundary";
import { carouselImages } from "@/data/carouselImages";
import { Link } from "react-router-dom";
import { Recycle, ArrowRight, Leaf, Factory, TrendingUp, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-recycling-steel.jpg";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Three.js Animated Sphere Component
function AnimatedSphere() {
  const meshRef = useRef<any>();

  useEffect(() => {
    if (meshRef.current) {
      gsap.to(meshRef.current.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, []);

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#22c55e"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}

export default function Hero() {
  const { text, cursor } = useTypewriter([
    "Sustainable Recycling Solutions",
    "Premium Steel Trading",
    "Environmental Responsibility",
    "Waste to Value Transformation"
  ], 50, 1500);



  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const particlesRef = useRef(null);
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

  const glassSpring = useSpring({
    from: { backdropFilter: 'blur(0px)', opacity: 0 },
    to: { backdropFilter: 'blur(20px)', opacity: 1 },
    config: config.gentle,
    delay: 800
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

    // Enhanced Eco-Themed Particles animation with GSAP
    if (particlesRef.current) {
      const particles = particlesRef.current.children;

      // Initial entrance animation
      gsap.fromTo(particles,
        {
          scale: 0,
          opacity: 0,
          y: 200,
          rotation: 180
        },
        {
          scale: 1,
          opacity: (i) => {
            // Different opacity for different particle types
            if (i < 8) return 0.6; // Recycle symbols
            if (i < 20) return 0.5; // Leaves
            if (i < 26) return 0.4; // Factory symbols
            if (i < 46) return 0.7; // Circles
            if (i < 51) return 0.3; // Tyres
            return 0.4; // Steel particles
          },
          y: 0,
          rotation: 0,
          duration: 2,
          stagger: 0.08,
          ease: "elastic.out(1, 0.3)",
          delay: 1
        }
      );

      // Continuous floating animation with different patterns for different particle types
      gsap.to(particles, {
        y: (i) => {
          if (i < 8) return "random(-60, 60)"; // Recycle symbols - larger movement
          if (i < 20) return "random(-40, 40)"; // Leaves - medium movement
          if (i < 26) return "random(-30, 30)"; // Factory - smaller movement
          if (i < 46) return "random(-50, 50)"; // Circles - standard movement
          if (i < 51) return "random(-20, 20)"; // Tyres - minimal movement (heavier)
          return "random(-35, 35)"; // Steel - medium movement
        },
        x: (i) => {
          if (i < 8) return "random(-40, 40)"; // Recycle symbols
          if (i < 20) return "random(-50, 50)"; // Leaves - more horizontal drift
          if (i < 26) return "random(-25, 25)"; // Factory
          if (i < 46) return "random(-30, 30)"; // Circles
          if (i < 51) return "random(-15, 15)"; // Tyres
          return "random(-30, 30)"; // Steel
        },
        rotation: (i) => {
          if (i < 8) return "random(-360, 360)"; // Recycle symbols - full rotation
          if (i < 20) return "random(-180, 180)"; // Leaves - natural sway
          if (i < 26) return "random(-90, 90)"; // Factory - minimal rotation
          if (i < 46) return "random(-180, 180)"; // Circles
          if (i < 51) return "random(-45, 45)"; // Tyres - minimal rotation
          return "random(-120, 120)"; // Steel
        },
        duration: (i) => {
          if (i < 8) return "random(6, 10)"; // Recycle symbols - slower
          if (i < 20) return "random(4, 8)"; // Leaves - natural speed
          if (i < 26) return "random(8, 12)"; // Factory - very slow
          if (i < 46) return "random(4, 8)"; // Circles - standard
          if (i < 51) return "random(10, 15)"; // Tyres - very slow (heavy)
          return "random(5, 9)"; // Steel - medium
        },
        ease: "sine.inOut",
        stagger: 0.15,
        repeat: -1,
        yoyo: true
      });

      // Special pulsing animation for recycle symbols
      const recycleSymbols = Array.from(particles).slice(0, 8);
      gsap.to(recycleSymbols, {
        scale: "random(0.8, 1.2)",
        duration: "random(2, 4)",
        ease: "power2.inOut",
        stagger: 0.3,
        repeat: -1,
        yoyo: true
      });

      // Gentle sway for leaves
      const leaves = Array.from(particles).slice(8, 20);
      gsap.to(leaves, {
        rotationZ: "random(-15, 15)",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });
    }

    // Counter animation with GSAP
    if (countersRef.current) {
      const counterElements = countersRef.current.querySelectorAll('.counter-number');
      const targets = [50000, 25000, 500];

      counterElements.forEach((element: any, index: number) => {
        gsap.fromTo({ value: 0 }, { value: targets[index] }, {
          duration: 3,
          delay: 2 + (index * 0.3),
          ease: "power2.out",
          onUpdate: function () {
            element.textContent = Math.floor(this.targets()[0].value).toLocaleString();
          }
        });
      });
    }

    // Scroll-triggered animations
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(containerRef.current, {
          y: progress * -100,
          duration: 0.3,
          ease: "none"
        });
      }
    });

  }, []);

  // Anime.js text animations
  useEffect(() => {
    if (isLoaded) {
      // Animate company name with Anime.js
      anime({
        targets: '.company-name .char',
        opacity: [0, 1],
        translateY: [50, 0],
        rotateZ: [180, 0],
        scale: [0.5, 1],
        duration: 800,
        delay: (_el: any, i: number) => 1500 + (i * 100),
        easing: 'easeOutElastic(1, .8)'
      });

      // Animate subtitle with wave effect
      anime({
        targets: '.subtitle .char',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: 600,
        delay: (_el: any, i: number) => 2500 + (i * 50),
        easing: 'easeOutQuart'
      });
    }
  }, [isLoaded]);

  // Split text into characters for Anime.js
  const splitText = (text: string, className: string) => {
    return text.split('').map((char: string, index: number) => (
      <span key={index} className={`char inline-block ${className}`}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-green-900 to-black">
      {/* Three.js Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Image Carousel Background with Error Boundary */}
      <CarouselErrorBoundary
        fallback={
          <div className="absolute inset-0 z-10">
            <img
              src={heroImage}
              alt="Recycling and steel operations"
              className="absolute inset-0 h-full w-full object-cover opacity-25"
              loading="eager"
            />
          </div>
        }
      >
        <ImageCarousel 
          images={carouselImages}
          autoPlayInterval={6000}
          transitionDuration={1500}
          pauseOnHover={true}
          respectReducedMotion={true}
          className="z-10"
        />
      </CarouselErrorBoundary>

      {/* Fallback Background Image with React Spring (lower z-index) */}
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0 z-5"
      >
        <img
          src={heroImage}
          alt="Recycling and steel operations"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
          loading="eager"
        />
      </animated.div>

      {/* Enhanced Glass Morphism Overlays with Eco Theme */}
      <animated.div
        style={glassSpring}
        className="absolute inset-0 bg-gradient-to-br from-white/5 via-green-500/10 to-black/20 z-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-20" />

      {/* Additional Eco-themed Background Patterns */}
      <div className="absolute inset-0 opacity-10 z-25">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-xl" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-emerald-400/15 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-teal-400/25 to-transparent rounded-full blur-lg" />
      </div>

      {/* Recycling-themed Grid Pattern */}
      <div className="absolute inset-0 opacity-5 z-25">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.2),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(34,197,94,0.1)_50%,transparent_51%)] bg-[length:60px_60px]" />
      </div>

      {/* Enhanced Eco-Themed Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-30">
        {/* Recycling Symbol Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`recycle-${i}`}
            className="absolute opacity-0 text-green-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 15}px`
            }}
          >
            <Recycle />
          </div>
        ))}

        {/* Leaf Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute opacity-0 text-emerald-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 10}px`
            }}
          >
            <Leaf />
          </div>
        ))}

        {/* Factory/Industrial Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`factory-${i}`}
            className="absolute opacity-0 text-green-500/25"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 18 + 12}px`
            }}
          >
            <Factory />
          </div>
        ))}

        {/* Traditional Circular Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Tyre-shaped particles (representing recycled tyres) */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`tyre-${i}`}
            className="absolute opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-8 h-8 border-4 border-green-400/30 rounded-full bg-transparent" />
          </div>
        ))}

        {/* Iron/Steel particles (representing recycled steel) */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`steel-${i}`}
            className="absolute w-4 h-4 bg-gradient-to-br from-gray-400/40 to-green-400/40 opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <animated.div
        style={heroSpring}
        className="container relative z-40 py-24"
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
                <div className="company-name text-lg font-black">
                  {splitText("AAASHA TRADING LTD", "")}
                </div>
              </div>

              {/* Main Headline with Anime.js */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-tight">
                  <AnimeText
                    text="Transforming"
                    className="block text-white"
                    animationType="elastic"
                    delay={1000}
                    trigger={isLoaded}
                  />
                  <AnimeText
                    text="Waste into"
                    className="block bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent"
                    animationType="wave"
                    delay={1500}
                    trigger={isLoaded}
                  />
                  <AnimeText
                    text="Value"
                    className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent"
                    animationType="bounce"
                    delay={2000}
                    trigger={isLoaded}
                  />
                </h1>
              </div>

              {/* Subtitle with typewriter */}
              <div className="subtitle text-2xl md:text-3xl text-green-300 font-medium">
                Leading the future of{" "}
                <span className="text-green-400 font-bold">
                  {text}
                </span>
                <motion.span
                  className="text-green-500 font-black"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                >
                  {cursor}
                </motion.span>
              </div>

              {/* CTA Buttons with React Spring */}
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/products">
                  <SpringButton
                    variant="magnetic"
                    icon={<Recycle className="w-6 h-6" />}
                    className="text-xl px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
                  >
                    Explore Solutions
                  </SpringButton>
                </Link>
                <Link to="/contact">
                  <SpringButton
                    variant="elastic"
                    icon={<ArrowRight className="w-6 h-6" />}
                    className="text-xl px-12 py-6 bg-white/10 backdrop-blur-2xl border-2 border-white/30 text-white font-bold hover:bg-white/20"
                  >
                    Get Started
                  </SpringButton>
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40"
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