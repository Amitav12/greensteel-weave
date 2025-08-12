import { useState, useEffect, useRef, useCallback } from 'react';

interface SimpleCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  pauseOnHover?: boolean;
  respectReducedMotion?: boolean;
}

export default function SimpleImageCarousel({ 
  images, 
  interval = 4000, 
  className = '',
  pauseOnHover = true,
  respectReducedMotion = true
}: SimpleCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const [hasReducedMotion, setHasReducedMotion] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    if (respectReducedMotion) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setHasReducedMotion(mediaQuery.matches);
      
      const handleChange = (e: MediaQueryListEvent) => {
        setHasReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [respectReducedMotion]);

  // Preload images
  useEffect(() => {
    const loadPromises = images.map((src, index) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
          resolve();
        };
        img.onerror = () => {
          // Still mark as "loaded" to prevent infinite loading
          setImagesLoaded(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(loadPromises);
  }, [images]);

  const nextSlide = useCallback(() => {
    if (hasReducedMotion) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 1000);
  }, [images.length, hasReducedMotion]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (isPlaying && !hasReducedMotion && images.length > 1) {
      timerRef.current = setInterval(nextSlide, interval);
    }
  }, [isPlaying, hasReducedMotion, images.length, interval, nextSlide]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Main timer effect
  useEffect(() => {
    if (images.length === 0) return;
    
    startTimer();
    return stopTimer;
  }, [images.length, startTimer, stopTimer]);

  // Pause/resume on hover
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPlaying(false);
      stopTimer();
    }
  }, [pauseOnHover, stopTimer]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPlaying(true);
    }
  }, [pauseOnHover]);

  // Resume playing when isPlaying changes
  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      stopTimer();
    }
  }, [isPlaying, startTimer, stopTimer]);

  if (images.length === 0) return null;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Industrial image carousel"
      aria-live="polite"
      aria-atomic="true"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity ${
            hasReducedMotion ? 'duration-0' : 'duration-1000'
          } ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden={index !== currentIndex}
        >
          <img
            src={image}
            alt={`Industrial scene ${index + 1}: ${getImageDescription(index)}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: 0.95,
              filter: 'brightness(1.2) contrast(1.4) saturate(1.5)'
            }}
            loading={index === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              // Fallback to a solid color background if image fails
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          
          {/* Loading placeholder */}
          {!imagesLoaded[index] && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ))}
      
      {/* Progress indicators - hidden for reduced motion users */}
      {!hasReducedMotion && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-400 scale-125' 
                  : 'bg-white/50'
              }`}
              role="button"
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
              onClick={() => {
                setCurrentIndex(index);
                setIsTransitioning(true);
                setTimeout(() => setIsTransitioning(false), 1000);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCurrentIndex(index);
                  setIsTransitioning(true);
                  setTimeout(() => setIsTransitioning(false), 1000);
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Screen reader announcement for current image */}
      <div className="sr-only" aria-live="polite">
        {`Image ${currentIndex + 1} of ${images.length}: ${getImageDescription(currentIndex)}`}
      </div>
    </div>
  );
}

// Helper function to provide meaningful descriptions for screen readers
function getImageDescription(index: number): string {
  const descriptions = [
    "Steel worker in industrial setting with molten metal and sparks",
    "Colorful shipping containers at port facility", 
    "Large cargo ship loaded with containers on ocean"
  ];
  return descriptions[index] || `Industrial scene ${index + 1}`;
}