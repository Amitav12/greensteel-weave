
import { useEffect, useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight, TrendingUp, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Rate { 
  symbol: string; 
  value: number; 
  prev: number; 
  type: 'currency' | 'commodity';
  country?: string;
}

const initialRates: Rate[] = [
  // Currency Rates
  { symbol: "USD/INR", value: 83.2, prev: 83.1, type: 'currency' },
  { symbol: "EUR/USD", value: 1.08, prev: 1.07, type: 'currency' },
  { symbol: "GBP/USD", value: 1.27, prev: 1.26, type: 'currency' },
  { symbol: "JPY/USD", value: 149.2, prev: 149.8, type: 'currency' },
  
  // Steel/Iron Rates by Country
  { symbol: "Steel (USA)", value: 690, prev: 685, type: 'commodity', country: 'USA' },
  { symbol: "Steel (UK)", value: 720, prev: 715, type: 'commodity', country: 'UK' },
  { symbol: "Steel (India)", value: 62.4, prev: 62.0, type: 'commodity', country: 'India' },
  { symbol: "Steel (China)", value: 4580, prev: 4560, type: 'commodity', country: 'China' },
];

export default function LiveDataTicker() {
  const [rates, setRates] = useState<Rate[]>(initialRates);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setRates((prev) =>
        prev.map((r) => {
          const maxChange = r.type === 'currency' ? 0.05 : (r.value > 100 ? 15 : 2);
          const delta = (Math.random() - 0.5) * maxChange;
          const newValue = Math.max(0.01, r.value + delta);
          
          return { 
            ...r, 
            prev: r.value, 
            value: r.type === 'currency' 
              ? +newValue.toFixed(3) 
              : +newValue.toFixed(1)
          };
        })
      );
      setLastUpdate(new Date());
    }, 30000);
    
    return () => clearInterval(id);
  }, []);

  const currencyRates = rates.filter(r => r.type === 'currency');
  const commodityRates = rates.filter(r => r.type === 'commodity');

  const RateCard = ({ rate, index }: { rate: Rate; index: number }) => {
    const isUp = rate.value >= rate.prev;
    const changePercent = rate.prev !== 0 ? ((rate.value - rate.prev) / rate.prev * 100).toFixed(2) : '0.00';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          boxShadow: "0 10px 30px rgba(76, 175, 80, 0.2)"
        }}
        className="glass-card-hover rounded-2xl p-4 min-w-[200px] bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {rate.type === 'currency' ? (
              <Globe className="h-4 w-4 text-primary" />
            ) : (
              <TrendingUp className="h-4 w-4 text-primary" />
            )}
            <span className="text-sm font-bold text-foreground">{rate.symbol}</span>
          </div>
          {isUp ? 
            <ArrowUpRight className="h-4 w-4 text-primary animate-pulse" /> : 
            <ArrowDownRight className="h-4 w-4 text-destructive animate-pulse" />
          }
        </div>
        
        <div className="space-y-1">
          <motion.span 
            key={rate.value}
            initial={{ scale: 1.2, color: isUp ? '#4CAF50' : '#f44336' }}
            animate={{ scale: 1, color: 'inherit' }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold text-foreground block"
          >
            {rate.type === 'currency' ? rate.value.toFixed(3) : rate.value.toLocaleString()}
          </motion.span>
          <span className={`text-xs font-medium ${isUp ? 'text-primary' : 'text-destructive'}`}>
            {isUp ? '+' : ''}{changePercent}%
          </span>
          {rate.country && (
            <div className="text-xs text-muted-foreground">
              {rate.country}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="container py-12 space-y-8" aria-label="Live market data">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Live Market Data</h2>
        <p className="text-muted-foreground">Real-time rates updated every 30 seconds</p>
        <div className="text-sm text-primary/70 mt-2">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </motion.div>

      {/* Currency Exchange Rates */}
      <div className="space-y-4">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-xl font-semibold text-primary flex items-center gap-2"
        >
          <Globe className="h-5 w-5" />
          Currency Exchange Rates
        </motion.h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {currencyRates.map((rate, index) => (
            <RateCard key={rate.symbol} rate={rate} index={index} />
          ))}
        </div>
      </div>

      {/* Steel Rates by Country */}
      <div className="space-y-4">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl font-semibold text-primary flex items-center gap-2"
        >
          <TrendingUp className="h-5 w-5" />
          Steel Rates by Country (USD/Ton)
        </motion.h3>
        <div className="flex flex-wrap gap-4 justify-center">
          {commodityRates.map((rate, index) => (
            <RateCard key={rate.symbol} rate={rate} index={index + currencyRates.length} />
          ))}
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-muted-foreground mt-4"
      >
        <span className="inline-flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          Auto-refreshes every 30 seconds
        </span>
      </motion.p>
    </section>
  );
}
