
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const nav = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/partners", label: "Partners" },
  { to: "/certifications", label: "Certifications" },
  { to: "/news", label: "News" },
];

export default function SiteHeader() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
      isActive 
        ? "text-primary bg-primary/10 shadow-sm" 
        : "text-foreground/90 hover:text-foreground hover:bg-accent/50"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[hsl(var(--glass-bg))] border-b border-[hsl(var(--glass-border))] shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="font-extrabold tracking-tight text-lg text-foreground drop-shadow-sm group-hover:text-primary transition-colors duration-300"
            style={{
              textShadow: "0 1px 3px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.1)"
            }}
          >
            AAASHA TRADING LTD
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={getNavCls} end>
              {n.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-3">
          <NavLink to="/contact">
            <motion.div
              whileHover={{ scale: 1.05, brightness: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="hero" 
                size="lg"
                className="shadow-[var(--shadow-glow)] hover:shadow-[0_0_25px_rgba(76,175,80,0.4)] transition-all duration-300"
              >
                Contact Us
              </Button>
            </motion.div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}
