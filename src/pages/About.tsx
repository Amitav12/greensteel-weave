import SEO from "@/components/seo/SEO";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Globe, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MotionFadeIn from "@/components/motion/MotionFadeIn";
import MotionStagger from "@/components/motion/MotionStagger";
import Parallax from "@/components/motion/Parallax";

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate cards on scroll
    gsap.fromTo(".feature-card", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".feature-cards",
          start: "top 80%"
        }
      }
    );

    // Animate timeline items
    gsap.fromTo(".timeline-item",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".timeline-section",
          start: "top 70%"
        }
      }
    );

    // Animate team cards
    gsap.fromTo(".team-card",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <main>
      <SEO title="About — AAASHA TRADING LTD" description="Our story, mission, and commitment to environmental responsibility." />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[60vh] grid place-items-center overflow-hidden">
        <Parallax offset={30} className="absolute inset-0">
          <div className="bg-gradient-to-br from-primary/10 to-accent/5 w-full h-full" />
        </Parallax>
        
        <div className="absolute inset-0 subtle-noise" />
        
        <div className="container relative z-10 py-20 text-center">
          <MotionFadeIn delay={0.1}>
            <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold glass-card backdrop-blur-md mb-6">
              <Globe className="w-4 h-4 mr-2 text-primary" />
              About AAASHA TRADING LTD
            </div>
          </MotionFadeIn>
          
          <MotionFadeIn delay={0.3}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Building a <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sustainable Future</span>
            </h1>
          </MotionFadeIn>
          
          <MotionFadeIn delay={0.5}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Leading the steel trading industry through innovative recycling solutions and environmental stewardship, creating value for our partners while protecting our planet.
            </p>
          </MotionFadeIn>
        </div>
      </section>

      {/* Enhanced Core Values Cards */}
      <section className="container py-16">
        <MotionStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Target, title: "Mission", desc: "Driving sustainability through responsible sourcing and innovative recycling solutions." },
            { icon: Award, title: "Vision", desc: "To be the world's leading sustainable steel trading company, setting industry standards." },
            { icon: Users, title: "Values", desc: "Integrity, innovation, environmental responsibility, and customer-first approach." },
            { icon: Globe, title: "Global Reach", desc: "Serving clients worldwide with premium quality materials and exceptional service." }
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ 
                  y: -8,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02
                }}
                className="group relative glass-card-hover rounded-2xl p-8 text-center"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </MotionStagger>
      </section>

      {/* Enhanced Timeline with SVG Animation */}
      <section className="container py-16 timeline-section">
        <MotionFadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From humble beginnings to industry leadership - the story of sustainable innovation.</p>
        </MotionFadeIn>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-8 top-0 w-0.5 bg-gradient-to-b from-primary to-accent"
          />

          <div className="space-y-8">
            {[
              { year: "2020", title: "Company Founded", desc: "AAASHA TRADING LTD was established with a vision to revolutionize the steel trading industry through sustainable practices." },
              { year: "2021", title: "First Major Partnership", desc: "Secured strategic partnerships with leading steel manufacturers and recycling facilities across the region." },
              { year: "2022", title: "Environmental Certification", desc: "Achieved ISO 14001 environmental management certification, demonstrating our commitment to sustainable operations." },
              { year: "2023", title: "Global Expansion", desc: "Expanded operations to international markets, establishing a global network of suppliers and clients." },
              { year: "2024", title: "Innovation Leadership", desc: "Pioneering new technologies in steel recycling and sustainable trading practices, setting new industry benchmarks." }
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="timeline-item flex items-center gap-6"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"
                />
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex-1 glass-card-hover rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="container py-16">
        <MotionFadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Meet the visionary leaders driving our sustainable mission forward.</p>
        </MotionFadeIn>

        <MotionStagger className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Arjun Sharma", role: "CEO & Founder", initials: "AS", desc: "Visionary leader with 15+ years in sustainable steel trading and environmental innovation." },
            { name: "Priya Mehta", role: "CTO", initials: "PM", desc: "Technology strategist driving digital transformation in steel trading operations." },
            { name: "Rajesh Kumar", role: "Head of Operations", initials: "RK", desc: "Operations expert ensuring seamless supply chain and quality management." }
          ].map((member) => (
            <motion.div
              key={member.name}
              whileHover={{ 
                y: -5,
                rotateY: 5,
                scale: 1.05
              }}
              className="team-card group glass-card-hover rounded-2xl p-6 text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-lg"
                >
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold text-primary">
                    {member.initials}
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.desc}</p>
              </div>
            </motion.div>
          ))}
        </MotionStagger>
      </section>

      {/* Facility Video Section */}
      <section className="container py-16">
        <MotionFadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facilities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Take a virtual tour of our state-of-the-art processing facilities.</p>
        </MotionFadeIn>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="max-w-4xl mx-auto glass-card-hover rounded-2xl overflow-hidden"
        >
          <div className="relative aspect-video">
            <img 
              src="/placeholder.svg" 
              alt="Facility tour"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="hero" size="lg" className="gap-2">
                  <Play className="w-5 h-5" />
                  Watch Facility Tour
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="container py-16">
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl glass-card p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <MotionFadeIn className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Measurable results from our commitment to sustainable steel trading.</p>
            </MotionFadeIn>

            <MotionStagger className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "500+", label: "Happy Clients" },
                { value: "50+", label: "Countries Served" },
                { value: "99.8%", label: "Quality Rating" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </MotionStagger>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="container py-16">
        <motion.div
          whileInView={{ scale: [0.95, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center glass-card-hover rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
          <div className="relative z-10">
            <MotionFadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join the sustainable steel revolution. Let's build a greener future together.
              </p>
            </MotionFadeIn>
            
            <MotionFadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="hero" size="lg" className="group magnetic-hover">
                      Get in Touch
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/products">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="glass" size="lg">
                      Explore Products
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </MotionFadeIn>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
