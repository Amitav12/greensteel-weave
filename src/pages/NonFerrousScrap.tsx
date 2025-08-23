import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function NonFerrousScrap() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = {
    "Aluminium Scrap": [
      {
        title: "UBC (Used Beverage Cans)",
        description: "High-quality used aluminum beverage cans, perfect for recycling into new aluminum products.",
        image: "/lovable-uploads/product-steel-coils.jpg"
      },
      {
        title: "Tense (Mixed Cast Aluminium)",
        description: "Mixed cast aluminum scrap from various industrial and automotive applications.",
        image: "/lovable-uploads/product-steel-pipes.jpg"
      },
      {
        title: "Taint/Tabor (Mixed Sheet Aluminium)",
        description: "Mixed sheet aluminum scrap from construction and manufacturing industries.",
        image: "/lovable-uploads/product-structural-steel.jpg"
      },
      {
        title: "Troma (Aluminium Wheels)",
        description: "Aluminum wheel scrap from automotive industry, high-grade aluminum alloy material.",
        image: "/lovable-uploads/cargo-ship-containers.jpg"
      },
      {
        title: "Zorba (Shredded Mixed Non-Ferrous)",
        description: "Shredded mixed non-ferrous metals separated from automotive shredder residue.",
        image: "/lovable-uploads/shipping-containers-port.jpg"
      }
    ],
    "Stainless Steel Scrap": [
      {
        title: "200 Series (e.g., 201 series)",
        description: "200 series stainless steel scrap with manganese and nitrogen content for cost-effective applications.",
        image: "/lovable-uploads/hero-recycling-steel.jpg"
      },
      {
        title: "300 Series (e.g., 304, 316 series)",
        description: "Premium 300 series stainless steel scrap, highly corrosion-resistant austenitic steel.",
        image: "/lovable-uploads/steel-worker-industrial.jpg"
      },
      {
        title: "400 Series (e.g., 410, 420, 430 series)",
        description: "400 series stainless steel scrap, ferritic and martensitic grades for various applications.",
        image: "/lovable-uploads/product-steel-coils.jpg"
      }
    ],
    "Machinery & Electrical Scrap": [
      {
        title: "Compressor Scrap (Sealed Unit)",
        description: "Sealed compressor units from refrigeration and air conditioning systems.",
        image: "/lovable-uploads/product-steel-pipes.jpg"
      },
      {
        title: "Mixed Electric Motor Scrap",
        description: "Electric motor scrap from various industrial and household appliances.",
        image: "/lovable-uploads/product-structural-steel.jpg"
      },
      {
        title: "Starter & Alternator Scrap",
        description: "Automotive starter and alternator scrap containing valuable copper and steel components.",
        image: "/lovable-uploads/cargo-ship-containers.jpg"
      },
      {
        title: "Silicon Steel Scrap (Electrical Steel / Transformer Scrap)",
        description: "High-grade silicon steel scrap from transformers and electrical equipment.",
        image: "/lovable-uploads/shipping-containers-port.jpg"
      }
    ]
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Non-Ferrous Scrap - AAASHA TRADING LTD | Aluminum, Copper & Metal Scrap</title>
        <meta 
          name="description" 
          content="Premium non-ferrous scrap trading including aluminum, copper, brass, and other valuable metal scraps for recycling industries."
        />
        <meta name="keywords" content="non-ferrous scrap, aluminum scrap, copper scrap, brass scrap, metal recycling" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <Zap className="w-16 h-16 text-orange-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Non-Ferrous <span className="text-orange-600">Scrap</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                High-value non-ferrous metals including aluminum, copper, brass, and specialty alloys.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Selection Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Select Product Category
              </h2>
              
              {/* Dropdown Button */}
              <div className="relative inline-block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-300 shadow-lg"
                >
                  {selectedCategory || "Choose Category"}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-10"
                  >
                    {Object.keys(categories).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className="w-full px-6 py-4 text-left hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                      >
                        <span className="text-gray-900 dark:text-white font-medium">{category}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {selectedCategory && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {categories[selectedCategory as keyof typeof categories].map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                        {product.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Default Message */}
            {!selectedCategory && (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Please select a category above to view our non-ferrous scrap products.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}