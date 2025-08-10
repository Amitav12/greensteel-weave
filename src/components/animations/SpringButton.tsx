import React, { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { cn } from '@/lib/utils';

interface SpringButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'spring' | 'bounce' | 'elastic' | 'magnetic' | 'liquid';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function SpringButton({ 
  variant = 'spring', 
  children, 
  icon, 
  className, 
  ...props 
}: SpringButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // React Spring animations
  const springProps = useSpring({
    scale: isPressed ? 0.95 : isHovered ? 1.1 : 1,
    rotateZ: variant === 'magnetic' ? (isHovered ? 5 : 0) : 0,
    y: isHovered ? -8 : 0,
    shadow: isHovered ? 25 : 10,
    config: {
      spring: config.wobbly,
      bounce: config.gentle,
      elastic: { tension: 300, friction: 10 },
      magnetic: { tension: 400, friction: 25 },
      liquid: { tension: 120, friction: 14 }
    }[variant]
  });

  const glowProps = useSpring({
    opacity: isHovered ? 1 : 0,
    scale: isHovered ? 1.2 : 0.8,
    config: config.gentle
  });

  const iconProps = useSpring({
    rotateZ: isHovered ? 360 : 0,
    scale: isHovered ? 1.2 : 1,
    config: { tension: 300, friction: 10 }
  });

  return (
    <div className="relative">
      {/* Glow Effect */}
      <animated.div
        style={{
          opacity: glowProps.opacity,
          transform: glowProps.scale.to(s => `scale(${s})`)
        }}
        className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur-xl -z-10"
      />
      
      {/* Main Button */}
      <animated.button
        style={{
          transform: springProps.scale.to(s => 
            `scale(${s}) translateY(${springProps.y.get()}px) rotateZ(${springProps.rotateZ.get()}deg)`
          ),
          boxShadow: springProps.shadow.to(s => 
            `0 ${s}px ${s * 2}px rgba(34, 197, 94, 0.3)`
          )
        }}
        className={cn(
          "relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-3xl",
          "backdrop-blur-xl border border-white/20 overflow-hidden",
          "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        {...props}
      >
        {/* Liquid Effect Background */}
        <animated.div
          style={{
            opacity: glowProps.opacity,
          }}
          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
        />
        
        <div className="relative flex items-center justify-center gap-3">
          {icon && (
            <animated.div
              style={{
                transform: iconProps.rotateZ.to(r => `rotateZ(${r}deg) scale(${iconProps.scale.get()})`)
              }}
            >
              {icon}
            </animated.div>
          )}
          {children}
        </div>
      </animated.button>
    </div>
  );
}