import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, Globe, ChevronDown, Factory } from "lucide-react";

interface CountryRate {
  country: string;
  flag: string;
  ironOre: number;
  steelBillet: number;
  steelRebar: number;
  ironOreChange: number;
  steelBilletChange: number;
  steelRebarChange: number;
  currency: string;
}

interface ChartData {
  date: string;
  ironOre: number;
  steelBillet: number;
  steelRebar: number;
}

export default function DailyIronSteelRates() {
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const countries: CountryRate[] = [
    {
      country: 'India',
      flag: '🇮🇳',
      ironOre: 4250,
      steelBillet: 52000,
      steelRebar: 54500,
      ironOreChange: 2.5,
      steelBilletChange: -1.2,
      steelRebarChange: 1.8,
      currency: '₹'
    },
    {
      country: 'China',
      flag: '🇨🇳',
      ironOre: 850,
      steelBillet: 3200,
      steelRebar: 3450,
      ironOreChange: -0.8,
      steelBilletChange: 2.1,
      steelRebarChange: 1.5,
      currency: '¥'
    },
    {
      country: 'USA',
      flag: '🇺🇸',
      ironOre: 95,
      steelBillet: 650,
      steelRebar: 720,
      ironOreChange: 1.2,
      steelBilletChange: -0.5,
      steelRebarChange: 0.8,
      currency: '$'
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      ironOre: 85,
      steelBillet: 580,
      steelRebar: 640,
      ironOreChange: 0.9,
      steelBilletChange: 1.7,
      steelRebarChange: -0.3,
      currency: '€'
    },
    {
      country: 'Japan',
      flag: '🇯🇵',
      ironOre: 12500,
      steelBillet: 85000,
      steelRebar: 92000,
      ironOreChange: -1.5,
      steelBilletChange: 0.8,
      steelRebarChange: 2.2,
      currency: '¥'
    }
  ];

  const currentCountryData = countries.find(c => c.country === selectedCountry) || countries[0];

  // Generate historical chart data
  useEffect(() => {
    const generateChartData = () => {
      const data: ChartData[] = [];
      const baseData = currentCountryData;
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          ironOre: Math.round(baseData.ironOre * (1 + variation)),
          steelBillet: Math.round(baseData.steelBillet * (1 + variation)),
          steelRebar: Math.round(baseData.steelRebar * (1 + variation))
        });
      }
      
      setChartData(data);
    };

    generateChartData();
  }, [selectedCountry, currentCountryData]);

  const maxValue = Math.max(
    ...chartData.flatMap(d => [d.ironOre, d.steelBillet, d.steelRebar])
  );

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4" />;
    if (change < 0) return <TrendingDown className="w-4 h-4" />;
    return <div className="w-4 h-4 bg-current rounded-full opacity-50" />;
  };

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
        <div className="mb-3 sm:mb-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Steel Rates</h3>
          <p className="text-sm text-gray-600">Daily market prices</p>
        </div>
        
        {/* Country Selector - Mobile Responsive */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg text-sm font-semibold hover:from-green-100 hover:to-emerald-100 transition-all duration-300 shadow-sm"
          >
            <Globe className="w-4 h-4 text-green-600" />
            <span className="text-base">{currentCountryData.flag}</span>
            <span className="text-gray-900 hidden sm:inline">{selectedCountry}</span>
            <span className="text-gray-900 sm:hidden">{selectedCountry.slice(0, 3)}</span>
            <ChevronDown className={`w-4 h-4 text-green-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 bg-white border-2 border-green-200 rounded-lg shadow-xl z-50 overflow-hidden min-w-[160px]"
              >
                {countries.map((country, index) => (
                  <motion.button
                    key={country.country}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      setSelectedCountry(country.country);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors duration-200 text-left"
                  >
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-semibold text-gray-900">{country.country}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {[
          { name: 'Iron Ore', value: currentCountryData.ironOre, change: currentCountryData.ironOreChange, unit: '/MT', icon: '⛏️' },
          { name: 'Steel Billet', value: currentCountryData.steelBillet, change: currentCountryData.steelBilletChange, unit: '/MT', icon: '🏗️' },
          { name: 'Steel Rebar', value: currentCountryData.steelRebar, change: currentCountryData.steelRebarChange, unit: '/MT', icon: '🔩' }
        ].map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className={`rounded-lg p-4 transition-all duration-300 border-2 ${
              item.change > 0 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300' 
                : item.change < 0
                ? 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300'
                : 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl sm:text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{item.name}</h4>
                  <div className="text-lg sm:text-xl font-black text-gray-900">
                    {currentCountryData.currency}{item.value.toLocaleString()}
                    <span className="text-xs font-normal text-gray-500 ml-1">{item.unit}</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getChangeColor(item.change)} ${
                item.change > 0 
                  ? 'bg-green-100' 
                  : item.change < 0
                  ? 'bg-red-100'
                  : 'bg-gray-100'
              }`}>
                {getChangeIcon(item.change)}
                <span>
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.abs(item.change) * 15 + 25}%` }}
                transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
                className={`h-1.5 rounded-full ${
                  item.change > 0 
                    ? 'bg-gradient-to-r from-green-400 to-green-600' 
                    : item.change < 0
                    ? 'bg-gradient-to-r from-red-400 to-red-600'
                    : 'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-full inline-block">
          * Prices for {selectedCountry}. Contact for quotes.
        </p>
      </div>
    </div>
  );
}