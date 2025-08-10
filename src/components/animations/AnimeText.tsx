import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { cn } from '@/lib/utils';

interface AnimeTextProps {
  text: string;
  className?: string;
  animationType?: 'wave' | 'typewriter' | 'glitch' | 'bounce' | 'elastic';
  delay?: number;
  trigger?: boolean;
}

export function AnimeText({ 
  text, 
  className, 
  animationType = 'wave',
  delay = 0,
  trigger = true 
}: AnimeTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !trigger) return;

    const textElement = textRef.current;
    
    // Split text into individual characters
    const chars = text.split('').map((char, index) => 
      `<span class="inline-block" style="transform-origin: 50% 100%;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
    
    textElement.innerHTML = chars;
    const charElements = textElement.querySelectorAll('span');

    // Reset initial state
    anime.set(charElements, {
      opacity: 0,
      translateY: 50,
      scale: 0.5,
      rotateZ: -15
    });

    // Animation based on type
    switch (animationType) {
      case 'wave':
        anime({
          targets: charElements,
          opacity: [0, 1],
          translateY: [50, 0],
          scale: [0.5, 1],
          rotateZ: [-15, 0],
          duration: 800,
          delay: (el, i) => delay + (i * 50),
          easing: 'easeOutElastic(1, .8)',
          complete: () => {
            // Continuous wave animation
            anime({
              targets: charElements,
              translateY: [0, -10, 0],
              duration: 1500,
              delay: (el, i) => i * 100,
              easing: 'easeInOutSine',
              loop: true
            });
          }
        });
        break;

      case 'typewriter':
        anime({
          targets: charElements,
          opacity: [0, 1],
          duration: 100,
          delay: (el, i) => delay + (i * 100),
          easing: 'linear',
          complete: () => {
            // Blinking cursor effect on last character
            const lastChar = charElements[charElements.length - 1];
            anime({
              targets: lastChar,
              opacity: [1, 0.3, 1],
              duration: 1000,
              easing: 'linear',
              loop: true
            });
          }
        });
        break;

      case 'glitch':
        anime({
          targets: charElements,
          opacity: [0, 1],
          translateX: () => anime.random(-20, 20),
          translateY: () => anime.random(-10, 10),
          scale: [0.8, 1],
          duration: 600,
          delay: (el, i) => delay + (i * 30),
          easing: 'easeOutBounce',
          complete: () => {
            // Random glitch effects
            setInterval(() => {
              const randomChar = charElements[Math.floor(Math.random() * charElements.length)];
              anime({
                targets: randomChar,
                translateX: [0, anime.random(-5, 5), 0],
                translateY: [0, anime.random(-3, 3), 0],
                duration: 200,
                easing: 'easeInOutQuad'
              });
            }, 2000);
          }
        });
        break;

      case 'bounce':
        anime({
          targets: charElements,
          opacity: [0, 1],
          translateY: [100, 0],
          scale: [0.3, 1.2, 1],
          duration: 1000,
          delay: (el, i) => delay + (i * 80),
          easing: 'easeOutBounce'
        });
        break;

      case 'elastic':
        anime({
          targets: charElements,
          opacity: [0, 1],
          scale: [0, 1.3, 1],
          rotateZ: [180, 0],
          duration: 1200,
          delay: (el, i) => delay + (i * 60),
          easing: 'easeOutElastic(1, .6)'
        });
        break;
    }

  }, [text, animationType, delay, trigger]);

  return (
    <div
      ref={textRef}
      className={cn(
        "font-black tracking-tight",
        className
      )}
    />
  );
}