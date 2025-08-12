
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
        duration: 2,
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
          }
        } as any,
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-4">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">Environmental Impact</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          <span className="text-green-600">Making a Difference</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Our commitment to sustainability drives measurable environmental impact through innovative recycling solutions
        </p>
      </motion.div>

      {/* Counters Grid */}
      <div className="grid grid-cols-2 gap-4">
        {counters.map((counter, idx) => (
          <motion.div 
            key={counter.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group relative overflow-hidden"
          >
            {/* Achievement Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-green-500/90 text-white text-xs">
                <Award className="w-3 h-3 mr-1" />
                {counter.achievement}
              </Badge>
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${counter.bgColor} text-green-600 mb-4 group-hover:shadow-md transition-all duration-300`}
            >
              {counter.icon}
            </motion.div>

            {/* Counter */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-1">
                <motion.span
                  ref={(el) => { if (el) refs.current[idx] = el; }}
                  className={`text-2xl md:text-3xl font-black bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  0
                </motion.span>
                <span className={`text-lg font-bold bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}>
                  {counter.unit !== "clients" && counter.unit !== "%" ? counter.unit : ""}
                  {counter.unit === "%" ? "%" : ""}
                  {counter.unit === "clients" ? "+" : ""}
                </span>
              </div>
              
              <h4 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {counter.label}
              </h4>
              <p className="text-sm text-gray-600">
                {counter.description}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ 
                  delay: 0.5 + idx * 0.1, 
                  duration: 1,
                  ease: "easeOut"
                }}
                className={`h-2 bg-gradient-to-r ${counter.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <Recycle className="w-8 h-8 text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold mb-1">
                Creating a Sustainable Future
              </h4>
              <p className="text-green-100 text-sm">
                Join us in innovative recycling solutions
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
