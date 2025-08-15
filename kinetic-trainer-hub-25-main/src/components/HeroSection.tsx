
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Star, Users, Trophy, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TrainerVideoSection from './TrainerVideoSection';
import CompanyHeader from './CompanyHeader';

const HeroSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate();
  const [heroContent, setHeroContent] = useState({
    title: "Transform Your Body & Mind",
    subtitle: "Professional Personal Training",
    description: "Unlock your potential with personalized training programs designed to help you achieve lasting results and build sustainable habits.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    cta_text: "Start Your Journey",
    cta_url: "/book-appointment"
  });

  useEffect(() => {
    // Load hero content from localStorage (managed by admin)
    const stored = localStorage.getItem('heroContent');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setHeroContent(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    }

    // Listen for updates from admin panel
    const handleHeroContentUpdate = (event: CustomEvent) => {
      setHeroContent(prev => ({ ...prev, ...event.detail }));
    };

    window.addEventListener('heroContentUpdated', handleHeroContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('heroContentUpdated', handleHeroContentUpdate as EventListener);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    { label: 'Workouts', value: '300+', icon: Zap },
    { label: 'Members', value: '100+', icon: Users },
    { label: 'Awards', value: '15+', icon: Star },
  ];

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Company Header */}
      <div className="absolute top-8 left-8 z-50">
        <CompanyHeader />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="min-h-screen flex items-center"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  {heroContent.title.split(' ').slice(0, 2).join(' ')}{' '}
                  <motion.span 
                    className="gradient-text relative"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: 'linear' 
                    }}
                  >
                    {heroContent.title.split(' ').slice(2).join(' ')}
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-muted-foreground max-w-xl leading-relaxed"
                >
                  {heroContent.description}
                </motion.p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="btn-hero px-8 py-6 text-lg font-semibold group"
                    onClick={() => navigate(heroContent.cta_url)}
                  >
                    {heroContent.cta_text}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-6 text-lg font-semibold border-2 hover:bg-primary/10"
                    onClick={() => navigate('/success-stories')}
                  >
                    <Trophy className="mr-2 h-5 w-5" />
                    Success Stories
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="text-center p-5 rounded-lg bg-muted/5 hover:bg-muted/10 transition-colors"
                  >
                    <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - Video Section */}
            <motion.div variants={itemVariants} className="relative">
              <TrainerVideoSection trainerVideo={heroContent.video_url} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-0 right-0 text-center"
      >
        <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowRight className="h-6 w-6 mx-auto transform rotate-90" />
          </motion.div>
          Scroll Down
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
