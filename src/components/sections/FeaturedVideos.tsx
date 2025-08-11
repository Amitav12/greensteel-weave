
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { businessProcessSegments } from "@/data/businessProcessSegments";

interface FeaturedVideosProps {
  autoplay?: boolean;
  muted?: boolean;
  onVideoStart?: (videoId: string) => void;
  onVideoComplete?: (videoId: string) => void;
  onAllVideosComplete?: () => void;
}

export default function FeaturedVideos({
  autoplay = true,
  muted = true,
  onVideoStart,
  onVideoComplete,
  onAllVideosComplete
}: FeaturedVideosProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = new Array(businessProcessSegments.length).fill(null);
  }, []);

  // Auto-play functionality - sequential playback
  useEffect(() => {
    if (autoplay) {
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo) {
        currentVideo.play().catch((error) => {
          console.log('Video autoplay failed:', error);
        });
        setIsPlaying(true);
        onVideoStart?.(businessProcessSegments[currentVideoIndex].id);
      }
    }
  }, [currentVideoIndex, autoplay, onVideoStart]);

  // Handle video end - move to next video automatically
  const handleVideoEnd = () => {
    onVideoComplete?.(businessProcessSegments[currentVideoIndex].id);
    
    // Move to next video
    if (currentVideoIndex < businessProcessSegments.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      // All videos completed, restart from beginning
      setCurrentVideoIndex(0);
      onAllVideosComplete?.();
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(34,197,94,0.1),transparent_70%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="text-red-500">Featured</span>{" "}
            <span className="text-white">Videos</span>
          </h2>
        </motion.div>

        {/* Mobile-shaped Video Grid - Three Videos in Row */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto justify-center">
          {businessProcessSegments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'border-green-400 shadow-green-400/50 scale-105' 
                  : 'border-white/20'
              } flex-1 max-w-sm mx-auto lg:mx-0`}
            >
              {/* Mobile-shaped Video Container */}
              <div className="relative aspect-[9/16] bg-black">
                <video
                  ref={(el) => videoRefs.current[index] = el}
                  className="w-full h-full object-cover"
                  poster={segment.poster}
                  muted={muted}
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  preload="metadata"
                  playsInline
                >
                  {segment.sources.map((source, sourceIndex) => (
                    <source
                      key={sourceIndex}
                      src={source.src}
                      type={source.type}
                    />
                  ))}
                  <track
                    kind="captions"
                    src={segment.captions}
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Active Playing Indicator */}
                {index === currentVideoIndex && isPlaying && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                )}

                {/* Step Indicator */}
                <div className="absolute top-4 left-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Step {index + 1}
                  </div>
                </div>

                {/* Video Info Overlay - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {segment.title}
                    </h3>
                    <p className="text-white/80 text-xs line-clamp-2">
                      {segment.description.substring(0, 100)}...
                    </p>
                  </div>
                </div>

                {/* Now Playing Indicator */}
                {index === currentVideoIndex && (
                  <div className="absolute bottom-20 left-4">
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
                      Now Playing
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 space-x-3"
        >
          {businessProcessSegments.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'bg-green-400 scale-125 shadow-lg shadow-green-400/50'
                  : index < currentVideoIndex
                  ? 'bg-green-600'
                  : 'bg-white/40'
              }`}
            />
          ))}
        </motion.div>

        {/* Current Video Title */}
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-6"
        >
          <h3 className="text-xl font-bold text-white">
            Now Playing: {businessProcessSegments[currentVideoIndex]?.title}
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
