
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactModal from "@/components/ui/ContactModal";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Recycle, Menu, X, Factory, Award, Users, Newspaper, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

const nav = [
  { to: "/", label: "Home", icon: Recycle },
  { to: "/about", label: "About", icon: Users },
  { 
    to: "/products", 
    label: "Commodities", 
    icon: Factory,
    dropdown: [
      { to: "/commodities/ferrous-scrap", label: "Ferrous Scrap" },
      { to: "/commodities/non-ferrous-scrap", label: "Non-Ferrous Scrap" },
      { to: "/commodities/non-prime-products", label: "Non-Prime Flat & Long Products" },
      { to: "/commodities/rubber-scrap", label: "Rubber Scrap" }
    ]
  },
  { to: "/partners", label: "Partners", icon: Award },
  { to: "/news", label: "News", icon: Newspaper },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactAnchor, setContactAnchor] = useState<{ x: number; y: number } | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // NEW: Track dropdown trigger and fixed position
  const [dropdownPos, setDropdownPos] = useState<{ left: number; top: number } | null>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLButtonElement | null>(null);
  
  const positionFromRect = (rect: DOMRect) => {
    const DROPDOWN_WIDTH = 256; // w-64
    const PADDING = 12;
    const left = Math.min(
      Math.max(rect.left, PADDING),
      window.innerWidth - DROPDOWN_WIDTH - PADDING
    );
    const top = rect.bottom + 8; // small gap below trigger
    setDropdownPos({ left, top });
  };
  
  useEffect(() => {
    if (!activeDropdown || !triggerEl) return;
  
    const recompute = () => {
      const rect = triggerEl.getBoundingClientRect();
      positionFromRect(rect);
    };
  
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
  
    recompute();
    window.addEventListener("scroll", recompute, true);
    window.addEventListener("resize", recompute);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", recompute, true);
      window.removeEventListener("resize", recompute);
      window.removeEventListener("keydown", onKey);
    };
  }, [activeDropdown, triggerEl]);
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
    `relative px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-500 group ${
      isActive 
        ? "text-white bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-md shadow-green-500/25 dark:shadow-green-400/20" 
        : "text-slate-700 dark:text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-emerald-500 hover:via-green-500 hover:to-teal-500 hover:shadow-md hover:shadow-green-500/20 hover:scale-105"
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
        <div className="container flex h-20 items-center justify-between px-6 overflow-x-hidden">
          {/* Logo - Moved to far left with enhanced styling */}
          <Link to="/" className="group shrink min-w-0">
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <div
                className="w-16 h-14 sm:w-20 sm:h-16 md:w-24 md:h-20 flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200/30 dark:border-green-700/30 shadow-lg overflow-hidden group-hover:shadow-xl group-hover:shadow-green-500/20 transition-all duration-300"
                style={{ borderRadius: '12px' }}
              >
                <motion.img
                  src="/logo.gif"
                  alt="ATL - The Commodity Experts Logo"
                  className="w-22 h-18 object-contain"
                  style={{
                    imageRendering: 'crisp-edges',
                    filter: 'contrast(1.2) brightness(1.1) saturate(1.1)',
                    borderRadius: '12px'
                  }}
                  whileHover={{ 
                    filter: 'contrast(1.3) brightness(1.2) saturate(1.2)',
                    scale: 1.05
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              {/* Enhanced Company Name with responsive sizing and width constraint */}
              <motion.div
                className="font-extrabold tracking-wide text-[clamp(1rem,5vw,1.4rem)] sm:text-2xl md:text-3xl lg:text-4xl text-[#2E7D32] dark:text-[#4CAF50] drop-shadow-lg transition-all duration-500 max-w-[55vw] sm:max-w-none truncate"
                whileHover={{ 
                  scale: 1.02,
                  textShadow: '0 0 20px rgba(76, 175, 80, 0.5)'
                }}
                style={{
                  background: 'linear-gradient(135deg, #2E7D32, #4CAF50, #66BB6A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(46, 125, 50, 0.3))',
                  fontFamily: '"Inter Tight", Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif'
                }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  AAASHA TRADING LTD
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>
          {/* Desktop Navigation - Moved more to the right with smaller buttons */}
          <nav className="hidden md:flex items-center gap-1 ml-auto mr-4">
            {nav.map((n) => (
              <div key={n.to} className="relative">
                {n.dropdown ? (
                  <div
                    className="relative"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      ref={(el) => {
                        if (el && activeDropdown === n.to) setTriggerEl(el);
                      }}
                      className={`${getNavCls({ isActive: false })} flex items-center gap-1`}
                      onMouseEnter={(e) => {
                        const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                        setActiveDropdown(n.to);
                        setTriggerEl(e.currentTarget as HTMLButtonElement);
                        positionFromRect(rect);
                      }}
                      onClick={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        const rect = btn.getBoundingClientRect();
                        if (activeDropdown === n.to) {
                          setActiveDropdown(null);
                          return;
                        }
                        setActiveDropdown(n.to);
                        setTriggerEl(btn);
                        positionFromRect(rect);
                      }}
                      aria-haspopup="menu"
                      aria-expanded={activeDropdown === n.to}
                    >
                      {n.label}
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === n.to && dropdownPos && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.18 }}
                          // CHANGED: fixed, high z, no scrollbar, placed by JS
                          className="fixed z-[100] w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-2"
                          style={{ top: dropdownPos.top, left: dropdownPos.left }}
                          role="menu"
                        >
                          {n.dropdown.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                              onClick={() => setActiveDropdown(null)}
                              role="menuitem"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink to={n.to} className={getNavCls} end>
                    {n.label}
                  </NavLink>
                )}
              </div>
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
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setContactAnchor({ x: rect.left + rect.width / 2, y: rect.bottom });
                requestAnimationFrame(() => setIsContactModalOpen(true));
              }}
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
                      {n.dropdown ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 px-6 py-4 text-lg font-semibold text-[#2E7D32] dark:text-[#4CAF50]">
                            <IconComponent className="w-5 h-5" />
                            {n.label}
                          </div>
                          <div className="ml-6 space-y-1">
                            {n.dropdown.map((item) => (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="block px-6 py-3 text-md text-gray-600 dark:text-gray-300 hover:text-[#4CAF50] hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-300"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
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
                      )}
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
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      setContactAnchor({ x: rect.left + rect.width / 2, y: rect.bottom });
                      requestAnimationFrame(() => setIsContactModalOpen(true));
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
        anchorPosition={contactAnchor}
      />
    </>
  );
}
