import { motion } from "framer-motion";

export default function OurPartners() {
  // Partner logos data with authentic company-specific designs
  const partners = [
    {
      name: "Standard Chartered",
      alt: "Standard Chartered Logo",
      type: "banking",
      brandColors: ["#0f4c81", "#00a651"],
      content: (
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-r from-blue-700 to-green-600 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-green-500/20"></div>
              <div className="text-white font-bold text-lg tracking-wider">SC</div>
              <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full opacity-80"></div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-600 to-green-500 rounded-full"></div>
          </div>
          <div className="text-center w-full px-3">
            <div className="text-sm font-bold text-blue-700 leading-tight break-words overflow-hidden">Standard Chartered</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">International Banking</div>
          </div>
        </div>
      )
    },
    {
      name: "NBF",
      alt: "NBF Logo",
      type: "banking",
      brandColors: ["#1e40af", "#0ea5e9"],
      content: (
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-14 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center relative shadow-lg">
              <div className="text-white font-black text-xl tracking-wide">NBF</div>
              <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full transform translate-x-1 -translate-y-1"></div>
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-white/60 rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-sky-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center w-full px-3">
            <div className="text-xs font-semibold text-blue-600 leading-tight break-words overflow-hidden">National Bank of Fujairah</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">UAE Banking</div>
          </div>
        </div>
      )
    },
    {
      name: "ADCB",
      alt: "ADCB Logo",
      type: "banking",
      content: (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          </div>
          <div className="flex flex-col text-center">
            <div className="text-xl font-bold text-gray-700 leading-tight">ADCB</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight break-words">Abu Dhabi Commercial</div>
          </div>
        </div>
      )
    },
    {
      name: "FAB",
      alt: "FAB Logo",
      content: (
        <div className="flex flex-col items-center text-center w-full px-2">
          <div className="text-2xl font-bold text-blue-600 leading-tight">FAB</div>
          <div className="text-xs text-gray-500 mt-1 leading-tight break-words">First Abu Dhabi Bank</div>
        </div>
      )
    },
    {
      name: "Emirates NBD",
      alt: "Emirates NBD Logo",
      content: (
        <div className="flex flex-col items-center gap-2 text-center w-full px-2">
          <div className="w-8 h-6 bg-blue-600 rounded-sm flex items-center justify-center">
            <div className="text-white text-xs font-bold">E</div>
          </div>
          <div className="text-sm font-bold text-blue-600 leading-tight break-words">Emirates NBD</div>
        </div>
      )
    },
    {
      name: "MSC",
      alt: "MSC Logo",
      type: "shipping",
      brandColors: ["#003366", "#0066cc"],
      content: (
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-transparent"></div>
              <div className="text-white text-2xl font-black tracking-wider">MSC</div>
              <div className="absolute top-1 right-1 w-4 h-3 bg-blue-500 rounded-sm flex items-center justify-center">
                <div className="text-white text-xs">⚓</div>
              </div>
              <div className="absolute bottom-1 left-1 right-1 h-0.5 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center w-full px-3">
            <div className="text-xs font-semibold text-slate-700 leading-tight break-words overflow-hidden">Mediterranean Shipping Co.</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">World's Largest Container Fleet</div>
          </div>
        </div>
      )
    },
    {
      name: "MAERSK",
      alt: "MAERSK Logo",
      type: "shipping",
      brandColors: ["#00adef", "#ffffff"],
      content: (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent"></div>
              <div className="text-white text-2xl font-black mb-1">★</div>
              <div className="text-white text-xs font-bold tracking-widest">MAERSK</div>
              <div className="absolute top-1 right-1 w-6 h-2 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-2 h-1 bg-sky-400 rounded-full"></div>
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-1 bg-sky-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center w-full px-3 mt-2">
            <div className="text-xs font-semibold text-sky-600 leading-tight break-words overflow-hidden">Global Container Shipping</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">Denmark • Worldwide</div>
          </div>
        </div>
      )
    },
    {
      name: "Safmarine",
      alt: "Safmarine Logo",
      content: (
        <div className="flex flex-col items-center text-center w-full px-2">
          <div className="text-lg font-bold text-orange-600 leading-tight break-words">Safmarine</div>
          <div className="w-12 h-1 bg-orange-400 rounded-full mt-2"></div>
        </div>
      )
    },
    {
      name: "COSCO Shipping",
      alt: "COSCO Shipping Logo",
      type: "shipping",
      brandColors: ["#dc2626", "#2563eb"],
      content: (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-red-800/20 to-transparent"></div>
              <div className="text-white text-lg font-black tracking-wide">COSCO</div>
              <div className="w-12 h-0.5 bg-blue-400 rounded-full mt-1"></div>
              <div className="text-blue-200 text-xs font-semibold tracking-widest">SHIPPING</div>
              <div className="absolute top-1 left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
              <div className="w-3 h-1 bg-blue-400 rounded-full"></div>
              <div className="w-1 h-1 bg-red-400 rounded-full"></div>
            </div>
          </div>
          <div className="text-center w-full px-3 mt-2">
            <div className="text-xs font-semibold text-red-600 leading-tight break-words overflow-hidden">China Ocean Shipping</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">Global Logistics Leader</div>
          </div>
        </div>
      )
    },
    {
      name: "Evergreen",
      alt: "Evergreen Logo",
      type: "shipping",
      brandColors: ["#16a34a", "#15803d"],
      content: (
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <div className="w-16 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-green-700/20 to-transparent"></div>
              <div className="text-white text-sm font-black tracking-wider">EVERGREEN</div>
              <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              </div>
              <div className="absolute bottom-1 left-1 right-1 flex justify-center gap-1">
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
                <div className="w-1 h-1 bg-green-200 rounded-full"></div>
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="text-center w-full px-3 mt-2">
            <div className="text-xs font-semibold text-green-600 leading-tight break-words overflow-hidden">Evergreen Marine Corp.</div>
            <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">Taiwan • Container Shipping</div>
          </div>
        </div>
      )
    },
    {
      name: "CMA CGM",
      alt: "CMA CGM Logo",
      content: (
        <div className="flex flex-col items-center text-center w-full px-2">
          <div className="text-lg font-bold text-blue-700 leading-tight break-words">CMA CGM</div>
          <div className="flex gap-1 mt-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      )
    },
    {
      name: "Avana Logistics",
      alt: "Avana Logo",
      content: (
        <div className="flex flex-col items-center text-center w-full px-2">
          <div className="text-lg font-bold text-purple-600 leading-tight break-words">avana</div>
          <div className="text-xs text-gray-500 mt-1 leading-tight">LOGISTICS</div>
        </div>
      )
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by industry leaders worldwide
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 items-center"
        >
          {partners.map((partner, index) => {
            const isBanking = partner.type === 'banking';
            const isShipping = partner.type === 'shipping';
            
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "backOut",
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.08,
                  y: -8,
                  rotateY: 5,
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl border group min-h-[220px] sm:min-h-[240px] cursor-pointer relative overflow-hidden ${
                  isBanking 
                    ? 'bg-gradient-to-br from-blue-50 to-green-50 hover:from-blue-100 hover:to-green-100 border-blue-100 hover:border-blue-200' 
                    : isShipping 
                    ? 'bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border-cyan-100 hover:border-cyan-200'
                    : 'bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 border-gray-100 hover:border-green-200'
                }`}
                style={{
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                }}
              >
                {/* Business-specific background patterns */}
                {isBanking && (
                  <motion.div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                )}
                
                {isShipping && (
                  <motion.div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2306b6d4' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm-16-10c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />
                )}
                
                {/* Animated background gradient */}
                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    isBanking 
                      ? 'bg-gradient-to-br from-blue-50/50 to-green-50/50' 
                      : isShipping 
                      ? 'bg-gradient-to-br from-cyan-50/50 to-blue-50/50'
                      : 'bg-gradient-to-br from-green-50/50 to-blue-50/50'
                  }`}
                  initial={false}
                  animate={{ 
                    background: isBanking ? [
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)"
                    ] : isShipping ? [
                      "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)"
                    ] : [
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(34, 197, 94, 0.05) 100%)",
                      "linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Business-specific floating particles */}
                <motion.div
                  className={`absolute top-2 right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-60 ${
                    isBanking ? 'bg-blue-400' : isShipping ? 'bg-cyan-400' : 'bg-green-400'
                  }`}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                />
                <motion.div
                  className={`absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-40 ${
                    isBanking ? 'bg-green-400' : isShipping ? 'bg-blue-400' : 'bg-blue-400'
                  }`}
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
                
                <div 
                  className="flex items-center justify-center text-center relative z-10 transform group-hover:scale-105 transition-transform duration-300 w-full h-full max-w-full max-h-full"
                  role="img"
                  aria-label={partner.alt}
                >
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    {partner.content}
                  </div>
                </div>
                
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100"
                  initial={{ x: "-100%" }}
                  whileHover={{ 
                    x: "100%",
                    transition: { duration: 0.8, ease: "easeInOut" }
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Optional: Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-gray-600 mb-6">
            Interested in partnering with us?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Become a Partner
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}