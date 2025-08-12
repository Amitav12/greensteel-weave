import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { gsap } from 'gsap';
import anime from 'animejs/lib/anime.es.js';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Zap } from "lucide-react";

// Mock data for live rates
const currencyData = [
  { pair: "USD/EUR", rate: 0.85, change: 0.12, trend: "up" },
  { pair: "GBP/USD", rate: 1.27, change: -0.08, trend: "down" },
  { pair: "JPY/USD", rate: 149.85, change: 0.45, trend: "up" },
  { pair: "AUD/USD", rate: 0.67, change: -0.03, trend: "down" }
];

const steelRates = [
  { grade: "Hot Rolled Coil", price: 720, change: 15, country: "USA" },
  { grade: "Cold Rolled", price: 850, change: -8, country: "UK" },
  { grade: "Rebar", price: 680, change: 22, country: "India" },
  { grade: "Wire Rod", price: 740, change: 5, country: "China" }
];

export default function LiveDataTicker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const tickerRef = useRef(null);
  const cardsRef = useRef(null);

  // React Spring animations
  const headerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px) scale(0.9)' },
    to: { 
      opacity: isVisible ? 1 : 0, 
      transform: isVisible ? 'translateY(0px) scale(1)' : 'translateY(-50px) scale(0.9)'
    },
    config: config.gentle,
    delay: 200
  });

  const tickerSpring = useSpring({
    from: { transform: 'translateX(100%)' },
    to: { transform: 'translateX(-100%)' },
    config: { duration: 30000 },
    loop: true
  });

  const glassSpring = useSpring({
    from: { backdropFilter: 'blur(0px)', opacity: 0 },
    to: { 
      backdropFilter: isVisible ? 'blur(20px)' : 'blur(0px)', 
      opacity: isVisible ? 1 : 0 
    },
    config: config.slow,
    delay: 400
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!isVisible) return;

    // Animate rate cards with GSAP
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      
      gsap.fromTo(cards, 
        { 
          y: 80, 
          opacity: 0, 
          scale: 0.8,
          rotationY: 45
        },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // Continuous floating animation
      gsap.to(cards, {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true
      });
    }

    // Animate trend indicators
    const trendIcons = document.querySelectorAll('.trend-icon');
    gsap.to(trendIcons, {
      rotation: 360,
      duration: 3,
      ease: "power2.inOut",
      stagger: 0.3,
      repeat: -1
    });

  }, [isVisible]);

  // Anime.js number animations
  useEffect(() => {
    if (isVisible) {
      // Animate currency rates
      anime({
        targets: '.currency-rate',
        innerHTML: (el) => [0, parseFloat(el.getAttribute('data-rate'))],
        duration: 2000,
        delay: (el, i) => 1000 + (i * 200),
        easing: 'easeOutQuart',
        round: 100
      });

      // Animate steel prices
      anime({
        targets: '.steel-price',
        innerHTML: (el) => [0, parseInt(el.getAttribute('data-price'))],
        duration: 2500,
        delay: (el, i) => 1500 + (i * 150),
        easing: 'easeOutElastic(1, .8)',
        round: 1
      });

      // Animate change percentages
      anime({
        targets: '.change-value',
        scale: [0, 1.2, 1],
        opacity: [0, 1],
        duration: 1000,
        delay: (el, i) => 2000 + (i * 100),
        easing: 'easeOutBounce'
      });
    }
  }, [isVisible]);

  return (
    <section 
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-gray-900 via-green-900 to-black relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-full h-full opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(45deg, 
                rgba(34, 197, 94, 0.1) 0%, 
                transparent 25%, 
                rgba(16, 185, 129, 0.1) 50%, 
                transparent 75%, 
                rgba(34, 197, 94, 0.1) 100%)
            `,
            backgroundSize: '400% 400%'
          }}
        />
      </div>

      {/* Glass Morphism Overlay */}
      <animated.div 
        style={glassSpring}
        className="absolute inset-0 bg-white/5"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <animated.div
          style={headerSpring}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Live Market Data
          </h2>
          <p className="text-xl text-green-300 font-medium">
            Real-time currency exchange rates and steel prices • Updated: {currentTime.toLocaleTimeString()}
          </p>
        </animated.div>

        {/* Scrolling Ticker */}
        <div className="mb-12 overflow-hidden bg-black/30 backdrop-blur-xl rounded-2xl border border-green-500/20 shadow-2xl">
          <animated.div
            ref={tickerRef}
            style={tickerSpring}
            className="flex items-center py-4 whitespace-nowrap"
          >
            {[...currencyData, ...currencyData].map((item, index) => (
              <div key={index} className="flex items-center mx-8 text-white">
                <DollarSign className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-bold text-lg mr-2">{item.pair}</span>
                <span className="text-green-300 text-lg mr-2">{item.rate}</span>
                <span className={`flex items-center text-sm ${item.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                  {item.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {Math.abs(item.change)}%
                </span>
              </div>
            ))}
          </animated.div>
        </div>

        {/* Data Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Currency Exchange Rates */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center mb-8">
              <Globe className="w-8 h-8 text-green-400 mr-4" />
              <h3 className="text-2xl font-black text-white">Currency Exchange</h3>
            </div>
            
            <div ref={cardsRef} className="space-y-4">
              {currencyData.map((currency, index) => (
                <motion.div
                  key={currency.pair}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{currency.pair}</h4>
                        <p className="text-green-300 text-sm">Exchange Rate</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-black text-white currency-rate" data-rate={currency.rate}>
                        0.00
                      </div>
                      <div className={`flex items-center justify-end change-value ${currency.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {currency.trend === 'up' ? 
                          <TrendingUp className="w-4 h-4 mr-1 trend-icon" /> : 
                          <TrendingDown className="w-4 h-4 mr-1 trend-icon" />
                        }
                        <span className="font-bold">{Math.abs(currency.change)}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Steel Rates */}
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <div className="flex items-center mb-8">
              <Zap className="w-8 h-8 text-green-400 mr-4" />
              <h3 className="text-2xl font-black text-white">Steel Prices ($/MT)</h3>
            </div>
            
            <div className="space-y-4">
              {steelRates.map((steel, index) => (
                <motion.div
                  key={steel.grade}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-green-500/20 hover:border-green-400/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mr-4">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{steel.grade}</h4>
                        <p className="text-green-300 text-sm">{steel.country}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-black text-white">
                        $<span className="steel-price" data-price={steel.price}>0</span>
                      </div>
                      <div className={`flex items-center justify-end change-value ${steel.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {steel.change > 0 ? 
                          <TrendingUp className="w-4 h-4 mr-1 trend-icon" /> : 
                          <TrendingDown className="w-4 h-4 mr-1 trend-icon" />
                        }
                        <span className="font-bold">${Math.abs(steel.change)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center bg-green-500/20 backdrop-blur-xl rounded-full px-8 py-4 border border-green-400/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 bg-green-400 rounded-full mr-3"
            />
            <span className="text-green-300 font-bold text-lg">Markets Open • Live Data</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}