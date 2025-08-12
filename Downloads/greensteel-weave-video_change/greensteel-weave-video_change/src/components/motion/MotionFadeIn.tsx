
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionFadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
}

export default function MotionFadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  y = 30, 
  className 
}: MotionFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
