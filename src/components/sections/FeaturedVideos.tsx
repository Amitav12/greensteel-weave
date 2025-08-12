import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Video {
  id: string;
  step: number;
  title: string;
  description: string;
  src: string;
  captions?: string;
}

interface FeaturedVideosProps {
  autoplay?: boolean;
  muted?: boolean;
  onVideoStart?: (videoId: string) => void;
  onVideoComplete?: (videoId: string) => void;
  onAllVideosComplete?: () => void;
}

const videos: Video[] = [
  {
    id: "step1",
    step: 1,
    title: "Initial Consultation",
    description: "We start by understanding your specific needs and requirements.",
    src: "/Buisness_process_videos/step1-aaasha-trading.mp4",
    captions: "/captions/step1.vtt",
  },
  {
    id: "step2",
    step: 2,
    title: "Material Sourcing",
    description: "Our global network ensures the best quality materials at competitive prices.",
    src: "/Buisness_process_videos/step2-aaasha-trading.mp4",
    captions: "/captions/step2.vtt",
  },
  {
    id: "step3",
    step: 3,
    title: "Processing & Recycling",
    description: "Eco-friendly processes transform scrap into valuable resources.",
    src: "/Buisness_process_videos/step3-aaasha-trading.mp4",
    captions: "/captions/step3.vtt",
  },
];

export default function FeaturedVideos({ 
  autoplay = false, 
  muted = false, 
  onVideoStart, 
  onVideoComplete, 
  onAllVideosComplete 
}: FeaturedVideosProps) {
  const [videoLoaded, setVideoLoaded] = useState(videos.map(() => false));
  const [videoPlaying, setVideoPlaying] = useState(videos.map(() => autoplay));
  const [videoMuted, setVideoMuted] = useState(videos.map(() => muted));
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    if (autoplay) {
      videoRefs.current.forEach((video, index) => {
        if (video && videoLoaded[index]) {
          video.play().catch(error => {
            console.error("Autoplay failed for video", index, error);
          });
        }
      });
    }
  }, [autoplay, videoLoaded]);

  useEffect(() => {
    let allCompleted = true;
    videos.forEach((_, index) => {
      if (videoPlaying[index]) {
        allCompleted = false;
      }
    });

    if (allCompleted) {
      onAllVideosComplete?.();
    }
  }, [videoPlaying, onAllVideosComplete]);

  const handleVideoLoaded = (index: number) => {
    setVideoLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const toggleMute = (index: number) => {
    setVideoMuted(prev => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    
    if (videoRefs.current[index]) {
      videoRefs.current[index].muted = !videoMuted[index];
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Business <span className="text-green-600 dark:text-green-400">Process</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch our complete end-to-end workflow in action - from initial consultation to final delivery
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-8 md:gap-12">
          {/* Video Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ 
                  aspectRatio: '20/30',
                  minHeight: '500px'
                }}
              >
                {/* Step Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Step {video.step}
                  </div>
                </div>

                {/* Individual Mute/Unmute Button */}
                <div className="absolute top-4 right-4 z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleMute(index)}
                    className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    {videoMuted[index] ? 
                      <VolumeX className="w-4 h-4" /> : 
                      <Volume2 className="w-4 h-4" />
                    }
                  </motion.button>
                </div>

                {/* Video Element */}
                <div className="relative w-full h-full">
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[index] = el;
                    }}
                    className="w-full h-full object-cover"
                    muted={videoMuted[index]}
                    loop
                    playsInline
                    autoPlay={autoplay}
                    preload="metadata"
                    onLoadedData={() => handleVideoLoaded(index)}
                    onCanPlayThrough={() => handleVideoLoaded(index)}
                    onPlay={() => {
                      setVideoPlaying(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      });
                      onVideoStart?.(video.id);
                    }}
                    onPause={() => setVideoPlaying(prev => {
                      const newState = [...prev];
                      newState[index] = false;
                      return newState;
                    })}
                    onEnded={() => {
                      setVideoPlaying(prev => {
                        const newState = [...prev];
                        newState[index] = false;
                        return newState;
                      });
                      onVideoComplete?.(video.id);
                    }}
                    onError={(e) => {
                      console.error("Video error:", e);
                      setVideoLoaded(prev => {
                        const newState = [...prev];
                        newState[index] = false;
                        return newState;
                      });
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                    {video.captions && (
                      <track
                        kind="captions"
                        src={video.captions}
                        srcLang="en"
                        label="English"
                        default
                      />
                    )}
                    Your browser does not support the video tag.
                  </video>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Video Info */}
                  <div className="absolute bottom-6 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg md:text-xl mb-2">{video.title}</h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">{video.description}</p>
                  </div>
                </div>

                {/* Loading State */}
                {!videoLoaded[index] && (
                  <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-600">Loading video...</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
