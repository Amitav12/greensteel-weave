import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface GSAPCardProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'float' | 'tilt' | 'morph' | 'liquid' | 'magnetic';
  delay?: number;
}

export function GSAPCard({ 
  children, 
  className, 
  animationType = 'float',
  delay = 0 
}: GSAPCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    // Initial animation on mount
    gsap.fromTo(card, 
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
        duration: 1.2, 
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Continuous floating animation
    if (animationType === 'float') {
      gsap.to(card, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Mouse follow effect for magnetic type
    if (animationType === 'magnetic') {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.1;
        const deltaY = (e.clientY - centerY) * 0.1;

        gsap.to(card, {
          x: deltaX,
          y: deltaY,
          rotationY: deltaX * 0.5,
          rotationX: -deltaY * 0.5,
          duration: 0.3,
          ease: "power2.out"
        });

        gsap.to(glow, {
          opacity: 0.8,
          scale: 1.1,
          duration: 0.3
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)"
        });

        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.5
        });
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Morphing animation
    if (animationType === 'morph') {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(card, {
        borderRadius: "50px",
        scale: 1.05,
        duration: 3,
        ease: "power2.inOut"
      })
      .to(card, {
        borderRadius: "20px",
        scale: 1,
        duration: 3,
        ease: "power2.inOut"
      });
    }

    // Liquid effect
    if (animationType === 'liquid') {
      gsap.to(card, {
        scale: 1.02,
        duration: 1.5,
        ease: "elastic.inOut(1, 0.3)",
        yoyo: true,
        repeat: -1
      });
    }

  }, [animationType, delay]);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-emerald-500/30 rounded-3xl blur-xl opacity-0"
      />
      
      {/* Main Card */}
      <div
        ref={cardRef}
        className={cn(
          "relative bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl p-8",
          "shadow-2xl hover:shadow-green-500/20 transition-all duration-500",
          "transform-gpu perspective-1000",
          className
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </div>
  );
}