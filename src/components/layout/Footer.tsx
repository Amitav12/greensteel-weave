
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/partners", label: "Partners" },
    { href: "/certifications", label: "Certifications" },
    { href: "/news", label: "News" },
    { href: "/contact", label: "Contact" }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mt-16 bg-gradient-to-br from-primary/95 via-primary/90 to-accent/95 text-white overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 subtle-noise opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      <div className="relative container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <motion.h3 
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold mb-4 drop-shadow-lg"
            >
              AAASHA TRADING LTD
            </motion.h3>
            <p className="text-white/90 mb-6 max-w-md leading-relaxed">
              Leading the future of sustainable steel trading and recycling. 
              Committed to environmental responsibility and premium quality products.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">info@aaasha-trading.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5, color: '#81C784' }}
                    transition={{ duration: 0.2 }}
                    className="text-sm text-white/80 hover:text-accent transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ 
                    scale: 1.2, 
                    y: -2,
                    boxShadow: "0 5px 15px rgba(129, 199, 132, 0.3)"
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-accent/20 transition-all duration-200 border border-white/20"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
            
            <div className="glass-card bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
              <h5 className="font-semibold text-sm mb-2 text-accent">
                🌱 Sustainability Focus
              </h5>
              <p className="text-xs text-white/80 leading-relaxed">
                Every ton recycled saves 1.4 tons of CO₂ emissions
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/20 mt-8 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/70">
              © {new Date().getFullYear()} AAASHA TRADING LTD. All rights reserved.
            </div>
            <div className="flex gap-6 text-xs">
              <motion.a
                href="/privacy"
                whileHover={{ color: '#81C784' }}
                className="text-white/70 hover:text-accent transition-colors"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms"
                whileHover={{ color: '#81C784' }}
                className="text-white/70 hover:text-accent transition-colors"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="/sitemap"
                whileHover={{ color: '#81C784' }}
                className="text-white/70 hover:text-accent transition-colors"
              >
                Sitemap
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
