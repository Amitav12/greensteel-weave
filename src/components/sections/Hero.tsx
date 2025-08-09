
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-recycling-steel.jpg";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const { text, cursor } = useTypewriter([
    "Sustainable Recycling",
    "Premium Steel Trading", 
    "Environmental Responsibility",
  ], 45, 1400);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative min-h-[80vh] grid place-items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <img
          src={heroImage}
          alt="Recycling and steel operations hero image"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          onError={(e) => {
            console.error('Hero image failed to load');
            e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
          }}
        />
      </motion.div>

      {/* Enhanced Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-primary/30 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
      <div className="absolute inset-0 subtle-noise" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/30 rounded-full blur-sm"
            style={{
              left: `${15 + i * 12}%`,
              top: `${25 + (i % 4) * 15}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              x: [-15, 15, -15],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: textY }}
        className="container relative z-10 py-24 text-center"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold glass-card text-white shadow-[0_0_20px_rgba(76,175,80,0.3)]"
          style={{
            textShadow: "0 1px 3px rgba(0,0,0,0.5)"
          }}
        >
          AAASHA TRADING LTD
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-5xl md:text-7xl font-extrabold tracking-tight text-white"
          style={{
            textShadow: "0 2px 10px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.1)"
          }}
        >
          Driving <span className="text-primary drop-shadow-lg">Sustainability</span> in Steel
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium"
          style={{
            textShadow: "0 1px 3px rgba(0,0,0,0.5)"
          }}
        >
          {text}<span className="text-primary animate-pulse">{cursor}</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/products">
            <motion.div
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                boxShadow: "0 10px 40px rgba(76, 175, 80, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="hero" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-[0_8px_30px_rgba(76,175,80,0.3)] hover:shadow-[0_12px_40px_rgba(76,175,80,0.5)] transition-all duration-300"
              >
                Explore Products
              </Button>
            </motion.div>
          </Link>
          <Link to="/contact">
            <motion.div
              whileHover={{ 
                scale: 1.08, 
                y: -3,
                backgroundColor: "rgba(255,255,255,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="glass" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/30 shadow-[0_8px_30px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.2)] transition-all duration-300"
              >
                Contact Us
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
