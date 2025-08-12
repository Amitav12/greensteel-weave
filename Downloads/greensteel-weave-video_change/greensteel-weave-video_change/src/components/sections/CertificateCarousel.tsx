import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Shield, CheckCircle, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy certificate data - can be replaced with dynamic data from admin
const dummyCertificates = [
  {
    id: 1,
    title: "ISO 9001:2015 Quality Management",
    issuer: "International Organization for Standardization",
    issueDate: "2023-01-15",
    expiryDate: "2026-01-15",
    description: "Quality management systems certification ensuring consistent quality in our steel trading operations.",
    image: "/api/placeholder/400/300",
    category: "Quality",
    status: "Active"
  },
  {
    id: 2,
    title: "ISO 14001:2015 Environmental Management",
    issuer: "International Organization for Standardization", 
    issueDate: "2023-02-20",
    expiryDate: "2026-02-20",
    description: "Environmental management systems certification demonstrating our commitment to sustainability.",
    image: "/api/placeholder/400/300",
    category: "Environmental",
    status: "Active"
  },
  {
    id: 3,
    title: "OHSAS 18001 Occupational Health & Safety",
    issuer: "British Standards Institution",
    issueDate: "2023-03-10",
    expiryDate: "2026-03-10", 
    description: "Occupational health and safety management systems certification ensuring workplace safety.",
    image: "/api/placeholder/400/300",
    category: "Safety",
    status: "Active"
  },
  {
    id: 4,
    title: "Steel Industry Association Membership",
    issuer: "Indian Steel Association",
    issueDate: "2022-12-01",
    expiryDate: "2025-12-01",
    description: "Active membership in the Indian Steel Association, connecting us with industry best practices.",
    image: "/api/placeholder/400/300",
    category: "Membership",
    status: "Active"
  },
  {
    id: 5,
    title: "Green Business Certification",
    issuer: "Green Business Council",
    issueDate: "2023-04-05",
    expiryDate: "2026-04-05",
    description: "Certification recognizing our sustainable business practices and environmental responsibility.",
    image: "/api/placeholder/400/300",
    category: "Sustainability",
    status: "Active"
  },
  {
    id: 6,
    title: "Export Excellence Award",
    issuer: "Ministry of Commerce & Industry",
    issueDate: "2023-05-15",
    expiryDate: "2024-05-15",
    description: "Recognition for outstanding performance in steel exports and international trade.",
    image: "/api/placeholder/400/300",
    category: "Award",
    status: "Active"
  }
];

const categoryColors = {
  Quality: "bg-blue-100 text-blue-700 border-blue-200",
  Environmental: "bg-green-100 text-green-700 border-green-200",
  Safety: "bg-red-100 text-red-700 border-red-200",
  Membership: "bg-purple-100 text-purple-700 border-purple-200",
  Sustainability: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Award: "bg-yellow-100 text-yellow-700 border-yellow-200"
};

export default function CertificateCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dummyCertificates.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dummyCertificates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + dummyCertificates.length) % dummyCertificates.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-4">
          <Award className="w-4 h-4 text-green-600" />
          <span className="text-sm font-bold text-green-700">Certified Excellence</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Our <span className="text-green-600">Certifications</span> & Memberships
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Validated by industry leaders and regulatory bodies, our certifications demonstrate our commitment to quality, safety, and sustainability.
        </p>
      </motion.div>

      {/* Main Carousel */}
      <div className="relative">
        {/* Carousel Container */}
        <div 
          className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid md:grid-cols-2 gap-0 min-h-[400px]"
            >
              {/* Certificate Image */}
              <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
                <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 border-2 border-gray-200">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {dummyCertificates[currentIndex].title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {dummyCertificates[currentIndex].issuer}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>Valid until {formatDate(dummyCertificates[currentIndex].expiryDate)}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200">
                      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[dummyCertificates[currentIndex].category as keyof typeof categoryColors]}`}>
                        <Shield className="w-3 h-3" />
                        {dummyCertificates[currentIndex].category}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
                        {dummyCertificates[currentIndex].status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {dummyCertificates[currentIndex].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {dummyCertificates[currentIndex].description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Issued by:</span>
                      <span className="font-semibold text-gray-900">
                        {dummyCertificates[currentIndex].issuer}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Issue Date:</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(dummyCertificates[currentIndex].issueDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Valid Until:</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(dummyCertificates[currentIndex].expiryDate)}
                      </span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {dummyCertificates.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? "bg-green-600 scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Certificate Grid Preview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {dummyCertificates.map((cert, index) => (
          <motion.button
            key={cert.id}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              index === currentIndex
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
            }`}
          >
            <div className="text-center space-y-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                index === currentIndex ? "bg-green-600" : "bg-gray-400"
              }`}>
                <Award className={`w-4 h-4 ${
                  index === currentIndex ? "text-white" : "text-white"
                }`} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                  {cert.title}
                </p>
                <p className="text-xs text-gray-500">
                  {cert.category}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}