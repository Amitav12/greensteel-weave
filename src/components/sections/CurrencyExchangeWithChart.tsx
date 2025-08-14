
import CurrencyExchangeRates from "./CurrencyExchangeRates";
import USDCurrencyExchangeRates from "./USDCurrencyExchangeRates";

export default function CurrencyExchangeWithChart() {
  return (
    <div className="space-y-0">
      {/* Original INR-based Currency Exchange Rates */}
      <CurrencyExchangeRates />
      {/* New USD-based Currency Exchange Rates */}
      <USDCurrencyExchangeRates />
    </div>
  );
}
