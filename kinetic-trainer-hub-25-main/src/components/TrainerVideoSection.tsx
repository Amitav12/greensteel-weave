
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface TrainerVideoSectionProps {
  trainerVideo?: string;
}

const TrainerVideoSection = ({ trainerVideo }: TrainerVideoSectionProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use a working demo video as fallback
  const videoSrc = trainerVideo || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    const video = videoRef.current;
    if (video && !videoError) {
      video.volume = 0.7;
      video.muted = isMuted;
      
      const handleCanPlay = () => {
        setIsLoading(false);
        console.log('Video can play, attempting autoplay');
        
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Video autoplay successful');
              setIsPlaying(true);
              setShowControls(false);
            })
            .catch((error) => {
              console.log('Autoplay failed:', error);
              setShowControls(true);
              setIsPlaying(false);
            });
        }
      };

      const handleLoadStart = () => {
        console.log('Video loading started');
        setIsLoading(true);
      };

      const handlePlay = () => {
        console.log('Video play event');
        setIsPlaying(true);
        setShowControls(false);
      };

      const handlePause = () => {
        console.log('Video pause event');
        setIsPlaying(false);
        setShowControls(true);
      };

      const handleError = (e: any) => {
        console.error('Video error:', e);
        setVideoError(true);
        setIsLoading(false);
        setIsPlaying(false);
        setShowControls(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadstart', handleLoadStart);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('error', handleError);

      // Force load the video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadstart', handleLoadStart);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc, videoError, isMuted]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video && !videoError) {
      if (isPlaying) {
        video.pause();
      } else {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Manual play successful');
              setIsPlaying(true);
              setShowControls(false);
            })
            .catch((error) => {
              console.error('Manual play failed:', error);
              setShowControls(true);
            });
        }
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      const newMutedState = !isMuted;
      video.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-8 border border-primary/10 shadow-2xl h-full flex flex-col"
    >
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl overflow-hidden relative group h-[400px] lg:h-[500px]">
        {videoError ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Video Preview</h3>
              <p className="text-sm opacity-75">Professional training showcase</p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              controls={false}
              onClick={handleVideoClick}
              crossOrigin="anonymous"
              preload="metadata"
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Play/Pause button overlay */}
            {(showControls || !isPlaying) && !isLoading && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoClick}
                  className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-10 h-10 text-primary" />
                  ) : (
                    <Play className="w-10 h-10 text-primary ml-1" />
                  )}
                </motion.button>
              </div>
            )}

            {/* Mute/Unmute button */}
            {!videoError && !isLoading && (
              <div className="absolute top-4 right-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMute}
                  className={`w-12 h-12 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isMuted 
                      ? 'bg-red-500/80 hover:bg-red-600/90' 
                      : 'bg-green-500/80 hover:bg-green-600/90'
                  }`}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </motion.button>
                
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
                    isMuted 
                      ? 'bg-red-500/20 text-red-300' 
                      : 'bg-green-500/20 text-green-300'
                  }`}>
                    {isMuted ? 'MUTED' : 'SOUND ON'}
                  </div>
                </div>
              </div>
            )}

            {/* Video info overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                <h3 className="text-white font-semibold text-lg">
                  {trainerVideo ? "Meet Your Trainer" : "Fitness Training Demo"}
                </h3>
                <p className="text-white/80 text-sm">
                  {trainerVideo ? "Personal introduction video" : "Professional training showcase"}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating info cards */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-6 left-6 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-xl shadow-lg"
      >
        <div className="text-xs font-semibold">Next Session</div>
        <div className="text-sm font-bold">Today 3PM</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-6 right-6 bg-gradient-to-r from-secondary to-accent text-white p-3 rounded-xl shadow-lg"
      >
        <div className="text-xs font-semibold">Progress</div>
        <div className="text-sm font-bold">85% Goal</div>
      </motion.div>
    </motion.div>
  );
};

export default TrainerVideoSection;
