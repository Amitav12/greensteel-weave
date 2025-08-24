import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Factory } from "lucide-react";

export default function FerrousScrap() {
  const ferrousScrapProducts = [
    {
      title: "Shredded Steel Scrap – ISRI 211 Grade",
      description: "High-quality shredded steel scrap meeting ISRI 211 specifications for optimal recycling efficiency.",
      image: "/Shredded Steel Scrap (1).png"
    },
    {
      title: "HMS 1 & HMS 2 (Heavy Melting Scrap)",
      description: "Premium heavy melting scrap grades 1 and 2, ideal for steel production and manufacturing.",
      image: "/HMS 1-2  (1).JPG"
    },
    {
      title: "Steel Turning Scrap",
      description: "Clean steel turning scrap from machining operations, perfect for remelting processes.",
      image: "/Steel Turning Scrap (1).JPG"
    },
    {
      title: "Blue Steel Scrap",
      description: "High-grade blue steel scrap with excellent purity levels for quality steel production.",
      image: "/Blue Steel (1).JPG"
    },
    {
      title: "Rebar Bundles",
      description: "Bundled reinforcement bar scrap from construction projects, ready for recycling.",
      image: "/Rebar Bundles.jpg"
    },
    {
      title: "Cast Iron Break Disc",
      description: "Cast iron brake disc scrap from automotive industry, high iron content material.",
      image: "/Cast Iron Break Disc.jpeg"
    },
    {
      title: "Used Rail Scrap (R50 / R65)",
      description: "Railway track scrap in R50 and R65 specifications, premium quality steel material.",
      image: "/Used Rail Scrap (1).JPG"
    },
    {
      title: "Moon Cut Plates",
      description: "Precision cut steel plates in moon shape configuration for specialized applications.",
      image: "/Moon cut.jpg"
    },
    {
      title: "LMS Bundles (Light Melting Scrap)",
      description: "Light melting scrap bundles, processed and sorted for efficient steel production.",
      image: "/Fabrication Grade (1).JPG"
    },
    {
      title: "HMS Bundles",
      description: "Heavy melting scrap in convenient bundle format for easy handling and processing.",
      image: "/HMS Bundles .jpg"
    },
    {
      title: "HMS Rebar Bundles",
      description: "Combined heavy melting scrap and rebar bundles for comprehensive steel recycling.",
      image: "/HMS Bundles 1.jpg"
    },
    {
      title: "PNS (Plate & Structural Scrap)",
      description: "Plate and structural steel scrap from construction and industrial demolition projects.",
      image: "/PNS .jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Ferrous Scrap - AAASHA TRADING LTD | Iron & Steel Scrap Trading</title>
        <meta 
          name="description" 
          content="Premium ferrous scrap trading services. High-quality iron and steel scrap materials for recycling and manufacturing industries."
        />
        <meta name="keywords" content="ferrous scrap, iron scrap, steel scrap, metal recycling, scrap trading" />
      </Helmet>
      
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="flex justify-center mb-6">
                <Factory className="w-16 h-16 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Ferrous <span className="text-green-600">Scrap</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Premium iron and steel scrap materials for sustainable manufacturing and recycling solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ferrousScrapProducts.map((product, index) => (
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