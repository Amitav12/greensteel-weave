import { motion } from 'framer-motion';
import { PricingConfig } from '@/types/pricing';
import { PricingService } from '@/services/pricingService';
import { DollarSign, Info, IndianRupee } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface PricingTagProps {
  pricing: PricingConfig;
  isVisible: boolean;
  className?: string;
  gradient?: string;
}

const PricingTag = ({ pricing, isVisible, className = '', gradient = 'from-primary to-secondary' }: PricingTagProps) => {
  const pricingService = PricingService.getInstance();
  
  // Debug log to check pricing currency
  console.log('PricingTag - Currency:', pricing.currency, 'Type:', pricing.type, 'Pricing:', pricing);

  if (!isVisible) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/30 ${className}`}
      >
        <Info className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Contact for pricing</span>
      </motion.div>
    );
  }

  const formatPrice = () => {
    return pricingService.formatPrice(pricing);
  };

  const getPeriodText = () => {
    if (!pricing.period) return '';
    return ` / ${pricing.period}`;
  };

  const getCurrencyIcon = () => {
    return pricing.currency === 'INR' ? IndianRupee : DollarSign;
  };

  const renderPricingContent = () => {
    const CurrencyIcon = getCurrencyIcon();
    
    switch (pricing.type) {
      case 'single':
        return (
          <div className="flex items-center gap-2">
            <CurrencyIcon className="w-4 h-4" />
            <span className="font-bold text-lg">{formatPrice()}</span>
            <span className="text-sm opacity-80">{getPeriodText()}</span>
          </div>
        );

      case 'range':
        return (
          <div className="flex items-center gap-2">
            <CurrencyIcon className="w-4 h-4" />
            <span className="font-bold text-lg">{formatPrice()}</span>
            <span className="text-sm opacity-80">{getPeriodText()}</span>
          </div>
        );

      case 'tiered':
        return (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CurrencyIcon className="w-4 h-4" />
              <span className="font-bold text-lg">{formatPrice()}</span>
            </div>
            {pricing.tiers && pricing.tiers.length > 1 && (
              <div className="text-xs opacity-70">
                {pricing.tiers.length} pricing options available
              </div>
            )}
          </div>
        );

      case 'contact':
      default:
        return (
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span className="font-medium">Contact for pricing</span>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card className={`bg-gradient-to-r ${gradient} text-white border-0 shadow-lg`}>
        <div className="px-4 py-3">
          {renderPricingContent()}
        </div>
      </Card>
    </motion.div>
  );
};

export default PricingTag;