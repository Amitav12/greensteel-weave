import { CarouselImage } from '@/components/ui/ImageCarousel';

// Import the industrial images
import steelWorkerImage from '@/assets/steel-worker-industrial.jpg';
import shippingContainersImage from '@/assets/shipping-containers-port.jpg';
import cargoShipImage from '@/assets/cargo-ship-containers.jpg';

// Configuration for the hero carousel images
export const heroCarouselImages: CarouselImage[] = [
  {
    src: steelWorkerImage,
    alt: "Steel worker in industrial setting with molten metal and sparks",
    title: "Steel Manufacturing Excellence"
  },
  {
    src: shippingContainersImage,
    alt: "Colorful shipping containers at port facility",
    title: "Global Trade Operations"
  },
  {
    src: cargoShipImage,
    alt: "Large cargo ship loaded with containers on ocean",
    title: "International Shipping Solutions"
  }
];

// Default carousel configuration
export const carouselConfig = {
  autoPlayInterval: 6000, // 6 seconds between slides
  transitionDuration: 1000, // 1 second fade transition
  pauseOnHover: true, // Pause on mouse hover
  respectReducedMotion: true // Respect user's motion preferences
};