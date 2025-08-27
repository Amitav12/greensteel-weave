import { motion } from "framer-motion";

export default function OurPartners() {
  const partners = [
    {
      name: "Lloyds Bank",
      alt: "Lloyds Bank Logo",
      type: "banking",
      brandColors: ["#006a4d", "#ffffff"],
      image: "/lloyds.png",
      description: "Lloyds Banking Group",
      location: "UK • International Banking"
    },
    {
      name: "Emirates NBD",
      alt: "Emirates NBD Logo",
      type: "banking",
      brandColors: ["#1e40af", "#ffffff"],
      image: "/Emirates.png",
      description: "Emirates NBD Bank",
      location: "UAE • Regional Banking"
    },
    {
      name: "HDFC",
      alt: "HDFC Bank Logo",
      type: "banking",
      brandColors: ["#dc2626", "#ffffff"],
      image: "/HDFC.png",
      description: "HDFC Bank Limited",
      location: "India • Private Banking"
    },
    {
      name: "Maersk",
      alt: "Maersk Logo",
      type: "shipping",
      brandColors: ["#00adef", "#ffffff"],
      image: "/Maersk.png",
      description: "A.P. Moller - Maersk",
      location: "Denmark • Global Container Shipping"
    },
    {
      name: "Mediterranean Shipping Co",
      alt: "Mediterranean Shipping Co Logo",
      type: "shipping",
      brandColors: ["#1e40af", "#ffffff"],
      image: "/Mediterranean.png",
      description: "Mediterranean Shipping Co.",
      location: "World's Largest Container Fleet"
    },
    {
      name: "CMA CGM",
      alt: "CMA CGM Logo",
      type: "shipping",
      brandColors: ["#1e40af", "#dc2626"],
      image: "/CMA.png",
      description: "CMA CGM Group",
      location: "France • Container Shipping"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="text-green-600 dark:text-green-400">Partners</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
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
                className={`flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl border group min-h-[220px] sm:min-h-[240px] cursor-pointer relative overflow-hidden ${
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
                
                {/* Logo Image */}
                <div className="flex flex-col items-center gap-3 relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-20 h-16 flex items-center justify-center">
                    <img 
                      src={partner.image} 
                      alt={partner.alt}
                      className="max-w-full max-h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <div className={`text-xs font-semibold leading-tight break-words overflow-hidden ${
                      isBanking ? 'text-blue-700' : isShipping ? 'text-cyan-700' : 'text-gray-700'
                    }`}>
                      {partner.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 leading-tight overflow-hidden">
                      {partner.location}
                    </div>
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
      </div>
    </section>
  );
}