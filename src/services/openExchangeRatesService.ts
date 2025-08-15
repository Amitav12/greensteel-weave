// Open Exchange Rates API Service
const API_BASE_URL = 'https://openexchangerates.org/api';

// Get API key from environment variable
const API_KEY = import.meta.env.VITE_OPEN_EXCHANGE_RATES_API_KEY;

// Currency codes and countries in the specified order
const CURRENCY_CONFIG = [
  { code: 'CNY', name: 'China', flagCode: 'cn' },
  { code: 'IDR', name: 'Indonesia', flagCode: 'id' },
  { code: 'INR', name: 'India', flagCode: 'in' },
  { code: 'EUR', name: 'Euro Zone', flagCode: 'eu' },
  { code: 'ZAR', name: 'South Africa', flagCode: 'za' },
  { code: 'PLN', name: 'Poland', flagCode: 'pl' },
  { code: 'TRY', name: 'Turkey', flagCode: 'tr' },
  { code: 'RUB', name: 'Russia', flagCode: 'ru' },
  { code: 'BDT', name: 'Bangladesh', flagCode: 'bd' },
  { code: 'JPY', name: 'Japan', flagCode: 'jp' },
  { code: 'GBP', name: 'Great Britain', flagCode: 'gb' },
  { code: 'BRL', name: 'Brazil', flagCode: 'br' },
];

export interface OpenExchangeRateResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: {
    [key: string]: number;
  };
}

export interface USDCurrencyData {
  code: string;
  name: string;
  flagUrl: string;
  rate: number;
  lastUpdated: Date;
}

// Fetch latest USD exchange rates
export const fetchUSDRates = async (): Promise<OpenExchangeRateResponse> => {
  try {
    const symbols = CURRENCY_CONFIG.map(c => c.code).join(',');
    const response = await fetch(
      `${API_BASE_URL}/latest.json?app_id=${API_KEY}&base=USD&symbols=${symbols}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.description || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('Error fetching USD exchange rates:', error);
    throw error;
  }
};

// Transform API response to our currency data format
export const transformUSDRatesData = (apiResponse: OpenExchangeRateResponse): USDCurrencyData[] => {
  const currencies: USDCurrencyData[] = [];

  CURRENCY_CONFIG.forEach(config => {
    const rate = apiResponse.rates[config.code];
    if (rate !== undefined) {
      currencies.push({
        code: config.code,
        name: config.name,
        flagUrl: `https://flagcdn.com/w40/${config.flagCode}.png`,
        rate,
        lastUpdated: new Date(apiResponse.timestamp * 1000),
      });
    }
  });

  return currencies;
};

