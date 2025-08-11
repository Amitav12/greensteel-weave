# Design Document

## Overview

The currency expansion feature enhances the existing CurrencyExchangeRates component by adding 12 new currencies while maintaining the current design language and user experience. The design preserves all existing functionality including real-time updates, animations, and responsive behavior while scaling to accommodate the larger dataset.

## Architecture

### Component Structure
The existing `CurrencyExchangeRates` component will be modified to include the new currency data while maintaining its current architecture:

- **State Management**: Continue using React useState for rates, updating status, and last updated timestamp
- **Real-time Updates**: Preserve the existing 30-second interval update mechanism
- **Animation System**: Maintain Framer Motion animations for card interactions and data updates
- **Responsive Design**: Extend the current grid system to handle the increased number of currency cards

### Data Flow
1. Component initializes with expanded currency dataset (18 total currencies)
2. useEffect hook continues to simulate real-time updates every 30 seconds
3. Each currency maintains its individual rate, change percentage, and trend data
4. Animation states trigger on data updates and user interactions

## Components and Interfaces

### Enhanced CurrencyRate Interface
The existing interface remains unchanged but will accommodate new currency-specific formatting:

```typescript
interface CurrencyRate {
  code: string;        // Currency code (CNY, IDR, etc.)
  name: string;        // Full currency name
  flag: string;        // Flag emoji
  rate: number;        // Exchange rate vs USD
  change: number;      // Percentage change
  trend: 'up' | 'down' | 'neutral';  // Trend direction
}
```

### Currency Symbol Mapping
A new utility function will handle currency symbol display:

```typescript
const getCurrencySymbol = (code: string): string => {
  const symbols = {
    'CNY': '¥', 'IDR': 'Rp', 'INR': '₹', 'EUR': '€',
    'ZAR': 'R', 'PLN': 'zł', 'TRY': '₺', 'RUB': '₽',
    'BDT': '৳', 'JPY': '¥', 'GBP': '£', 'BRL': 'R$'
  };
  return symbols[code] || '';
};
```

### Number Formatting Strategy
Different currencies require different formatting approaches:

- **Large Numbers (IDR)**: Use comma separators (16,249.15)
- **Standard Decimals**: 2-4 decimal places based on currency
- **Symbol Placement**: Prefix symbols for most currencies, handle exceptions

## Data Models

### Expanded Currency Dataset
The initial rates array will include all 18 currencies:

```typescript
const initialRates: CurrencyRate[] = [
  // Existing currencies (EUR, GBP, JPY, INR, CNY, AUD)
  { code: 'EUR', name: 'Euro', flag: '🇪🇺', rate: 0.85, change: 0.12, trend: 'up' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧', rate: 0.74, change: -0.08, trend: 'down' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵', rate: 147.45, change: 0.45, trend: 'up' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳', rate: 87.52, change: -0.15, trend: 'down' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳', rate: 7.18, change: 0.23, trend: 'up' },
  
  // New currencies
  { code: 'IDR', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 16249.15, change: 0.05, trend: 'up' },
  { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦', rate: 17.72, change: -0.12, trend: 'down' },
  { code: 'PLN', name: 'Polish Zloty', flag: '🇵🇱', rate: 3.63, change: 0.08, trend: 'up' },
  { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷', rate: 40.74, change: -0.25, trend: 'down' },
  { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺', rate: 79.80, change: 0.15, trend: 'up' },
  { code: 'BDT', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 121.37, change: -0.03, trend: 'neutral' },
  { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷', rate: 5.43, change: 0.18, trend: 'up' }
];
```

### Variation Ranges for Updates
Different currencies will have appropriate variation ranges for realistic updates:

```typescript
const getVariationRange = (code: string): number => {
  const ranges = {
    'IDR': 100,    // Large numbers need larger variations
    'JPY': 2,      // Yen typically has moderate variations
    'RUB': 3,      // Ruble can be volatile
    'TRY': 2,      // Lira can be volatile
    'BDT': 1,      // Taka has smaller variations
    'INR': 1,      // Rupee has moderate variations
    'CNY': 0.1,    // Yuan is more stable
    'ZAR': 0.5,    // Rand has moderate variations
    'PLN': 0.1,    // Zloty is relatively stable
    'BRL': 0.2,    // Real has moderate variations
    'EUR': 0.02,   // Euro is stable
    'GBP': 0.02    // Pound is stable
  };
  return ranges[code] || 0.02;
};
```

## Error Handling

### Data Validation
- Validate currency codes against supported list
- Ensure rate values are positive numbers
- Handle missing or invalid flag emojis gracefully
- Validate change percentages are within reasonable bounds

### Fallback Mechanisms
- Default currency symbol if mapping fails
- Fallback flag emoji (🏳️) for missing flags
- Default formatting for unrecognized currencies
- Graceful degradation if animation libraries fail

### Performance Considerations
- Optimize re-renders with React.memo if needed
- Debounce rapid state updates during simulated data changes
- Lazy load flag emojis if performance issues arise

## Testing Strategy

### Unit Tests
1. **Currency Data Validation**
   - Test initial currency data structure
   - Validate all required fields are present
   - Test currency symbol mapping function

2. **Formatting Functions**
   - Test number formatting for different currency types
   - Validate comma separator insertion for large numbers
   - Test decimal precision handling

3. **Update Simulation**
   - Test variation range calculations
   - Validate trend determination logic
   - Test rate update boundaries

### Integration Tests
1. **Component Rendering**
   - Test rendering with expanded currency set
   - Validate grid layout with 18 currencies
   - Test responsive behavior across breakpoints

2. **Animation Integration**
   - Test Framer Motion animations with new data
   - Validate stagger effects with larger dataset
   - Test hover interactions on all currency cards

3. **Real-time Updates**
   - Test 30-second update cycle
   - Validate state updates don't break animations
   - Test loading states during updates

### Visual Regression Tests
1. **Layout Consistency**
   - Compare card dimensions across all currencies
   - Validate spacing and alignment
   - Test responsive grid behavior

2. **Design System Compliance**
   - Verify gradient backgrounds match existing design
   - Test rounded corner consistency
   - Validate typography and color usage

### Accessibility Tests
1. **Screen Reader Support**
   - Test currency information is properly announced
   - Validate flag emoji alternatives
   - Test keyboard navigation through currency cards

2. **Color Contrast**
   - Verify trend indicators meet contrast requirements
   - Test readability of currency symbols
   - Validate hover state accessibility

## Implementation Considerations

### Performance Optimization
- Consider virtualization if currency list grows significantly
- Optimize animation performance with will-change CSS properties
- Use React.memo for currency cards if re-render issues arise

### Internationalization
- Prepare for potential localization of currency names
- Consider right-to-left language support for future expansion
- Plan for different number formatting conventions

### Scalability
- Design data structure to easily accommodate future currencies
- Create reusable formatting utilities
- Plan for potential API integration for real exchange rates

### Browser Compatibility
- Ensure flag emoji support across browsers
- Test CSS grid behavior on older browsers
- Validate Framer Motion animations work consistently