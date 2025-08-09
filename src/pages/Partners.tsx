
import SEO from "@/components/seo/SEO";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Handshake, Globe, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const partners = [
  {
    id: 1,
    name: "Global Steel Corp",
    type: "Manufacturing Partner",
    location: "Mumbai, India",
    since: "2020",
    description: "Leading steel manufacturer specializing in high-grade structural steel and industrial materials.",
    logo: "/placeholder.svg",
    rating: 4.9
  },
  {
    id: 2,
    name: "EcoRecycle Industries",
    type: "Recycling Partner",
    location: "Delhi, India",
    since: "2021",
    description: "Innovative recycling solutions provider with state-of-the-art processing facilities.",
    logo: "/placeholder.svg",
    rating: 4.8
  },
  {
    id: 3,
    name: "TechSteel Solutions",
    type: "Technology Partner",
    location: "Bangalore, India",
    since: "2022",
    description: "Advanced steel processing technology and automation systems provider.",
    logo: "/placeholder.svg",
    rating: 4.7
  },
  {
    id: 4,
    name: "International Trading Co.",
    type: "Distribution Partner",
    location: "Singapore",
    since: "2021",
    description: "Global distribution network covering Asia-Pacific markets with excellent logistics.",
    logo: "/placeholder.svg",
    rating: 4.9
  },
  {
    id: 5,
    name: "Green Energy Steel",
    type: "Sustainability Partner",
    location: "Chennai, India",
    since: "2023",
    description: "Renewable energy-powered steel production facility focused on carbon-neutral operations.",
    logo: "/placeholder.svg",
    rating: 4.8
  },
  {
    id: 6,
    name: "Quality Assurance Labs",
    type: "Testing Partner",
    location: "Pune, India",
    since: "2020",
    description: "ISO-certified materials testing and quality assurance services for steel products.",
    logo: "/placeholder.svg",
    rating: 5.0
  }
];

const partnerTypes = [
  { type: "Manufacturing Partner", count: 12, icon: Users },
  { type: "Recycling Partner", count: 8, icon: Globe },
  { type: "Technology Partner", count: 5, icon: Star },
  { type: "Distribution Partner", count: 15, icon: MapPin }
];

export default function Partners() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate partner cards
    gsap.fromTo(".partner-card", 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".partners-grid",
          start: "top 80%"
        }
      }
    );

    // Animate stats cards
    gsap.fromTo(".stats-card", 
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        }
      }
    );
  }, []);

  return (
    <main>
      <SEO title="Partners — AAASHA TRADING LTD" description="Our key business partners and collaborations." />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] grid place-items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234CAF50" fill-opacity="0.04"%3E%3Cpolygon points="25,0 50,25 25,50 0,25"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
        
        <div className="container relative z-10 py-20 text-center" data-aos="fade-up">
          <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))] backdrop-blur-md mb-6">
            <Handshake className="w-4 h-4 mr-2 text-primary" />
            Strategic Partnerships
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Our Global <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Partner Network</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Building stronger relationships with industry leaders to deliver exceptional value and drive sustainable innovation in steel trading.
          </p>
        </div>
      </section>

      {/* Partner Statistics */}
      <section className="container py-16 stats-section" data-aos="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partnerTypes.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.type} className="stats-card text-center rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-extrabold text-primary mb-1">{item.count}+</div>
                <p className="text-sm text-muted-foreground font-medium">{item.type}s</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partners Grid */}
      <section className="container py-16" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Partners</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Meet some of our valued partners who help us deliver excellence in steel trading and recycling.</p>
        </div>

        <div className="partners-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="partner-card group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-6 shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Partner Logo */}
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-[hsl(var(--glass-border))] shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                    {partner.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                </div>

                {/* Partner Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                    {partner.name}
                  </h3>
                  <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-2">
                    {partner.type}
                  </div>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {partner.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current text-yellow-500" />
                      {partner.rating}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                {/* Partnership Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-[hsl(var(--glass-border))]">
                  <span className="text-xs text-muted-foreground">Partner since {partner.since}</span>
                  <Button variant="ghost" size="sm" className="h-8 px-3">
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="container py-16" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Partnership Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Why leading companies choose to partner with AAASHA TRADING LTD.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Reach</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Access to international markets and extensive distribution networks across multiple continents.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rigorous quality standards and continuous monitoring to ensure premium product delivery.
              </p>
            </div>
          </div>

          <div className="group relative rounded-2xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-8 text-center shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Collaborative Growth</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Joint innovation initiatives and shared expertise for mutual business growth and success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-16" data-aos="fade-up">
        <div className="text-center rounded-3xl border border-[hsl(var(--glass-border))] bg-[hsl(var(--glass-bg))] backdrop-blur-md p-12 shadow-[var(--shadow-elegant)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interested in Partnership?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our growing network of partners and explore new opportunities in sustainable steel trading.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button variant="hero" size="lg" className="group">
                  Become a Partner
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="glass" size="lg">
                Download Partnership Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
