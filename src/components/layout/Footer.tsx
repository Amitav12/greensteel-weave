
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Recycle, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Award
} from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin/login" }
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-600" }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">
                    AAASHA TRADING LTD
                  </h3>
                  <p className="text-green-400 text-sm font-medium">
                    Steel Trading & Recycling
                  </p>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                Leading the steel industry towards sustainability through innovative recycling solutions.
              </p>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300 text-sm">info@aaashatrading.com</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                  <span className="text-gray-300 text-sm">
                    Mumbai, Maharashtra, India
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 AAASHA TRADING LTD. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Certification */}
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Award className="w-4 h-4 text-green-400" />
              <span>ISO 9001:2015</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
