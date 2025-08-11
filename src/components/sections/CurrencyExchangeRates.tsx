
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
  const [timeOffset, setTimeOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOffset(prev => prev + 0.01);
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  // Generate continuous chart points that move over time
  const generateChartPoints = (baseY: number, frequency: number, amplitude: number, phaseShift: number = 0) => {
    const points = [];
    for (let i = 0; i <= 120; i += 1) {
      const x = i;
      const y = baseY + 
               Math.sin((i * 0.05 + timeOffset + phaseShift) * frequency) * amplitude +
               Math.cos((i * 0.03 + timeOffset * 0.7 + phaseShift) * frequency * 1.3) * (amplitude * 0.6) +
               Math.sin((i * 0.08 + timeOffset * 1.2 + phaseShift) * frequency * 0.8) * (amplitude * 0.3);
      points.push({ x, y });
    }
    return points;
  };

  const mainPoints = generateChartPoints(30, 1, 20, 0);
  const secondaryPoints = generateChartPoints(60, 1.2, 15, Math.PI / 4);
  const tertiaryPoints = generateChartPoints(45, 0.8, 12, Math.PI / 2);

  const createPath = (points: { x: number; y: number }[]) => 
    points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  return (
    <div className="absolute inset-0 opacity-20 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0" viewBox="0 0 120 100" preserveAspectRatio="none">
        <defs>
          {/* Enhanced gradients for better visibility */}
          <linearGradient id="stockGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="stockGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10B981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="stockGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#34D399" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Background glow */}
          <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.08" />
            <stop offset="60%" stopColor="#059669" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </radialGradient>
          
          {/* Area fill gradients */}
          <linearGradient id="areaFill1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Background glow effect */}
        <rect width="120" height="100" fill="url(#backgroundGlow)" />
        
        {/* Floating grid lines with animation */}
        {[...Array(8)].map((_, i) => (
          <motion.line
            key={`grid-h-${i}`}
            x1="0"
            y1={15 + i * 10}
            x2="120"
            y2={15 + i * 10}
            stroke="#10B981"
            strokeWidth="0.15"
            strokeOpacity="0.2"
            animate={{
              strokeOpacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 4 + i * 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
        
        {/* Vertical grid lines */}
        {[...Array(10)].map((_, i) => (
          <motion.line
            key={`grid-v-${i}`}
            x1={i * 12}
            y1="0"
            x2={i * 12}
            y2="100"
            stroke="#10B981"
            strokeWidth="0.1"
            strokeOpacity="0.15"
            animate={{
              strokeOpacity: [0.05, 0.2, 0.05]
            }}
            transition={{
              duration: 5 + i * 0.2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
        
        {/* Area fill for main chart */}
        <path
          d={`${createPath(mainPoints)} L 120 100 L 0 100 Z`}
          fill="url(#areaFill1)"
        />
        
        {/* Main chart lines - continuous animation */}
        <path
          d={createPath(mainPoints)}
          stroke="url(#stockGradient1)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={createPath(secondaryPoints)}
          stroke="url(#stockGradient2)"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
        />
        
        <path
          d={createPath(tertiaryPoints)}
          stroke="url(#stockGradient3)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Animated data points that follow the lines */}
        {mainPoints.filter((_, i) => i % 10 === 0).map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="0.4"
            fill="#10B981"
            animate={{
              r: [0.2, 0.6, 0.2],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
              delay: i * 0.15
            }}
          />
        ))}
        
        {/* Floating price indicators */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`float-${i}`}
            cx={15 + i * 18}
            cy={20 + Math.sin(timeOffset + i) * 30}
            r="0.3"
            fill="#34D399"
            animate={{
              cy: [20 + Math.sin(timeOffset + i) * 30, 80 + Math.sin(timeOffset + i) * 30],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 3 + i * 0.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.3
            }}
          />
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
