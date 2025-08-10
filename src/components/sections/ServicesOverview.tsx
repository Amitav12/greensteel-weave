import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config, useTrail } from '@react-spring/web';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpringButton } from "@/components/animations/SpringButton";
import { GSAPCard } from "@/components/animations/GSAPCard";
import { Recycle, Factory, Truck, Shield, ArrowRight, Leaf, Sparkles, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Recycle,
    title: "Steel Recycling",
    description: "Advanced steel recycling processes that transform scrap metal into high-quality raw materials, reducing environmental impact while maintaining premium standards.",
    features: ["Scrap Metal Processing", "Quality Assurance", "Environmental Compliance"],
    color: "from-green-500 to-emerald-600",
    delay: 0
  },
  {
    icon: Factory,
    title: "Steel Trading",
    description: "Comprehensive steel trading services with global reach, offering competitive prices and reliable supply chains for all your steel requirements.",
    features: ["Global Supply Chain", "Competitive Pricing", "Quality Materials"],
    color: "from-emerald-500 to-teal-600",
    delay: 0.2
  },
  {
    icon: Truck,
    title: "Waste Management",
    description: "Complete waste management solutions designed to maximize recycling efficiency while minimizing environmental footprint through innovative processes.",
    features: ["Collection Services", "Processing Solutions", "Waste Reduction"],
    color: "from-teal-500 to-green-600",
    delay: 0.4
  }
];

export default function ServicesOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);

  // React Spring trail animation for service cards
  const trail = useTrail(services.length, {
    from: { opacity: 0, transform: 'translate3d(0,100px,0) scale(0.8)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translate3d(0,0px,0) scale(1)' : 'translate3d(0,100px,0) scale(0.8)'
    },
    config: config.wobbly,
    delay: 200
  });

  // Background animation
  const backgroundSpring = useSpring({
    from: { backgroundPosition: '0% 50%' },
    to: { backgroundPosition: '100% 50%' },
    config: { duration: 20000 },
    loop: true
  });

  // Header animation
  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(50px) scale(0.9)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(50px) scale(0.9)'
    },
    config: config.gentle,
    delay: 100
  });

  // CTA section animation
  const ctaSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(80px) rotateX(45deg)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) rotateX(0deg)' : 'translateY(80px) rotateX(45deg)'
    },
    config: config.slow,
    delay: 800
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isVisible) return;

    // Header text animation with GSAP
    if (headerRef.current) {
      const chars = headerRef.current.querySelectorAll('.char');
      gsap.fromTo(chars, 
        { 
          y: 100, 
          opacity: 0, 
          rotationX: 90,
          scale: 0.5
        },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );
    }

    // Floating animation for service icons
    if (cardsRef.current) {
      const icons = cardsRef.current.querySelectorAll('.service-icon');
      gsap.to(icons, {
        y: -15,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });
    }

    // Parallax effect for background elements
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to('.bg-pattern', {
          y: progress * -100,
          rotation: progress * 10,
          duration: 0.3,
          ease: "none"
        });
      }
    });

  }, [isVisible]);

  // Anime.js text splitting and animation
  useEffect(() => {
    if (isVisible && headerRef.current) {
      // Split text into characters
      const textElements = headerRef.current.querySelectorAll('.anime-text');
      textElements.forEach((element) => {
        const text = element.textContent;
        element.innerHTML = text.split('').map(char => 
          `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      });

      // Animate with Anime.js
      anime({
        targets: '.anime-text .char',
        opacity: [0, 1],
        translateY: [50, 0],
        rotateZ: [180, 0],
        scale: [0.5, 1],
        duration: 800,
        delay: (el, i) => 1000 + (i * 30),
        easing: 'easeOutElastic(1, .8)'
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-white via-green-50/20 to-emerald-50/30 relative overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <animated.div 
        style={backgroundSpring}
        className="absolute inset-0 opacity-5 bg-pattern"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
          style={{
            backgroundSize: '400% 400%',
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </animated.div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-15, 15, -15],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header with React Spring */}
        <animated.div
          ref={headerRef}
          style={headerSpring}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-8 shadow-2xl"
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-8">
            <span className="anime-text block">Our</span>
            <span className="anime-text block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Comprehensive recycling and steel trading solutions designed to transform waste into valuable resources while protecting our environment.
          </p>
        </animated.div>

        {/* Services Grid with React Spring Trail */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-10 mb-20">
          {trail.map((style, index) => (
            <animated.div key={services[index].title} style={style}>
              <GSAPCard 
                animationType="magnetic" 
                delay={services[index].delay}
                className="h-full group cursor-pointer bg-white/80 backdrop-blur-2xl border border-green-200/50 hover:border-green-300/70 shadow-xl hover:shadow-2xl hover:shadow-green-500/20"
              >
                <div className="text-center p-8">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`service-icon inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${services[index].color} rounded-3xl mb-8 shadow-2xl`}
                  >
                    {React.createElement(services[index].icon, { className: "w-12 h-12 text-white" })}
                  </motion.div>
                  
                  <h3 className="text-3xl font-black text-gray-900 mb-4">
                    {services[index].title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {services[index].description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {services[index].features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (idx * 0.1) }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-4" />
                        <span className="text-gray-700 font-semibold text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <SpringButton 
                    variant="magnetic"
                    icon={<ArrowRight className="w-5 h-5" />}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg py-4"
                  >
                    Learn More
                  </SpringButton>
                </div>
              </GSAPCard>
            </animated.div>
          ))}
        </div>

        {/* Call to Action with Advanced Glass Morphism */}
        <animated.div
          ref={ctaRef}
          style={ctaSpring}
          className="text-center"
        >
          <div className="relative bg-gradient-to-r from-green-500/90 to-emerald-600/90 backdrop-blur-3xl rounded-3xl p-16 text-white overflow-hidden border border-white/20 shadow-2xl">
            {/* Glass morphism background layers */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-emerald-500/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.1),transparent_70%)]" />
            
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                  rotate: [0, 360]
                }}
                transition={{ 
                  backgroundPosition: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotate: { duration: 50, repeat: Infinity, ease: "linear" }
                }}
                className="w-full h-full"
                style={{
                  backgroundImage: `
                    conic-gradient(from 0deg at 50% 50%, 
                      rgba(255,255,255,0.1) 0deg, 
                      transparent 60deg, 
                      rgba(255,255,255,0.1) 120deg, 
                      transparent 180deg, 
                      rgba(255,255,255,0.1) 240deg, 
                      transparent 300deg, 
                      rgba(255,255,255,0.1) 360deg)
                  `,
                  backgroundSize: '200% 200%'
                }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full mb-8 border border-white/30"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              
              <h3 className="text-4xl md:text-5xl font-black mb-6">
                Ready to Transform Your Waste?
              </h3>
              
              <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join hundreds of companies who trust us with their recycling and steel trading needs. Let's create a sustainable future together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <SpringButton 
                  variant="elastic"
                  icon={<Zap className="w-6 h-6" />}
                  className="bg-white/20 backdrop-blur-2xl border-2 border-white/30 text-white hover:bg-white/30 font-bold text-xl px-10 py-6"
                >
                  Get Free Quote
                </SpringButton>
                <SpringButton 
                  variant="bounce"
                  icon={<ArrowRight className="w-6 h-6" />}
                  className="bg-transparent border-2 border-white/50 text-white hover:bg-white/10 font-bold text-xl px-10 py-6"
                >
                  Schedule Consultation
                </SpringButton>
              </div>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
}