
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import CurrencyExchangeRates from "./CurrencyExchangeRates";

// Mock chart data for demonstration
const mockChartData = [
  { time: '9:00', EUR: 0.85, GBP: 0.74, JPY: 147.45, CNY: 7.18 },
  { time: '12:00', EUR: 0.852, GBP: 0.741, JPY: 147.50, CNY: 7.19 },
  { time: '15:00', EUR: 0.849, GBP: 0.739, JPY: 147.40, CNY: 7.17 },
  { time: '18:00', EUR: 0.851, GBP: 0.742, JPY: 147.55, CNY: 7.20 },
];

export default function CurrencyExchangeWithChart() {
  const [activeChart, setActiveChart] = useState('EUR');
  const [isChartVisible, setIsChartVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsChartVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const chartCurrencies = [
    { code: 'EUR', name: 'Euro', color: '#3B82F6' },
    { code: 'GBP', name: 'Pound', color: '#10B981' },
    { code: 'JPY', name: 'Yen', color: '#F59E0B' },
    { code: 'CNY', name: 'Yuan', color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Currency Exchange Rates */}
      <CurrencyExchangeRates />

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Currency Trends
            </h3>
            <p className="text-sm text-gray-600">Intraday performance vs USD</p>
          </div>

          {/* Currency Selector */}
          <div className="flex flex-wrap gap-2">
            {chartCurrencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => setActiveChart(currency.code)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeChart === currency.code
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {currency.code}
              </button>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 sm:h-80">
          {isChartVisible && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  domain={['dataMin - 0.01', 'dataMax + 0.01']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={activeChart}
                  stroke={chartCurrencies.find(c => c.code === activeChart)?.color}
                  strokeWidth={3}
                  dot={{ fill: chartCurrencies.find(c => c.code === activeChart)?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: chartCurrencies.find(c => c.code === activeChart)?.color, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Chart Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>Upward trend</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span>Downward trend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full opacity-50"></div>
            <span>Stable</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
