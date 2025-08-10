
import { motion } from "framer-motion";
import { Star, Award, Shield, Users, Factory, Recycle, TrendingUp, CheckCircle } from "lucide-react";

// AAASHA's actual business partners - Global sourcing and regional distribution
const partners = [
  {
    name: "European Scrap Suppliers",
    description: "Premium metal & plastic scrap from Europe",
    partnership: "Sourcing Partner",
    since: "2019",
    volume: "25,000+ tons/year",
    region: "Europe"
  },
  {
    name: "Middle East Recyclers",
    description: "Quality recyclable materials from UAE & Saudi",
    partnership: "Strategic Supplier",
    since: "2020",
    volume: "30,000+ tons/year",
    region: "Middle East"
  },
  {
    name: "North American Traders",
    description: "High-grade scrap from USA & Canada",
    partnership: "Premium Supplier",
    since: "2018",
    volume: "20,000+ tons/year",
    region: "North America"
  },
  {
    name: "South American Partners",
    description: "Diverse recyclable materials from Brazil & Argentina",
    partnership: "Regional Partner",
    since: "2021",
    volume: "15,000+ tons/year",
    region: "South America"
  },
  {
    name: "Indian Steel Mills",
    description: "Major steel producers across India",
    partnership: "Key Customer",
    since: "2017",
    volume: "40,000+ tons/year",
    region: "India"
  },
  {
    name: "ASEAN Manufacturers",
    description: "Vietnam, Thailand, Indonesia, Malaysia partners",
    partnership: "Distribution Partner",
    since: "2019",
    volume: "35,000+ tons/year",
    region: "ASEAN"
  },
  {
    name: "Pakistan & Bangladesh Mills",
    description: "Regional steel & plastic processing units",
    partnership: "Regional Customer",
    since: "2020",
    volume: "18,000+ tons/year",
    region: "South Asia"
  },
  {
    name: "Chinese Recycling Plants",
    description: "Large-scale recycling facilities in China",
    partnership: "Volume Customer",
    since: "2018",
    volume: "50,000+ tons/year",
    region: "China"
  }
];

// AAASHA's comprehensive certifications with clear explanations
const certifications = [
  {
    name: "ISO 9001:2015",
    description: "Quality Management System - Ensures consistent quality in all our recyclable materials trading operations",
    validUntil: "2025",
    scope: "Recyclable Materials Trading & Processing",
    certifyingBody: "Bureau Veritas India",
    benefits: "Guarantees quality standards for all metal, plastic & tyre scrap",
    certificateId: "QMS-2023-AAASHA-001"
  },
  {
    name: "ISO 14001:2015",
    description: "Environmental Management - Demonstrates our commitment to minimizing environmental impact through sustainable practices",
    validUntil: "2025",
    scope: "Environmental Impact Reduction & Sustainable Operations",
    certifyingBody: "SGS India Pvt Ltd",
    benefits: "Reduces carbon footprint by 40% through efficient recycling",
    certificateId: "EMS-2023-AAASHA-002"
  },
  {
    name: "Waste Management License",
    description: "Government Authorization - Official license to handle, process and trade recyclable waste materials across borders",
    validUntil: "2026",
    scope: "International Waste Trading & Processing",
    certifyingBody: "Ministry of Environment & Forests, India",
    benefits: "Legal compliance for international scrap trading operations",
    certificateId: "WML-2023-AAASHA-003"
  },
  {
    name: "CPCB Authorization",
    description: "Central Pollution Control Board - Authorization for handling hazardous and non-hazardous recyclable materials",
    validUntil: "2024",
    scope: "Hazardous & Non-Hazardous Waste Management",
    certifyingBody: "Central Pollution Control Board",
    benefits: "Ensures safe handling of all types of recyclable materials",
    certificateId: "CPCB-2023-AAASHA-004"
  },
  {
    name: "Export-Import License",
    description: "International Trade License - Permits import from 4 continents and export to 15+ countries in our network",
    validUntil: "2024",
    scope: "Global Import-Export of Recyclable Materials",
    certifyingBody: "Directorate General of Foreign Trade",
    benefits: "Enables seamless international trading operations",
    certificateId: "IEC-2023-AAASHA-005"
  },
  {
    name: "Social Responsibility Certificate",
    description: "Community Impact Certification - Recognizes our 25% profit sharing model and community education programs",
    validUntil: "2025",
    scope: "Social Upliftment & Community Development",
    certifyingBody: "Indian Institute of Corporate Affairs",
    benefits: "Validates our commitment to sharing 25% profits with society",
    certificateId: "CSR-2023-AAASHA-006"
  }
];

