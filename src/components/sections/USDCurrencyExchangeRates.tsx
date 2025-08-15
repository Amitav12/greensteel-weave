import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { getUSDExchangeRates, scheduleUSDAutomaticUpdates, USDCurrencyData } from '@/services/openExchangeRatesService';
import ExchangeRateChart from '@/components/ui/ExchangeRateChart';

export default function USDCurrencyExchangeRates() {
  const [rates, setRates] = useState<USDCurrencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const fetchExchangeRates = async () => {
    try {
      setLoading(true);
      setError(null);

      const exchangeRates = await getUSDExchangeRates();
      setRates(exchangeRates);
      
      if (exchangeRates.length > 0) {
        setLastUpdated(exchangeRates[0].lastUpdated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    
    // Set up automatic updates at 9 AM and 5 PM UK time
    const cleanup = scheduleUSDAutomaticUpdates(() => {
      fetchExchangeRates();
    });
    
    return cleanup;
  }, []);

  const formatRate = (rate: number) => {
    if (rate < 1) {
      return rate.toFixed(4);
    } else if (rate < 100) {
      return rate.toFixed(2);
    } else {
      return rate.toFixed(0);
    }
  };

  if (loading && rates.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-blue-600">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Loading USD exchange rates...</span>
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
              <span className="text-lg font-medium">Error loading USD exchange rates</span>
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
          .usd-currency-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          @media (max-width: 768px) {
            .usd-currency-grid {
              grid-template-columns: 1fr;
              gap: 1rem;
            }
          }
          
          .usd-currency-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border-left: 4px solid #3b82f6;
            position: relative;
            overflow: hidden;
          }
          
          .usd-currency-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(59, 130, 246, 0.02) 50%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .usd-currency-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
          }
          
          .usd-currency-card:hover::before {
            opacity: 1;
          }
          
          .usd-currency-flag {
            width: 40px;
            height: 30px;
            object-fit: cover;
            border-radius: 4px;
            margin-right: 0.75rem;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          
          .usd-currency-code {
            font-size: 1.125rem;
            font-weight: 700;
            color: #1f2937;
            margin: 0;
          }
          
          .usd-currency-name {
            font-size: 0.875rem;
            color: #6b7280;
            margin: 0;
          }
          
          .usd-currency-rate {
            font-size: 1.375rem;
            font-weight: 600;
            color: #374151;
            margin: 0.5rem 0 0 0;
          }
          
          
          .usd-last-updated {
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
          
          .stock-background {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0.08;
            background: url("data:image/svg+xml,%3Csvg width='200' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 80 L30 60 L50 40 L70 30 L90 50 L110 20 L130 35 L150 25 L170 45 L190 15' stroke='%2310b981' stroke-width='1.5' fill='none' opacity='0.6'/%3E%3Cpath d='M10 70 L30 85 L50 65 L70 75 L90 55 L110 70 L130 60 L150 80 L170 50 L190 65' stroke='%233b82f6' stroke-width='1.5' fill='none' opacity='0.4'/%3E%3Cpath d='M10 90 L30 75 L50 85 L70 70 L90 80 L110 65 L130 85 L150 75 L170 85 L190 70' stroke='%236366f1' stroke-width='1' fill='none' opacity='0.3'/%3E%3C/svg%3E") repeat-x;
            animation: stockMove 25s linear infinite;
          }
          
          .stock-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url("data:image/svg+xml,%3Csvg width='150' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 60 L25 40 L45 55 L65 25 L85 45 L105 20 L125 40 L145 30' stroke='%2359a96a' stroke-width='1' fill='none' opacity='0.5'/%3E%3C/svg%3E") repeat-x;
            animation: stockMove 18s linear infinite reverse;
          }
          
          @keyframes stockMove {
            0% { background-position-x: 0; }
            100% { background-position-x: 200px; }
          }
        `}
      </style>

      <section className="py-12 bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
        <div className="stock-background"></div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live <span className="text-green-600">USD Exchange</span> Rates
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Real-time exchange rates from US Dollar (USD) for international markets
            </p>
            
            {lastUpdated && (
              <p className="usd-last-updated">
                Last updated: {lastUpdated.toLocaleString('en-GB', { 
                  timeZone: 'Europe/London',
                  hour12: false,
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })} UK Time • Updates at 9 AM & 5 PM UK Time
              </p>
            )}
          </motion.div>

          <motion.div 
            className="usd-currency-grid fade-in-up"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {rates.map((rate, index) => (
              <motion.div
                key={rate.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="usd-currency-card cursor-pointer"
                onClick={() => {
                  const newExpanded = new Set(expandedCards);
                  if (newExpanded.has(rate.code)) {
                    newExpanded.delete(rate.code);
                  } else {
                    newExpanded.add(rate.code);
                  }
                  setExpandedCards(newExpanded);
                }}
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center">
                    <img 
                      src={rate.flagUrl} 
                      alt={`${rate.name} flag`}
                      className="usd-currency-flag"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div>
                      <h3 className="usd-currency-code">{rate.code}</h3>
                      <p className="usd-currency-name">{rate.name}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="usd-currency-rate">
                      {formatRate(rate.rate)}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {expandedCards.has(rate.code) ? 'Hide Chart' : 'View Chart'}
                    </p>
                  </div>
                </div>
                
                {expandedCards.has(rate.code) && (
                  <ExchangeRateChart
                    currency={rate.code}
                    data={[]}
                    currentRate={rate.rate}
                    trend={Math.random() > 0.5 ? 'up' : 'down'}
                  />
                )}
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