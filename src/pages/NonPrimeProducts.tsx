import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

export default function NonPrimeProducts() {
  const nonPrimeProducts = [
    {
      title: "Coated Steel Coils & Plates",
      description: "High-quality coated steel coils and plates with protective coating for enhanced durability and corrosion resistance.",
      image: "/CoatedSteelcoils andplates.jpg"
    },
    {
      title: "Uncoated Steel Coils & Plates",
      description: "Premium uncoated steel coils and plates suitable for various industrial applications and manufacturing processes.",
      image: "/UncoatedSteelcoils.jpg"
    },
    {
      title: "Round Bars",
      description: "Precision round steel bars in various diameters, ideal for machining, construction, and manufacturing applications.",
      image: "/Roundbars.jpg"
    },
    {
      title: "Bright Bars",
      description: "High-quality bright steel bars with smooth finish and precise dimensions for precision engineering applications.",
      image: "/Brightbars.jpg"
    },
    {
      title: "Wire Rods",
      description: "Steel wire rods in various grades and specifications for wire drawing, fastener manufacturing, and industrial applications.",
      image: "/wirerods.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Non-Prime Flat & Long Products - AAASHA TRADING LTD | Secondary Steel Products</title>
        <meta 
          name="description" 
          content="Non-prime flat and long steel products including sheets, coils, bars, and structural materials at competitive prices."
        />
        <meta name="keywords" content="non-prime steel, flat products, long products, steel sheets, steel bars, secondary steel" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <Package className="w-16 h-16 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Non-Prime Flat & <span className="text-blue-600">Long Products</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Cost-effective secondary steel products including sheets, coils, bars, and structural materials.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nonPrimeProducts.map((product, index) => (
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
}