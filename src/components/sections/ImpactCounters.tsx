
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const counters = [
  { label: "Tons Recycled", value: 125000 },
  { label: "CO₂ Saved (kg)", value: 890000 },
  { label: "Clients Served", value: 350 },
];

export default function ImpactCounters() {
  const refs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    refs.current.forEach((el, i) => {
      if (!el) return;
      const target = counters[i].value;
      const obj = { val: 0 } as any;
      gsap.to(obj, {
        val: target,
        duration: 2.5,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = Math.floor(obj.val).toLocaleString();
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          onStart: () => {
            // Add shimmer effect when counter starts
            el.classList.add('shimmer');
            setTimeout(() => el.classList.remove('shimmer'), 2500);
          }
        } as any,
      });
    });
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="container py-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8"
      >
        {counters.map((c, idx) => (
          <motion.div 
            key={c.label} 
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="glass-card-hover rounded-xl p-6 text-center group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <span
                ref={(el) => { if (el) refs.current[idx] = el; }}
                className="text-4xl font-extrabold text-primary block relative overflow-hidden"
                aria-label={`${c.label} counter`}
                style={{ fontVariantNumeric: 'tabular-nums' }}
              />
            </motion.div>
            <p className="mt-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {c.label}
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.5 + idx * 0.2, duration: 0.8 }}
              className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-3"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
