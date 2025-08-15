import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SuccessStory {
  id: string;
  client_name: string;
  before_image?: string;
  after_image?: string;
  transformation_story: string;
  duration_months: number;
  weight_lost_lbs?: number;
  is_active: boolean;
}

interface TransformationGalleryProps {
  successStories?: SuccessStory[];
}

const TransformationGallery = ({ successStories: dbStories = [] }: TransformationGalleryProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Default transformations as fallback
  const defaultTransformations = [
    {
      name: 'Sarah Johnson',
      age: 32,
      duration: '6 months',
      weightLoss: '25 lbs',
      beforeImage: '/api/placeholder/300/400',
      afterImage: '/api/placeholder/300/400',
      story: 'Lost 25 pounds and gained incredible confidence through strength training.',
      results: ['Lost 25 lbs', 'Gained muscle', 'Increased energy', 'Better sleep']
    },
    {
      name: 'Mike Chen',
      age: 28,
      duration: '4 months',
      weightLoss: '30 lbs',
      beforeImage: '/api/placeholder/300/400',
      afterImage: '/api/placeholder/300/400',
      story: 'Transformed from couch potato to marathon runner with dedication.',
      results: ['Lost 30 lbs', 'Ran first marathon', 'Built endurance', 'Lifestyle change']
    },
    {
      name: 'Emily Davis',
      age: 45,
      duration: '8 months',
      weightLoss: '35 lbs',
      beforeImage: '/api/placeholder/300/400',
      afterImage: '/api/placeholder/300/400',
      story: 'Regained strength and vitality after years of inactivity.',
      results: ['Lost 35 lbs', 'Increased strength', 'Pain relief', 'Mental clarity']
    }
  ];

  // Convert database stories to display format
  const transformationsToDisplay = dbStories.length > 0 
    ? dbStories.map(story => ({
        name: story.client_name,
        age: 30, // Default age since not in database
        duration: `${story.duration_months} months`,
        weightLoss: story.weight_lost_lbs ? `${story.weight_lost_lbs} lbs` : 'Great results',
        beforeImage: story.before_image || '/api/placeholder/300/400',
        afterImage: story.after_image || '/api/placeholder/300/400',
        story: story.transformation_story,
        results: ['Amazing transformation', 'Increased confidence', 'Better health', 'Lifestyle change']
      }))
    : defaultTransformations;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformationsToDisplay.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformationsToDisplay.length) % transformationsToDisplay.length);
  };

  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ⭐ Success Stories
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Real People,{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our personalized training programs have transformed lives. 
            These are real clients with real results.
          </p>
        </motion.div>

        {/* Main transformation showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative"
        >
          <Card className="bg-gradient-card border-border/50 overflow-hidden shadow-hero">
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Before/After Images */}
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <div className="aspect-[3/4] bg-muted/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium text-destructive mb-2">BEFORE</div>
                          <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-2"></div>
                          <div className="text-xs text-muted-foreground">Placeholder Image</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                        <div className="absolute bottom-4 left-4 text-sm font-semibold text-destructive">
                          BEFORE
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <div className="aspect-[3/4] bg-muted/50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-sm font-medium text-success mb-2">AFTER</div>
                          <div className="w-20 h-20 bg-success/20 rounded-full mx-auto mb-2"></div>
                          <div className="text-xs text-muted-foreground">Placeholder Image</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
                        <div className="absolute bottom-4 left-4 text-sm font-semibold text-success">
                          AFTER
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Navigation arrows */}
                  <div className="flex justify-center mt-6 gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={prevSlide}
                      className="w-12 h-12 rounded-full border-border/50 hover:bg-primary/20 hover:border-primary/50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={nextSlide}
                      className="w-12 h-12 rounded-full border-border/50 hover:bg-primary/20 hover:border-primary/50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Transformation details */}
                <div className="space-y-6">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-background font-bold text-xl">
                          {transformationsToDisplay[currentSlide].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{transformationsToDisplay[currentSlide].name}</h3>
                        <p className="text-muted-foreground">Age {transformationsToDisplay[currentSlide].age}</p>
                      </div>
                    </div>

                    <blockquote className="text-lg italic mb-6 border-l-4 border-primary pl-4">
                      "{transformationsToDisplay[currentSlide].story}"
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {transformationsToDisplay[currentSlide].duration}
                        </div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-accent">
                          {transformationsToDisplay[currentSlide].weightLoss}
                        </div>
                        <div className="text-sm text-muted-foreground">Weight Lost</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Key Results:</h4>
                      {transformationsToDisplay[currentSlide].results.map((result, index) => (
                        <motion.div
                          key={result}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <div className="w-2 h-2 bg-success rounded-full mr-3" />
                          <span className="text-muted-foreground">{result}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button className="btn-hero mt-6 group">
                      <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                      Watch Transformation Video
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Slide indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {transformationsToDisplay.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TransformationGallery;
