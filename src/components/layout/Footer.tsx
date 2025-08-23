
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin,
  ArrowUp
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-emerald-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-5 left-10 w-20 h-20 bg-green-500 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-emerald-400 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-teal-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="flex justify-center">
          {/* Company Info */}
          <div className="max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Logo Section */}
              <Link to="/" className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 group">
                <motion.div 
                  className="relative w-20 h-18 sm:w-24 sm:h-20 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 border border-green-200/40 dark:border-green-700/40 shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-green-500/20"
                  style={{
                    borderRadius: '12px'
                  }}
                  whileHover={{ 
                    boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)",
                    y: -1
                  }}
                >
                  <img
                    src="/logo.gif"
                    alt="ATL - The Commodity Experts Logo"
                    className="w-18 h-16 sm:w-22 sm:h-18 object-contain transition-all duration-300 group-hover:brightness-110"
                    style={{
                      imageRendering: 'crisp-edges',
                      filter: 'contrast(1.2) brightness(1.1) saturate(1.2)',
                      borderRadius: '10px'
                    }}
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderRadius: '12px' }}></div>
                </motion.div>
                
                <div className="space-y-1">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-black text-white tracking-wide group-hover:text-green-300 transition-colors duration-300"
                    whileHover={{ scale: 1.01 }}
                  >
                    AAASHA TRADING LTD
                  </motion.h3>
                  <motion.p 
                    className="text-emerald-400 text-sm sm:text-base font-semibold tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Steel Trading & Recycling
                  </motion.p>
                </div>
              </Link>
              
              {/* Company Description */}
              <motion.p 
                className="text-gray-300 leading-relaxed text-sm sm:text-base max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Leading the steel industry towards sustainability through innovative recycling solutions.
              </motion.p>

              {/* Contact Info Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {/* Phone Numbers */}
                <motion.div 
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <Phone className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">+447446643043</span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <Phone className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">+447308409476</span>
                </motion.div>
                
                {/* Email */}
                <motion.div 
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <Mail className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors" />
                  <span className="text-gray-300 text-xs sm:text-sm font-medium">info@aaasha.co.uk</span>
                </motion.div>
                
                {/* LinkedIn */}
                <motion.a 
                  href="https://www.linkedin.com/in/arihant-singhi-4428947/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-blue-500/20 hover:border-blue-400/30 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <Linkedin className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="text-gray-300 text-xs sm:text-sm font-medium group-hover:text-blue-300 transition-colors">Arihant Singhi</span>
                </motion.a>
                
                {/* Address */}
                <motion.div 
                  className="flex items-start justify-center sm:justify-start space-x-2 p-2.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group sm:col-span-2 lg:col-span-1"
                  whileHover={{ scale: 1.02, y: -1 }}
                >
                  <MapPin className="w-4 h-4 text-green-400 group-hover:text-green-300 transition-colors mt-0.5" />
                  <span className="text-gray-300 text-xs sm:text-sm font-medium text-center sm:text-left">
                    21 High View Cl<br />Leicester LE4 9LJ, UK
                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700/50 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            {/* Copyright */}
            <motion.div 
              className="text-gray-400 text-xs sm:text-sm font-medium text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div>© 2024 AAASHA TRADING LTD. All rights reserved.</div>
              <div className="mt-1">
                IT Solutions developed by{' '}
                <a 
                  href="https://DarkElephants.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-400 hover:text-green-300 transition-colors duration-300 underline decoration-dotted underline-offset-2"
                >
                  DarkElephants.com
                </a>
              </div>
            </motion.div>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-xs sm:text-sm font-medium rounded-full transition-all duration-300 shadow-md hover:shadow-green-500/20 group"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
