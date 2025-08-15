import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Play, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SuccessStories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const transformations = [
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
    },
    {
      name: 'David Rodriguez',
      age: 35,
      duration: '5 months',
      weightLoss: '40 lbs',
      beforeImage: '/api/placeholder/300/400',
      afterImage: '/api/placeholder/300/400',
      story: 'Overcame years of unhealthy habits and built a sustainable fitness routine.',
      results: ['Lost 40 lbs', 'Improved cardiovascular health', 'Reduced stress', 'Better work-life balance']
    },
    {
      name: 'Lisa Thompson',
      age: 29,
      duration: '7 months',
      weightLoss: '22 lbs',
      beforeImage: '/api/placeholder/300/400',
      afterImage: '/api/placeholder/300/400',
      story: 'Gained strength and confidence while preparing for her wedding day.',
      results: ['Lost 22 lbs', 'Toned physique', 'Increased confidence', 'Wedding ready']
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % transformations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⭐ Success Stories
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Real People, <span className="text-accent">Real Results</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              See how our personalized training programs have transformed lives. These are real clients with real results.
            </p>
            
            {/* Back to Home Button */}
            <Link to="/">
              <Button 
                variant="outline" 
                className="mt-8 border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Main transformation showcase */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mb-16"
        >
          <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 overflow-hidden shadow-2xl">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {transformations[currentSlide].name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{transformations[currentSlide].name}</h3>
                        <p className="text-muted-foreground">Age {transformations[currentSlide].age}</p>
                      </div>
                    </div>

                    <blockquote className="text-lg italic mb-6 border-l-4 border-primary pl-4">
                      "{transformations[currentSlide].story}"
                    </blockquote>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {transformations[currentSlide].duration}
                        </div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-accent">
                          {transformations[currentSlide].weightLoss}
                        </div>
                        <div className="text-sm text-muted-foreground">Weight Lost</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Key Results:</h4>
                      {transformations[currentSlide].results.map((result, index) => (
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

                    <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white mt-6 group">
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
        <div className="flex justify-center mb-16 gap-2">
          {transformations.map((_, index) => (
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

        {/* All Stories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">All Success Stories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {transformations.map((transformation, index) => (
              <motion.div
                key={transformation.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setCurrentSlide(index)}
              >
                <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          {transformation.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{transformation.name}</h3>
                        <p className="text-sm text-muted-foreground">Age {transformation.age}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {transformation.story}
                    </p>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-semibold">{transformation.duration}</span>
                      <span className="text-accent font-semibold">{transformation.weightLoss}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Transformation?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of clients who have achieved their fitness goals with our personalized training programs.
              </p>
              <Link to="/">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 text-lg">
                  Book Your Free Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessStories;