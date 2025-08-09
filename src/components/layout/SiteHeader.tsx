
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
    `px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-md ${
      isActive 
        ? "text-white bg-primary/30 border border-primary/50 shadow-lg shadow-primary/20" 
        : "text-white/90 hover:text-white hover:bg-white/20 hover:border-white/30 border border-transparent"
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-2xl">
      <div className="container flex h-20 items-center justify-between px-6">
        <Link to="/" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="font-black tracking-tight text-2xl text-white drop-shadow-2xl group-hover:text-primary transition-colors duration-300"
            style={{
              textShadow: "0 0 20px rgba(76,175,80,0.8), 0 4px 8px rgba(0,0,0,0.9), 0 0 40px rgba(255,255,255,0.3)"
            }}
          >
            AAASHA TRADING LTD
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={getNavCls} end>
              {n.label}
            </NavLink>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <NavLink to="/contact">
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="hero" 
                size="lg"
                className="px-8 py-4 text-lg font-bold bg-primary/80 hover:bg-primary backdrop-blur-md border-2 border-primary/50 hover:border-primary text-white shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all duration-300"
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
