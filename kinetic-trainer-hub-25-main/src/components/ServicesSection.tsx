import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Dumbbell, Heart, Zap, Target, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PricingTag from '@/components/PricingTag';

interface Service {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  features?: string[];
  pricing?: {
    type: 'single' | 'range' | 'tiered' | 'contact';
    value?: number;
    minValue?: number;
    maxValue?: number;
    tiers?: Array<{ name: string; price: number; description?: string }>;
    currency: string;
    period?: string;
    isVisible?: boolean;
  };
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

interface ServicesProps {
  services?: Service[];
}

const ServicesSection = ({ services: dbServices = [] }: ServicesProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Clear any cached USD pricing data and force INR
  React.useEffect(() => {
    const clearOldPricingData = () => {
      try {
        const stored = localStorage.getItem('kineticTrainerPricing');
        if (stored) {
          const data = JSON.parse(stored);
          if (data.services) {
            // Check if any service has USD currency and update to INR
            let hasUSD = false;
            Object.values(data.services).forEach((service: any) => {
              if (service.pricing && service.pricing.currency === 'USD') {
                service.pricing.currency = 'INR';
                hasUSD = true;
              }
            });
            if (hasUSD) {
              localStorage.setItem('kineticTrainerPricing', JSON.stringify(data));
            }
          }
        }
      } catch (error) {
        console.warn('Failed to update cached pricing data:', error);
      }
    };
    clearOldPricingData();
  }, []);

  // Default services as fallback
  const defaultServices = [
    {
      id: 'strength-training',
      icon: Dumbbell,
      title: 'Strength Training',
      description: 'Build lean muscle and increase your power with personalized strength programs.',
      features: ['Custom workout plans', 'Progressive overload', 'Form correction'],
      gradient: 'from-primary to-primary-glow',
      pricing: {
        type: 'tiered' as const,
        tiers: [
          { name: 'Single Session', price: 75, description: 'One-time training session' },
          { name: 'Monthly Package', price: 280, description: '4 sessions per month' }
        ],
        currency: 'INR',
        period: 'session',
        isVisible: true
      }
    },
    {
      id: 'cardio-conditioning',
      icon: Heart,
      title: 'Cardio Conditioning',
      description: 'Improve cardiovascular health and endurance with engaging cardio workouts.',
      features: ['HIIT training', 'Endurance building', 'Fat burning'],
      gradient: 'from-secondary to-accent',
    },
    {
      id: 'functional-fitness',
      icon: Zap,
      title: 'Functional Fitness',
      description: 'Enhance everyday movement patterns and athletic performance.',
      features: ['Movement quality', 'Injury prevention', 'Performance optimization'],
      gradient: 'from-accent to-primary',
    },
    {
      id: 'goal-specific-training',
      icon: Target,
      title: 'Goal-Specific Training',
      description: 'Customized programs designed around your specific fitness objectives.',
      features: ['Personalized approach', 'Regular assessments', 'Adaptive programming'],
      gradient: 'from-success to-secondary',
    },
    {
      id: 'group-sessions',
      icon: Users,
      title: 'Group Sessions',
      description: 'Train with others in motivating small group environments.',
      features: ['Social motivation', 'Shared experiences', 'Community support'],
      gradient: 'from-primary to-accent',
    },
    {
      id: 'flexible-scheduling',
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Training sessions that fit your busy lifestyle and schedule.',
      features: ['Online options', 'Flexible timing', '24/7 support'],
      gradient: 'from-secondary to-primary',
    },
  ];

  // Map icon names to actual icons
  const getIconFromName = (iconName?: string) => {
    const iconMap: { [key: string]: any } = {
      'dumbbell': Dumbbell,
      'heart': Heart,
      'zap': Zap,
      'target': Target,
      'users': Users,
      'clock': Clock,
    };
    return iconMap[iconName?.toLowerCase() || ''] || Dumbbell;
  };

  // Use database services if available, otherwise fall back to default
  const servicesToDisplay = dbServices.length > 0 
    ? dbServices.map((service, index) => ({
        id: service.id,
        icon: getIconFromName(service.icon_name),
        title: service.title,
        description: service.description,
        features: service.features || ['Personalized training', 'Expert guidance', 'Results focused'],
        gradient: defaultServices[index % defaultServices.length]?.gradient || 'from-primary to-secondary',
        pricing: service.pricing ? {
          ...service.pricing,
          currency: 'INR'
        } : { type: 'contact' as const, currency: 'INR', isVisible: true }
      }))
    : defaultServices;

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🎯 Our Services
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Transform Through{' '}
            <span className="gradient-text">Expert Training</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive fitness solutions tailored to your unique goals and lifestyle, 
            delivered by certified professionals with proven results.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesToDisplay.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ 
                y: -8, 
                transition: { duration: 0.3 } 
              }}
            >
              <Card className="h-full bg-gradient-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden relative">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <CardContent className="p-6 relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-glow`}
                  >
                    <service.icon className="w-8 h-8 text-background" />
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Pricing Tag */}
                  <div className="mb-6">
                    <PricingTag 
                      pricing={service.pricing}
                      isVisible={service.pricing.isVisible !== false}
                      gradient={service.gradient}
                      className="w-fit"
                    />
                  </div>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ 
                          delay: (index * 0.1) + (featureIndex * 0.05) + 0.3,
                          duration: 0.4 
                        }}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full mr-3 flex-shrink-0`} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Hover glow effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-hero px-8 py-4 text-lg font-semibold rounded-2xl group"
          >
            Start Your Transformation Today
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2 inline-block"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
