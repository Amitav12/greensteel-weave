
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface FeaturedVideosProps {
  autoplay?: boolean;
  muted?: boolean;
  onVideoStart?: (videoId: string) => void;
  onVideoComplete?: (videoId: string) => void;
  onAllVideosComplete?: () => void;
}

const FeaturedVideos: React.FC<FeaturedVideosProps> = ({
  autoplay = true,
  muted = true,
  onVideoStart,
  onVideoComplete,
  onAllVideosComplete
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMutedStates, setVideoMutedStates] = useState<boolean[]>([]);
  const [isInView, setIsInView] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const videos = [
    {
      id: 'initial-contact',
      title: 'Initial Contact',
      description: 'Comprehensive consultation and assessment',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      step: 1
    },
    {
      id: 'processing-logistics',
      title: 'Processing & Logistics',
      description: 'Advanced processing and coordination',
      thumbnail: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop&crop=center',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      step: 2
    },
    {
      id: 'delivery-completion',
      title: 'Final Delivery',
      description: 'Seamless delivery and completion',
      thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop&crop=center',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      step: 3
    }
  ];

  // Initialize muted states
  useEffect(() => {
    setVideoMutedStates(new Array(videos.length).fill(muted));
  }, [muted, videos.length]);

  // Intersection Observer for autoplay when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-start all videos when section comes into view
  useEffect(() => {
    if (isInView && autoplay && !isPlaying) {
      playAllVideos();
    }
  }, [isInView, autoplay]);

  const playAllVideos = () => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.currentTime = 0;
        video.muted = videoMutedStates[index];
        video.play().then(() => {
          onVideoStart?.(videos[index].id);
        }).catch(console.error);
      }
    });
    setIsPlaying(true);
  };

  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
    setIsPlaying(false);
  };

  const toggleVideoMute = (index: number) => {
    const newMutedStates = [...videoMutedStates];
    newMutedStates[index] = !newMutedStates[index];
    setVideoMutedStates(newMutedStates);
    
    const video = videoRefs.current[index];
    if (video) {
      video.muted = newMutedStates[index];
    }
  };

  const handleVideoEnd = (index: number) => {
    onVideoComplete?.(videos[index].id);
    
    // Check if all videos have ended
    const allEnded = videoRefs.current.every(video => video?.ended);
    if (allEnded) {
      setIsPlaying(false);
      onAllVideosComplete?.();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseAllVideos();
    } else {
      playAllVideos();
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Business <span className="text-green-600">Process</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our complete end-to-end workflow in action - from initial consultation to final delivery
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          {/* Global Play/Pause Control */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlayPause}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-green-600" />
              ) : (
                <Play className="w-6 h-6 text-green-600" />
              )}
            </motion.button>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  aspectRatio: '16/12', // Made taller for more vertical space
                  minHeight: '320px' // Ensure minimum height on all devices
                }}
              >
                {/* Step Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Step {video.step}
                  </div>
                </div>

                {/* Individual Mute Button */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleVideoMute(index)}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-all duration-300"
                  >
                    {videoMutedStates[index] ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </motion.button>
                </div>

                {/* Now Playing Indicator */}
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-16 right-4 z-20"
                    >
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                        Playing
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Container */}
                <div className="relative w-full h-full">
                  <video
                    ref={el => videoRefs.current[index] = el}
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    onEnded={() => handleVideoEnd(index)}
                    muted={videoMutedStates[index]}
                    playsInline
                    preload="metadata"
                    loop
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>

                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Video Info */}
                  <div className="absolute bottom-6 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg md:text-xl mb-2">{video.title}</h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">{video.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {isPlaying && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? '100%' : '0%' }}
                      transition={{ duration: 10, ease: 'linear' }}
                      className="h-full bg-green-500"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedVideos;
