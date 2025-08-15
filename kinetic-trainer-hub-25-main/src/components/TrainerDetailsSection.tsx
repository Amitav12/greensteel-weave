import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Certification {
  name: string;
  image: string;
}

interface TrainerInfo {
  id: string;
  name: string;
  title: string;
  bio: string;
  profile_image?: string;
  certifications?: string[] | Certification[];
  experience_years?: number;
  specializations?: string[];
  awards?: string[];
}

interface TrainerDetailsProps {
  trainerInfo?: TrainerInfo | null;
}

const TrainerDetailsSection = ({ trainerInfo }: TrainerDetailsProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultTrainerData = {
    name: "Prahallad Sahoo",
    title: "Certified Personal Trainer",
    bio: "Passionate about helping clients achieve their fitness goals through personalized training programs.",
    profile_image: "/api/placeholder/300/400",
    certifications: [
      {
        name: "ACE Certified Personal Trainer",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "NASM Corrective Exercise Specialist",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "Precision Nutrition Level 1 Coach",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "FMS Functional Movement Screen",
        image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "ACSM Exercise Physiologist",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "TRX Suspension Training Certification",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "NSCA Certified Strength & Conditioning Specialist",
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=200&fit=crop&crop=center"
      },
      {
        name: "Yoga Alliance RYT-200 Certification",
        image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?w=300&h=200&fit=crop&crop=center"
      }
    ],
    experience_years: 16,
    specializations: [
      "Strength Training",
      "Weight Loss", 
      "Functional Fitness"
    ],
    awards: [
      "2024 Elite Trainer of the Year",
      "Outstanding Client Transformation Award 2023",
      "Fitness Excellence Recognition 2022",
      "Best Personal Trainer - Regional 2021",
      "Community Health Impact Award 2020",
      "Top Fitness Professional 2019",
      "International Fitness Hall of Fame 2024",
      "Master Trainer Certification Award",
      "Client Success Champion 2023",
      "Innovation in Fitness Training Award",
      "Lifetime Achievement in Personal Training",
      "Excellence in Sports Performance Coaching",
      "Outstanding Mentor Award 2022",
      "Fitness Industry Leadership Award"
    ]
  };

  const displayData = trainerInfo || defaultTrainerData;

  // Process certifications and awards from database format
  const processedCertifications = Array.isArray(displayData.certifications) 
    ? displayData.certifications 
    : defaultTrainerData.certifications;
    
  const processedAwards = Array.isArray(displayData.awards) 
    ? displayData.awards 
    : defaultTrainerData.awards;

  const slideItems = [
    ...processedCertifications.map(cert => ({ 
      type: 'certification', 
      text: typeof cert === 'string' ? cert : cert.name,
      image: typeof cert === 'string' ? null : cert.image
    })),
    ...processedAwards.map(award => ({ 
      type: 'award', 
      text: award,
      image: null
    }))
  ];

  // Debug logging
  console.log('TrainerDetailsSection - slideItems:', slideItems);
  console.log('TrainerDetailsSection - slideItems.length:', slideItems.length);
  console.log('TrainerDetailsSection - currentSlide:', currentSlide);
  console.log('TrainerDetailsSection - processedCertifications:', processedCertifications);
  console.log('TrainerDetailsSection - displayData.certifications:', displayData.certifications);

  // Auto-advance slideshow with proper looping
  useEffect(() => {
    if (slideItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideItems.length);
    }, 2000); // Reduced to 2 seconds for faster looping
    
    return () => clearInterval(interval);
  }, [slideItems.length]);

  // Reset slide when slideItems change
  useEffect(() => {
    if (slideItems.length > 0) {
      setCurrentSlide(0);
    }
  }, [slideItems.length]);

  // Ensure currentSlide is within bounds
  const safeCurrentSlide = Math.min(currentSlide, slideItems.length - 1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="trainer" className="py-20 relative overflow-hidden">
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
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                duration: 0.8,
              },
            },
          }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-7xl mx-auto"
        >
          <motion.div
            variants={itemVariants}
            className="text-center mb-16"
          >
            <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
              💪 Expert Trainer
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold">
              Meet Your{' '}
              <span className="gradient-text">Dedicated Coach</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get personalized guidance and motivation from our certified trainer, 
              committed to helping you achieve your fitness aspirations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }} className="space-y-8">
              <div className="space-y-6">
                <motion.h3 
                  variants={itemVariants}
                  className="text-3xl lg:text-4xl font-bold"
                >
                  {displayData.name}
                </motion.h3>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-xl text-primary font-semibold"
                >
                  {displayData.title}
                </motion.p>
                
                <motion.p 
                  variants={itemVariants}
                  className="text-lg text-muted-foreground leading-relaxed"
                >
                  {displayData.bio}
                </motion.p>
              </div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-6"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {displayData.experience_years || 8}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-accent/10 to-success/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:from-accent/20 group-hover:to-success/20 transition-all">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    500+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Clients Trained
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-bold mb-4 text-foreground">Specializations</h4>
                <div className="flex flex-wrap gap-3">
                  {(displayData.specializations || defaultTrainerData.specializations).map((spec, index) => (
                    <motion.div
                      key={spec}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-sm font-medium border border-primary/30 hover:border-primary/50 transition-all"
                    >
                      {spec}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }} className="relative space-y-6">
              {/* Certifications & Awards Carousel Panel */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-8 border border-primary/10 shadow-2xl h-96"
              >
                <div className="h-full flex flex-col">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">Professional Credentials</h3>
                    <p className="text-muted-foreground">Certifications & Awards</p>
                  </div>
                  
                  <div className="flex-1 flex items-center justify-center">
                    {slideItems.length > 0 && slideItems[safeCurrentSlide] ? (
                      <motion.div
                        key={`slide-${safeCurrentSlide}`}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.6 }}
                        className="text-center w-full max-w-sm"
                      >
                        {/* Certification Image or Icon */}
                        <div className="flex items-center justify-center mb-4">
                          {slideItems[safeCurrentSlide]?.image ? (
                            <div className="w-32 h-20 rounded-lg overflow-hidden shadow-lg mb-4 bg-muted/20">
                              <img
                                src={slideItems[safeCurrentSlide].image}
                                alt={slideItems[safeCurrentSlide]?.text}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  console.log('Image failed to load:', slideItems[safeCurrentSlide].image);
                                }}
                              />
                            </div>
                          ) : slideItems[safeCurrentSlide]?.type === 'certification' ? (
                            <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4">
                              <GraduationCap className="w-8 h-8 text-primary" />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mb-4">
                              <Award className="w-8 h-8 text-accent" />
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full text-xs font-medium text-muted-foreground mb-2">
                            {slideItems[safeCurrentSlide]?.type === 'certification' ? 'CERTIFICATION' : 'AWARD'}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-bold text-foreground mb-2 leading-tight">
                          {slideItems[safeCurrentSlide]?.text}
                        </h4>
                        
                        <div className="text-sm text-muted-foreground">
                          {slideItems[safeCurrentSlide]?.type === 'certification' ? 'Professional Certification' : 'Recognition & Achievement'}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Loading credentials...</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Progress indicators */}
                  {slideItems.length > 1 && (
                    <div className="flex justify-center space-x-2 mt-6">
                      {slideItems.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === safeCurrentSlide 
                              ? 'bg-primary scale-125 shadow-lg' 
                              : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Floating stats */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white p-3 rounded-xl shadow-lg">
                    <div className="text-xs font-semibold">Total</div>
                    <div className="text-sm font-bold">{slideItems.length} Items</div>
                  </div>
                </div>
              </motion.div>




            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainerDetailsSection;
