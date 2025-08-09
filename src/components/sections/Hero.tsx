import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-recycling-steel.jpg";
import { useTypewriter } from "@/hooks/useTypewriter";
import { Link } from "react-router-dom";

export default function Hero() {
  const { text, cursor } = useTypewriter([
    "Sustainable Recycling",
    "Premium Steel Trading",
    "Environmental Responsibility",
  ], 45, 1400);

  return (
    <section className="relative min-h-[70vh] grid place-items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Recycling and steel operations hero image"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

      <div className="container relative z-10 py-20 text-center animate-enter" data-aos="fade-up">
        <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[hsl(var(--glass-bg))] border border-[hsl(var(--glass-border))]">AAASHA TRADING LTD</span>
        <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight">
          Driving <span className="text-primary">Sustainability</span> in Steel
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {text}<span className="text-primary">{cursor}</span>
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link to="/products"><Button variant="hero" size="lg">Explore Products</Button></Link>
          <Link to="/contact"><Button variant="glass" size="lg">Contact Us</Button></Link>
        </div>
      </div>
    </section>
  );
}
