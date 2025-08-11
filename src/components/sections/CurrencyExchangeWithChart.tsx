import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, BarChart3 } from "lucide-react";
import { getExchangeRates, scheduleAutomaticUpdates, CurrencyData } from "../../services/exchangeRateService";

// Using CurrencyData from service instead of local interface
type CurrencyRate = CurrencyData;

interface ChartPoint {
  x: number;
  y: number;
  timestamp: number;
}

// Currency symbol mapping utility
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

// Number formatting utility for different currency types
const formatCurrencyRate = (rate: number, code: string): string => {
  if (code === 'IDR') {
    // Format large numbers with comma separators
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else if (['JPY', 'BDT', 'RUB', 'TRY'].includes(code)) {
    // Currencies that typically use 2 decimal places
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  } else {
    // Standard formatting with appropriate decimal places
    return rate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
};

export default function CurrencyExchangeWithChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const chartDataRef = useRef<ChartPoint[]>([]);

  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [isLoadingRates, setIsLoadingRates] = useState(true);
  const [lastApiUpdate, setLastApiUpdate] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [apiError, setApiError] = useState<string | null>(null);

  // Load exchange rates from API
  const loadExchangeRates = async () => {
    try {
      setIsLoadingRates(true);
      setApiError(null);
      const exchangeRates = await getExchangeRates();
      setRates(exchangeRates);
      if (exchangeRates.length > 0) {
        setLastApiUpdate(exchangeRates[0].lastUpdated);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
      setApiError('Failed to load exchange rates. Using fallback data.');
      // The service will handle fallback data automatically
    } finally {
      setIsLoadingRates(false);
    }
  };

  // Initial load of exchange rates
  useEffect(() => {
    loadExchangeRates();
  }, []);

  // Set up automatic updates at 9 AM and 5 PM UK time
  useEffect(() => {
    const cleanup = scheduleAutomaticUpdates(() => {
      loadExchangeRates();
    });

    return cleanup;
  }, []);

  // Manual refresh function
  const handleManualRefresh = async () => {
    setIsUpdating(true);
    try {
      await loadExchangeRates();
    } catch (error) {
      console.error('Manual refresh failed:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Get variation range for different currencies (for fallback simulation)
  const getVariationRange = (code: string): number => {
    const ranges: { [key: string]: number } = {
      'IDR': 100,    // Large numbers need larger variations
      'JPY': 2,      // Yen typically has moderate variations
      'RUB': 3,      // Ruble can be volatile
      'TRY': 2,      // Lira can be volatile
      'BDT': 1,      // Taka has smaller variations
      'INR': 1,      // Rupee has moderate variations
      'CNY': 0.1,    // Yuan is more stable
      'ZAR': 0.5,    // Rand has moderate variations
      'PLN': 0.1,    // Zloty is relatively stable
      'BRL': 0.2,    // Real has moderate variations
      'EUR': 0.02,   // Euro is stable
      'GBP': 0.02    // Pound is stable
    };
    return ranges[code] || 0.02;
  };

  // Initialize chart data
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize chart data points
    const initializeChartData = () => {
      chartDataRef.current = [];
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Create initial smooth curve data
      for (let i = 0; i <= width; i += 2) {
        const baseY = height * 0.6;
        const amplitude = height * 0.3;
        const frequency = 0.01;
        const noise = (Math.random() - 0.5) * 20;

        const y = baseY + Math.sin(i * frequency) * amplitude * 0.5 +
          Math.sin(i * frequency * 2.5) * amplitude * 0.3 +
          Math.sin(i * frequency * 4) * amplitude * 0.2 + noise;

        chartDataRef.current.push({
          x: i,
          y: Math.max(height * 0.1, Math.min(height * 0.9, y)),
          timestamp: Date.now()
        });
      }
    };

    initializeChartData();

    // Animation loop
    const animate = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update chart data (shift left and add new point)
      chartDataRef.current = chartDataRef.current.map(point => ({
        ...point,
        x: point.x - 0.5
      })).filter(point => point.x > -10);

      // Add new point
      const lastPoint = chartDataRef.current[chartDataRef.current.length - 1];
      if (!lastPoint || width - lastPoint.x > 2) {
        const baseY = height * 0.6;
        const amplitude = height * 0.3;
        const time = Date.now() * 0.001;
        const noise = (Math.random() - 0.5) * 15;

        const y = baseY + Math.sin(time * 0.5) * amplitude * 0.4 +
          Math.sin(time * 1.2) * amplitude * 0.3 +
          Math.sin(time * 2.1) * amplitude * 0.2 + noise;

        chartDataRef.current.push({
          x: width,
          y: Math.max(height * 0.1, Math.min(height * 0.9, y)),
          timestamp: Date.now()
        });
      }

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let i = 0; i < 5; i++) {
        const y = (height / 5) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let i = 0; i < 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
      gradient.addColorStop(0.3, 'rgba(34, 197, 94, 0.08)');
      gradient.addColorStop(0.7, 'rgba(16, 185, 129, 0.05)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0.02)');

      // Draw area under curve
      if (chartDataRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(chartDataRef.current[0].x, height);

        chartDataRef.current.forEach((point, index) => {
          if (index === 0) {
            ctx.lineTo(point.x, point.y);
          } else {
            const prevPoint = chartDataRef.current[index - 1];
            const cpx = (prevPoint.x + point.x) / 2;
            ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
          }
        });

        ctx.lineTo(chartDataRef.current[chartDataRef.current.length - 1].x, height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw main line with glow
        ctx.beginPath();
        ctx.moveTo(chartDataRef.current[0].x, chartDataRef.current[0].y);

        chartDataRef.current.forEach((point, index) => {
          if (index === 0) return;
          const prevPoint = chartDataRef.current[index - 1];
          const cpx = (prevPoint.x + point.x) / 2;
          ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
        });

        // Glow effect
        ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.9)';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Main line
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(34, 197, 94, 1)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data points
        chartDataRef.current.forEach((point, index) => {
          if (index % 20 === 0) { // Only draw every 20th point to avoid clutter
            ctx.beginPath();
            ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Simulate minor fluctuations for visual effect (only if using cached data)
  useEffect(() => {
    if (isLoadingRates || rates.length === 0) return;

    const interval = setInterval(() => {
      // Only simulate if we haven't updated from API recently
      const timeSinceLastUpdate = lastApiUpdate ? Date.now() - lastApiUpdate.getTime() : Infinity;
      const shouldSimulate = timeSinceLastUpdate > 30 * 60 * 1000; // 30 minutes

      if (shouldSimulate) {
        setRates(prevRates =>
          prevRates.map(rate => {
            // Very small variations for visual effect only
            const variationRange = getVariationRange(rate.code) * 0.1; // 10% of normal variation
            const changeAmount = (Math.random() - 0.5) * variationRange;
            const newRate = Math.max(0.1, rate.rate + changeAmount);
            const changePercent = (changeAmount / rate.rate) * 100;

            return {
              ...rate,
              rate: Number(newRate.toFixed(rate.code === 'IDR' ? 2 : rate.code === 'JPY' || rate.code === 'INR' ? 2 : 4)),
              change: Number((rate.change + changePercent * 0.1).toFixed(2)), // Gradual change
            };
          })
        );
        setLastUpdated(new Date());
      }
    }, 30000); // Every 30 seconds for visual effect

    return () => clearInterval(interval);
  }, [rates, lastApiUpdate, isLoadingRates]);

  const formatTime = (date: Date | null | undefined) => {
    if (!date || !(date instanceof Date)) {
      return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl w-full">
      {/* Animated Chart Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/20 rounded-full"
              animate={{
                x: [0, Math.random() * 100 + '%'],
                y: [0, Math.random() * 100 + '%'],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 5,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/20" />
      </div>

      {/* Full-Width Content with Centered Cards */}
      <div className="relative z-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8">
          <div className="mb-3 sm:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                Currency Exchange Rates
              </h2>
            </div>
            <p className="text-green-300 font-semibold text-sm sm:text-base">
              Real-time USD conversion rates
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20 shadow-lg">
            <motion.button
              onClick={handleManualRefresh}
              animate={isUpdating || isLoadingRates ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "linear", repeat: isUpdating || isLoadingRates ? Infinity : 0 }}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              disabled={isUpdating || isLoadingRates}
            >
              <RefreshCw className={`w-4 h-4 ${isUpdating || isLoadingRates ? 'text-green-400' : 'text-white'}`} />
            </motion.button>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm">
                {lastApiUpdate ? formatTime(lastApiUpdate) : formatTime(lastUpdated)}
              </span>
              {apiError && (
                <span className="text-yellow-400 text-xs">
                  Cached data
                </span>
              )}
            </div>
            {(isUpdating || isLoadingRates) && (
              <span className="text-green-400 font-bold text-sm">
                {isLoadingRates ? 'Loading...' : 'Updating...'}
              </span>
            )}
          </div>
        </div>

        {/* Centered Currency Grid */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 max-w-7xl">
            {rates.map((currency, index) => (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: "backOut" }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/10 backdrop-blur-xl rounded-xl p-4 sm:p-5 border border-white/20 hover:border-green-400/60 transition-all duration-300 shadow-lg hover:shadow-xl w-full flex flex-col items-center text-center"
                style={{ minHeight: '160px', maxWidth: '180px' }}
              >
                {/* Flag Display */}
                <div className="mb-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white/25 backdrop-blur-sm flex items-center justify-center border-2 border-white/40 shadow-lg mb-2">
                    <span className="text-2xl sm:text-3xl">
                      {currency.flag}
                    </span>
                  </div>

                  {/* Currency Info */}
                  <div className="text-center">
                    <span className="font-black text-white text-base sm:text-lg block mb-1">
                      {currency.code}
                    </span>
                    <p className="text-xs sm:text-sm text-green-300 font-semibold truncate">
                      {currency.name}
                    </p>
                  </div>
                </div>

                {/* Trend Indicator */}
                <div className="mb-3">
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm shadow-md ${currency.trend === 'up'
                    ? 'bg-green-500/25 text-green-200 border-2 border-green-400/40'
                    : currency.trend === 'down'
                      ? 'bg-red-500/25 text-red-200 border-2 border-red-400/40'
                      : 'bg-gray-500/25 text-gray-200 border-2 border-gray-400/40'
                    }`}>
                    {currency.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : currency.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3" />
                    ) : (
                      <div className="w-3 h-3 bg-current rounded-full opacity-60" />
                    )}
                    <span className="font-extrabold">
                      {currency.change > 0 ? '+' : ''}{currency.change}%
                    </span>
                  </div>
                </div>

                {/* Rate Display */}
                <div className="flex-1 flex flex-col justify-center">
                  <p className="text-xs sm:text-sm text-green-300 font-semibold mb-1">
                    1 USD =
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currency.rate}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                      className="text-lg sm:text-xl font-black text-white leading-none"
                    >
                      <span className="text-green-300 text-base sm:text-lg">
                        {getCurrencySymbol(currency.code)}
                      </span>
                      {formatCurrencyRate(currency.rate, currency.code)}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 w-full">
                  <div className="w-full bg-white/15 rounded-full h-1.5 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.abs(currency.change) * 15 + 30}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1.2, ease: "easeOut" }}
                      className={`h-1.5 rounded-full shadow-sm ${currency.trend === 'up'
                        ? 'bg-gradient-to-r from-green-400 via-green-500 to-emerald-500'
                        : currency.trend === 'down'
                          ? 'bg-gradient-to-r from-red-400 via-red-500 to-rose-500'
                          : 'bg-gradient-to-r from-gray-400 via-gray-500 to-slate-500'
                        }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 lg:mt-10 text-center"
        >
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl rounded-full px-6 py-3 border border-white/20 shadow-lg">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 bg-green-400 rounded-full mr-3 shadow-sm"
            />
            <span className="text-green-300 font-semibold text-sm sm:text-base">
              {lastApiUpdate && lastApiUpdate instanceof Date
                ? `Real-time data • Updated ${lastApiUpdate.toLocaleDateString()} at ${formatTime(lastApiUpdate)}`
                : 'Live market data • Updates at 9 AM & 5 PM UK time'
              }
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}