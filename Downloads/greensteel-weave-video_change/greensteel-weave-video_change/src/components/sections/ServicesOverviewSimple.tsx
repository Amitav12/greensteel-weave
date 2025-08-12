import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Recycle, Factory, Truck, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Recycle,
    title: "Steel Recycling",
    description: "Advanced steel recycling processes that transform scrap metal into high-quality raw materials, reducing environmental impact while maintaining premium standards.",
    features: ["Scrap Metal Processing", "Quality Assurance", "Environmental Compliance"],
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Factory,
    title: "Steel Trading",
    description: "Comprehensive steel trading services with global reach, offering competitive prices and reliable supply chains for all your steel requirements.",
    features: ["Global Supply Chain", "Competitive Pricing", "Quality Materials"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Truck,
    title: "Waste Management",
    description: "Complete waste management solutions designed to maximize recycling efficiency while minimizing environmental footprint through innovative processes.",
    features: ["Collection Services", "Processing Solutions", "Waste Reduction"],
    color: "from-teal-500 to-green-600",
  }
];

export default function ServicesOverviewSimple() {
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
          <span className="text-sm font-bold text-green-700">Our Services</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          <span className="text-green-600">Sustainable Solutions</span>
        </h3>
        <p className="text-gray-600 leading-relaxed">
          Comprehensive recycling and trading services focused on environmental responsibility and premium quality
        </p>
      </motion.div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 5 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline"
                size="sm"
                className="border-green-200 text-green-600 hover:bg-green-50 flex-shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6"
      >
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-4">
            <Recycle className="w-8 h-8 text-white flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold mb-1">
                Ready to Transform Your Waste?
              </h4>
              <p className="text-green-100 text-sm">
                Join us in creating a sustainable future
              </p>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 flex-shrink-0"
            >
              <ArrowRight className="w-4 h-4 mr-1" />
              Get Started
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}