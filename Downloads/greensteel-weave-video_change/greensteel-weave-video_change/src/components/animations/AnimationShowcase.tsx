import React, { useState, useEffect } from 'react';
import { SpringButton } from './SpringButton';
import { GSAPCard } from './GSAPCard';
import { AnimeText } from './AnimeText';
import { useSpring, animated, config } from '@react-spring/web';
import { Recycle, Leaf, Zap, Sparkles, ArrowRight } from 'lucide-react';

export function AnimationShowcase() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // React Spring background animation
  const backgroundSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.gentle,
    delay: 200
  });

  // Floating particles animation
  const particleSpring = useSpring({
    loop: true,
    from: { rotateZ: 0, scale: 1 },
    to: { rotateZ: 360, scale: 1.1 },
    config: { duration: 8000 }
  });

  return (
    <animated.section 
      style={backgroundSpring}
      className="py-20 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <animated.div
            key={i}
            style={{
              ...particleSpring,
              left: `${10 + i * 8}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            className="absolute w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-20 blur-sm"
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Animated Title */}
        <div className="text-center mb-16">
          <AnimeText
            text="Advanced Animation Library Showcase"
            className="text-6xl md:text-7xl text-gray-900 mb-6"
            animationType="wave"
            trigger={isVisible}
          />
          <AnimeText
            text="React Spring • GSAP • Anime.js • Advanced Effects"
            className="text-2xl text-gray-600"
            animationType="typewriter"
            delay={2000}
            trigger={isVisible}
          />
        </div>

        {/* React Spring Buttons Section */}
        <div className="mb-20">
          <AnimeText
            text="React Spring Buttons"
            className="text-4xl text-gray-900 text-center mb-12"
            animationType="bounce"
            delay={3000}
            trigger={isVisible}
          />
          
          <div className="flex flex-wrap justify-center gap-8">
            <SpringButton variant="spring" icon={<Recycle className="w-5 h-5" />}>
              Spring Effect
            </SpringButton>
            <SpringButton variant="bounce" icon={<Leaf className="w-5 h-5" />}>
              Bounce Effect
            </SpringButton>
            <SpringButton variant="elastic" icon={<Zap className="w-5 h-5" />}>
              Elastic Effect
            </SpringButton>
            <SpringButton variant="magnetic" icon={<Sparkles className="w-5 h-5" />}>
              Magnetic Effect
            </SpringButton>
            <SpringButton variant="liquid" icon={<ArrowRight className="w-5 h-5" />}>
              Liquid Effect
            </SpringButton>
          </div>
        </div>

        {/* GSAP Cards Section */}
        <div className="mb-20">
          <AnimeText
            text="GSAP Powered Cards"
            className="text-4xl text-gray-900 text-center mb-12"
            animationType="elastic"
            delay={4000}
            trigger={isVisible}
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GSAPCard animationType="float" delay={0.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Floating Animation</h3>
                <p className="text-gray-600">Smooth floating effect with GSAP timeline animations</p>
              </div>
            </GSAPCard>

            <GSAPCard animationType="magnetic" delay={0.4}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Magnetic Follow</h3>
                <p className="text-gray-600">Mouse-following 3D transforms with GSAP</p>
              </div>
            </GSAPCard>

            <GSAPCard animationType="morph" delay={0.6}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Morphing Shape</h3>
                <p className="text-gray-600">Dynamic shape morphing with smooth transitions</p>
              </div>
            </GSAPCard>

            <GSAPCard animationType="liquid" delay={0.8}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Liquid Effect</h3>
                <p className="text-gray-600">Elastic liquid-like animations with GSAP</p>
              </div>
            </GSAPCard>

            <GSAPCard animationType="tilt" delay={1.0}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">3D Tilt Effect</h3>
                <p className="text-gray-600">Advanced 3D perspective transforms</p>
              </div>
            </GSAPCard>

            <GSAPCard animationType="float" delay={1.2}>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Scroll Triggered</h3>
                <p className="text-gray-600">ScrollTrigger animations with GSAP</p>
              </div>
            </GSAPCard>
          </div>
        </div>

        {/* Anime.js Text Effects Section */}
        <div className="text-center">
          <AnimeText
            text="Anime.js Text Effects"
            className="text-4xl text-gray-900 mb-12"
            animationType="glitch"
            delay={5000}
            trigger={isVisible}
          />
          
          <div className="space-y-8">
            <AnimeText
              text="Wave Animation Effect"
              className="text-3xl text-green-600"
              animationType="wave"
              delay={5500}
              trigger={isVisible}
            />
            <AnimeText
              text="Typewriter Animation Effect"
              className="text-3xl text-emerald-600"
              animationType="typewriter"
              delay={6000}
              trigger={isVisible}
            />
            <AnimeText
              text="Glitch Animation Effect"
              className="text-3xl text-teal-600"
              animationType="glitch"
              delay={6500}
              trigger={isVisible}
            />
            <AnimeText
              text="Elastic Animation Effect"
              className="text-3xl text-green-700"
              animationType="elastic"
              delay={7000}
              trigger={isVisible}
            />
          </div>
        </div>
      </div>
    </animated.section>
  );
}