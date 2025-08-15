import { motion } from 'framer-motion';
import { Home, User, MessageCircle, Image, Dumbbell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FloatingNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '');
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveSection(sectionId);
        }
      }, 200);
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(sectionId);
      }
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'gallery', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);



  const navItems = [
    { icon: Home, label: 'Home', href: '#home' },
    { icon: User, label: 'About', href: '#about' },
    { icon: Dumbbell, label: 'Services', href: '#services' },
    { icon: Image, label: 'Gallery', href: '#gallery' },
    { icon: MessageCircle, label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-8 right-8 z-50"
    >
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-card">
        <div className="flex flex-row gap-1">
          {navItems.map((item, index) => (
            <motion.button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className={`relative group p-3 rounded-xl transition-all duration-normal ${
                activeSection === item.href.replace('#', '') 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-primary/10'
              }`}
              aria-label={item.label}
            >
              <item.icon className={`w-5 h-5 transition-colors ${
                activeSection === item.href.replace('#', '')
                  ? 'text-primary'
                  : 'text-muted-foreground group-hover:text-primary'
              }`} />
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none"
              >
                {item.label}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
              </motion.div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default FloatingNav;