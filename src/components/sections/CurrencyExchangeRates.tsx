
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
  const [chartPoints, setChartPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [secondaryPoints, setSecondaryPoints] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const generateTrendingChart = () => {
      const mainPoints = [];
      const secondPoints = [];
      let baseY = 80; // Start from bottom

      // Generate upward trending line with peaks and valleys
      for (let i = 0; i <= 100; i += 2) {
        const progress = i / 100;
        // Overall upward trend with random variations
        const trendY = 80 - (progress * 50); // Goes from 80 to 30 (upward)
        const variation = Math.sin(i * 0.3) * 8 + Math.random() * 6 - 3;
        const finalY = Math.max(15, Math.min(85, trendY + variation));

        mainPoints.push({ x: i * 1.2, y: finalY });

        // Secondary line with different pattern
        const secondVariation = Math.cos(i * 0.25) * 6 + Math.random() * 4 - 2;
        const secondY = Math.max(20, Math.min(90, trendY + secondVariation + 5));
        secondPoints.push({ x: i * 1.2, y: secondY });
      }

      setChartPoints(mainPoints);
      setSecondaryPoints(secondPoints);
    };

    generateTrendingChart();
    const interval = setInterval(generateTrendingChart, 4000);
    return () => clearInterval(interval);
  }, []);

  const createPath = (points: Array<{ x: number; y: number }>) =>
    points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');

  const createAreaPath = (points: Array<{ x: number; y: number }>) =>
    `${createPath(points)} L ${points[points.length - 1]?.x || 0} 100 L 0 100 Z`;

  return (
    <div className="absolute inset-0 w-full h-full opacity-100 overflow-hidden pointer-events-none">
      <svg width="100%" height="100%" className="absolute inset-0 w-full h-full min-w-full min-h-full" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Dark background with blue/purple gradient */}
          <radialGradient id="darkBackground" cx="30%" cy="30%" r="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1" />
            <stop offset="30%" stopColor="#1a1a2e" stopOpacity="1" />
            <stop offset="70%" stopColor="#16213e" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </radialGradient>

          {/* Grid pattern */}
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#1e40af" strokeWidth="0.3" opacity="0.4" />
          </pattern>

          {/* Main trend line gradient - Green to Blue */}
          <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
          </linearGradient>

          {/* Secondary line gradient - Purple to Pink */}
          <linearGradient id="secondaryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="1" />
          </linearGradient>

          {/* Area fill gradients */}
          <linearGradient id="areaFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dark background */}
        <rect width="120" height="100" fill="url(#darkBackground)" />

        {/* Grid overlay */}
        <rect width="120" height="100" fill="url(#grid)" />

        {/* Horizontal price levels */}
        {[20, 35, 50, 65, 80].map((y, i) => (
          <motion.line
            key={`price-line-${i}`}
            x1="0"
            y1={y}
            x2="120"
            y2={y}
            stroke="#1e40af"
            strokeWidth="0.3"
            strokeOpacity="0.4"
            strokeDasharray="2,2"
            animate={{
              strokeOpacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}

        {/* Area fill under main trend line */}
        <motion.path
          d={createAreaPath(chartPoints)}
          fill="url(#areaFill)"
          opacity="0.4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
        />

        {/* Main upward trending line */}
        <motion.path
          d={createPath(chartPoints)}
          stroke="url(#trendGradient)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          filter="url(#strongGlow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />

        {/* Secondary trend line */}
        <motion.path
          d={createPath(secondaryPoints)}
          stroke="url(#secondaryGradient)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          filter="url(#glow)"
          opacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Data points along the main line */}
        {chartPoints.filter((_, i) => i % 8 === 0).map((point, i) => (
          <motion.circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="#10b981"
            filter="url(#strongGlow)"
            animate={{
              r: [1, 2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}

        {/* Upward trending arrow */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.path
            d="M 95 35 L 108 22 L 115 29 L 108 15 L 118 22 L 115 29 L 108 22 Z"
            fill="url(#trendGradient)"
            filter="url(#strongGlow)"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </motion.g>

        {/* Floating light particles */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`particle-${i}`}
            cx={8 + i * 9}
            cy={20 + Math.random() * 60}
            r={0.3 + Math.random() * 0.8}
            fill={i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"}
            opacity="0.6"
            filter="url(#glow)"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              r: [0.3, 1.2, 0.3],
              y: [0, -8, 0]
            }}
            transition={{
              duration: 2 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.2
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
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-300">USD Exchange Rates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">1 USD converts to</p>
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
    <div className="relative bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-25">
        <StockMarketBackground />
      </div>

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
                  y: -8,
                  scale: 1.03,
                  rotateX: 4,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.18), 0 12px 24px -6px rgba(0, 0, 0, 0.12), inset 0 2px 0 rgba(255, 255, 255, 0.25)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className={`currency-card relative p-3 transition-all duration-300 border-2 backdrop-blur-sm overflow-hidden ${currency.trend === 'up'
                  ? 'bg-gradient-to-br from-green-50/95 via-emerald-50/90 to-green-100/85 border-green-200 hover:border-green-300 hover:shadow-green-100'
                  : currency.trend === 'down'
                    ? 'bg-gradient-to-br from-red-50/95 via-pink-50/90 to-red-100/85 border-red-200 hover:border-red-300 hover:shadow-red-100'
                    : 'bg-gradient-to-br from-gray-50/95 via-slate-50/90 to-gray-100/85 border-gray-200 hover:border-gray-300 hover:shadow-gray-100'
                  }`}
                style={{
                  minHeight: '120px',
                  transformStyle: 'preserve-3d',
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px -4px rgba(0, 0, 0, 0.12), 0 4px 8px -2px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
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
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold shadow-sm ${currency.trend === 'up'
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
                      className={`h-2 rounded-full relative overflow-hidden ${currency.trend === 'up'
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

      <style jsx>{`
        .currency-card {
          border-radius: 16px !important;
          box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.12), 
                      0 4px 8px -2px rgba(0, 0, 0, 0.08), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          transform-style: preserve-3d !important;
        }
        
        .currency-card:hover {
          transform: translateY(-8px) scale(1.03) rotateX(4deg) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.18), 
                      0 12px 24px -6px rgba(0, 0, 0, 0.12), 
                      inset 0 2px 0 rgba(255, 255, 255, 0.25) !important;
        }
        
        @media (max-width: 640px) {
          .currency-card:hover {
            transform: translateY(-4px) scale(1.02) rotateX(2deg) !important;
            box-shadow: 0 15px 30px -8px rgba(0, 0, 0, 0.15), 
                        0 8px 16px -4px rgba(0, 0, 0, 0.1), 
                        inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
          }
        }
      `}</style>
    </div>
  );
}
