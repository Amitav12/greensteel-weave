# Design Document

## Overview

The hero image carousel feature will enhance the existing HeroSimple component by adding a background image carousel that automatically cycles through three industrial images. The design maintains the current visual hierarchy while adding dynamic visual interest through smooth image transitions. The carousel will be positioned as a background layer, ensuring all existing content remains fully functional and visible.

## Architecture

### Component Structure
```
HeroSimple (Enhanced)
├── ImageCarousel (New Component)
│   ├── CarouselContainer
│   ├── ImageSlide (x3)
│   └── CarouselControls (Optional)
├── Existing Background Layers
├── Existing Content Layers
└── Existing Interactive Elements
```

### State Management
- Use React hooks (useState, useEffect, useRef) for carousel state
- Implement automatic progression timer with cleanup
- Track current image index and transition states
- Handle pause/resume functionality for accessibility

### Integration Approach
- Minimal modification to existing HeroSimple component
- Carousel positioned as absolute background layer
- Preserve all existing styling and animations
- Maintain current responsive behavior

## Components and Interfaces

### ImageCarousel Component

**Props Interface:**
```typescript
interface ImageCarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
  transitionDuration?: number;
  pauseOnHover?: boolean;
  respectReducedMotion?: boolean;
  className?: string;
}

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
}
```

**Key Features:**
- Automatic image progression with configurable timing
- Smooth fade transitions between images
- Responsive image sizing and positioning
- Accessibility support with proper ARIA labels
- Performance optimization with image preloading

### Enhanced HeroSimple Component

**Integration Points:**
1. **Background Layer**: Insert carousel between existing background and overlay layers
2. **Z-Index Management**: Ensure proper layering (carousel < overlays < content)
3. **Opacity Control**: Maintain readability with appropriate image opacity
4. **Responsive Behavior**: Adapt carousel to existing breakpoints

## Data Models

### Image Configuration
```typescript
const carouselImages: CarouselImage[] = [
  {
    src: "/images/steel-worker-industrial.jpg",
    alt: "Steel worker in industrial setting with molten metal and sparks",
    title: "Steel Manufacturing Excellence"
  },
  {
    src: "/images/shipping-containers-port.jpg", 
    alt: "Colorful shipping containers at port facility",
    title: "Global Trade Operations"
  },
  {
    src: "/images/cargo-ship-containers.jpg",
    alt: "Large cargo ship loaded with containers on ocean",
    title: "International Shipping Solutions"
  }
];
```

### Carousel State
```typescript
interface CarouselState {
  currentIndex: number;
  isPlaying: boolean;
  isTransitioning: boolean;
  imagesLoaded: boolean[];
}
```

## Error Handling

### Image Loading Failures
- Implement fallback to existing hero background image
- Graceful degradation if carousel images fail to load
- Loading state management with skeleton/placeholder display
- Error boundary to prevent component crashes

### Performance Considerations
- Lazy loading for non-visible images
- Image optimization and compression
- Memory cleanup on component unmount
- Throttled resize event handling

### Accessibility Fallbacks
- Respect `prefers-reduced-motion` media query
- Provide pause/play controls for users who need them
- Ensure keyboard navigation doesn't interfere with carousel
- Screen reader announcements for image changes

## Testing Strategy

### Unit Tests
- Carousel state management and transitions
- Image loading and error handling
- Accessibility features and ARIA attributes
- Responsive behavior across breakpoints

### Integration Tests
- Carousel integration with existing HeroSimple component
- Preservation of existing functionality
- Performance impact measurement
- Cross-browser compatibility

### Visual Regression Tests
- Screenshot comparison across different states
- Mobile and desktop layout verification
- Animation smoothness validation
- Text readability with different background images

### Accessibility Tests
- Screen reader compatibility
- Keyboard navigation support
- Reduced motion preference handling
- Color contrast validation

## Implementation Details

### CSS Approach
- Use CSS-in-JS with existing styled-components/Tailwind approach
- Implement smooth transitions with CSS transforms
- Ensure GPU acceleration for smooth animations
- Maintain existing responsive utilities

### Animation Strategy
- Fade transitions using opacity changes
- Optional slide transitions for future enhancement
- Respect user motion preferences
- Smooth timing functions for natural feel

### Performance Optimizations
- Image preloading strategy
- Intersection Observer for visibility detection
- RequestAnimationFrame for smooth animations
- Debounced resize handling

### Browser Support
- Modern browsers with CSS Grid and Flexbox support
- Graceful degradation for older browsers
- Progressive enhancement approach
- Polyfills only if necessary

## Security Considerations

### Image Sources
- Validate image URLs and sources
- Implement Content Security Policy compliance
- Handle external image loading securely
- Prevent XSS through image manipulation

### Performance Security
- Limit image file sizes and dimensions
- Implement rate limiting for image requests
- Monitor memory usage and cleanup
- Prevent infinite loops or memory leaks