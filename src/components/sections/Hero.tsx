
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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative min-h-[70vh] grid place-items-center overflow-hidden">
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
            // Fallback styling
            e.currentTarget.style.backgroundColor = 'hsl(var(--muted))';
          }}
        />
      </motion.div>

      {/* Overlay Layers */}
      <div className="absolute inset-0 bg-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="absolute inset-0 subtle-noise" />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div 
        style={{ y: textY }}
        className="container relative z-10 py-20 text-center"
      >
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold glass-card"
        >
          AAASHA TRADING LTD
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Driving <span className="text-primary">Sustainability</span> in Steel
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {text}<span className="text-primary animate-pulse">{cursor}</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/products">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="hero" size="lg">Explore Products</Button>
            </motion.div>
          </Link>
          <Link to="/contact">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glass" size="lg">Contact Us</Button>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
