
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { getExchangeRates, scheduleAutomaticUpdates, type CurrencyData } from "@/services/exchangeRateService";
import { Skeleton } from "@/components/ui/skeleton";

// Enhanced currency symbol mapping utility
const getCurrencySymbol = (code: string): string => {
  const symbols: { [key: string]: string } = {
    'CNY': '¥',
    'IDR': 'Rp',
    'INR': '₹',
    'EUR': '€',
    'ZAR': 'R',
    'PLN': 'zł',
    'TRY': '₺',
    'RUB': '₽',
    'BDT': '৳',
    'JPY': '¥',
    'GBP': '£',
    'BRL': 'R$'
  };
  return symbols[code] || '';
};

// Enhanced country flag mapping with flag image paths
const getCountryFlag = (code: string): string => {
  const flags: { [key: string]: string } = {
    'CNY': '/lovable-uploads/82b77987-9612-46f8-b031-ef5aee1370fe.png', // China
    'IDR': '/lovable-uploads/99f834fc-dfc1-42ce-85b2-4aaa0bd32dab.png', // Indonesia
    'INR': '/lovable-uploads/8b4fb8cf-d20a-42f9-8bde-f2cc8567ca27.png', // India
    'EUR': '/lovable-uploads/52d6deef-90b7-44d0-b157-6e1d09de914b.png', // European Union
    'ZAR': '/lovable-uploads/024f0f84-0553-4da3-bd3a-a551e8fe0db0.png', // South Africa
    'PLN': '/lovable-uploads/f9b0fca8-13e9-4800-8575-21f017d07f78.png', // Poland
    'TRY': '/lovable-uploads/d126b7a6-4374-4148-bb0a-981f4cb4712c.png', // Turkey
    'RUB': '/lovable-uploads/28fc1481-cd9f-4227-ac00-3d3d69ad1ad8.png', // Russia
    'BDT': '/lovable-uploads/fe1ebe27-8179-45a7-9f22-26472a7aa721.png', // Bangladesh
    'JPY': '/lovable-uploads/ea0c61f5-6f70-4afd-818b-62a304aad636.png', // Japan
    'GBP': '/lovable-uploads/e3391ddb-c67b-46f2-b5a9-16003379cb87.png', // United Kingdom
    'BRL': '/lovable-uploads/cb1b0667-e557-499d-ab88-38faa1be7f9d.png', // Brazil
  };
  return flags[code] || '\uD83C\uDFF3\uFE0F'; // 🏳️ fallback
};

// Enhanced country name mapping
const getCountryName = (code: string): string => {
  const countries: { [key: string]: string } = {
    'CNY': 'Chinese',
    'IDR': 'Indonesian', 
    'INR': 'Indian',
    'EUR': 'Euro',
    'ZAR': 'South African',
    'PLN': 'Polish',
    'TRY': 'Turkish',
    'RUB': 'Russian',
    'BDT': 'Bangladeshi',
    'JPY': 'Japanese',
    'GBP': 'British',
    'BRL': 'Brazilian',
  };
  return countries[code] || code;
};

