
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Recycle, Menu, X, Factory, Award, Users, FileText, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";

const nav = [
  { to: "/about", label: "About", icon: Users },
  { to: "/products", label: "Products", icon: Factory },
  { to: "/partners", label: "Partners", icon: Award },
  { to: "/certifications", label: "Certifications", icon: FileText },
  { to: "/news", label: "News", icon: Newspaper },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
      isActive 
        ? "text-white bg-[#2E7D32] shadow-lg" 
        : "text-[#2E7D32] hover:text-white hover:bg-[#4CAF50] hover:shadow-md"
    }`;

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg border-b border-[#81C784]/20 shadow-lg" 
          : "bg-white border-b border-[#81C784]/10 shadow-sm"
      }`}>
        <div className="container flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="font-black tracking-tight text-2xl text-[#2E7D32] drop-shadow-sm group-hover:text-[#4CAF50] transition-colors duration-300 flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Recycle className="w-8 h-8 text-[#4CAF50]" />
              </motion.div>
              AAASHA TRADING LTD
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={getNavCls} end>
                {n.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Desktop CTA and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <NavLink to="/contact">
                <Button 
                  className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </NavLink>
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-lg bg-[#81C784]/10 hover:bg-[#81C784]/20 transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-[#2E7D32]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-[#2E7D32]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-40 md:hidden"
          >
            <div className="bg-white/95 backdrop-blur-lg border-b border-[#81C784]/20 shadow-xl">
              <div className="container px-6 py-8 space-y-4">
                {/* Mobile Navigation Links */}
                {nav.map((n, index) => {
                  const IconComponent = n.icon;
                  return (
                    <motion.div
                      key={n.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <NavLink 
                        to={n.to} 
                        className="block w-full px-6 py-4 rounded-lg text-lg font-semibold text-[#2E7D32] hover:text-white hover:bg-[#4CAF50] transition-all duration-300"
                        onClick={() => setIsMobileMenuOpen(false)}
                        end
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-5 h-5" />
                          {n.label}
                        </div>
                      </NavLink>
                    </motion.div>
                  );
                })}
                
                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: nav.length * 0.1, duration: 0.3 }}
                  className="pt-4"
                >
                  <NavLink to="/contact" className="block">
                    <Button 
                      className="w-full bg-[#4CAF50] hover:bg-[#2E7D32] text-white font-bold text-lg py-4 shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Contact Us Today
                    </Button>
                  </NavLink>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
