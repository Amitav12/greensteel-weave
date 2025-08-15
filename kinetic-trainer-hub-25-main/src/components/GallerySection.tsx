import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Play, Pause, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
}

interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  description?: string;
  is_active: boolean;
  order_index: number;
}

interface GallerySectionProps {
  galleryItems?: GalleryItem[];
}

const GallerySection = ({ galleryItems: dbGalleryItems = [] }: GallerySectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Demo data with realistic fitness content as fallback
  const defaultMediaItems: MediaItem[] = [
    {
      id: '1',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Client transformation results',
      title: 'Amazing Transformation Results'
    },
    {
      id: '2',
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4',
      alt: 'Training session video',
      title: 'Intense Training Session'
    },
    {
      id: '3',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Group fitness class',
      title: 'Group Training Success'
    },
    {
      id: '4',
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3195324/3195324-uhd_2560_1440_25fps.mp4',
      alt: 'Workout demonstration',
      title: 'Exercise Demonstration'
    },
    {
      id: '5',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Personal training session',
      title: 'One-on-One Training'
    },
    {
      id: '6',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Modern gym equipment',
      title: 'State-of-the-Art Equipment'
    },
    {
      id: '7',
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3195760/3195760-uhd_2560_1440_25fps.mp4',
      alt: 'Cardio workout video',
      title: 'Cardio Training Session'
    },
    {
      id: '8',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1549476464-37392f717541?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Strength training session',
      title: 'Strength & Power Training'
    }
  ];

  // Convert database gallery items to MediaItem format
  const mediaItemsFromDb: MediaItem[] = dbGalleryItems.map(item => ({
    id: item.id,
    type: 'image' as const,
    src: item.image_url,
    alt: item.description || item.title,
    title: item.title
  }));

  // Use database items if available, otherwise fall back to default
  const mediaItems = mediaItemsFromDb.length > 0 ? mediaItemsFromDb : defaultMediaItems;

  // Auto-loop functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isPlaying, mediaItems.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📸 Visual Journey
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Fitness{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Gallery
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our training environment, client transformations, and fitness journey through our auto-rotating gallery.
            </p>
          </motion.div>

          {/* Full Width Gallery Display */}
          <motion.div
            variants={itemVariants}
            className="max-w-7xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-[2/1] bg-gradient-to-br from-primary/10 to-secondary/10">
                  {/* Main Media Display */}
                  <div className="absolute inset-0">
                    {mediaItems[currentIndex]?.type === 'video' ? (
                      <video
                        key={mediaItems[currentIndex]?.id}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={mediaItems[currentIndex]?.src} type="video/mp4" />
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Video className="w-20 h-20 mx-auto mb-4" />
                            <p className="text-2xl font-semibold">Video Loading...</p>
                          </div>
                        </div>
                      </video>
                    ) : (
                      <img
                        key={mediaItems[currentIndex]?.id}
                        src={mediaItems[currentIndex]?.src}
                        alt={mediaItems[currentIndex]?.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    )}
                    
                    {/* Fallback for failed images */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center hidden">
                      <div className="text-white text-center">
                        <ImageIcon className="w-20 h-20 mx-auto mb-4" />
                        <p className="text-2xl font-semibold">Image Content</p>
                        <p className="text-lg opacity-80">{mediaItems[currentIndex]?.title}</p>
                      </div>
                    </div>

                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Media Controls */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-xl">
                          {mediaItems[currentIndex]?.title}
                        </h3>
                        <Button
                          onClick={togglePlayPause}
                          variant="ghost"
                          size="lg"
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-2 mb-3">
                        <motion.div
                          className="bg-primary h-2 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${((currentIndex + 1) / mediaItems.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-white/80 text-sm">
                          {currentIndex + 1} of {mediaItems.length}
                        </div>
                        <Link to="/gallery">
                          <Button 
                            variant="outline" 
                            className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                          >
                            View Full Gallery
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
