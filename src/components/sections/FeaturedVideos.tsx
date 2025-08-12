import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Import videos using Vite's asset handling
import step1Video from '../../Buisness_process_videos/step1-aaasha-trading.mp4';
import step2Video from '../../Buisness_process_videos/step2-aaasha-trading.mp4';
import step3Video from '../../Buisness_process_videos/step3-aaasha-trading.mp4';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  captionsUrl: string;
  thumbnail?: string;
}

const videos: VideoItem[] = [
  {
    id: 'step1',
    title: 'Initial Assessment & Collection',
    description: 'Our expert team conducts thorough material assessment and efficient collection processes',
    duration: '2:30',
    videoUrl: step1Video,
    captionsUrl: '/captions/segment1.vtt'
  },
  {
    id: 'step2', 
    title: 'Processing & Sorting',
    description: 'Advanced sorting and processing techniques ensure maximum material recovery',
    duration: '3:15',
    videoUrl: step2Video,
    captionsUrl: '/captions/segment2.vtt'
  },
  {
    id: 'step3',
    title: 'Quality Steel Production',
    description: 'State-of-the-art facilities transform recycled materials into premium steel products',
    duration: '2:45',
    videoUrl: step3Video,
    captionsUrl: '/captions/segment3.vtt'
  }
];

export default function FeaturedVideos() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  // Video event handlers
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setError(null);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoError = () => {
    setError('Failed to load video. Please try again.');
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {
          setError('Failed to play video. Please try again.');
        });
      }
      setIsPlaying(!isPlaying);
    }
    resetControlsTimeout();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    resetControlsTimeout();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress((newTime / duration) * 100);
    }
    resetControlsTimeout();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {
        setError('Fullscreen not supported');
      });
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const changeVideo = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setError(null);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Mouse movement handler
  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Our <span className="text-green-600">Process</span> in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how we transform waste into valuable resources through our proven three-step process
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Main Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden shadow-2xl bg-black">
              <CardContent className="p-0">
                <div
                  ref={containerRef}
                  className="relative aspect-video bg-black group"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={() => {
                    if (isPlaying) {
                      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 1000);
                    }
                  }}
                >
                  {error ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white">
                      <div className="text-center">
                        <p className="text-lg mb-4">{error}</p>
                        <Button onClick={() => setError(null)} variant="outline">
                          Try Again
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src={videos[currentVideo].videoUrl}
                        onLoadedMetadata={handleLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleVideoEnd}
                        onError={handleVideoError}
                        muted={isMuted}
                        playsInline
                      >
                        <track
                          kind="captions"
                          srcLang="en"
                          src={videos[currentVideo].captionsUrl}
                          default
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Video Overlay & Controls */}
                      <AnimatePresence>
                        {showControls && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"
                          >
                            {/* Play Button Overlay */}
                            {!isPlaying && (
                              <motion.button
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={togglePlay}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                                  <Play className="w-8 h-8 text-white ml-1" />
                                </div>
                              </motion.button>
                            )}

                            {/* Bottom Controls */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <div className="space-y-4">
                                {/* Progress Bar */}
                                <div
                                  className="w-full h-2 bg-white/20 rounded-full cursor-pointer group/progress"
                                  onClick={handleProgressClick}
                                >
                                  <div
                                    className="h-full bg-green-500 rounded-full transition-all duration-150 group-hover/progress:bg-green-400"
                                    style={{ width: `${progress}%` }}
                                  />
                                </div>

                                {/* Control Buttons */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-4">
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={togglePlay}
                                      className="text-white hover:bg-white/20"
                                    >
                                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </Button>

                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={toggleMute}
                                      className="text-white hover:bg-white/20"
                                    >
                                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </Button>

                                    <div className="flex items-center space-x-2 text-white text-sm">
                                      <Clock className="w-4 h-4" />
                                      <span>
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                      </span>
                                    </div>
                                  </div>

                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={toggleFullscreen}
                                    className="text-white hover:bg-white/20"
                                  >
                                    <Maximize className="w-5 h-5" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Video Title Overlay */}
                            <div className="absolute top-6 left-6 right-6">
                              <h3 className="text-xl font-bold text-white mb-2">
                                {videos[currentVideo].title}
                              </h3>
                              <p className="text-white/80 text-sm">
                                {videos[currentVideo].description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Video Selection Thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-6 mt-8"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 overflow-hidden ${
                    currentVideo === index
                      ? 'ring-2 ring-green-500 shadow-lg shadow-green-500/20'
                      : 'hover:shadow-xl'
                  }`}
                  onClick={() => changeVideo(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        currentVideo === index ? 'bg-green-500' : 'bg-gray-100'
                      }`}>
                        <Play className={`w-5 h-5 ${
                          currentVideo === index ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{video.title}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                        <span className="text-xs text-green-600 font-medium">{video.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
