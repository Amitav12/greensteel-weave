import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from '@react-spring/web';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Zap } from "lucide-react";

const mockData = [
  { 
    symbol: "STEEL", 
    name: "Steel Price Index", 
    price: 4250.75, 
    change: 2.34, 
    changePercent: 0.055,
    icon: BarChart3,
    color: "text-green-500"
  },
  { 
    symbol: "IRON", 
    name: "Iron Ore Futures", 
    price: 892.50, 
    change: -5.20, 
    changePercent: -0.058,
    icon: TrendingDown,
    color: "text-red-500"
  },
  { 
    symbol: "SCRAP", 
    name: "Scrap Metal Rate", 
    price: 325.80, 
    change: 8.45, 
    changePercent: 0.027,
    icon: TrendingUp,
    color: "text-green-500"
  },
  { 
    symbol: "USD/INR", 
    name: "Currency Exchange", 
    price: 83.25, 
    change: 0.15, 
    changePercent: 0.002,
    icon: DollarSign,
    color: "text-green-500"
  },
  { 
    symbol: "RECYCLING", 
    name: "Recycling Index", 
    price: 156.90, 
    change: 3.75, 
    changePercent: 0.024,
    icon: Globe,
    color: "text-green-500"
  },
  { 
    symbol: "ENERGY", 
    name: "Energy Cost Index", 
    price: 78.40, 
    change: -1.20, 
    changePercent: -0.015,
    icon: Zap,
    color: "text-red-500"
  }
];

export default function LiveDataTickerSimple() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(mockData);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 20,
          changePercent: (Math.random() - 0.5) * 0.1
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll through items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length]);

  // React Spring animation for the ticker
  const tickerSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: config.gentle,
    reset: true,
    key: currentIndex
  });

  const currentItem = data[currentIndex];

  return (
    <section className="py-8 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(34,197,94,0.1),transparent)] animate-pulse" />
      
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Live Market Data
            </span>
          </h2>
          <p className="text-green-300 text-sm">
            Real-time pricing for steel, iron, and recycling materials
          </p>
        </motion.div>

        {/* Main Ticker Display */}
        <animated.div style={tickerSpring}>
          <Card variant="glass" className="max-w-4xl mx-auto mb-8" greenTint="dark">
            <CardContent className="p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                  >
                    <currentItem.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {currentItem.symbol}
                    </h3>
                    <p className="text-green-300 text-sm">
                      {currentItem.name}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-black text-white mb-2">
                    ₹{currentItem.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center gap-2 ${currentItem.color}`}>
                    {currentItem.change > 0 ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                    <span className="font-bold">
                      {currentItem.change > 0 ? '+' : ''}{currentItem.change.toFixed(2)}
                    </span>
                    <span className="text-sm">
                      ({currentItem.changePercent > 0 ? '+' : ''}{(currentItem.changePercent * 100).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </animated.div>

        {/* Mini Ticker Strip */}
        <div className="relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
          <motion.div
            animate={{ x: [0, -100] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-8 py-4 px-6"
          >
            {[...data, ...data].map((item, index) => (
              <div key={index} className="flex items-center gap-3 whitespace-nowrap">
                <item.icon className="w-4 h-4 text-green-400" />
                <span className="text-white font-medium">{item.symbol}</span>
                <span className="text-green-300">₹{item.price.toFixed(2)}</span>
                <span className={`text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {item.change > 0 ? '+' : ''}{item.change.toFixed(2)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}