// Number formatting utility for different currency types
const formatCurrencyRate = (rate: number, code: string): string => {
  if (code === 'IDR') {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (['JPY', 'BDT', 'RUB', 'TRY'].includes(code)) {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
};

// Loading skeleton component
const CurrencyCardSkeleton = () => (
  <div className="rounded-lg p-3 bg-gray-50 border-2 border-gray-200">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-md" />
        <div>
          <Skeleton className="h-4 w-12 mb-1" />
          <Skeleton className="h-3 w-20 hidden md:block" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
    <Skeleton className="h-3 w-16 mb-1" />
    <Skeleton className="h-6 w-24 mb-2" />
    <Skeleton className="h-1 w-full rounded-full" />
  </div>
);

// Enhanced continuous stock market background animation component
const StockMarketBackground = () => {
  const [candlesticks, setCandlesticks] = useState<Array<{
    x: number;
    open: number;
    high: number;
    low: number;
    close: number;
    isGreen: boolean;
  }>>([]);

  useEffect(() => {
    const generateCandlesticks = () => {
      const newCandlesticks = [];
      let lastPrice = 50;
      
      for (let i = 0; i < 20; i++) {
        const variation = (Math.random() - 0.5) * 8;
        const open = lastPrice;
        const close = Math.max(10, Math.min(90, open + variation));
        const high = Math.max(open, close) + Math.random() * 5;
        const low = Math.min(open, close) - Math.random() * 5;
        const isGreen = close > open;
        
        newCandlesticks.push({
          x: i * 6,
          open,
          high,
          low,
          close,
          isGreen
        });
        
        lastPrice = close;
      }
      setCandlesticks(newCandlesticks);
    };

    generateCandlesticks();
    const interval = setInterval(generateCandlesticks, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 opacity-60 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 120 100" preserveAspectRatio="none">
        <defs>
          {/* Dark background gradient */}
          <radialGradient id="darkBackground" cx="50%" cy="50%" r="100%">
            <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#16213e" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </radialGradient>
          
          {/* Grid pattern with dark theme */}
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#fbbf24" strokeWidth="0.2" opacity="0.3"/>
          </pattern>
          
          {/* Bright orange/yellow gradients for candlesticks */}
          <linearGradient id="bullishCandle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="bearishCandle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="1" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glowing trend line gradient */}
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
          </linearGradient>
          
          {/* Glow effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dark background */}
        <rect width="120" height="100" fill="url(#darkBackground)" />
        
        {/* Grid overlay */}
        <rect width="120" height="100" fill="url(#grid)" />
        
        {/* Horizontal price levels with bright orange */}
        {[20, 35, 50, 65, 80].map((y, i) => (
          <motion.line
            key={`price-line-${i}`}
            x1="0"
            y1={y}
            x2="120"
            y2={y}
            stroke="#fbbf24"
            strokeWidth="0.4"
            strokeOpacity="0.4"
            strokeDasharray="3,3"
            filter="url(#glow)"
            animate={{
              strokeOpacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
        
        {/* Vertical time lines */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`time-line-${i}`}
            x1={15 + i * 13}
            y1="0"
            x2={15 + i * 13}
            y2="100"
            stroke="#fbbf24"
            strokeWidth="0.3"
            strokeOpacity="0.2"
            animate={{
              strokeOpacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Volume bars at bottom with bright colors */}
        {candlesticks.map((candle, i) => (
          <motion.rect
            key={`volume-${i}`}
            x={candle.x}
            y={85}
            width="3"
            height={Math.random() * 12 + 3}
            fill={candle.isGreen ? "#fbbf24" : "#f97316"}
            opacity="0.6"
            filter="url(#glow)"
            initial={{ height: 0 }}
            animate={{ height: Math.random() * 12 + 3 }}
            transition={{
              duration: 0.5,
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Main candlestick chart with bright colors */}
        <g>
          {candlesticks.map((candle, i) => (
            <motion.g
              key={`candle-${i}`}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{
                duration: 0.6,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            >
              {/* High-Low line (wick) with glow */}
              <motion.line
                x1={candle.x + 1.5}
                y1={candle.high}
                x2={candle.x + 1.5}
                y2={candle.low}
                stroke={candle.isGreen ? "#fbbf24" : "#f97316"}
                strokeWidth="1.2"
                opacity="0.9"
                filter="url(#glow)"
                animate={{
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
              
              {/* Candlestick body with bright gradients */}
              <motion.rect
                x={candle.x}
                y={Math.min(candle.open, candle.close)}
                width="3"
                height={Math.abs(candle.close - candle.open) || 0.5}
                fill={candle.isGreen ? "url(#bullishCandle)" : "url(#bearishCandle)"}
                stroke={candle.isGreen ? "#fbbf24" : "#f97316"}
                strokeWidth="0.5"
                rx="0.5"
                filter="url(#strongGlow)"
                animate={{
                  filter: [
                    "url(#strongGlow)",
                    "url(#strongGlow) brightness(1.2)",
                    "url(#strongGlow)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
              
              {/* Bright price indicator dots */}
              <motion.circle
                cx={candle.x + 1.5}
                cy={candle.close}
                r="1.2"
                fill={candle.isGreen ? "#fbbf24" : "#f97316"}
                opacity="0.8"
                filter="url(#strongGlow)"
                animate={{
                  r: [0.8, 1.5, 0.8],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            </motion.g>
          ))}
        </g>
        
        {/* Bright upward trending line with glow */}
        <motion.path
          d={`M 0 ${candlesticks[0]?.close || 50} ${candlesticks.map((c, i) => `L ${c.x + 1.5} ${c.close}`).join(' ')}`}
          stroke="url(#trendGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
          strokeDasharray="4,4"
          filter="url(#strongGlow)"
          animate={{
            strokeDashoffset: [0, -8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Upward trending arrow */}
        <motion.path
          d="M 100 40 L 110 30 L 115 35 L 110 25 L 120 30 L 115 35 L 110 30 Z"
          fill="#fbbf24"
          opacity="0.8"
          filter="url(#strongGlow)"
          animate={{
            opacity: [0.6, 1, 0.6],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        />
        
        {/* Floating light effects */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={`light-${i}`}
            cx={10 + i * 14}
            cy={20 + Math.random() * 60}
            r={0.5 + Math.random() * 1}
            fill={i % 2 === 0 ? "#fbbf24" : "#f97316"}
            opacity="0.6"
            filter="url(#strongGlow)"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              r: [0.5, 1.5, 0.5],
              y: [0, -5, 0]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Market indicators with bright colors */}
        {[...Array(3)].map((_, i) => (
          <motion.text
            key={`indicator-${i}`}
            x={8 + i * 35}
            y={12}
            fontSize="4"
            fill="#fbbf24"
            opacity="0.8"
            fontWeight="bold"
            filter="url(#glow)"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5
            }}
          >
            {['BUY', 'HOLD', 'SELL'][i]}
          </motion.text>
        ))}
      </svg>
    </div>
  );
};

export default function CurrencyExchangeRates() {
  const [rates, setRates] = useState<CurrencyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch exchange rates
  const fetchRates = useCallback(async (showUpdating = false) => {
    try {
      if (showUpdating) setIsUpdating(true);
      
      const exchangeRates = await getExchangeRates();
      setRates(exchangeRates);
      setLastUpdated(new Date());
      setError(null);
      
      console.log('Exchange rates loaded:', exchangeRates.length, 'currencies');
    } catch (err) {
      console.error('Failed to fetch exchange rates:', err);
      setError('Failed to load exchange rates');
    } finally {
      setIsLoading(false);
      if (showUpdating) {
        setTimeout(() => setIsUpdating(false), 800);
      }
    }
  }, []);

  // Initialize data and automatic updates
  useEffect(() => {
    fetchRates();
    
    // Schedule automatic updates
    const cleanup = scheduleAutomaticUpdates(() => {
      console.log('Automatic rate update triggered');
      fetchRates(true);
    });

    return cleanup;
  }, [fetchRates]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="relative bg-white rounded-xl p-3 sm:p-5 shadow-lg border border-gray-100 h-full overflow-hidden">
        <StockMarketBackground />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
            <div className="mb-3 sm:mb-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">USD Exchange Rates</h3>
              <p className="text-sm text-gray-600">1 USD converts to</p>
            </div>
            <Skeleton className="h-8 w-32 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
            {Array.from({ length: 12 }).map((_, index) => (
              <CurrencyCardSkeleton key={index} />
            ))}
          </div>
          
          <div className="mt-3 sm:mt-4 text-center">
            <Skeleton className="h-8 w-64 mx-auto rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error && rates.length === 0) {
    return (
      <div className="relative bg-white rounded-xl p-3 sm:p-5 shadow-lg border border-gray-100 h-full overflow-hidden">
        <StockMarketBackground />
        <div className="relative z-10 text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchRates(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            disabled={isUpdating}
          >
            {isUpdating ? 'Retrying...' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-xl p-3 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full overflow-hidden">
      <StockMarketBackground />
      
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
          <div className="mb-3 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">USD Exchange Rates</h3>
            <p className="text-sm text-gray-600">1 USD converts to</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
            <motion.div
              animate={isUpdating ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "linear", repeat: isUpdating ? Infinity : 0 }}
            >
              <RefreshCw className={`w-3 h-3 ${isUpdating ? 'text-green-500' : ''}`} />
            </motion.div>
            <span className="font-medium">
              {lastUpdated ? formatTime(lastUpdated) : 'Loading...'}
            </span>
            {isUpdating && <span className="text-green-500 font-semibold">Updating...</span>}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence mode="wait">
            {rates.map((currency, index) => (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.4,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -3, 
                  scale: 1.03, 
                  rotateX: 2,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl p-3 transition-all duration-300 border-2 backdrop-blur-sm ${
                  currency.trend === 'up' 
                    ? 'bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-200 hover:border-green-300 hover:shadow-green-100' 
                    : currency.trend === 'down'
                    ? 'bg-gradient-to-br from-red-50/80 to-pink-50/80 border-red-200 hover:border-red-300 hover:shadow-red-100'
                    : 'bg-gradient-to-br from-gray-50/80 to-slate-50/80 border-gray-200 hover:border-gray-300 hover:shadow-gray-100'
                } overflow-hidden`}
                style={{
                  minHeight: '120px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Subtle card background animation */}
                <motion.div 
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      `radial-gradient(circle at 0% 0%, ${currency.trend === 'up' ? '#10B981' : currency.trend === 'down' ? '#EF4444' : '#6B7280'} 0%, transparent 50%)`,
                      `radial-gradient(circle at 100% 100%, ${currency.trend === 'up' ? '#10B981' : currency.trend === 'down' ? '#EF4444' : '#6B7280'} 0%, transparent 50%)`,
                      `radial-gradient(circle at 0% 0%, ${currency.trend === 'up' ? '#10B981' : currency.trend === 'down' ? '#EF4444' : '#6B7280'} 0%, transparent 50%)`
                    ]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <motion.div 
                         className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md bg-white/90 border border-gray-200/50 overflow-hidden backdrop-blur-sm"
                         whileHover={{ scale: 1.15, rotate: 5 }}
                         transition={{ duration: 0.2, ease: "easeOut" }}
                         animate={{
                           boxShadow: [
                             "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                             "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                             "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                           ]
                         }}
                         style={{
                           animationDuration: "2s",
                           animationIterationCount: "infinite",
                           animationDelay: `${index * 0.1}s`
                         }}
                       >
                          <img 
                            src={getCountryFlag(currency.code)}
                            alt={`${getCountryName(currency.code)} Flag`}
                            className="w-full h-full object-cover rounded-md"
                            loading="lazy"
                            onError={(e) => {
                              // Fallback to emoji if image fails to load
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerHTML = `<span class="text-lg font-bold" title="${getCountryName(currency.code)} Flag">🏳️</span>`;
                            }}
                          />
                        </motion.div>
                       <div>
                         <motion.span 
                           className="font-bold text-sm text-gray-900"
                           animate={{ opacity: [0.8, 1, 0.8] }}
                           transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                         >
                           {currency.code}
                         </motion.span>
                         <motion.p 
                           className="text-xs text-gray-600 hidden md:block leading-tight"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.3 + index * 0.05 }}
                         >
                           {getCountryName(currency.code)}
                         </motion.p>
                       </div>
                     </div>
                     
                     <motion.div 
                       className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-sm ${
                         currency.trend === 'up' 
                           ? 'bg-green-100/80 text-green-700 border border-green-200' 
                           : currency.trend === 'down'
                           ? 'bg-red-100/80 text-red-700 border border-red-200'
                           : 'bg-gray-100/80 text-gray-700 border border-gray-200'
                       }`}
                       whileHover={{ scale: 1.08, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
                       animate={{
                         y: [0, -1, 0],
                         boxShadow: [
                           "0 1px 3px rgba(0,0,0,0.1)",
                           "0 4px 6px rgba(0,0,0,0.1)",
                           "0 1px 3px rgba(0,0,0,0.1)"
                         ]
                       }}
                       transition={{
                         duration: 2,
                         repeat: Infinity,
                         delay: index * 0.1
                       }}
                     >
                    {currency.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : currency.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <div className="w-3 h-3 bg-current rounded-full opacity-50" />
                    )}
                       {currency.change > 0 ? '+' : ''}{currency.change}%
                     </motion.div>
                   </div>
                   
                   <motion.div 
                     className="flex items-center gap-2 mb-2"
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: 0.4 + index * 0.05 }}
                   >
                     <span className="text-xs text-gray-600 font-medium">1 USD =</span>
                   </motion.div>
                   
                   <motion.div
                     key={`${currency.code}-${currency.rate}`}
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ 
                       opacity: 1, 
                       scale: 1,
                       color: [
                         "#111827",
                         currency.trend === 'up' ? "#059669" : currency.trend === 'down' ? "#DC2626" : "#111827",
                         "#111827"
                       ]
                     }}
                     transition={{ 
                       duration: 0.3,
                       scale: { duration: 0.2 },
                       color: { duration: 2, repeat: Infinity }
                     }}
                     className="text-lg sm:text-xl font-black mb-2 tracking-tight"
                   >
                     <motion.span
                       animate={{ 
                         textShadow: [
                           "0 0 0px rgba(16, 185, 129, 0)",
                           currency.trend === 'up' ? "0 0 8px rgba(16, 185, 129, 0.3)" : currency.trend === 'down' ? "0 0 8px rgba(239, 68, 68, 0.3)" : "0 0 0px rgba(16, 185, 129, 0)",
                           "0 0 0px rgba(16, 185, 129, 0)"
                         ]
                       }}
                       transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                     >
                       {getCurrencySymbol(currency.code)}{formatCurrencyRate(currency.rate, currency.code)}
                     </motion.span>
                   </motion.div>
                   
                   {/* Enhanced Progress Bar with Animation */}
                   <div className="w-full bg-gray-200/50 rounded-full h-2 overflow-hidden backdrop-blur-sm border border-gray-300/30">
                     <motion.div
                       initial={{ width: 0, scaleX: 0 }}
                       animate={{ 
                         width: `${Math.min(Math.abs(currency.change) * 20 + 30, 100)}%`,
                         scaleX: 1
                       }}
                       transition={{ 
                         delay: index * 0.03, 
                         duration: 1.2, 
                         ease: "easeOut",
                         scaleX: { duration: 0.8 }
                       }}
                       className={`h-2 rounded-full relative overflow-hidden ${
                         currency.trend === 'up' 
                           ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600' 
                           : currency.trend === 'down'
                           ? 'bg-gradient-to-r from-red-400 via-red-500 to-red-600'
                           : 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600'
                       }`}
                     >
                       {/* Shimmer effect */}
                       <motion.div
                         className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                         animate={{
                           x: ["-100%", "100%"]
                         }}
                         transition={{
                           duration: 2,
                           repeat: Infinity,
                           delay: index * 0.1
                         }}
                       />
                     </motion.div>
                   </div>
                 </div>
               </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="mt-3 sm:mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full inline-block">
            {error ? 'Using cached data' : 'Live market data'} – 
            {lastUpdated ? ` Updated: ${formatTime(lastUpdated)}` : ' Loading updates...'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
