
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PricingConfig, PricingTier } from '@/types/pricing';
import { Plus, Trash2 } from 'lucide-react';

interface PricingConfigurationProps {
  pricing: PricingConfig;
  onChange: (pricing: PricingConfig) => void;
}

const PricingConfiguration = ({ pricing, onChange }: PricingConfigurationProps) => {
  const handleTypeChange = (type: string) => {
    const newPricing: PricingConfig = {
      type: type as 'single' | 'range' | 'tiered' | 'contact',
      currency: pricing.currency || 'USD',
      period: pricing.period,
    };

    if (type === 'single') {
      newPricing.value = 0;
    } else if (type === 'range') {
      newPricing.minValue = 0;
      newPricing.maxValue = 0;
    } else if (type === 'tiered') {
      newPricing.tiers = [{ name: '', price: 0, description: '' }];
    }

    onChange(newPricing);
  };

  const handleSinglePriceChange = (value: string) => {
    onChange({
      ...pricing,
      value: parseFloat(value) || 0,
    });
  };

  const handleRangePriceChange = (field: 'minValue' | 'maxValue', value: string) => {
    onChange({
      ...pricing,
      [field]: parseFloat(value) || 0,
    });
  };

  const handleTierChange = (index: number, field: keyof PricingTier, value: string | number) => {
    const newTiers = [...(pricing.tiers || [])];
    newTiers[index] = {
      ...newTiers[index],
      [field]: field === 'price' ? (parseFloat(value as string) || 0) : value,
    };
    onChange({
      ...pricing,
      tiers: newTiers,
    });
  };

  const addTier = () => {
    const newTiers = [...(pricing.tiers || []), { name: '', price: 0, description: '' }];
    onChange({
      ...pricing,
      tiers: newTiers,
    });
  };

  const removeTier = (index: number) => {
    const newTiers = pricing.tiers?.filter((_, i) => i !== index) || [];
    onChange({
      ...pricing,
      tiers: newTiers,
    });
  };

  const handleCurrencyChange = (currency: string) => {
    onChange({
      ...pricing,
      currency,
    });
  };

  const handlePeriodChange = (period: string) => {
    onChange({
      ...pricing,
      period,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pricing Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Pricing Type</Label>
            <Select value={pricing.type} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Price</SelectItem>
                <SelectItem value="range">Price Range</SelectItem>
                <SelectItem value="tiered">Tiered Pricing</SelectItem>
                <SelectItem value="contact">Contact for Quote</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Currency</Label>
            <Select value={pricing.currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {pricing.type !== 'contact' && (
          <div className="space-y-2">
            <Label>Period</Label>
            <Input
              value={pricing.period || ''}
              onChange={(e) => handlePeriodChange(e.target.value)}
              placeholder="e.g., session, monthly, package"
            />
          </div>
        )}

        {pricing.type === 'single' && (
          <div className="space-y-2">
            <Label>Price</Label>
            <Input
              type="number"
              value={pricing.value || ''}
              onChange={(e) => handleSinglePriceChange(e.target.value)}
              placeholder="Enter price"
            />
          </div>
        )}

        {pricing.type === 'range' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Minimum Price</Label>
              <Input
                type="number"
                value={pricing.minValue || ''}
                onChange={(e) => handleRangePriceChange('minValue', e.target.value)}
                placeholder="Min price"
              />
            </div>
            <div className="space-y-2">
              <Label>Maximum Price</Label>
              <Input
                type="number"
                value={pricing.maxValue || ''}
                onChange={(e) => handleRangePriceChange('maxValue', e.target.value)}
                placeholder="Max price"
              />
            </div>
          </div>
        )}

        {pricing.type === 'tiered' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Price Tiers</Label>
              <Button type="button" variant="outline" size="sm" onClick={addTier}>
                <Plus className="w-4 h-4 mr-2" />
                Add Tier
              </Button>
            </div>
            {pricing.tiers?.map((tier, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Tier {index + 1}</Label>
                  {pricing.tiers!.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTier(index)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={tier.name}
                      onChange={(e) => handleTierChange(index, 'name', e.target.value)}
                      placeholder="Tier name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={tier.price}
                      onChange={(e) => handleTierChange(index, 'price', e.target.value)}
                      placeholder="Price"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description (Optional)</Label>
                  <Input
                    value={tier.description || ''}
                    onChange={(e) => handleTierChange(index, 'description', e.target.value)}
                    placeholder="Tier description"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PricingConfiguration;
