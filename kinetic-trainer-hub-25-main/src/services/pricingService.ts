import { PricingData, PricingConfig, ValidationResult, DEFAULT_PRICING } from '@/types/pricing';

const STORAGE_KEY = 'kineticTrainerPricing';

export class PricingService {
  private static instance: PricingService;
  private pricingData: Map<string, PricingData> = new Map();

  private constructor() {
    this.loadFromStorage();
    this.seedDefaultData();
  }

  public static getInstance(): PricingService {
    if (!PricingService.instance) {
      PricingService.instance = new PricingService();
    }
    return PricingService.instance;
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        if (data.services) {
          Object.values(data.services).forEach((service: any) => {
            this.pricingData.set(service.id, service as PricingData);
          });
        }
      }
    } catch (error) {
      console.warn('Failed to load pricing data from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const data = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        services: Object.fromEntries(this.pricingData)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save pricing data to storage:', error);
    }
  }

  private seedDefaultData(): void {
    const serviceIds = [
      'strength-training',
      'cardio-conditioning', 
      'functional-fitness',
      'goal-specific-training',
      'group-sessions',
      'flexible-scheduling'
    ];

    const serviceTitles = [
      'Strength Training',
      'Cardio Conditioning',
      'Functional Fitness', 
      'Goal-Specific Training',
      'Group Sessions',
      'Flexible Scheduling'
    ];

    serviceIds.forEach((id, index) => {
      if (!this.pricingData.has(id)) {
        const defaultPricing: PricingData = {
          id,
          serviceTitle: serviceTitles[index],
          pricing: DEFAULT_PRICING[id],
          isVisible: true,
          lastUpdated: new Date().toISOString()
        };
        this.pricingData.set(id, defaultPricing);
      }
    });

    this.saveToStorage();
  }

  public getAllPricing(): PricingData[] {
    return Array.from(this.pricingData.values());
  }

  public getPricingByService(serviceId: string): PricingData | null {
    return this.pricingData.get(serviceId) || null;
  }

  public updatePricing(serviceId: string, pricing: PricingData): void {
    const validation = this.validatePricing(pricing);
    if (!validation.isValid) {
      throw new Error(`Invalid pricing data: ${validation.errors.join(', ')}`);
    }

    pricing.lastUpdated = new Date().toISOString();
    this.pricingData.set(serviceId, pricing);
    this.saveToStorage();
  }

  public validatePricing(pricing: PricingData): ValidationResult {
    const errors: string[] = [];

    if (!pricing.id || !pricing.serviceTitle) {
      errors.push('Service ID and title are required');
    }

    if (!pricing.pricing.currency) {
      errors.push('Currency is required');
    }

    switch (pricing.pricing.type) {
      case 'single':
        if (!pricing.pricing.value || pricing.pricing.value <= 0) {
          errors.push('Single pricing must have a positive value');
        }
        break;
      case 'range':
        if (!pricing.pricing.minValue || !pricing.pricing.maxValue || 
            pricing.pricing.minValue <= 0 || pricing.pricing.maxValue <= 0 ||
            pricing.pricing.minValue >= pricing.pricing.maxValue) {
          errors.push('Range pricing must have valid min and max values');
        }
        break;
      case 'tiered':
        if (!pricing.pricing.tiers || pricing.pricing.tiers.length === 0) {
          errors.push('Tiered pricing must have at least one tier');
        } else {
          pricing.pricing.tiers.forEach((tier, index) => {
            if (!tier.name || tier.price <= 0) {
              errors.push(`Tier ${index + 1} must have a name and positive price`);
            }
          });
        }
        break;
      case 'contact':
        // No validation needed for contact pricing
        break;
      default:
        errors.push('Invalid pricing type');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public formatPrice(pricing: PricingConfig): string {
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: pricing.currency
      }).format(amount);
    };

    switch (pricing.type) {
      case 'single':
        return pricing.value ? formatCurrency(pricing.value) : 'Contact for pricing';
      case 'range':
        return pricing.minValue && pricing.maxValue 
          ? `${formatCurrency(pricing.minValue)} - ${formatCurrency(pricing.maxValue)}`
          : 'Contact for pricing';
      case 'tiered':
        return pricing.tiers && pricing.tiers.length > 0
          ? `Starting at ${formatCurrency(pricing.tiers[0].price)}`
          : 'Contact for pricing';
      case 'contact':
      default:
        return 'Contact for pricing';
    }
  }

  public exportPricingData(): string {
    return JSON.stringify({
      version: '1.0',
      exportDate: new Date().toISOString(),
      services: Object.fromEntries(this.pricingData)
    }, null, 2);
  }

  public importPricingData(data: string): void {
    try {
      const parsed = JSON.parse(data);
      if (parsed.services) {
        Object.values(parsed.services).forEach((service: any) => {
          const validation = this.validatePricing(service as PricingData);
          if (validation.isValid) {
            this.pricingData.set(service.id, service as PricingData);
          }
        });
        this.saveToStorage();
      }
    } catch (error) {
      throw new Error('Invalid pricing data format');
    }
  }
}