// AAASHA's actual business metrics focused on circular economy and social impact
const stats = [
  {
    icon: Recycle,
    value: "500K+",
    label: "Tons Recycled Annually",
    color: "text-green-600",
    description: "Metal, plastic & tyre scrap processed",
    growth: "Circular Economy"
  },
  {
    icon: Users,
    value: "15+",
    label: "Countries Served",
    color: "text-green-600",
    description: "Global sourcing & distribution network",
    growth: "4 Continents"
  },
  {
    icon: Factory,
    value: "100%",
    label: "Traceability",
    color: "text-green-600",
    description: "End-to-end material tracking",
    growth: "Full Transparency"
  },
  {
    icon: TrendingUp,
    value: "25%",
    label: "Profit Sharing",
    color: "text-green-600",
    description: "Given back to society",
    growth: "Social Impact"
  },
  {
    icon: Award,
    value: "3 Types",
    label: "Materials Traded",
    color: "text-green-600",
    description: "Metal, Plastic & Tyre Scrap",
    growth: "Diversified"
  },
  {
    icon: Star,
    value: "Dual Role",
    label: "Supplier & Customer",
    color: "text-green-600",
    description: "Unique business model strength",
    growth: "Closed Loop"
  }
];

export default function TrustedBy() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-green-50/30 to-white overflow-hidden">
      {/* Advanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-emerald-400/15 to-teal-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-green-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-32 left-20 w-4 h-4 bg-green-500 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-64 right-32 w-6 h-6 bg-emerald-500 rotate-45 animate-spin-slow delay-300"></div>
          <div className="absolute bottom-32 left-32 w-3 h-3 bg-teal-500 rotate-45 animate-spin-slow delay-700"></div>
          <div className="absolute bottom-64 right-20 w-5 h-5 bg-green-600 rotate-45 animate-spin-slow delay-1000"></div>
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Premium badge with glassmorphism */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-xl rounded-full mb-8 border border-green-200/50 shadow-2xl hover:shadow-green-200/25 transition-all duration-500 group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 text-green-600 mr-3"
            >
              <Recycle className="w-full h-full" />
            </motion.div>
            <span className="text-green-800 font-bold text-lg bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              Sharing is Caring
            </span>
            <div className="ml-3 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Animated main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 leading-tight"
          >
            <span className="inline-block">Strengthening the</span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent animate-gradient-x">
                Circular Economy
              </span>
              {/* Animated underline */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
              />
            </span>
          </motion.h2>

          {/* Enhanced description with floating elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Building a just and equitable circular economy ecosystem through global partnerships,
              social upliftment, and end-to-end traceability in recyclable materials trading.
            </p>

            {/* Floating stats preview */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              {[
                { icon: "🌍", text: "15+ Countries" },
                { icon: "♻️", text: "500K+ Tons" },
                { icon: "🤝", text: "25% Shared" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="flex items-center space-x-2 bg-white/60 backdrop-blur-lg rounded-full px-4 py-2 border border-green-200/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="font-semibold text-gray-700">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Stats Grid with Advanced Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -8,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-green-200/25 transition-all duration-500 border border-green-100/50 overflow-hidden"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Floating particles effect */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                <div className="absolute bottom-6 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${stat.color}`}
                  >
                    <stat.icon className="w-10 h-10" />
                  </motion.div>
                  <div className="text-right">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5 }}
                      className="text-xs text-green-600 font-bold bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-200/50 shadow-sm"
                    >
                      {stat.growth}
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 group-hover:from-green-600 group-hover:to-emerald-600 transition-all duration-500"
                >
                  {stat.value}
                </motion.div>

                <div className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                  {stat.label}
                </div>

                <div className="text-sm text-gray-600 leading-relaxed mb-6">
                  {stat.description}
                </div>

                {/* Enhanced progress indicator with glow effect */}
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 2.5, delay: index * 0.3, ease: "easeOut" }}
                      className="h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full relative overflow-hidden"
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      />
                    </motion.div>
                  </div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-400/10 to-transparent rounded-bl-3xl" />
            </motion.div>
          ))}
        </div>

        {/* Ultra-Modern Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="mb-20"
        >
          <div className="text-center mb-16">
            {/* Floating section badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 backdrop-blur-xl rounded-full mb-8 border border-gradient-to-r from-blue-200/30 to-green-200/30 shadow-xl"
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-2xl mr-3"
              >
                🌐
              </motion.span>
              <span className="font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Global Network Partners
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-green-600 to-emerald-600 bg-clip-text text-transparent">
                Worldwide
              </span>{" "}
              <span className="text-gray-900">Partnerships</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Our unique dual-role business model: We source recyclable materials globally and distribute to regional markets,
              while also being both supplier and customer to create a closed-loop circular economy.
            </motion.p>

            {/* Premium Business Model Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{
                  scale: 1.02,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-200/50 shadow-2xl hover:shadow-blue-200/25 transition-all duration-500 overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    >
                      <span className="text-3xl">🌍</span>
                    </motion.div>
                    <h4 className="text-2xl font-bold text-blue-900 mb-4">Global Sourcing</h4>
                    <p className="text-blue-800 leading-relaxed">
                      We import recyclable materials (metal scrap, plastic scrap, used tyres) from Middle East, Europe, North & South America
                    </p>

                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                    <div className="absolute bottom-6 right-6 w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{
                  scale: 1.02,
                  rotateY: -5,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-green-200/50 shadow-2xl hover:shadow-green-200/25 transition-all duration-500 overflow-hidden">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    >
                      <span className="text-3xl">🏭</span>
                    </motion.div>
                    <h4 className="text-2xl font-bold text-green-900 mb-4">Regional Distribution</h4>
                    <p className="text-green-800 leading-relaxed">
                      We supply to Indian subcontinent (India, Pakistan, Sri Lanka, Bangladesh) and ASEAN countries (Vietnam, Thailand, Indonesia, Malaysia, China)
                    </p>

                    {/* Floating elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
                    <div className="absolute bottom-6 right-6 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Ultra-Premium Partner Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotateY: 45,
                  z: -100
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  z: 0
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -12,
                  rotateY: 8,
                  scale: 1.02,
                  transition: { duration: 0.4, type: "spring" }
                }}
                className="group relative"
              >
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110" />

                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-green-200/25 transition-all duration-500 border border-green-100/50 overflow-hidden">
                  {/* Animated mesh gradient background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-emerald-50/60 to-teal-50/40" />
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className="absolute top-6 right-6 w-2 h-2 bg-green-400 rounded-full"
                    />
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.2, 0.6, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-emerald-400 rounded-full"
                    />
                  </div>

                  {/* Premium partnership badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="absolute top-4 right-4 z-20"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20">
                      {partner.partnership}
                    </div>
                  </motion.div>

                  <div className="relative z-10">
                    {/* Logo with advanced hover effects */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      transition={{ duration: 0.3 }}
                      className="relative mb-6"
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-lg transition-all duration-300">
                        <Factory className="w-12 h-12 text-gray-400 group-hover:text-green-600 transition-all duration-700" />
                      </div>
                      {/* Logo glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                    </motion.div>

                    <motion.h4
                      whileHover={{ scale: 1.05 }}
                      className="text-xl font-bold text-gray-900 text-center mb-3 group-hover:text-green-600 transition-all duration-300"
                    >
                      {partner.name}
                    </motion.h4>

                    <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {partner.description}
                    </p>

                    {/* Enhanced partnership details with icons */}
                    <div className="space-y-3 text-sm">
                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 group-hover:bg-green-50/50 transition-all duration-300"
                      >
                        <span className="text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                          Region:
                        </span>
                        <span className="font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                          {partner.region}
                        </span>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 group-hover:bg-green-50/50 transition-all duration-300"
                      >
                        <span className="text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                          Since:
                        </span>
                        <span className="font-semibold text-gray-700 group-hover:text-green-700 transition-colors">
                          {partner.since}
                        </span>
                      </motion.div>

                      <motion.div
                        whileHover={{ x: 4 }}
                        className="flex justify-between items-center p-2 rounded-lg bg-gray-50/50 group-hover:bg-green-50/50 transition-all duration-300"
                      >
                        <span className="text-gray-500 flex items-center">
                          <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                          Volume:
                        </span>
                        <span className="font-bold text-green-600 group-hover:text-green-700 transition-colors">
                          {partner.volume}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.1 + 0.8, duration: 0.8 }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Revolutionary Business Model Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 p-1 shadow-2xl">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-[3rem] opacity-75 animate-pulse" />

            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-[2.8rem] p-8 md:p-16 text-white overflow-hidden">
              {/* Advanced background effects */}
              <div className="absolute inset-0">
                {/* Animated mesh gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.1),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_40%_80%,rgba(255,255,255,0.06),transparent_40%)]" />

                {/* Floating geometric shapes */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-10 right-10 w-32 h-32 border border-white/10 rounded-full"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1, 0.9, 1]
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-10 left-10 w-24 h-24 border border-white/10 rounded-full"
                />

                {/* Particle effects */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.8
                    }}
                    className={`absolute w-2 h-2 bg-white/40 rounded-full`}
                    style={{
                      left: `${20 + i * 12}%`,
                      top: `${30 + (i % 2) * 40}%`
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                {/* Premium header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="text-2xl mr-3"
                    >
                      ⚡
                    </motion.span>
                    <span className="font-bold text-white">Revolutionary Business Model</span>
                  </motion.div>

                  <h3 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                    Our Unique{" "}
                    <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      Dual-Role
                    </span>{" "}
                    System
                  </h3>
                  <p className="text-green-100 text-xl max-w-4xl mx-auto leading-relaxed">
                    AAASHA's main strength: Being both supplier and customer in the same value chain, creating a closed-loop circular economy
                  </p>
                </motion.div>

                {/* Interactive process flow */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-12">
                  {/* Step 1: Supply */}
                  <motion.div
                    initial={{ opacity: 0, x: -50, rotateY: -20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 10,
                      transition: { duration: 0.3 }
                    }}
                    className="lg:col-span-2 text-center group"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-2xl group-hover:shadow-white/20"
                      >
                        <Factory className="w-14 h-14 text-white" />
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                      1. We Supply Scrap
                    </h4>
                    <p className="text-green-100 leading-relaxed group-hover:text-white transition-colors">
                      We supply stainless steel scrap to major mills in India from our global sourcing network
                    </p>
                  </motion.div>

                  {/* Animated Arrow */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="hidden lg:flex justify-center"
                  >
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="relative"
                    >
                      <div className="w-20 h-2 bg-gradient-to-r from-white/40 to-white/60 rounded-full relative">
                        <motion.div
                          animate={{ x: [0, 15, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-white/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"
                        />
                      </div>
                      {/* Flowing particles */}
                      <motion.div
                        animate={{ x: [0, 80] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-1/2 left-0 w-2 h-2 bg-yellow-300 rounded-full transform -translate-y-1/2"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Step 2: Buy Back */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, rotateY: 20 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: -10,
                      transition: { duration: 0.3 }
                    }}
                    className="lg:col-span-2 text-center group"
                  >
                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/30 shadow-2xl group-hover:shadow-white/20"
                      >
                        <Recycle className="w-14 h-14 text-white" />
                      </motion.div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <h4 className="text-2xl font-bold mb-4 group-hover:text-yellow-300 transition-colors">
                      2. We Buy Back Products
                    </h4>
                    <p className="text-green-100 leading-relaxed group-hover:text-white transition-colors">
                      We buy back the finished products from the same mills and redistribute efficiently with full traceability
                    </p>
                  </motion.div>
                </div>

                {/* Premium result showcase */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="text-center pt-8 border-t border-white/20"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center space-x-6 bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-6 border border-white/20 shadow-2xl hover:shadow-white/10 transition-all duration-500"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <TrendingUp className="w-8 h-8 text-yellow-300" />
                    </motion.div>
                    <div className="text-left">
                      <div className="text-yellow-300 font-bold text-lg mb-1">Result:</div>
                      <div className="text-white font-bold text-xl">
                        Closed-loop system with{" "}
                        <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                          25% profits
                        </span>{" "}
                        shared with society
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Legal Compliance
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Our comprehensive certifications ensure quality, environmental compliance, legal authorization,
              and social responsibility in all our recyclable materials trading operations.
            </p>

            {/* Certification Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-bold text-green-900 mb-2">Quality & Standards</h4>
                <p className="text-green-700 text-sm">ISO certifications ensuring consistent quality in all operations</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-blue-900 mb-2">Legal Compliance</h4>
                <p className="text-blue-700 text-sm">Government licenses for international waste trading</p>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-bold text-purple-900 mb-2">Social Impact</h4>
                <p className="text-purple-700 text-sm">Community development and profit sharing programs</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center border border-green-100 relative"
              >
                {/* Validity indicator */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                    <CheckCircle className="w-3 h-3" />
                    <span>Valid till {cert.validUntil}</span>
                  </div>
                </div>

                <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-12 h-12 text-green-600" />
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {cert.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {cert.description}
                </p>

                {/* Key Benefit Highlight */}
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-green-800 font-semibold">
                    ✓ {cert.benefits}
                  </p>
                </div>

                {/* Certification details */}
                <div className="space-y-2 text-xs border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Certificate ID:</span>
                    <span className="font-mono text-gray-700 text-right text-xs">{cert.certificateId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Scope:</span>
                    <span className="font-semibold text-gray-700 text-right">{cert.scope}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Certified by:</span>
                    <span className="font-semibold text-green-600 text-right">{cert.certifyingBody}</span>
                  </div>
                </div>

                {/* Verification badge */}
                <div className="mt-4 inline-flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-full text-xs font-semibold">
                  <Shield className="w-3 h-3" />
                  <span>Verified & Active</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-2">
                <Recycle className="w-6 h-6" />
                <span className="font-bold">Circular Economy</span>
              </div>
              <div className="w-px h-8 bg-white/30 hidden md:block" />
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span className="font-bold">Social Upliftment</span>
              </div>
              <div className="w-px h-8 bg-white/30 hidden md:block" />
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6" />
                <span className="font-bold">Full Traceability</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}