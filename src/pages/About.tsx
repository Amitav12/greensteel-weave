
import SEO from "@/components/seo/SEO";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Globe } from "lucide-react";
import { Link } from "react-router-dom";

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
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234CAF50" fill-opacity="0.05"%3E%3Ccircle cx="20" cy="20" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        
        <div className="container relative z-10 py-20 text-center" data-aos="fade-up">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))] backdrop-blur-md mb-6">
            <Globe className="w-4 h-4 mr-2 text-primary" />
            About AAASHA TRADING LTD
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Building a <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sustainable Future</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Leading the steel trading industry through innovative recycling solutions and environmental stewardship, creating value for our partners while protecting our planet.
          </p>
        </div>
      </section>

      {/* Core Values Cards */}
      <section className="container py-16 feature-cards" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="feature-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mission</h3>
              <p className="text-sm text-muted-foreground">Driving sustainability through responsible sourcing and innovative recycling solutions.</p>
            </div>
          </div>

          <div className="feature-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vision</h3>
              <p className="text-sm text-muted-foreground">To be the world's leading sustainable steel trading company, setting industry standards.</p>
            </div>
          </div>

          <div className="feature-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Values</h3>
              <p className="text-sm text-muted-foreground">Integrity, innovation, environmental responsibility, and customer-first approach.</p>
            </div>
          </div>

          <div className="feature-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-sm text-muted-foreground">Serving clients worldwide with premium quality materials and exceptional service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="container py-16 timeline-section" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">From humble beginnings to industry leadership - the story of sustainable innovation.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="timeline-item flex items-center gap-6">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"></div>
              <div className="flex-1 rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">2020</span>
                  <h3 className="text-lg font-semibold">Company Founded</h3>
                </div>
                <p className="text-muted-foreground">AAASHA TRADING LTD was established with a vision to revolutionize the steel trading industry through sustainable practices.</p>
              </div>
            </div>

            <div className="timeline-item flex items-center gap-6">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"></div>
              <div className="flex-1 rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">2021</span>
                  <h3 className="text-lg font-semibold">First Major Partnership</h3>
                </div>
                <p className="text-muted-foreground">Secured strategic partnerships with leading steel manufacturers and recycling facilities across the region.</p>
              </div>
            </div>

            <div className="timeline-item flex items-center gap-6">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"></div>
              <div className="flex-1 rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">2022</span>
                  <h3 className="text-lg font-semibold">Environmental Certification</h3>
                </div>
                <p className="text-muted-foreground">Achieved ISO 14001 environmental management certification, demonstrating our commitment to sustainable operations.</p>
              </div>
            </div>

            <div className="timeline-item flex items-center gap-6">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg"></div>
              <div className="flex-1 rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">2023</span>
                  <h3 className="text-lg font-semibold">Global Expansion</h3>
                </div>
                <p className="text-muted-foreground">Expanded operations to international markets, establishing a global network of suppliers and clients.</p>
              </div>
            </div>

            <div className="timeline-item flex items-center gap-6">
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg animate-pulse"></div>
              <div className="flex-1 rounded-xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full">2024</span>
                  <h3 className="text-lg font-semibold">Innovation Leadership</h3>
                </div>
                <p className="text-muted-foreground">Pioneering new technologies in steel recycling and sustainable trading practices, setting new industry benchmarks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container py-16" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Meet the visionary leaders driving our sustainable mission forward.</p>
        </div>

        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="team-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold text-primary">
                  AS
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Arjun Sharma</h3>
              <p className="text-primary font-medium mb-3">CEO & Founder</p>
              <p className="text-sm text-muted-foreground">Visionary leader with 15+ years in sustainable steel trading and environmental innovation.</p>
            </div>
          </div>

          <div className="team-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold text-primary">
                  PM
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Priya Mehta</h3>
              <p className="text-primary font-medium mb-3">CTO</p>
              <p className="text-sm text-muted-foreground">Technology strategist driving digital transformation in steel trading operations.</p>
            </div>
          </div>

          <div className="team-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-2xl font-bold text-primary">
                  RK
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Rajesh Kumar</h3>
              <p className="text-primary font-medium mb-3">Head of Operations</p>
              <p className="text-sm text-muted-foreground">Operations expert ensuring seamless supply chain and quality management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container py-16" data-aos="fade-up">
        <div className="rounded-3xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-12 shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Measurable results from our commitment to sustainable steel trading.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">500+</div>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">50+</div>
                <p className="text-sm text-muted-foreground">Countries Served</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">99.8%</div>
                <p className="text-sm text-muted-foreground">Quality Rating</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-primary mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-16" data-aos="fade-up">
        <div className="text-center rounded-3xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-12 shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join the sustainable steel revolution. Let's build a greener future together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="glass" size="lg">
                  Explore Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
