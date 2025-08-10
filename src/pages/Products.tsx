import { Helmet } from "react-helmet-async";
import ProductShowcase from "@/components/sections/ProductShowcase";

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products - AAASHA TRADING LTD | Premium Steel & Recycled Materials</title>
        <meta 
          name="description" 
          content="Explore our comprehensive range of high-quality steel products and recycled materials. Premium steel coils, sheets, structural steel, and sustainable recycling solutions." 
        />
        <meta name="keywords" content="steel products, steel coils, steel sheets, structural steel, recycled materials, sustainable steel" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Premium{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Steel Products
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Discover our comprehensive range of high-quality steel products and sustainable 
              recycled materials, engineered for excellence and environmental responsibility.
            </p>
          </div>
        </div>
      </section>

      {/* Products Content Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <ProductShowcase />
        </div>
      </section>
    </>
  );
}