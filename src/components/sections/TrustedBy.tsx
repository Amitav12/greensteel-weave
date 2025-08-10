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
    name: "Indian Steel Mills",
    description: "Major steel producers across India",
    partnership: "Key Customer",
    since: "2017",
    volume: "40,000+ tons/year",
    region: "India"
  }
];

// AAASHA's actual business metrics focused on circular economy and social impact
const stats = [
  {
    icon: Recycle,
    value: "500K+",
    label: "Tons Recycled Annually",
    color: "text-green-600",
    description: "Metal, plastic & tyre scrap processed"
  },
  {
    icon: Users,
    value: "15+",
    label: "Countries Served",
    color: "text-green-600",
    description: "Global sourcing & distribution network"
  },
  {
    icon: Factory,
    value: "100%",
    label: "Traceability",
    color: "text-green-600",
    description: "End-to-end material tracking"
  },
  {
    icon: TrendingUp,
    value: "25%",
    label: "Profit Sharing",
    color: "text-green-600",
    description: "Given back to society"
  }
];

export default function TrustedBy() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-4">
          <Recycle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">Sharing is Caring</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          <span className="text-green-600">Circular Economy</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Building a just and equitable circular economy ecosystem through global partnerships and social upliftment
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -3, scale: 1.02 }}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl font-black text-gray-900 group-hover:text-green-600 transition-colors">
                  {stat.value}
                </div>
              </div>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1">{stat.label}</h4>
            <p className="text-xs text-gray-600">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Partners List */}
      <div className="space-y-3">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Global Network Partners</h4>
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ x: 5 }}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Factory className="w-5 h-5 text-green-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {partner.name}
                  </h5>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {partner.region}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">
                  {partner.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{partner.partnership}</span>
                  <span>Since {partner.since}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold mb-1">
                Join Our Global Network
              </h4>
              <p className="text-green-100 text-sm">
                Partner with us for sustainable growth
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}