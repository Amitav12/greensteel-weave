
import { CarouselImage } from '@/components/ui/ImageCarousel';

// Import the industrial images
import steelWorkerImage from '@/assets/steel-worker-industrial.jpg';
import shippingContainersImage from '@/assets/shipping-containers-port.jpg';
import cargoShipImage from '@/assets/cargo-ship-containers.jpg';

// Configuration for the hero carousel images with new industrial images
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
  },
  {
    src: "/lovable-uploads/b388c060-872e-4f0e-bfbc-528b4f713584.png",
    alt: "Industrial crane handling scrap metal in recycling facility",
    title: "Advanced Recycling Operations"
  },
  {
    src: "/lovable-uploads/c731af5f-b373-492b-8a87-5f5bb800df2b.png",
    alt: "Collection of recycled steel and metal materials",
    title: "Quality Steel Materials"
  },
  {
    src: "/lovable-uploads/2ea524d3-9629-4e45-a879-2e407f5cc008.png",
    alt: "Large container ship for international cargo transport",
    title: "Global Shipping Network"
  },
  {
    src: "/lovable-uploads/cb1ebe87-f93f-43ef-875a-ecee4a3223ec.png",
    alt: "Shipping containers stacked at industrial port facility",
    title: "Port Operations Excellence"
  },
  {
    src: "/lovable-uploads/68d07f7b-3ac2-47a4-a5cb-b1ae1872ad90.png",
    alt: "Molten steel production in industrial foundry",
    title: "Steel Production Mastery"
  }
];

// Default carousel configuration - adjusted for more images
export const carouselConfig = {
  autoPlayInterval: 5000, // 5 seconds between slides for better viewing
  transitionDuration: 1000, // 1 second fade transition
  pauseOnHover: true, // Pause on mouse hover
  respectReducedMotion: true // Respect user's motion preferences
};
