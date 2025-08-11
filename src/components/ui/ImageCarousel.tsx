import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// TypeScript interfaces for the carousel
export interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}

export interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
  transitionDuration?: number;
  pauseOnHover?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  isTransitioning: boolean;
  imagesLoaded: boolean[];
}

export default function ImageCarousel({
  images,
  autoPlayInterval = 6000, // 6 seconds default
  transitionDuration = 1000, // 1 second transition
  pauseOnHover = true,
  respectReducedMotion = true,
  className = ""
}: ImageCarouselProps) {
  // Carousel state management
  const [state, setState] = useState<CarouselState>({
    currentIndex: 0,
    isPlaying: true,
    isTransitioning: false,
    imagesLoaded: new Array(images.length).fill(false)
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference with enhanced detection
  const prefersReducedMotion = respectReducedMotion && 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Performance optimization: Intersection Observer for visibility
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Detect mobile devices for optimized experience
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Image preloading effect with enhanced error handling
  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = images.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setState(prev => ({
              ...prev,
              imagesLoaded: prev.imagesLoaded.map((loaded, i) => 
                i === index ? true : loaded
              )
            }));
            resolve();
          };
          img.onerror = () => {
            console.warn(`Failed to load carousel image: ${image.src}`);
            setState(prev => ({
              ...prev,
              imagesLoaded: prev.imagesLoaded.map((loaded, i) => 
                i === index ? true : loaded // Mark as loaded for graceful degradation
              )
            }));
            resolve(); // Don't reject to prevent blocking other images
          };
          img.src = image.src;
        });
      });

      try {
        await Promise.all(loadPromises);
      } catch (error) {
        console.error('Error preloading carousel images:', error);
      }
    };

    if (images.length > 0) {
      preloadImages();
    }
  }, [images]);

  // Enhanced auto-play functionality with visibility and performance optimization
  useEffect(() => {
    if (!state.isPlaying || prefersReducedMotion || images.length <= 1 || !isVisible) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Clear any existing interval before setting a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setState(prev => {
        const nextIndex = (prev.currentIndex + 1) % images.length;
        console.log(`Carousel transitioning from image ${prev.currentIndex} to ${nextIndex}`);
        return {
          ...prev,
          currentIndex: nextIndex,
          isTransitioning: true
        };
      });
    }, autoPlayInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [state.isPlaying, autoPlayInterval, images.length, prefersReducedMotion, isVisible]);

  // Handle transition completion
  useEffect(() => {
    if (state.isTransitioning) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, isTransitioning: false }));
      }, transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [state.isTransitioning, transitionDuration]);

  // Enhanced pause/resume functionality
  const pauseCarousel = () => {
    setState(prev => ({ ...prev, isPlaying: false }));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resumeCarousel = () => {
    setState(prev => ({ ...prev, isPlaying: true }));
  };

  // Manual navigation functions for future extensibility
  const goToSlide = (index: number) => {
    if (index >= 0 && index < images.length && index !== state.currentIndex) {
      setState(prev => ({
        ...prev,
        currentIndex: index,
        isTransitioning: true
      }));
    }
  };

  const goToNext = () => {
    const nextIndex = (state.currentIndex + 1) % images.length;
    goToSlide(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = state.currentIndex === 0 ? images.length - 1 : state.currentIndex - 1;
    goToSlide(prevIndex);
  };

  // Keyboard navigation support
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        goToNext();
        break;
      case ' ': // Spacebar
      case 'Enter':
        event.preventDefault();
        if (state.isPlaying) {
          pauseCarousel();
        } else {
          resumeCarousel();
        }
        break;
      case 'Home':
        event.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        goToSlide(images.length - 1);
        break;
    }
  };

  // Pause/resume on hover with enhanced logic
  const handleMouseEnter = () => {
    if (pauseOnHover && state.isPlaying) {
      pauseCarousel();
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover && !state.isPlaying) {
      resumeCarousel();
    }
  };

  // Comprehensive cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('ImageCarousel: Loaded with', images.length, 'images:', images.map(img => img.title));
    console.log('Current image index:', state.currentIndex);
  }, [images, state.currentIndex]);

  // Error boundary fallback
  if (images.length === 0) {
    console.warn('ImageCarousel: No images provided');
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Industrial operations image carousel"
      aria-live="polite"
      aria-roledescription="carousel"
      tabIndex={0}
      style={{
        // Ensure proper layering and performance
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: '1000px'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentIndex}
          initial={{ 
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 1.1, // More noticeable zoom effect
            x: prefersReducedMotion ? 0 : 50 // Subtle slide effect
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            x: 0
          }}
          exit={{ 
            opacity: 0,
            scale: prefersReducedMotion ? 1 : 0.9,
            x: prefersReducedMotion ? 0 : -50
          }}
          transition={{
            duration: prefersReducedMotion ? 0.3 : transitionDuration / 1000,
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <img
            src={images[state.currentIndex].src}
            alt={images[state.currentIndex].alt}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
              isMobile ? 'object-center' : 'object-center'
            }`}
            loading="eager"
            style={{
              opacity: isMobile ? 0.8 : 0.9, // Very high opacity to show through overlays
              filter: isMobile 
                ? 'brightness(1.1) contrast(1.3) saturate(1.4)' // Enhanced visibility on mobile
                : 'brightness(1.2) contrast(1.4) saturate(1.5)', // Maximum visual appeal on desktop
              transform: 'translateZ(0)', // Force GPU acceleration
            }}
            onError={(e) => {
              console.error(`Failed to display carousel image: ${images[state.currentIndex].src}`);
              // Fallback: hide the broken image gracefully
              const target = e.currentTarget as HTMLImageElement;
              target.style.opacity = '0';
              target.style.pointerEvents = 'none';
            }}
            onLoad={(e) => {
              // Ensure smooth appearance when image loads
              const target = e.currentTarget as HTMLImageElement;
              target.style.transition = 'opacity 0.3s ease-in-out';
            }}
          />
          
          {/* Lighter gradient overlay for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-emerald-900/10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {images[state.currentIndex].title || images[state.currentIndex].alt}
      </div>

      {/* Enhanced loading indicator */}
      {!state.imagesLoaded[state.currentIndex] && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
            <div className="text-green-300/70 text-sm font-medium">Loading...</div>
          </div>
        </motion.div>
      )}

      {/* Progress indicators - visible to show carousel is working */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-90 hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-500 border-2 ${
              index === state.currentIndex 
                ? 'bg-green-400 border-green-300 scale-150 shadow-xl shadow-green-400/70' 
                : 'bg-white/40 border-white/60 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}