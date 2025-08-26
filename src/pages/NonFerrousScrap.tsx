import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function NonFerrousScrap() {
  const categories = {
    "Aluminium Scrap": [
      {
        title: "UBC (Used Beverage Cans)",
        description: "High-quality used aluminum beverage cans, perfect for recycling into new aluminum products.",
        image: "/UBC1.jpg"
      },
      {
        title: "Tense (Mixed Cast Aluminium)",
        description: "Mixed cast aluminum scrap from various industrial and automotive applications.",
        image: "/Tense 1.jpg"
      },
      {
        title: "Taint/Tabor (Mixed Sheet Aluminium)",
        description: "Mixed sheet aluminum scrap from construction and manufacturing industries.",
        image: "/Tesnse tebor 1.jpg"
      },
      {
        title: "Troma (Aluminium Wheels)",
        description: "Aluminum wheel scrap from automotive industry, high-grade aluminum alloy material.",
        image: "/wheels 1.jpg"
      },
      {
        title: "Zorba (Shredded Mixed Non-Ferrous)",
        description: "Shredded mixed non-ferrous metals separated from automotive shredder residue.",
        image: "/zorba 1.jpg"
      }
    ],
    "Stainless Steel Scrap": [
      {
        title: "200 Series (e.g., 201 series)",
        description: "200 series stainless steel scrap with manganese and nitrogen content for cost-effective applications.",
        image: "/Steel Turning Scrap (2).JPG"
      },
      {
        title: "300 Series (e.g., 304, 316 series)",
        description: "Premium 300 series stainless steel scrap, highly corrosion-resistant austenitic steel.",
        image: "/Steel Turning Scrap (3).JPG"
      },
      {
        title: "400 Series (e.g., 410, 420, 430 series)",
        description: "400 series stainless steel scrap, ferritic and martensitic grades for various applications.",
        image: "/Steel Turning Scrap (4).JPG"
      }
    ],
    "Machinery & Electrical Scrap": [
      {
        title: "Compressor Scrap (Sealed Unit)",
        description: "Sealed compressor units from refrigeration and air conditioning systems.",
        image: "/compressor 1.jpg"
      },
      {
        title: "Mixed Electric Motor Scrap",
        description: "Electric motor scrap from various industrial and household appliances.",
        image: "/Mixed Electric Motors (1).JPG"
      },
      {
        title: "Starter & Alternator Scrap",
        description: "Automotive starter and alternator scrap containing valuable copper and steel components.",
        image: "/starter1.jpg"
      },
      {
        title: "Silicon Steel Scrap (Electrical Steel / Transformer Scrap)",
        description: "High-grade silicon steel scrap from transformers and electrical equipment.",
        image: "/Mixed Electric Motors (2).JPG"
      }
    ]
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

        {/* All Categories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {Object.entries(categories).map(([categoryName, products], categoryIndex) => (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
                className={`${categoryIndex > 0 ? 'mt-20' : ''}`}
              >
                {/* Category Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {categoryName}
                  </h2>
                  <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {products.map((product, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden">
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
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}