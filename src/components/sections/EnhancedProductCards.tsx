import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Recycle, Leaf, Factory, TrendingUp, BarChart3, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCarousel from "@/components/ui/ProductCarousel";
import steelCoils from "@/assets/product-steel-coils.jpg";
import steelPipes from "@/assets/product-steel-pipes.jpg";
import structuralSteel from "@/assets/product-structural-steel.jpg";

const productData = [
  {
    id: "steel-recycling",
    name: "Steel Recycling",
    category: "Recycling Services",
    description: "Advanced steel recycling processes that transform scrap metal into high-quality raw materials, reducing environmental impact while maintaining premium standards.",
    longDescription: "Our state-of-the-art steel recycling facility processes thousands of tons of scrap metal annually, utilizing cutting-edge technology to separate, clean, and refine materials. We maintain strict quality controls throughout the process, ensuring that recycled steel meets or exceeds industry standards for strength, durability, and purity.",
    images: [steelCoils, steelPipes, structuralSteel],
    video: "/steel-recycling-demo.mp4",
    recycledContent: "95%",
    co2Saved: "4.2 tons",
    features: [
      "Scrap Metal Processing",
      "Quality Assurance Testing",
      "Environmental Compliance",
      "Advanced Sorting Technology",
      "Magnetic Separation Systems",
      "Chemical Analysis Lab"
    ],
    specifications: [
      { label: "Processing Capacity", value: "50,000 tons/year" },
      { label: "Purity Level", value: "99.5%" },
      { label: "Recovery Rate", value: "95%" },
      { label: "Processing Time", value: "24-48 hours" }
    ],
    certifications: ["ISO 14001", "OHSAS 18001", "ISO 9001"],
    icon: <Recycle className="w-6 h-6" />,
    benefits: [
      "Reduces landfill waste by 95%",
      "Saves 74% energy compared to virgin steel production",
      "Prevents 4.2 tons of CO₂ emissions per ton processed",
      "Creates sustainable raw materials for construction industry"
    ]
  },
  {
    id: "steel-trading",
    name: "Steel Trading",
    category: "Trading Services",
    description: "Comprehensive steel trading services with global reach, offering competitive prices and reliable supply chains for all your steel requirements.",
    longDescription: "With over two decades of experience in international steel trading, we connect suppliers and buyers across continents. Our extensive network includes steel mills, distributors, and end-users, enabling us to provide competitive pricing and ensure reliable delivery schedules. We specialize in both spot transactions and long-term supply agreements.",
    images: [structuralSteel, steelCoils, steelPipes],
    recycledContent: "80%",
    co2Saved: "3.1 tons",
    features: [
      "Global Supply Chain Network",
      "Competitive Pricing Models",
      "Quality Material Sourcing",
      "Logistics Coordination",
      "Market Analysis & Forecasting",
      "Risk Management Solutions"
    ],
    specifications: [
      { label: "Trading Volume", value: "100,000+ tons/year" },
      { label: "Global Partners", value: "50+ countries" },
      { label: "Delivery Time", value: "2-4 weeks" },
      { label: "Quality Grade", value: "Premium A+" }
    ],
    certifications: ["ISO 9001", "ISCC PLUS", "SBTi Committed"],
    icon: <BarChart3 className="w-6 h-6" />,
    benefits: [
      "Access to global steel markets and competitive pricing",
      "Reduced procurement costs through bulk purchasing power",
      "Guaranteed quality through certified supplier network",
      "Flexible delivery options and logistics support"
    ]
  },
  {
    id: "tyre-recycling",
    name: "Tyre Recycling",
    category: "Recycling Services", 
    description: "Complete tyre recycling solutions that transform waste tyres into valuable materials for construction, manufacturing, and energy applications.",
    longDescription: "Our comprehensive tyre recycling program addresses one of the world's most challenging waste streams. Using mechanical and chemical processes, we break down end-of-life tyres into their constituent materials: rubber granules, steel wire, and textile fibers. Each component is processed to meet specific industry requirements for reuse in new applications.",
    images: [steelPipes, structuralSteel, steelCoils],
    recycledContent: "100%",
    co2Saved: "5.8 tons",
    features: [
      "Complete Tyre Breakdown",
      "Rubber Granule Production",
      "Steel Wire Extraction",
      "Textile Fiber Recovery",
      "Zero Waste Processing",
      "Quality Control Testing"
    ],
    specifications: [
      { label: "Processing Capacity", value: "25,000 tyres/month" },
      { label: "Rubber Recovery", value: "65%" },
      { label: "Steel Recovery", value: "15%" },
      { label: "Fiber Recovery", value: "20%" }
    ],
    certifications: ["ISO 14001", "WAMITAB", "Environment Agency"],
    icon: <Truck className="w-6 h-6" />,
    benefits: [
      "Diverts 100% of waste tyres from landfills",
      "Creates valuable secondary raw materials",
      "Reduces environmental pollution and fire hazards",
      "Supports circular economy principles"
    ]
  },
  {
    id: "iron-products",
    name: "Sustainable Iron Products",
    category: "Iron & Steel Products",
    description: "High-grade iron products created through advanced recycling processes, perfect for construction and manufacturing applications.",
    longDescription: "Our sustainable iron products are manufactured using advanced electric arc furnace technology, primarily utilizing recycled scrap iron and steel. This process significantly reduces energy consumption and carbon emissions while producing high-quality iron products that meet stringent construction and manufacturing standards.",
    images: [steelCoils, structuralSteel, steelPipes],
    recycledContent: "90%",
    co2Saved: "3.7 tons",
    features: [
      "High Structural Integrity",
      "Weather Resistant Coating",
      "Sustainable Material Sourcing",
      "Quality Assurance Certified",
      "Custom Specifications Available",
      "Rapid Delivery Options"
    ],
    specifications: [
      { label: "Tensile Strength", value: "400-600 MPa" },
      { label: "Carbon Content", value: "0.05-0.25%" },
      { label: "Yield Strength", value: "250-400 MPa" },
      { label: "Elongation", value: "20-25%" }
    ],
    certifications: ["ASTM A36", "EN 10025", "JIS G3101"],
    icon: <Factory className="w-6 h-6" />,
    benefits: [
      "Superior strength-to-weight ratio for construction",
      "Excellent corrosion resistance with proper treatment",
      "Cost-effective alternative to virgin iron products",
      "Fully recyclable at end of service life"
    ]
  }
];

