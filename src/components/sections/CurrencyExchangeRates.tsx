
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
    'IDR': '/lovable-uploads/b83671c2-d48e-4e87-8bde-f2cc8567ca27.png', // Indonesia
    'INR': '/lovable-uploads/8b4fb8cf-d20a-42f9-8bde-f2cc8567ca27.png', // India
    'EUR': '/lovable-uploads/52d6deef-90b7-44d0-b157-6e1d09de914b.png', // European Union
    'ZAR': '/lovable-uploads/024f0f84-0553-4da3-bd3a-a551e8fe0db0.png', // South Africa
    'PLN': '/lovable-uploads/f9b0fca8-13e9-4800-8575-21f017d07f78.png', // Poland
    'TRY': '/lovable-uploads/d126b7a6-4374-4148-bb0a-981f4cb4712c.png', // Turkey
    'RUB': '/lovable-uploads/28fc1481-cd9f-4227-ac00-3d3d69ad1ad8.png', // Russia
    'BDT': '\uD83C\uDDE7\uD83C\uDDE9', // 🇧🇩 Bangladesh (fallback to emoji)
    'JPY': '\uD83C\uDDEF\uD83C\uDDF5', // 🇯🇵 Japan (fallback to emoji)
    'GBP': '\uD83C\uDDEC\uD83C\uDDE7', // 🇬🇧 United Kingdom (fallback to emoji)
    'BRL': '\uD83C\uDDE7\uD83C\uDDF7', // 🇧🇷 Brazil (fallback to emoji)
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

// Enhanced stock market background animation component
const StockMarketBackground = () => {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const generatePoints = () => {
      const newPoints = [];
      for (let i = 0; i <= 100; i += 2) {
        newPoints.push({
          x: i,
          y: 50 + Math.sin(i * 0.1) * 20 + Math.random() * 10
        });
      }
      setPoints(newPoints);
    };

    generatePoints();
    const interval = setInterval(generatePoints, 3000);
    return () => clearInterval(interval);
  }, []);

  const pathD = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  return (
    <div className="absolute inset-0 opacity-5 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="stockGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <motion.path
          d={pathD}
          stroke="url(#stockGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Additional floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.circle
            key={i}
            cx={`${10 + i * 12}%`}
            cy={`${30 + Math.sin(i) * 20}%`}
            r="2"
            fill="#10B981"
            opacity="0.2"
            animate={{
              cy: [`${30 + Math.sin(i) * 20}%`, `${50 + Math.sin(i) * 20}%`],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 2 + i * 0.3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          <AnimatePresence mode="wait">
            {rates.map((currency, index) => (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.03,
                  duration: 0.25,
                  ease: "easeOut"
                }}
                whileHover={{ y: -2, scale: 1.02, transition: { duration: 0.15 } }}
                className={`rounded-lg p-3 transition-all duration-200 border-2 ${
                  currency.trend === 'up' 
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                    : currency.trend === 'down'
                    ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                    : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                     <motion.div 
                       className="w-8 h-8 rounded-md flex items-center justify-center shadow-sm bg-white border border-gray-200 overflow-hidden"
                       whileHover={{ scale: 1.1 }}
                       transition={{ duration: 0.15 }}
                     >
                       {getCountryFlag(currency.code).startsWith('/lovable-uploads/') ? (
                         <img 
                           src={getCountryFlag(currency.code)}
                           alt={`${getCountryName(currency.code)} Flag`}
                           className="w-full h-full object-cover rounded-sm"
                           loading="lazy"
                         />
                       ) : (
                         <span 
                           className="text-lg font-bold" 
                           title={`${getCountryName(currency.code)} Flag`}
                           style={{ fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif' }}
                         >
                           {getCountryFlag(currency.code)}
                         </span>
                       )}
                     </motion.div>
                    <div>
                      <span className="font-bold text-sm text-gray-900">{currency.code}</span>
                      <p className="text-xs text-gray-600 hidden md:block leading-tight">
                        {getCountryName(currency.code)}
                      </p>
                    </div>
                  </div>
                  
                  <motion.div 
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                      currency.trend === 'up' 
                        ? 'bg-green-100 text-green-700' 
                        : currency.trend === 'down'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
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
                
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-gray-600">1 USD =</span>
                </div>
                
                <motion.div
                  key={`${currency.code}-${currency.rate}`}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg sm:text-xl font-black text-gray-900 mb-2"
                >
                  {getCurrencySymbol(currency.code)}{formatCurrencyRate(currency.rate, currency.code)}
                </motion.div>
                
                {/* Enhanced Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(Math.abs(currency.change) * 20 + 30, 100)}%` }}
                    transition={{ delay: index * 0.02, duration: 0.8, ease: "easeOut" }}
                    className={`h-1.5 rounded-full ${
                      currency.trend === 'up' 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : currency.trend === 'down'
                        ? 'bg-gradient-to-r from-red-400 to-red-600'
                        : 'bg-gradient-to-r from-gray-400 to-gray-600'
                    }`}
                  />
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
