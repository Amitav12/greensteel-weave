import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

interface ContactInfo {
  id: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  social_links?: Record<string, string>;
}

interface FooterProps {
  contactInfo?: ContactInfo | null;
}

const Footer = ({ contactInfo }: FooterProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Default contact details
  const defaultPhone = '+1 (234) 567-8900';
  const defaultEmail = 'info@kinetictrainer.com';
  const defaultAddress = ['123 Fitness Street', 'Health City, HC 12345'];
  const defaultHours = ['Mon-Fri: 6AM - 10PM', 'Sat-Sun: 8AM - 8PM'];

  // Use database contact info if available
  const displayPhone = contactInfo?.phone || defaultPhone;
  const displayEmail = contactInfo?.email || defaultEmail;
  const displayAddress = contactInfo?.address ? [contactInfo.address] : defaultAddress;
  const displayHours = contactInfo?.hours ? [contactInfo.hours, 'Flexible scheduling'] : defaultHours;

  return (
    <footer className="bg-gradient-to-br from-background via-background to-primary/5 border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">
              Kinetic Trainer
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Transform your fitness journey with personalized training programs 
              designed to help you achieve your goals and unlock your full potential.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              {['About', 'Services', 'Trainer', 'Gallery', 'Success Stories', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase().replace(' ', '-')}`}
                  whileHover={{ x: 4 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-primary/60 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {link}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Services</h4>
            <nav className="flex flex-col space-y-3">
              {[
                'Strength Training',
                'Cardio Conditioning',
                'Functional Fitness',
                'Goal-Specific Training',
                'Group Sessions',
                'Nutrition Guidance'
              ].map((service) => (
                <motion.a
                  key={service}
                  href="#services"
                  whileHover={{ x: 4 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  {service}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Get In Touch</h4>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  {displayAddress.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </motion.div>
              
              <motion.a
                href={`tel:${displayPhone}`}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>{displayPhone}</span>
              </motion.a>
              
              <motion.a
                href={`mailto:${displayEmail}`}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>{displayEmail}</span>
              </motion.a>
              
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  {displayHours.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Kinetic Trainer Hub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-primary transition-colors duration-300"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ y: -2 }}
              className="hover:text-primary transition-colors duration-300"
            >
              Cookie Policy
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
