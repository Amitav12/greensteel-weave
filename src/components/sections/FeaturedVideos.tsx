
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
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videos = [
    {
      id: 'steel-processing',
      title: 'Steel Processing',
      description: 'Advanced steel manufacturing process',
      thumbnail: '/api/placeholder/300/400',
      src: '/api/placeholder/video/steel-processing.mp4',
      step: 1
    },
    {
      id: 'quality-control',
      title: 'Quality Control',
      description: 'Rigorous quality assurance standards',
      thumbnail: '/api/placeholder/300/400',
      src: '/api/placeholder/video/quality-control.mp4',
      step: 2
    },
    {
      id: 'delivery',
      title: 'Fast Delivery',
      description: 'Efficient logistics and delivery',
      thumbnail: '/api/placeholder/300/400',
      src: '/api/placeholder/video/delivery.mp4',
      step: 3
    }
  ];

  useEffect(() => {
    if (autoplay && videos.length > 0) {
      playCurrentVideo();
    }
  }, [autoplay, currentVideoIndex]);

  const playCurrentVideo = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.muted = isMuted;
      currentVideo.play().then(() => {
        setIsPlaying(true);
        onVideoStart?.(videos[currentVideoIndex].id);
      }).catch(console.error);
    }
  };

  const handleVideoEnd = () => {
    const currentVideoId = videos[currentVideoIndex].id;
    onVideoComplete?.(currentVideoId);
    
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      // All videos completed, restart from beginning
      setCurrentVideoIndex(0);
      onAllVideosComplete?.();
    }
    setIsPlaying(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 bg-gradient-to-br from-gray-50 to-green-50"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured <span className="text-green-600">Videos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our steel processing journey from raw materials to finished products
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  currentVideoIndex === index ? 'ring-4 ring-green-500 ring-opacity-50' : ''
                }`}
                style={{ aspectRatio: '9/16' }} // Mobile-like aspect ratio
              >
                {/* Step Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Step {video.step}
                  </div>
                </div>

                {/* Now Playing Indicator */}
                <AnimatePresence>
                  {currentVideoIndex === index && isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Now Playing
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
                    onEnded={handleVideoEnd}
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>

                  {/* Video Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Video Info */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{video.title}</h3>
                    <p className="text-sm text-gray-200">{video.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                {currentVideoIndex === index && (
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

          {/* Controls */}
          <div className="flex lg:flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMute}
              className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-gray-600" />
              ) : (
                <Volume2 className="w-6 h-6 text-green-600" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Video Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentVideoIndex === index 
                  ? 'bg-green-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturedVideos;
