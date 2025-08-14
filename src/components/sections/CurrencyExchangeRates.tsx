import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw, AlertCircle } from 'lucide-react';

interface ExchangeRate {
  currency: string;
  rate: number;
  change: number;
  changePercent: number;
  symbol: string;
  flag: string;
}

interface ApiResponse {
  rates: Record<string, number>;
  base: string;
  date: string;
}

export default function CurrencyExchangeRates() {
  const [rates, setRates] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  ];

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      setError(null);

      // Using exchangerate-api.com as a free alternative
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const data: ApiResponse = await response.json();
      
      // Convert rates to our format
      const exchangeRates: ExchangeRate[] = currencies.map(currency => {
        const rate = data.rates[currency.code] || 0;
        // Generate mock change data (normally this would come from API)
        const change = (Math.random() - 0.5) * 0.002; // Random change between -0.001 and 0.001
        const changePercent = change * 100;
        
        return {
          currency: currency.code,
          rate: rate,
          change: change,
          changePercent: changePercent,
          symbol: currency.symbol,
          flag: currency.flag
        };
      });

      setRates(exchangeRates);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    // Refresh every 30 seconds
    const interval = setInterval(fetchExchangeRates, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatRate = (rate: number) => {
    return rate.toFixed(4);
  };

  const formatChange = (change: number) => {
    return change > 0 ? `+${change.toFixed(4)}` : change.toFixed(4);
  };

  const formatChangePercent = (changePercent: number) => {
    return changePercent > 0 ? `+${changePercent.toFixed(2)}%` : `${changePercent.toFixed(2)}%`;
  };

  if (loading && rates.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-blue-600">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Loading exchange rates...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && rates.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-red-50 to-pink-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-red-600 mb-4">
              <AlertCircle className="w-6 h-6" />
              <span className="text-lg font-medium">Error loading exchange rates</span>
            </div>
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={fetchExchangeRates}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <style>
        {`
          .currency-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          
          @media (max-width: 768px) {
            .currency-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
          }
          
          .currency-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border-left: 4px solid #3b82f6;
          }
          
          .currency-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .currency-card.positive {
            border-left-color: #10b981;
          }
          
          .currency-card.negative {
            border-left-color: #ef4444;
          }
          
          .currency-flag {
            font-size: 2rem;
            margin-right: 0.75rem;
          }
          
          .currency-code {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
          }
          
          .currency-rate {
            font-size: 1.5rem;
            font-weight: 600;
            color: #374151;
            margin: 0.5rem 0;
          }
          
          .currency-change {
            font-size: 0.875rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
          
          .currency-change.positive {
            color: #10b981;
          }
          
          .currency-change.negative {
            color: #ef4444;
          }
          
          .refresh-button {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .refresh-button:hover {
            background: #2563eb;
            transform: translateY(-1px);
          }
          
          .refresh-button:disabled {
            background: #9ca3af;
            cursor: not-allowed;
            transform: none;
          }
          
          .last-updated {
            color: #6b7280;
            font-size: 0.875rem;
            text-align: center;
            margin-top: 1rem;
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
        `}
      </style>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live <span className="text-blue-600">Currency Exchange</span> Rates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Real-time exchange rates against Indian Rupee (INR) for international trading
            </p>
            
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={fetchExchangeRates}
                disabled={loading}
                className="refresh-button"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Updating...' : 'Refresh Rates'}
              </button>
            </div>
            
            {lastUpdated && (
              <p className="last-updated">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </p>
            )}
          </motion.div>

          <motion.div 
            className="currency-grid fade-in-up"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {rates.map((rate, index) => (
              <motion.div
                key={rate.currency}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`currency-card ${rate.change >= 0 ? 'positive' : 'negative'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="currency-flag">{rate.flag}</span>
                    <div>
                      <h3 className="currency-code">{rate.currency}</h3>
                      <p className="currency-rate">
                        {rate.symbol}{formatRate(rate.rate)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`currency-change ${rate.change >= 0 ? 'positive' : 'negative'}`}>
                      {rate.change >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{formatChange(rate.change)}</span>
                    </div>
                    <div className={`currency-change ${rate.changePercent >= 0 ? 'positive' : 'negative'}`}>
                      {formatChangePercent(rate.changePercent)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {error && rates.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center space-x-2 text-yellow-600 bg-yellow-50 px-4 py-2 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <span>Some rates may be outdated due to API issues</span>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
