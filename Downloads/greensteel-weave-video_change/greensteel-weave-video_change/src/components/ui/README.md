# ImageCarousel Component

A responsive, accessible image carousel component designed for the hero section background.

## Features

- ✅ Automatic image progression with configurable timing
- ✅ Smooth fade transitions with optional scale effects
- ✅ Responsive design optimized for mobile, tablet, and desktop
- ✅ Accessibility support with keyboard navigation and screen reader compatibility
- ✅ Performance optimizations with intersection observer and image preloading
- ✅ Reduced motion support for accessibility preferences
- ✅ Error handling with graceful fallbacks
- ✅ Touch device detection and optimization

## Usage

```tsx
import ImageCarousel from "@/components/ui/ImageCarousel";
import { heroCarouselImages, carouselConfig } from "@/data/carouselImages";

<ImageCarousel 
  images={heroCarouselImages}
  autoPlayInterval={6000}
  transitionDuration={1000}
  pauseOnHover={true}
  respectReducedMotion={true}
  className="z-10"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | `CarouselImage[]` | Required | Array of images to display |
| `autoPlayInterval` | `number` | `6000` | Time between transitions (ms) |
| `transitionDuration` | `number` | `1000` | Duration of fade transition (ms) |
| `pauseOnHover` | `boolean` | `true` | Pause carousel on mouse hover |
| `respectReducedMotion` | `boolean` | `true` | Respect user's reduced motion preference |
| `className` | `string` | `""` | Additional CSS classes |

## Image Configuration

```tsx
interface CarouselImage {
  src: string;      // Image source URL
  alt: string;      // Alt text for accessibility
  title?: string;   // Optional title for screen readers
}
```

## Keyboard Navigation

- **Arrow Keys**: Navigate between images
- **Space/Enter**: Pause/resume carousel
- **Home**: Go to first image
- **End**: Go to last image

## Accessibility Features

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Reduced motion preference detection
- High contrast mode support
- Focus management

## Performance Optimizations

- Image preloading for smooth transitions
- Intersection Observer to pause when not visible
- GPU acceleration with CSS transforms
- Memory leak prevention with proper cleanup
- Throttled resize event handling

## Error Handling

- Graceful degradation for failed image loads
- Error boundary integration
- Fallback to default background image
- Console warnings for debugging

## Mobile Optimizations

- Touch device detection
- Optimized opacity and filters for mobile
- Responsive image sizing
- Orientation change handling
- Performance monitoring

## Integration with HeroSimple

The carousel is integrated into the HeroSimple component as a background layer:

```tsx
<CarouselErrorBoundary fallback={<FallbackImage />}>
  <ImageCarousel images={heroCarouselImages} {...carouselConfig} />
</CarouselErrorBoundary>
```

## Customization

### Timing Configuration

```tsx
export const carouselConfig = {
  autoPlayInterval: 6000,    // 6 seconds between slides
  transitionDuration: 1000,  // 1 second fade transition
  pauseOnHover: true,
  respectReducedMotion: true
};
```

### Visual Customization

The carousel applies these styles for optimal text readability:

- `opacity: 0.25` - Low opacity to maintain text contrast
- `filter: brightness(0.7) contrast(1.1) saturate(1.1)` - Enhanced visual appeal
- Gradient overlays for better text readability

### Adding New Images

1. Add image files to `/src/assets/`
2. Update `/src/data/carouselImages.ts`:

```tsx
import newImage from "@/assets/new-image.jpg";

export const heroCarouselImages: CarouselImage[] = [
  // ... existing images
  {
    src: newImage,
    alt: "Description of new image",
    title: "Optional title for screen readers"
  }
];
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Graceful degradation for older browsers
- Progressive enhancement approach
- No polyfills required

## Performance Metrics

The carousel includes built-in performance monitoring:

- Memory usage tracking
- Render time measurement
- Visibility detection
- Automatic resource cleanup

## Troubleshooting

### Images Not Loading

1. Check image file paths in `/src/assets/`
2. Verify import statements in `/src/data/carouselImages.ts`
3. Check browser console for error messages
4. Ensure images are optimized for web (< 1MB recommended)

### Performance Issues

1. Reduce `autoPlayInterval` if transitions feel sluggish
2. Check if `prefers-reduced-motion` is enabled
3. Monitor memory usage in browser dev tools
4. Ensure images are properly compressed

### Accessibility Issues

1. Verify alt text is descriptive and meaningful
2. Test keyboard navigation functionality
3. Check screen reader compatibility
4. Ensure sufficient color contrast

## Development Notes

- Component uses React hooks for state management
- GSAP integration for enhanced animations (optional)
- Framer Motion for smooth transitions
- TypeScript for type safety
- Tailwind CSS for styling