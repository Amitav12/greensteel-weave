
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
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
  const [isMuted, setIsMuted] = useState(muted);
  const [isHovered, setIsHovered] = useState(false);
  
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize video refs array
  useEffect(() => {
    videoRefs.current = new Array(businessProcessSegments.length).fill(null);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo) {
        currentVideo.play().catch((error) => {
          console.log('Video autoplay failed:', error);
        });
        setIsPlaying(true);
        onVideoStart?.(businessProcessSegments[currentVideoIndex].id);
      }
    }
  }, [currentVideoIndex, autoplay, isHovered, onVideoStart]);

  // Handle video end
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

  // Handle play/pause toggle
  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play();
        setIsPlaying(true);
      }
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Video selection
  const selectVideo = (index: number) => {
    // Pause current video
    const currentVideo = videoRefs.current[currentVideoIndex];
    if (currentVideo) {
      currentVideo.pause();
    }
    
    setCurrentVideoIndex(index);
    setIsPlaying(false);
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
          <p className="text-lg text-green-300 max-w-2xl mx-auto">
            Discover our business process through these featured videos
          </p>
        </motion.div>

        {/* Video Grid Layout - Matches Screenshot */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {businessProcessSegments.slice(0, 2).map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'border-green-400 shadow-green-400/50' 
                  : 'border-white/20 hover:border-green-400/50'
              }`}
              onClick={() => selectVideo(index)}
            >
              {/* Video Element */}
              <div className="relative aspect-video bg-black">
                <video
                  ref={(el) => videoRefs.current[index] = el}
                  className="w-full h-full object-cover"
                  poster={segment.poster}
                  muted={isMuted}
                  onEnded={handleVideoEnd}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  preload="metadata"
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

                {/* Play Indicator */}
                {index === currentVideoIndex && (
                  <div className="absolute top-4 right-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  </div>
                )}

                {/* Video Controls */}
                <AnimatePresence>
                  {(isHovered || !isPlaying) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      {index === currentVideoIndex && (
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlayPause();
                            }}
                            className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
                          >
                            {isPlaying ? (
                              <Pause className="w-8 h-8" />
                            ) : (
                              <Play className="w-8 h-8 ml-1" />
                            )}
                          </button>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMute();
                            }}
                            className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/30"
                          >
                            {isMuted ? (
                              <VolumeX className="w-5 h-5" />
                            ) : (
                              <Volume2 className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="bg-white/10 backdrop-blur-xl rounded-lg p-4 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {segment.title}
                    </h3>
                    <p className="text-white/80 text-sm line-clamp-2">
                      {segment.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Progress Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8 space-x-3"
        >
          {businessProcessSegments.slice(0, 2).map((_, index) => (
            <button
              key={index}
              onClick={() => selectVideo(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'bg-green-400 scale-125 shadow-lg shadow-green-400/50'
                  : 'bg-white/40 hover:bg-white/60'
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
          <h3 className="text-2xl font-bold text-white">
            Now Playing: {businessProcessSegments[currentVideoIndex]?.title}
          </h3>
        </motion.div>
      </div>
    </section>
  );
}
