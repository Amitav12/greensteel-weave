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
    <section className="py-20 bg-gradient-to-br from-green-50/50 via-white to-emerald-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(34,197,94,0.05),transparent_50%),radial-gradient(circle_at_75%_25%,rgba(16,185,129,0.03),transparent_50%)]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-xl rounded-full border border-green-200/50 mb-6">
            <Recycle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Sustainable Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive recycling and trading services focused on environmental responsibility and premium quality
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                variant="eco-leaf" 
                className="group cursor-pointer h-full"
                hover
                greenTint="light"
                ecoTexture
              >
                <CardHeader className="text-center p-8">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r ${service.color} rounded-3xl mb-8 shadow-2xl`}
                  >
                    <service.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <CardTitle className="text-3xl font-black text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 text-lg leading-relaxed mb-8">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: (index * 0.2) + (idx * 0.1) }}
                        className="flex items-center justify-center"
                      >
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-4" />
                        <span className="text-gray-700 font-semibold text-lg">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="eco-gradient"
                    className="w-full font-bold text-lg py-4"
                    greenTint="medium"
                    ecoGlow
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card variant="eco-gradient-glass" className="inline-block" greenTint="medium" ecoTexture>
            <CardContent className="px-12 py-8">
              <div className="flex items-center gap-4">
                <Recycle className="w-8 h-8 text-white" />
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to Transform Your Waste?
                  </h3>
                  <p className="text-green-100 text-lg">
                    Join us in creating a sustainable future through innovative recycling solutions
                  </p>
                </div>
                <Button 
                  variant="glass" 
                  size="lg"
                  className="ml-4"
                  greenTint="light"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}