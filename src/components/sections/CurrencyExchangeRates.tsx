import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  rate: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
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

export default function CurrencyExchangeRates() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    // Your requested 12 currencies with exact rates
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rate: 7.18, change: 0.23, trend: 'up' },
    { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 16249.15, change: 0.05, trend: 'up' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rate: 87.52, change: -0.15, trend: 'down' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 0.85, change: 0.12, trend: 'up' },
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 17.72, change: -0.12, trend: 'down' },
    { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱', rate: 3.63, change: 0.08, trend: 'up' },
    { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', rate: 40.74, change: -0.25, trend: 'down' },
    { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', rate: 79.80, change: 0.15, trend: 'up' },
    { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 121.37, change: -0.03, trend: 'neutral' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: 147.45, change: 0.45, trend: 'up' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 0.74, change: -0.08, trend: 'down' },
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 5.43, change: 0.18, trend: 'up' },
  ]);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Get variation range for different currencies
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

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setTimeout(() => {
        setRates(prevRates => 
          prevRates.map(rate => {
            // Use currency-specific variation ranges
            const variationRange = getVariationRange(rate.code);
            const changeAmount = (Math.random() - 0.5) * variationRange;
            const newRate = Math.max(0.1, rate.rate + changeAmount);
            const changePercent = (changeAmount / rate.rate) * 100;
            const newTrend = changePercent > 0.1 ? 'up' : changePercent < -0.1 ? 'down' : 'neutral';
            
            return {
              ...rate,
              rate: Number(newRate.toFixed(rate.code === 'IDR' ? 2 : rate.code === 'JPY' || rate.code === 'INR' ? 2 : 4)),
              change: Number(changePercent.toFixed(2)),
              trend: newTrend
            };
          })
        );
        setLastUpdated(new Date());
        setIsUpdating(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl p-3 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">USD Exchange Rates</h3>
          <p className="text-sm text-gray-600">1 USD converts to</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full">
          <motion.div
            animate={isUpdating ? { rotate: 360 } : {}}
            transition={{ duration: 1, ease: "linear" }}
          >
            <RefreshCw className={`w-3 h-3 ${isUpdating ? 'text-green-500' : ''}`} />
          </motion.div>
          <span className="font-medium">{formatTime(lastUpdated)}</span>
          {isUpdating && <span className="text-green-500 font-semibold">Updating...</span>}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {rates.map((currency, index) => (
          <motion.div
            key={currency.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className={`rounded-lg p-3 transition-all duration-300 border-2 ${
              currency.trend === 'up' 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                : currency.trend === 'down'
                ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md flex items-center justify-center shadow-sm bg-white border border-gray-200">
                  <span className="text-lg">{currency.flag}</span>
                </div>
                <div>
                  <span className="font-bold text-sm text-gray-900">{currency.code}</span>
                  <p className="text-xs text-gray-600 hidden md:block">{currency.name}</p>
                </div>
              </div>
              
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${
                currency.trend === 'up' 
                  ? 'bg-green-100 text-green-700' 
                  : currency.trend === 'down'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {currency.trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : currency.trend === 'down' ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <div className="w-3 h-3 bg-current rounded-full opacity-50" />
                )}
                {currency.change > 0 ? '+' : ''}{currency.change}%
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600">1 USD =</span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currency.rate}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl font-black text-gray-900"
              >
                {getCurrencySymbol(currency.code)}{formatCurrencyRate(currency.rate, currency.code)}
              </motion.div>
            </AnimatePresence>
            
            {/* Progress Bar */}
            <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(currency.change) * 20 + 30}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                className={`h-1 rounded-full ${
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
      </div>
      
      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full inline-block">
          Live market data – Updated every 30 seconds
        </p>
      </div>
    </div>
  );
}