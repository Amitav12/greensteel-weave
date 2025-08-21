
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ui/ContactModal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Recycle, Menu, X, Factory, Award, Users, Newspaper } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const nav = [
  { to: "/", label: "Home", icon: Recycle },
  { to: "/about", label: "About", icon: Users },
  { to: "/products", label: "Products", icon: Factory },
  { to: "/partners", label: "Partners", icon: Award },
  { to: "/news", label: "News", icon: Newspaper },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    `relative px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-500 group ${
      isActive 
        ? "text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-lg shadow-green-500/25 dark:shadow-green-400/20" 
        : "text-slate-700 dark:text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105"
    }`;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-lg border-b border-[#81C784]/20 dark:border-[#4CAF50]/20 shadow-lg" 
          : "bg-white/20 dark:bg-gray-900/20 border-b border-[#81C784]/10 dark:border-[#4CAF50]/10 shadow-sm"
      }`}>
        <div className="container flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="font-black tracking-tight text-xl text-[#2E7D32] dark:text-[#4CAF50] drop-shadow-sm group-hover:text-[#4CAF50] dark:group-hover:text-[#66BB6A] transition-colors duration-300 flex items-center gap-3"
            >
              <div className="w-20 h-16 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200/30 dark:border-green-700/30 shadow-sm overflow-hidden" 
                   style={{
                     borderRadius: '12px'
                   }}>
                <img
                  src="/src/logo.gif"
                  alt="AAASHA TRADING LTD Logo"
                  className="w-16 h-12 object-cover"
                  style={{
                    imageRendering: 'crisp-edges',
                    filter: 'contrast(1.2) brightness(1.1) saturate(1.1)',
                    borderRadius: '12px'
                  }}
                />
              </div>
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
          
          {/* Desktop CTA and Theme Toggle */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Switch */}
            <div className="flex items-center">
              <label htmlFor="theme-toggle" className="sr-only">Toggle dark mode</label>
              <Switch
                id="theme-toggle"
                checked={isDark}
                onCheckedChange={(checked) => {
                  setTheme(checked ? 'dark' : 'light');
                }}
                aria-label="Toggle theme"
                className="h-7 w-12 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
              />
            </div>
            
            <Button 
              onClick={() => setIsContactModalOpen(true)}
              className="bg-[#4CAF50] hover:bg-[#2E7D32] dark:bg-[#66BB6A] dark:hover:bg-[#4CAF50] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              size="sm"
            >
              <Phone className="w-3 h-3 mr-1" />
              Contact Us
            </Button>
          </div>
          
          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle Switch */}
            <div className="flex items-center">
              <label htmlFor="theme-toggle-mobile" className="sr-only">Toggle dark mode</label>
              <Switch
                id="theme-toggle-mobile"
                checked={isDark}
                onCheckedChange={(checked) => {
                  setTheme(checked ? 'dark' : 'light');
                }}
                aria-label="Toggle theme"
                className="h-6 w-11 data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-300 dark:data-[state=unchecked]:bg-gray-600"
              />
            </div>
            
            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-lg bg-[#81C784]/10 dark:bg-[#4CAF50]/10 hover:bg-[#81C784]/20 dark:hover:bg-[#4CAF50]/20 transition-colors duration-300"
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
                    <X className="w-6 h-6 text-[#2E7D32] dark:text-[#4CAF50]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-[#2E7D32] dark:text-[#4CAF50]" />
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
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-[#81C784]/20 dark:border-[#4CAF50]/20 shadow-xl">
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
                        className="block w-full px-6 py-4 rounded-lg text-lg font-semibold text-[#2E7D32] dark:text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] transition-all duration-300"
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
                  <Button 
                    onClick={() => {
                      setIsContactModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#4CAF50] hover:bg-[#2E7D32] dark:bg-[#66BB6A] dark:hover:bg-[#4CAF50] text-white font-bold text-lg py-4 shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Us Today
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </>
  );
}
