import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ExchangeRateChartProps {
  currency: string;
  data: Array<{
    time: string;
    rate: number;
  }>;
  currentRate: number;
  trend: 'up' | 'down';
}

export default function ExchangeRateChart({ currency, data, currentRate, trend }: ExchangeRateChartProps) {
  // Generate mock historical data for demo purposes
  const generateMockData = () => {
    const points = [];
    const baseRate = currentRate;
    
    for (let i = 11; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const rate = baseRate * (1 + variation);
      points.push({
        time: `${i}h`,
        rate: Number(rate.toFixed(4))
      });
    }
    
    return points;
  };

  const chartData = data.length > 0 ? data : generateMockData();
  const lineColor = trend === 'up' ? '#10b981' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mt-4 pt-4 border-t border-gray-100"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500" />
          )}
          <span className="text-sm font-medium text-gray-600">12H Trend</span>
        </div>
        <span className="text-xs text-gray-400">Live Chart</span>
      </div>
      
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '12px'
              }}
              formatter={(value: number) => [value.toFixed(4), currency]}
              labelFormatter={(label) => `${label} ago`}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ 
                r: 3, 
                fill: lineColor,
                strokeWidth: 0 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-2"
      >
        <div className="flex space-x-1">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`w-1 h-1 rounded-full ${lineColor === '#10b981' ? 'bg-green-500' : 'bg-red-500'}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}