
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Recycle, Leaf, Factory, TrendingUp, Users, Award, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const counters = [
  { 
    label: "Tons Recycled", 
    value: 125000, 
    icon: <Factory className="w-8 h-8" />,
    color: "from-green-500 to-emerald-600",
    bgColor: "bg-green-500/10",
    description: "Tyres & Steel Materials",
    unit: "tons",
    achievement: "Industry Leading"
  },
  { 
    label: "CO₂ Saved", 
    value: 890000, 
    icon: <Leaf className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    description: "Environmental Impact",
    unit: "kg",
    achievement: "Carbon Neutral"
  },
  { 
    label: "Happy Clients", 
    value: 350, 
    icon: <Users className="w-8 h-8" />,
    color: "from-teal-500 to-green-600",
    bgColor: "bg-teal-500/10",
    description: "Sustainable Partnerships",
    unit: "clients",
    achievement: "Trusted Partner"
  },
  { 
    label: "Recycling Rate", 
    value: 98, 
    icon: <Recycle className="w-8 h-8" />,
    color: "from-green-600 to-emerald-700",
    bgColor: "bg-green-600/10",
    description: "Zero Waste Goal",
    unit: "%",
    achievement: "Excellence"
  },
];

export default function ImpactCounters() {
  const refs = useRef<HTMLSpanElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Counter animations
    refs.current.forEach((el, i) => {
      if (!el) return;
      const target = counters[i].value;
      const obj = { val: 0 } as any;
      
      gsap.to(obj, {
        val: target,
        duration: 3,
        ease: "power2.out",
        onUpdate: () => {
          const formattedValue = Math.floor(obj.val).toLocaleString();
          el.textContent = formattedValue;
        },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          onStart: () => {
            setAnimationTriggered(true);
            // Add celebration effect when counter starts
            el.classList.add('counter-celebration');
            setTimeout(() => el.classList.remove('counter-celebration'), 3000);
          }
        } as any,
      });
    });

    // Particle animation
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      
      gsap.fromTo(particles, 
        { 
          scale: 0, 
          opacity: 0,
          y: 100,
          rotation: 180
        },
        { 
          scale: 1, 
          opacity: 0.6,
          y: 0,
          rotation: 0,
          duration: 2,
          stagger: 0.1,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: particlesRef.current,
            start: "top 90%",
          }
        }
      );

      // Continuous floating animation
      gsap.to(particles, {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        rotation: "random(-180, 180)",
        duration: "random(4, 8)",
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });
    }
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-green-50/30 via-white to-emerald-50/20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.08),transparent_50%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.06),transparent_50%)]" />
      
      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 4 === 0 && <Recycle className="w-6 h-6 text-green-400/30" />}
            {i % 4 === 1 && <Leaf className="w-5 h-5 text-emerald-400/40" />}
            {i % 4 === 2 && <Factory className="w-7 h-7 text-green-500/25" />}
            {i % 4 === 3 && <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />}
          </div>
        ))}
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-green-200/50 mb-6">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700">Environmental Impact</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Making a Difference
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our commitment to sustainability drives measurable environmental impact through innovative recycling solutions
          </p>
        </motion.div>

        {/* Counters Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {counters.map((counter, idx) => (
            <motion.div 
              key={counter.label} 
              variants={itemVariants}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: idx * 0.1
              }}
            >
              <Card 
                variant="eco-gradient-glass" 
                className="group cursor-pointer relative overflow-hidden"
                hover
                greenTint="light"
                ecoTexture
              >
                {/* Achievement Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/90 text-white text-xs backdrop-blur-xl">
                    <Award className="w-3 h-3 mr-1" />
                    {counter.achievement}
                  </Badge>
                </div>

                {/* Celebration Particles */}
                <AnimatePresence>
                  {animationTriggered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ 
                            scale: 0, 
                            x: "50%", 
                            y: "50%",
                            opacity: 1
                          }}
                          animate={{ 
                            scale: [0, 1, 0],
                            x: `${50 + (Math.random() - 0.5) * 200}%`,
                            y: `${50 + (Math.random() - 0.5) * 200}%`,
                            opacity: [1, 1, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: idx * 0.3 + i * 0.1,
                            ease: "easeOut"
                          }}
                          className="absolute"
                        >
                          <Sparkles className="w-4 h-4 text-green-400" />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <CardContent className="text-center p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${counter.bgColor} text-green-600 mb-6 group-hover:shadow-lg group-hover:shadow-green-500/30 transition-all duration-300`}
                  >
                    {counter.icon}
                  </motion.div>

                  {/* Counter */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <motion.span
                        ref={(el) => { if (el) refs.current[idx] = el; }}
                        className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${counter.color} bg-clip-text text-transparent block relative overflow-hidden`}
                        aria-label={`${counter.label} counter`}
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        0
                      </motion.span>
                      <span className={`text-2xl font-bold bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}>
                        {counter.unit !== "clients" && counter.unit !== "%" ? counter.unit : ""}
                        {counter.unit === "%" ? "%" : ""}
                        {counter.unit === "clients" ? "+" : ""}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                      {counter.label}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      {counter.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ 
                        delay: 0.8 + idx * 0.2, 
                        duration: 1.5,
                        ease: "easeOut"
                      }}
                      className={`h-2 bg-gradient-to-r ${counter.color} rounded-full relative`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full" />
                    </motion.div>
                  </div>

                  {/* Hover Effect Indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
                    className="w-2 h-2 bg-green-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Card variant="eco-leaf" className="inline-block" greenTint="light" ecoTexture>
            <CardContent className="px-8 py-6">
              <div className="flex items-center gap-3">
                <Recycle className="w-6 h-6 text-green-600" />
                <p className="text-lg font-bold text-gray-900">
                  Join us in creating a sustainable future through innovative recycling
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
