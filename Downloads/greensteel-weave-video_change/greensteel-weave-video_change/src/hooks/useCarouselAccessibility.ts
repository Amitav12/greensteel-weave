import { useEffect, useState, useCallback } from 'react';

interface AccessibilitySettings {
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
  supportsIntersectionObserver: boolean;
}

export function useCarouselAccessibility(respectReducedMotion: boolean = true) {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    prefersReducedMotion: false,
    prefersHighContrast: false,
    supportsIntersectionObserver: typeof IntersectionObserver !== 'undefined'
  });

  const updateAccessibilitySettings = useCallback(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = respectReducedMotion && 
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
       window.matchMedia('(prefers-reduced-motion)').matches);

    const prefersHighContrast = 
      window.matchMedia('(prefers-contrast: high)').matches ||
      window.matchMedia('(prefers-contrast: more)').matches;

    setSettings(prev => ({
      ...prev,
      prefersReducedMotion,
      prefersHighContrast
    }));
  }, [respectReducedMotion]);

  useEffect(() => {
    updateAccessibilitySettings();

    // Listen for changes in accessibility preferences
    const mediaQueries = [
      window.matchMedia('(prefers-reduced-motion: reduce)'),
      window.matchMedia('(prefers-contrast: high)'),
      window.matchMedia('(prefers-contrast: more)')
    ];

    const handleChange = () => updateAccessibilitySettings();

    mediaQueries.forEach(mq => {
      if (mq.addEventListener) {
        mq.addEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mq.addListener(handleChange);
      }
    });

    return () => {
      mediaQueries.forEach(mq => {
        if (mq.removeEventListener) {
          mq.removeEventListener('change', handleChange);
        } else {
          // Fallback for older browsers
          mq.removeListener(handleChange);
        }
      });
    };
  }, [updateAccessibilitySettings]);

  return settings;
}

// Performance monitoring hook
export function useCarouselPerformance() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    memoryUsage: 0,
    renderTime: 0,
    isVisible: true
  });

  const measurePerformance = useCallback((startTime: number) => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    setPerformanceMetrics(prev => ({
      ...prev,
      renderTime
    }));

    // Monitor memory usage if available
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      setPerformanceMetrics(prev => ({
        ...prev,
        memoryUsage: memory.usedJSHeapSize
      }));
    }
  }, []);

  const trackVisibility = useCallback((isVisible: boolean) => {
    setPerformanceMetrics(prev => ({
      ...prev,
      isVisible
    }));
  }, []);

  return {
    performanceMetrics,
    measurePerformance,
    trackVisibility
  };
}