const productCards = [
  {
    id: "steel-recycling",
    title: "Steel Recycling",
    description: "Advanced steel recycling processes that transform scrap metal into high-quality raw materials, reducing environmental impact while maintaining premium standards.",
    features: ["Scrap Metal Processing", "Quality Assurance", "Environmental Compliance"],
    icon: <Recycle className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-600"
  },
  {
    id: "steel-trading", 
    title: "Steel Trading",
    description: "Comprehensive steel trading services with global reach, offering competitive prices and reliable supply chains for all your steel requirements.",
    features: ["Global Supply Chain", "Competitive Pricing", "Quality Materials"],
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    id: "tyre-recycling",
    title: "Tyre Recycling", 
    description: "Complete tyre recycling solutions that transform waste tyres into valuable materials for construction and manufacturing applications.",
    features: ["Complete Breakdown", "Material Recovery", "Zero Waste Process"],
    icon: <Truck className="w-6 h-6" />,
    gradient: "from-teal-500 to-green-600"
  },
  {
    id: "iron-products",
    title: "Sustainable Iron Products",
    description: "High-grade iron products created through advanced recycling processes, perfect for construction and manufacturing.",
    features: ["Structural Integrity", "Weather Resistant", "Sustainable Sourcing"],
    icon: <Factory className="w-6 h-6" />,
    gradient: "from-green-600 to-emerald-700"
  }
];

export default function EnhancedProductCards() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const openCarousel = (productId: string) => {
    setSelectedProductId(productId);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
    setSelectedProductId("");
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-4">
          <Recycle className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">Our Services</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Sustainable <span className="text-green-600">Solutions</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Comprehensive recycling and trading services that transform waste into valuable resources while supporting environmental sustainability
        </p>
      </motion.div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.gradient} text-white shadow-lg`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                  </div>
                </div>
                
                {/* Arrow Button */}
                <motion.button
                  onClick={() => openCarousel(card.id)}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl border-2 border-green-200 text-green-600 hover:border-green-400 hover:bg-green-50 transition-all duration-300 group/btn"
                >
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {card.features.map((feature, i) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Bottom Action Area */}
              <div className="pt-4 border-t border-gray-100">
                <Button
                  onClick={() => openCarousel(card.id)}
                  variant="outline"
                  className="w-full border-green-200 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all duration-300"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-200 rounded-2xl transition-all duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Product Carousel Modal */}
      <ProductCarousel
        isOpen={isCarouselOpen}
        onClose={closeCarousel}
        products={productData}
        initialProductId={selectedProductId}
      />
    </div>
  );
}