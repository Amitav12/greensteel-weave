import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Euro, PoundSterling, CircleDollarSign } from "lucide-react";

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
}

export default function CurrencyExchangeRates() {
  const [rates, setRates] = useState<CurrencyRate[]>([
    { code: 'USD', name: 'US Dollar', rate: 83.25, change: 0.15, trend: 'up', icon: DollarSign },
    { code: 'EUR', name: 'Euro', rate: 90.45, change: -0.23, trend: 'down', icon: Euro },
    { code: 'GBP', name: 'British Pound', rate: 105.67, change: 0.45, trend: 'up', icon: PoundSterling },
    { code: 'JPY', name: 'Japanese Yen', rate: 0.56, change: -0.02, trend: 'down', icon: CircleDollarSign },
  ]);
  
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      setTimeout(() => {
        setRates(prevRates => 
          prevRates.map(rate => {
            const changeAmount = (Math.random() - 0.5) * 2;
            const newRate = Math.max(0.1, rate.rate + changeAmount);
            const newChange = changeAmount;
            const newTrend = changeAmount > 0.1 ? 'up' : changeAmount < -0.1 ? 'down' : 'neutral';
            
            return {
              ...rate,
              rate: Number(newRate.toFixed(2)),
              change: Number(newChange.toFixed(2)),
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
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Currency Rates</h3>
          <p className="text-sm text-gray-600">Live exchange rates</p>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {rates.map((currency, index) => {
          const IconComponent = currency.icon;
          return (
            <motion.div
              key={currency.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className={`rounded-lg p-4 transition-all duration-300 border-2 ${
                currency.trend === 'up' 
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                  : currency.trend === 'down'
                  ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                  : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                    currency.trend === 'up' 
                      ? 'bg-green-500 text-white' 
                      : currency.trend === 'down'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-base text-gray-900">{currency.code}</span>
                    <p className="text-xs text-gray-600 hidden sm:block">{currency.name}</p>
                  </div>
                </div>
                
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
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
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currency.rate}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl sm:text-2xl font-black text-gray-900"
                >
                  ₹{currency.rate}
                </motion.div>
              </AnimatePresence>
              
              {/* Progress Bar */}
              <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.abs(currency.change) * 20 + 30}%` }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
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
          );
        })}
      </div>
      
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full inline-block">
          * Rates updated every 30 seconds
        </p>
      </div>
    </div>
  );
}