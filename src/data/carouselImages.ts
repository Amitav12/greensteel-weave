
import { CarouselImage } from '@/components/ui/ImageCarousel';

// Configuration for the hero carousel images with only the 5 new industrial images
export const heroCarouselImages: CarouselImage[] = [
  {
    src: "src/Hero_section_videos/Hero_Videos.mp4",
    alt: "Aaasha_Trading",
    title: "Steel Production Mastery"
  }
];

// Default carousel configuration
export const carouselConfig = {
  autoPlayInterval: 5000, // 5 seconds between slides
  transitionDuration: 1000, // 1 second fade transition
  pauseOnHover: true, // Pause on mouse hover
  respectReducedMotion: true // Respect user's motion preferences
};
