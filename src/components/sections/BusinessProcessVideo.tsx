import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, Eye } from 'lucide-react';
import { BusinessProcessVideoProps } from '@/types/video';
import { businessProcessSegments } from '@/data/businessProcessSegments';



export default function BusinessProcessVideo({
  segments = businessProcessSegments,
  autoplay = true,
  muted = true,
  className = '',
  onSegmentStart,
  onSegmentComplete,
  onFullPlayComplete
}: BusinessProcessVideoProps) {
  // Core state management
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(muted);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [isLoading, setIsLoading] = useState([true, true, true]);
  const [isInViewport, setIsInViewport] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalVideoIndex, setModalVideoIndex] = useState(0);

  // Refs for all three video elements
  const videoRefs = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null)
  ];
  const containerRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const totalSegments = segments.length;

  // Intersection Observer for scroll-triggered autoplay
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);

        if (entry.isIntersecting) {
          // Start playing when in viewport
          const firstVideo = videoRefs[0].current;
          if (firstVideo && autoplay) {
            firstVideo.play().catch(() => {
              setShowPlayOverlay(true);
            });
          }
        } else {
          // Pause all videos when out of viewport
          videoRefs.forEach(videoRef => {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          });
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [autoplay]);

  // Initialize all videos
  useEffect(() => {
    const initializeVideos = async () => {
      videoRefs.forEach((videoRef, index) => {
        if (videoRef.current && segments[index]) {
          const video = videoRef.current;
          const segment = segments[index];

          // Clear and set up video sources
          video.innerHTML = '';

          segment.sources.forEach(source => {
            const sourceElement = document.createElement('source');
            sourceElement.src = source.src;
            sourceElement.type = source.type;
            video.appendChild(sourceElement);
          });

          // Add captions
          const trackElement = document.createElement('track');
          trackElement.kind = 'subtitles';
          trackElement.src = segment.captions;
          trackElement.srclang = 'en';
          trackElement.label = 'English';
          trackElement.default = true;
          video.appendChild(trackElement);

          // Set video properties
          video.poster = segment.poster;
          video.muted = isMuted;
          video.playsInline = true;
          video.preload = index === 0 ? 'metadata' : 'none';

          // Load the video
          video.load();

          // Set up event listeners
          const handleLoadedMetadata = () => {
            setIsLoading(prev => {
              const newLoading = [...prev];
              newLoading[index] = false;
              return newLoading;
            });
          };

          const handleEnded = () => {
            if (index === currentSegmentIndex && isInViewport) {
              // Fire completion event
              if (onSegmentComplete) {
                onSegmentComplete(segment.id);
              }

              // Move to next video or complete
              if (index < totalSegments - 1) {
                // Smooth transition to next video
                setTimeout(() => {
                  setCurrentSegmentIndex(index + 1);
                  const nextVideo = videoRefs[index + 1].current;
                  if (nextVideo) {
                    nextVideo.currentTime = 0;
                    nextVideo.play().catch(console.error);

                    if (onSegmentStart) {
                      onSegmentStart(segments[index + 1].id);
                    }
                  }
                }, 200); // Small delay for smooth transition
              } else {
                // All videos completed
                if (onFullPlayComplete) {
                  onFullPlayComplete();
                }
              }
            }
          };

          video.addEventListener('loadedmetadata', handleLoadedMetadata);
          video.addEventListener('ended', handleEnded);

          // Cleanup function
          return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('ended', handleEnded);
          };
        }
      });
    };

    initializeVideos();
  }, [segments, isMuted, currentSegmentIndex, totalSegments, isInViewport, onSegmentStart, onSegmentComplete, onFullPlayComplete]);

  // Handle manual play button
  const handleManualPlay = useCallback(async () => {
    const firstVideo = videoRefs[0].current;
    if (firstVideo) {
      try {
        await firstVideo.play();
        setShowPlayOverlay(false);

        if (onSegmentStart) {
          onSegmentStart(segments[0].id);
        }
      } catch (error) {
        console.error('Failed to start video playback:', error);
      }
    }
  }, [segments, onSegmentStart]);

  // Mute toggle for all videos
  const toggleMute = useCallback(() => {
    videoRefs.forEach(videoRef => {
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
      }
    });

    // Also update modal video if open
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !isMuted;
    }

    setIsMuted(!isMuted);
  }, [isMuted]);

  // Open video details modal
  const openVideoModal = useCallback((videoIndex: number) => {
    setModalVideoIndex(videoIndex);
    setShowModal(true);

    // Pause all main videos
    videoRefs.forEach(videoRef => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    });
  }, []);

  // Close video modal
  const closeVideoModal = useCallback(() => {
    setShowModal(false);

    // Pause modal video
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }

    // Resume main video if in viewport
    if (isInViewport) {
      const currentVideo = videoRefs[currentSegmentIndex].current;
      if (currentVideo) {
        currentVideo.play().catch(console.error);
      }
    }
  }, [isInViewport, currentSegmentIndex]);

  // Initialize modal video
  useEffect(() => {
    if (showModal && modalVideoRef.current && segments[modalVideoIndex]) {
      const video = modalVideoRef.current;
      const segment = segments[modalVideoIndex];

      // Clear and set up video sources
      video.innerHTML = '';

      segment.sources.forEach(source => {
        const sourceElement = document.createElement('source');
        sourceElement.src = source.src;
        sourceElement.type = source.type;
        video.appendChild(sourceElement);
      });

      // Add captions
      const trackElement = document.createElement('track');
      trackElement.kind = 'subtitles';
      trackElement.src = segment.captions;
      trackElement.srclang = 'en';
      trackElement.label = 'English';
      trackElement.default = true;
      video.appendChild(trackElement);

      // Set video properties
      video.poster = segment.poster;
      video.muted = isMuted;
      video.playsInline = true;
      video.controls = true;

      // Load and play
      video.load();
      video.play().catch(console.error);
    }
  }, [showModal, modalVideoIndex, segments, isMuted]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        closeVideoModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [showModal, closeVideoModal]);

  return (
    <>
      <section className={`hp-bp-container py-8 sm:py-12 bg-white ${className}`}>
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Our <span className="text-green-600">Business Process</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Watch our complete end-to-end workflow in action - from initial consultation to final delivery
            </p>
          </motion.div>

          {/* MAIN VIDEO PANEL - GUARANTEED VISIBLE */}
          <div
            className="mb-12 sm:mb-16"
            style={{
              backgroundColor: '#f3f4f6',
              padding: '24px',
              borderRadius: '16px',
              border: '4px solid #10b981',
              minHeight: '500px'
            }}
          >
            {/* Video Badge - Always Visible */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              >
                🎥 Business Process Video Carousel
              </span>
            </div>

            {/* Video Container - Always Visible */}
            <div style={{ width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  backgroundColor: '#1e3a8a',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  border: '2px solid #10b981',
                  minHeight: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Background Content - Always Shows */}
                <div style={{ textAlign: 'center', color: 'white', padding: '32px' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      backgroundColor: '#10b981',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
                    Business Process Overview Video
                  </h3>
                  <p style={{ color: '#93c5fd', fontSize: '16px', marginBottom: '16px' }}>
                    Complete workflow demonstration
                  </p>
                  <div
                    style={{
                      backgroundColor: 'rgba(16, 185, 129, 0.2)',
                      border: '1px solid #10b981',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '16px'
                    }}
                  >
                    <p style={{ color: '#10b981', fontWeight: 'bold', marginBottom: '8px' }}>
                      ✅ Video Panel Successfully Loaded
                    </p>
                    <p style={{ color: '#6ee7b7', fontSize: '14px' }}>
                      Path: src/Buisness_process_videos/buisness2_video.mp4
                    </p>
                  </div>
                </div>

                {/* Video Element */}
                <video
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 10
                  }}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                >
                  <source src="src/Buisness_process_videos/buisness2_video.mp4" type="video/mp4" />
                  <source src="/src/Buisness_process_videos/buisness2_video.mp4" type="video/mp4" />
                  <source src="./src/Buisness_process_videos/buisness2_video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* Full-Width Video Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hp-bp-video-grid relative"
            ref={containerRef}
            role="region"
            aria-label="Business process video players"
          >
            {/* Global Mute Control */}
            <div className="absolute top-4 right-4 z-40">
              <button
                onClick={toggleMute}
                className="bg-black/70 hover:bg-black/90 backdrop-blur-sm text-white hover:text-green-400 transition-all duration-300 rounded-full p-3 shadow-lg"
                aria-label={isMuted ? 'Unmute videos' : 'Mute videos'}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {/* Full-Width Video Grid - Enhanced for better visibility */}
            <div className="space-y-6 lg:space-y-8">
              {/* First two cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {segments.slice(0, 2).map((segment, index) => (
                  <motion.div
                    key={segment.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="hp-bp-video-item w-full"
                  >
                    {/* Enhanced Video Container - Larger and more prominent */}
                    <div
                      className={`relative bg-black rounded-2xl overflow-hidden shadow-xl transition-all duration-500 cursor-pointer w-full ${index === currentSegmentIndex
                        ? 'ring-4 ring-green-500 shadow-green-500/40 scale-105'
                        : 'hover:shadow-2xl hover:scale-102'
                        }`}
                      style={{ aspectRatio: '16/9', minHeight: '280px' }}
                      onClick={() => openVideoModal(index)}
                    >
                      {/* Video Element */}
                      <video
                        ref={videoRefs[index]}
                        className="w-full h-full object-cover"
                        muted={isMuted}
                        playsInline
                        poster={segment.poster}
                        aria-label={`Business process video: ${segment.title}`}
                      >
                        Your browser does not support the video tag.
                      </video>

                      {/* Loading Indicator */}
                      {isLoading[index] && (
                        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white text-base">Loading...</p>
                          </div>
                        </div>
                      )}

                      {/* Play Overlay for autoplay fallback */}
                      {showPlayOverlay && index === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleManualPlay();
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-full p-6 shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Play business process videos"
                          >
                            <Play className="w-10 h-10 ml-1" />
                          </motion.button>
                        </div>
                      )}

                      {/* Enhanced Video Overlay Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end">
                        <div className="p-6 w-full">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-white text-lg font-bold mb-2">
                                {segment.title}
                              </h3>
                              <div className="flex items-center space-x-3">
                                <span className="text-green-400 text-sm font-bold bg-green-400/20 rounded-full px-3 py-1">
                                  Step {index + 1}
                                </span>
                                {index === currentSegmentIndex && (
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-green-400 text-sm font-bold">Now Playing</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Video Title and View Details Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                      className="mt-6 px-2 text-center"
                    >
                      <h4 className="text-gray-900 font-bold text-xl mb-4">
                        {segment.title}
                      </h4>
                      <button
                        onClick={() => openVideoModal(index)}
                        className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold text-base transition-all duration-300 bg-green-50 hover:bg-green-100 px-6 py-3 rounded-xl shadow-sm hover:shadow-md"
                        aria-label={`View details for ${segment.title}`}
                      >
                        <Eye className="w-5 h-5" />
                        <span>View Details</span>
                      </button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>



              {/* Third card */}
              <div className="grid grid-cols-1 gap-6 lg:gap-8">
                {segments.slice(2).map((segment, index) => {
                  const actualIndex = index + 2;
                  return (
                    <motion.div
                      key={segment.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: actualIndex * 0.1 }}
                      className="hp-bp-video-item w-full max-w-md mx-auto"
                    >
                      {/* Enhanced Video Container - Larger and more prominent */}
                      <div
                        className={`relative bg-black rounded-2xl overflow-hidden shadow-xl transition-all duration-500 cursor-pointer w-full ${actualIndex === currentSegmentIndex
                          ? 'ring-4 ring-green-500 shadow-green-500/40 scale-105'
                          : 'hover:shadow-2xl hover:scale-102'
                          }`}
                        style={{ aspectRatio: '16/9', minHeight: '280px' }}
                        onClick={() => openVideoModal(actualIndex)}
                      >
                        {/* Video Element */}
                        <video
                          ref={videoRefs[actualIndex]}
                          className="w-full h-full object-cover"
                          muted={isMuted}
                          playsInline
                          poster={segment.poster}
                          aria-label={`Business process video: ${segment.title}`}
                        >
                          Your browser does not support the video tag.
                        </video>

                        {/* Loading Indicator */}
                        {isLoading[actualIndex] && (
                          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                              <p className="text-white text-base">Loading...</p>
                            </div>
                          </div>
                        )}

                        {/* Enhanced Video Overlay Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end">
                          <div className="p-6 w-full">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h3 className="text-white text-lg font-bold mb-2">
                                  {segment.title}
                                </h3>
                                <div className="flex items-center space-x-3">
                                  <span className="text-green-400 text-sm font-bold bg-green-400/20 rounded-full px-3 py-1">
                                    Step {actualIndex + 1}
                                  </span>
                                  {actualIndex === currentSegmentIndex && (
                                    <div className="flex items-center space-x-2">
                                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                      <span className="text-green-400 text-sm font-bold">Now Playing</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Video Title and View Details Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: actualIndex * 0.1 + 0.2 }}
                        className="mt-6 px-2 text-center"
                      >
                        <h4 className="text-gray-900 font-bold text-xl mb-4">
                          {segment.title}
                        </h4>
                        <button
                          onClick={() => openVideoModal(actualIndex)}
                          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold text-base transition-all duration-300 bg-green-50 hover:bg-green-100 px-6 py-3 rounded-xl shadow-sm hover:shadow-md"
                          aria-label={`View details for ${segment.title}`}
                        >
                          <Eye className="w-5 h-5" />
                          <span>View Details</span>
                        </button>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 flex justify-center"
            >
              <div className="flex items-center space-x-4">
                {segments.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 rounded-full transition-all duration-500 ${index === currentSegmentIndex
                      ? 'bg-green-600 w-16 shadow-lg'
                      : index < currentSegmentIndex
                        ? 'bg-green-400 w-8'
                        : 'bg-gray-300 w-8'
                      }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Details Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">
                  {segments[modalVideoIndex].title}
                </h3>
                <button
                  onClick={closeVideoModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Video */}
              <div className="relative bg-black" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={modalVideoRef}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  poster={segments[modalVideoIndex].poster}
                  aria-label={`Business process video: ${segments[modalVideoIndex].title}`}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {segments[modalVideoIndex].description}
                    </p>

                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <ul className="text-gray-600 space-y-2">
                      {modalVideoIndex === 0 && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Comprehensive requirement analysis</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Expert consultation and assessment</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Tailored solution development</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Budget and timeline planning</span>
                          </li>
                        </>
                      )}
                      {modalVideoIndex === 1 && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>State-of-the-art processing facilities</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Advanced logistics coordination</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Real-time tracking and monitoring</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Environmental compliance assurance</span>
                          </li>
                        </>
                      )}
                      {modalVideoIndex === 2 && (
                        <>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Precise delivery scheduling</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Comprehensive quality inspections</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Complete documentation package</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="text-green-600 mt-1">•</span>
                            <span>Ongoing customer support</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Video Details</h4>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{segments[modalVideoIndex].duration} seconds</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Segment:</span>
                        <span className="font-medium">{modalVideoIndex + 1} of {totalSegments}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Quality:</span>
                        <span className="font-medium">HD (720p)</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">MP4</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Captions:</span>
                        <span className="font-medium">Available</span>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Process Stage</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {modalVideoIndex + 1}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{segments[modalVideoIndex].title}</p>
                          <p className="text-sm text-gray-600">
                            {modalVideoIndex === 0 && "Foundation phase of our business process"}
                            {modalVideoIndex === 1 && "Core operational phase with processing"}
                            {modalVideoIndex === 2 && "Final delivery and completion phase"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Reader Instructions */}
      <div className="sr-only">
        Three videos showing business process segments. Videos play automatically when scrolled into view.
        Click on any video or "View Details" button to open detailed view. Use the mute button to control audio.
      </div>

      {/* Live Region for Screen Reader Announcements */}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {isInViewport ? `Playing segment ${currentSegmentIndex + 1} of ${totalSegments}: ${segments[currentSegmentIndex].title}` : 'Videos paused'}
      </div>
    </>
  );
}