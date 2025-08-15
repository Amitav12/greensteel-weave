import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Image as ImageIcon, Video } from 'lucide-react';
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

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Demo data with realistic fitness content
  const mediaItems: MediaItem[] = [
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
      type: 'image',
      src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Personal training session',
      title: 'One-on-One Training'
    },
    {
      id: '5',
      type: 'video',
      src: 'https://videos.pexels.com/video-files/3195324/3195324-uhd_2560_1440_25fps.mp4',
      alt: 'Workout demonstration',
      title: 'Exercise Demonstration'
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

  // Auto-loop functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isPlaying, mediaItems.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📸 Visual Journey
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Fitness <span className="text-accent">Gallery</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Explore our training environment, client transformations, and fitness journey through photos and videos.
            </p>
            
            <Link to="/">
              <Button 
                variant="outline" 
                className="mt-8 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Gallery Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-video">
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
                      </video>
                    ) : (
                      <img
                        key={mediaItems[currentIndex]?.id}
                        src={mediaItems[currentIndex]?.src}
                        alt={mediaItems[currentIndex]?.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Media Controls */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg">
                          {mediaItems[currentIndex]?.title}
                        </h3>
                        <Button
                          onClick={togglePlayPause}
                          variant="ghost"
                          size="sm"
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-white/20 rounded-full h-1 mb-2">
                        <motion.div
                          className="bg-primary h-1 rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${((currentIndex + 1) / mediaItems.length) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      
                      <div className="text-white/80 text-sm">
                        {currentIndex + 1} of {mediaItems.length}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Thumbnail Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
          >
            {mediaItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  currentIndex === index
                    ? 'border-primary shadow-lg shadow-primary/25'
                    : 'border-border/30 hover:border-primary/50'
                }`}
              >
                {item.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover"
                    muted
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                )}
                
                {/* Type indicator */}
                <div className="absolute top-2 right-2">
                  {item.type === 'video' ? (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      VIDEO
                    </div>
                  ) : (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      PHOTO
                    </div>
                  )}
                </div>

                {/* Active indicator */}
                {currentIndex === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-primary rounded-full" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;