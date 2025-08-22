import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Leaf,
  Factory,
  TrendingUp,
  CheckCircle,
  Quote,
  Globe,
  Recycle,
  DollarSign,
  Shield,
  BookOpen,
  Heart,
  ArrowRight
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import businessProcessMp4 from "@/Buisness_process_videos/BusinessProcess.mp4";
import { Link } from "react-router-dom";

const values = [
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description: "Sharing knowledge, economic opportunities, and resources to strengthen the circular economy ecosystem."
  },
  {
    icon: Heart,
    title: "Community Engagement",
    description: "Promoting sustainability, education and training while focusing on social upliftment and equity."
  }
];

const materials = [
  {
    icon: Factory,
    title: "Metal Scrap",
    description: "Ferrous and non-ferrous metals, including steel, aluminum, copper, brass, and more"
  },
  {
    icon: Recycle,
    title: "Plastic Scrap",
    description: "Various types of plastic waste, including HDPE, LDPE, PET, and PVC"
  },
  {
    icon: Target,
    title: "Used Tyre Scrap",
    description: "Whole tyres, shredded tyres, and tyre crumbs"
  }
];

const benefits = [
  {
    icon: Leaf,
    title: "Conserves Natural Resources",
    description: "Recycling helps reduce the need for extracting and processing raw materials"
  },
  {
    icon: TrendingUp,
    title: "Reduces Waste",
    description: "Recycling helps divert waste from landfills and conserves landfill space"
  },
  {
    icon: Factory,
    title: "Saves Energy",
    description: "Recycling requires less energy than producing new materials from raw resources"
  }
];

const whyChooseUs = [
  {
    icon: DollarSign,
    title: "Competitive Prices",
    description: "We offer fair market prices for recyclable materials"
  },
  {
    icon: Shield,
    title: "Reliable Service",
    description: "Our team is dedicated to providing efficient and hassle-free transactions"
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "We prioritize environmentally responsible practices in all our operations"
  }
];

const team = [
  {
    name: "Rajesh Kumar",
    position: "Chief Executive Officer",
    bio: "20+ years of experience in steel trading and sustainable business practices.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    initials: "RK"
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    bio: "Expert in supply chain management and quality assurance processes.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    initials: "PS"
  },
  {
    name: "Amit Patel",
    position: "Sustainability Director",
    bio: "Leading our environmental initiatives and recycling innovations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    initials: "AP"
  },
  {
    name: "Sunita Reddy",
    position: "Business Development",
    bio: "Building strategic partnerships and expanding market presence.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
    initials: "SR"
  }
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - AAASHA TRADING LTD | Sustainable Steel Trading Leaders</title>
        <meta
          name="description"
          content="Learn about AAASHA TRADING LTD's journey, values, and commitment to sustainable steel trading and recycling solutions. Meet our experienced team."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                AAASHA TRADING
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Pioneering sustainable steel trading and recycling solutions for over 15 years,
              building a greener future through innovation and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">15+</div>
                <div className="text-green-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">350+</div>
                <div className="text-green-300">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">125K+</div>
                <div className="text-green-300">Tons Recycled</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
                <Quote className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300 font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Building a{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                At AAASHA's, we have over two decades of expertise in the metal recycling and trading industry.
              </p>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-6 border-l-4 border-green-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Aaasha sources its recyclable raw materials from the Middle East, Europe, North America and South America. It sells to the Indian subcontinent (consisting of India, Pakistan, Sri Lanka and Bangladesh), and the ASEAN countries (comprising of Vietnam, Indonesia, Thailand, Philippines, Taiwan, Singapore, Malaysia and China).
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-6 border-l-4 border-blue-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our journey is rooted in a deep commitment to the circular economy, transforming waste into valuable resources and contributing to a more sustainable future. Backed by an experienced and dedicated team in Finance, Documentation, and Logistics, we ensure seamless operations across borders.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-6 border-l-4 border-purple-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  With extensive knowledge of the metal, tyre and plastic industry, we manage the entire process — from scrap collection to finished products — ensuring quality, reliability, and environmental responsibility at every stage. Our strong industry network, market insight, and unwavering dedication to excellence have made us a trusted partner for clients across the globe.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 mb-8 border-l-4 border-orange-500">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our main strength comes from being the supplier of a customer while also being the customer of the customer. For example, we supply stainless steel scrap to major mills in India and we buy back the finished product to redistribute it efficiently & with full traceability to close the loop whilst growing our business portfolio & giving back a considerable share of it's profit back to the society.
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  "ISO 9001:2015 Quality Management Certified",
                  "Environmental Management System Compliant", 
                  "Zero Waste to Landfill Initiative",
                  "Carbon Neutral Operations by 2025"
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative space-y-8"
            >
              {/* Why Choose Us Section */}
              <div className="mb-8 mt-16">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Us</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-md border border-green-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-3xl block mb-3">💰</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Competitive Prices</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">We offer fair market prices for recyclable materials</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-md border border-green-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-3xl block mb-3">🛡️</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reliable Service</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">Our team is dedicated to providing efficient and hassle-free transactions</p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 lg:p-6 shadow-md border border-green-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <span className="text-green-600 dark:text-green-400 font-bold text-3xl block mb-3">🌱</span>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Sustainable Practices</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">We prioritize environmentally responsible practices in all our operations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Video Section */}
              <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative bg-gray-900">
                <video
                  className="absolute inset-0 w-full h-full object-contain"
                  src={businessProcessMp4}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Steel Recycling Facility"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
                  Steel Recycling Facility
                </div>
              </div>
              
              {/* Moved Cards Section */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-2xl p-6">
                  <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    Guided by innovation and sustainability, we strive to bridge the gap between metal recycling and global trade, delivering value for our partners while safeguarding the planet.
                  </p>
                </div>
                
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border-l-4 border-teal-500">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    If you're interested in buying or selling your recyclable materials, contact us today to learn more about our services and competitive prices.
                  </p>
                </div>
              </div>
              
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Process Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Globe className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                SHARING IS CARING
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our core philosophy drives every decision we make and every relationship we build,
              ensuring sustainable growth and positive community impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials We Trade */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Recycle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Materials We Trade</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Recycling Solutions
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, index) => (
              <motion.div
                key={material.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-600"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <material.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {material.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {material.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Award className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Why Choose Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Your Trusted{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Recycling Partner
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact & Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Leaf className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Benefits of Recycling</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Environmental{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Impact & Benefits
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-600"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-gradient-to-br from-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Expert Team
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our dedicated team of professionals brings together decades of experience
              in steel trading, sustainability, and business excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-700"
              >
                <div className="relative mb-6 flex justify-center">
                  <Avatar className="w-24 h-24 border-4 border-green-100 dark:border-green-800 group-hover:border-green-300 dark:group-hover:border-green-600 transition-colors duration-300">
                    <AvatarImage 
                      src={member.avatar} 
                      alt={member.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-800 dark:to-emerald-700 text-green-600 dark:text-green-400 font-bold text-lg">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}