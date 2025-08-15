export interface PricingTier {
  name: string;
  price: number;
  description?: string;
}

export interface PricingConfig {
  type: 'single' | 'range' | 'tiered' | 'contact';
  value?: number;
  minValue?: number;
  maxValue?: number;
  tiers?: PricingTier[];
  currency: string;
  period?: string; // 'session', 'monthly', 'package', etc.
}

export interface PricingData {
  id: string;
  serviceTitle: string;
  pricing: PricingConfig;
  isVisible: boolean;
  lastUpdated: string;
  updatedBy?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Default pricing configuration
export const DEFAULT_PRICING: Record<string, PricingConfig> = {
  'strength-training': {
    type: 'tiered',
    tiers: [
      { name: 'Single Session', price: 75, description: 'One-time training session' },
      { name: 'Monthly Package', price: 280, description: '4 sessions per month' }
    ],
    currency: 'INR',
    period: 'session'
  },
  'cardio-conditioning': {
    type: 'tiered',
    tiers: [
      { name: 'Single Session', price: 65, description: 'One-time cardio session' },
      { name: 'Monthly Package', price: 240, description: '4 sessions per month' }
    ],
    currency: 'INR',
    period: 'session'
  },
  'functional-fitness': {
    type: 'tiered',
    tiers: [
      { name: 'Single Session', price: 70, description: 'One-time functional training' },
      { name: 'Monthly Package', price: 260, description: '4 sessions per month' }
    ],
    currency: 'INR',
    period: 'session'
  },
  'goal-specific-training': {
    type: 'single',
    value: 85,
    currency: 'INR',
    period: 'session'
  },
  'group-sessions': {
    type: 'single',
    value: 35,
    currency: 'INR',
    period: 'session'
  },
  'flexible-scheduling': {
    type: 'contact',
    currency: 'INR'
  }
};