// Check if it's time to update (9 AM or 5 PM UK time)
export const shouldUpdateUSDRates = (lastUpdate: Date | null): boolean => {
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
const USD_STORAGE_KEYS = {
  RATES: 'usd_exchange_rates',
  LAST_UPDATE: 'usd_last_update',
};

// Save USD rates to local storage
export const saveUSDRatesToStorage = (rates: USDCurrencyData[]): void => {
  try {
    const ratesData = {
      rates,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(USD_STORAGE_KEYS.RATES, JSON.stringify(ratesData));
    localStorage.setItem(USD_STORAGE_KEYS.LAST_UPDATE, new Date().toISOString());
  } catch (error) {
    console.error('Error saving USD rates to storage:', error);
  }
};

// Load USD rates from local storage
export const loadUSDRatesFromStorage = (): { rates: USDCurrencyData[] | null; lastUpdate: Date | null } => {
  try {
    const ratesData = localStorage.getItem(USD_STORAGE_KEYS.RATES);
    const lastUpdateStr = localStorage.getItem(USD_STORAGE_KEYS.LAST_UPDATE);
    
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
    console.error('Error loading USD rates from storage:', error);
    return { rates: null, lastUpdate: null };
  }
};

// Default fallback USD rates
const getDefaultUSDRates = (): USDCurrencyData[] => [
  { code: 'CNY', name: 'China', flagUrl: 'https://flagcdn.com/w40/cn.png', rate: 7.18, lastUpdated: new Date() },
  { code: 'IDR', name: 'Indonesia', flagUrl: 'https://flagcdn.com/w40/id.png', rate: 16249.15, lastUpdated: new Date() },
  { code: 'INR', name: 'India', flagUrl: 'https://flagcdn.com/w40/in.png', rate: 87.52, lastUpdated: new Date() },
  { code: 'EUR', name: 'Euro Zone', flagUrl: 'https://flagcdn.com/w40/eu.png', rate: 0.85, lastUpdated: new Date() },
  { code: 'ZAR', name: 'South Africa', flagUrl: 'https://flagcdn.com/w40/za.png', rate: 17.72, lastUpdated: new Date() },
  { code: 'PLN', name: 'Poland', flagUrl: 'https://flagcdn.com/w40/pl.png', rate: 3.63, lastUpdated: new Date() },
  { code: 'TRY', name: 'Turkey', flagUrl: 'https://flagcdn.com/w40/tr.png', rate: 40.74, lastUpdated: new Date() },
  { code: 'RUB', name: 'Russia', flagUrl: 'https://flagcdn.com/w40/ru.png', rate: 79.80, lastUpdated: new Date() },
  { code: 'BDT', name: 'Bangladesh', flagUrl: 'https://flagcdn.com/w40/bd.png', rate: 121.37, lastUpdated: new Date() },
  { code: 'JPY', name: 'Japan', flagUrl: 'https://flagcdn.com/w40/jp.png', rate: 147.45, lastUpdated: new Date() },
  { code: 'GBP', name: 'Great Britain', flagUrl: 'https://flagcdn.com/w40/gb.png', rate: 0.74, lastUpdated: new Date() },
  { code: 'BRL', name: 'Brazil', flagUrl: 'https://flagcdn.com/w40/br.png', rate: 5.43, lastUpdated: new Date() },
];

// Main function to get USD exchange rates (from API or storage)
export const getUSDExchangeRates = async (): Promise<USDCurrencyData[]> => {
  const { rates: storedRates, lastUpdate } = loadUSDRatesFromStorage();
  
  // If no API key is configured, return default rates
  if (!API_KEY) {
    console.warn('Open Exchange Rates API key not configured, using default rates');
    return getDefaultUSDRates();
  }
  
  // Check if we need to update
  if (!shouldUpdateUSDRates(lastUpdate) && storedRates && storedRates.length > 0) {
    return storedRates;
  }
  
  try {
    // Fetch fresh data from API
    const apiResponse = await fetchUSDRates();
    const newRates = transformUSDRatesData(apiResponse);
    
    // Save to storage
    saveUSDRatesToStorage(newRates);
    
    return newRates;
  } catch (error) {
    console.error('Failed to fetch fresh USD rates, using stored data:', error);
    
    // Fallback to stored rates if API fails
    if (storedRates && storedRates.length > 0) {
      return storedRates;
    }
    
    // If no stored data, return default rates
    console.warn('Using default USD exchange rates as fallback');
    return getDefaultUSDRates();
  }
};

// Schedule automatic updates at 9 AM and 5 PM UK time only
export const scheduleUSDAutomaticUpdates = (callback: () => void) => {
  // Function to get next update time (9 AM or 5 PM UK time)
  const getNextUpdateTime = () => {
    const now = new Date();
    // Convert to UK time (accounting for BST/GMT)
    const ukNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    
    const today9AM = new Date(ukNow);
    today9AM.setHours(9, 0, 0, 0);
    
    const today5PM = new Date(ukNow);
    today5PM.setHours(17, 0, 0, 0);
    
    const tomorrow9AM = new Date(ukNow);
    tomorrow9AM.setDate(tomorrow9AM.getDate() + 1);
    tomorrow9AM.setHours(9, 0, 0, 0);
    
    // Determine next update time
    if (ukNow < today9AM) {
      return today9AM;
    } else if (ukNow < today5PM) {
      return today5PM;
    } else {
      return tomorrow9AM;
    }
  };

  let currentTimeoutId: NodeJS.Timeout | null = null;

  // Function to schedule the next update
  const scheduleNext = () => {
    const nextUpdate = getNextUpdateTime();
    const now = new Date();
    const ukNow = new Date(now.toLocaleString("en-US", { timeZone: "Europe/London" }));
    const delay = Math.max(0, nextUpdate.getTime() - ukNow.getTime());
    
    console.log(`Next USD currency update scheduled for: ${nextUpdate.toLocaleString('en-GB', { timeZone: 'Europe/London' })} (UK time)`);
    
    currentTimeoutId = setTimeout(() => {
      console.log('Executing scheduled USD currency update...');
      callback();
      scheduleNext(); // Schedule the next update after this one completes
    }, delay);
    
    return currentTimeoutId;
  };

  // Start the scheduling
  scheduleNext();
  
  // Return cleanup function
  return () => {
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
      currentTimeoutId = null;
    }
  };
};