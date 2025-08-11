// Exchange Rate API Service using Exchangerates API
const API_BASE_URL = 'https://api.apilayer.com/exchangerates_data';

// Get API key from Vite environment variables
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY || 'YOUR_API_KEY_HERE';

// Currency codes we want to track
const CURRENCY_SYMBOLS = 'CNY,IDR,INR,EUR,ZAR,PLN,TRY,RUB,BDT,JPY,GBP,BRL';

export interface ExchangeRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number;
  };
}

export interface CurrencyData {
  code: string;
  name: string;
  flag: string;
  rate: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  lastUpdated: Date;
}

// Currency metadata
const CURRENCY_METADATA: { [key: string]: { name: string; flag: string } } = {
  CNY: { name: 'Chinese Yuan', flag: '🇨🇳' },
  IDR: { name: 'Indonesian Rupiah', flag: '🇮🇩' },
  INR: { name: 'Indian Rupee', flag: '🇮🇳' },
  EUR: { name: 'Euro', flag: '🇪🇺' },
  ZAR: { name: 'South African Rand', flag: '🇿🇦' },
  PLN: { name: 'Polish Zloty', flag: '🇵🇱' },
  TRY: { name: 'Turkish Lira', flag: '🇹🇷' },
  RUB: { name: 'Russian Ruble', flag: '🇷🇺' },
  BDT: { name: 'Bangladeshi Taka', flag: '🇧🇩' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵' },
  GBP: { name: 'British Pound', flag: '🇬🇧' },
  BRL: { name: 'Brazilian Real', flag: '🇧🇷' },
};

// Fetch latest exchange rates
export const fetchLatestRates = async (): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/latest?base=USD&symbols=${CURRENCY_SYMBOLS}`,
      {
        method: 'GET',
        headers: {
          'apikey': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error('API request failed');
    }

    return data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
};

// Calculate percentage change between two rates
const calculateChange = (currentRate: number, previousRate: number): number => {
  if (!previousRate) return 0;
  return ((currentRate - previousRate) / previousRate) * 100;
};

// Determine trend based on change percentage
const getTrend = (change: number): 'up' | 'down' | 'neutral' => {
  if (change > 0.1) return 'up';
  if (change < -0.1) return 'down';
  return 'neutral';
};

// Transform API response to our currency data format
export const transformRatesData = (
  apiResponse: ExchangeRateResponse,
  previousRates?: { [key: string]: number }
): CurrencyData[] => {
  const currencies: CurrencyData[] = [];

  Object.entries(apiResponse.rates).forEach(([code, rate]) => {
    const metadata = CURRENCY_METADATA[code];
    if (!metadata) return;

    const previousRate = previousRates?.[code] || rate;
    const change = calculateChange(rate, previousRate);
    const trend = getTrend(change);

    currencies.push({
      code,
      name: metadata.name,
      flag: metadata.flag,
      rate,
      change: Number(change.toFixed(2)),
      trend,
      lastUpdated: new Date(apiResponse.timestamp * 1000),
    });
  });

  return currencies;
};

// Check if it's time to update (9 AM or 5 PM UK time)
export const shouldUpdateRates = (lastUpdate: Date | null): boolean => {
  const now = new Date();
  const ukTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/London"}));
  
  if (!lastUpdate) return true;
  
  const lastUpdateUK = new Date(lastUpdate.toLocaleString("en-US", {timeZone: "Europe/London"}));
  
  // Check if it's a new day
  if (ukTime.getDate() !== lastUpdateUK.getDate()) return true;
  
  const currentHour = ukTime.getHours();
  const lastUpdateHour = lastUpdateUK.getHours();
  
  // Update at 9 AM if we haven't updated since yesterday evening
  if (currentHour >= 9 && lastUpdateHour < 9) return true;
  
  // Update at 5 PM if we haven't updated since this morning
  if (currentHour >= 17 && lastUpdateHour < 17) return true;
  
  return false;
};

// Local storage keys
const STORAGE_KEYS = {
  RATES: 'currency_exchange_rates',
  LAST_UPDATE: 'currency_last_update',
  PREVIOUS_RATES: 'currency_previous_rates',
};

// Save rates to local storage
export const saveRatesToStorage = (rates: CurrencyData[]): void => {
  try {
    const ratesData = {
      rates,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.RATES, JSON.stringify(ratesData));
    localStorage.setItem(STORAGE_KEYS.LAST_UPDATE, new Date().toISOString());
    
    // Save current rates as previous rates for next comparison
    const ratesMap = rates.reduce((acc, rate) => {
      acc[rate.code] = rate.rate;
      return acc;
    }, {} as { [key: string]: number });
    
    localStorage.setItem(STORAGE_KEYS.PREVIOUS_RATES, JSON.stringify(ratesMap));
  } catch (error) {
    console.error('Error saving rates to storage:', error);
  }
};

// Load rates from local storage
export const loadRatesFromStorage = (): { rates: CurrencyData[] | null; lastUpdate: Date | null } => {
  try {
    const ratesData = localStorage.getItem(STORAGE_KEYS.RATES);
    const lastUpdateStr = localStorage.getItem(STORAGE_KEYS.LAST_UPDATE);
    
    if (!ratesData || !lastUpdateStr) {
      return { rates: null, lastUpdate: null };
    }
    
    const parsed = JSON.parse(ratesData);
    const lastUpdate = new Date(lastUpdateStr);
    
    // Ensure lastUpdated in rates are proper Date objects
    const rates = parsed.rates?.map((rate: any) => ({
      ...rate,
      lastUpdated: new Date(rate.lastUpdated)
    })) || null;
    
    return {
      rates,
      lastUpdate,
    };
  } catch (error) {
    console.error('Error loading rates from storage:', error);
    return { rates: null, lastUpdate: null };
  }
};

// Get previous rates for comparison
export const getPreviousRates = (): { [key: string]: number } | null => {
  try {
    const previousRatesStr = localStorage.getItem(STORAGE_KEYS.PREVIOUS_RATES);
    return previousRatesStr ? JSON.parse(previousRatesStr) : null;
  } catch (error) {
    console.error('Error loading previous rates:', error);
    return null;
  }
};

// Default fallback rates
const getDefaultRates = (): CurrencyData[] => [
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rate: 7.18, change: 0.23, trend: 'up', lastUpdated: new Date() },
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 16249.15, change: 0.05, trend: 'up', lastUpdated: new Date() },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rate: 87.52, change: -0.15, trend: 'down', lastUpdated: new Date() },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 0.85, change: 0.12, trend: 'up', lastUpdated: new Date() },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 17.72, change: -0.12, trend: 'down', lastUpdated: new Date() },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱', rate: 3.63, change: 0.08, trend: 'up', lastUpdated: new Date() },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', rate: 40.74, change: -0.25, trend: 'down', lastUpdated: new Date() },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', rate: 79.80, change: 0.15, trend: 'up', lastUpdated: new Date() },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 121.37, change: -0.03, trend: 'neutral', lastUpdated: new Date() },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: 147.45, change: 0.45, trend: 'up', lastUpdated: new Date() },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 0.74, change: -0.08, trend: 'down', lastUpdated: new Date() },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 5.43, change: 0.18, trend: 'up', lastUpdated: new Date() },
];

// Main function to get exchange rates (from API or storage)
export const getExchangeRates = async (): Promise<CurrencyData[]> => {
  const { rates: storedRates, lastUpdate } = loadRatesFromStorage();
  
  // Check if we need to update
  if (!shouldUpdateRates(lastUpdate) && storedRates && storedRates.length > 0) {
    return storedRates;
  }
  
  try {
    // Fetch fresh data from API
    const apiResponse = await fetchLatestRates();
    const previousRates = getPreviousRates();
    const newRates = transformRatesData(apiResponse, previousRates);
    
    // Save to storage
    saveRatesToStorage(newRates);
    
    return newRates;
  } catch (error) {
    console.error('Failed to fetch fresh rates, using stored data:', error);
    
    // Fallback to stored rates if API fails
    if (storedRates && storedRates.length > 0) {
      return storedRates;
    }
    
    // If no stored data, return default rates
    console.warn('Using default exchange rates as fallback');
    return getDefaultRates();
  }
};

// Schedule automatic updates at 9 AM and 5 PM UK time
export const scheduleAutomaticUpdates = (callback: () => void): (() => void) => {
  const checkAndUpdate = () => {
    const { lastUpdate } = loadRatesFromStorage();
    if (shouldUpdateRates(lastUpdate)) {
      callback();
    }
  };

  // Check every hour
  const interval = setInterval(checkAndUpdate, 60 * 60 * 1000);
  
  // Initial check
  checkAndUpdate();
  
  // Return cleanup function
  return () => clearInterval(interval);
};