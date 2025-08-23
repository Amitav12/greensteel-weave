import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Truck } from "lucide-react";

export default function RubberScrap() {
  const rubberScrapProducts = [
    {
      title: "Bailed Car Tyres",
      description: "Compressed and bailed car tyres ready for recycling and processing into various rubber products and materials.",
      image: "/lovable-uploads/cargo-ship-containers.jpg"
    },
    {
      title: "Shredded Car Tyres",
      description: "Pre-processed shredded car tyre rubber chips suitable for manufacturing rubber mats, playground surfaces, and other applications.",
      image: "/lovable-uploads/shipping-containers-port.jpg"
    },
    {
      title: "3-Cut Truck Tyres",
      description: "Heavy-duty truck tyres cut into three sections for efficient processing and recycling into industrial rubber products.",
      image: "/lovable-uploads/hero-recycling-steel.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rubber Scrap - AAASHA TRADING LTD | Tire & Industrial Rubber Recycling</title>
        <meta 
          name="description" 
          content="Rubber scrap trading and recycling services including tire rubber, industrial rubber, and specialty rubber materials."
        />
        <meta name="keywords" content="rubber scrap, tire recycling, rubber recycling, industrial rubber, rubber waste" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <Truck className="w-16 h-16 text-purple-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Rubber <span className="text-purple-600">Scrap</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Sustainable rubber recycling solutions for tire and industrial rubber waste materials.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rubberScrapProducts.map((product, index) => (
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