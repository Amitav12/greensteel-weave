import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";

interface PhoneNumber {
  number: string;
  label: string;
}

interface WhatsAppFloatProps {
  phoneNumbers: PhoneNumber[];
  defaultMessage?: string;
}

export default function WhatsAppFloat({ 
  phoneNumbers, 
  defaultMessage = "Hello AAASHA TRADING! I'm interested in your steel trading and recycling services. Could you please provide more information about your commodities and pricing?" 
}: WhatsAppFloatProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPhoneList, setShowPhoneList] = useState(false);

  const handleWhatsAppClick = (phoneNumber: string) => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setShowPhoneList(false);
  };

  const togglePhoneList = () => {
    setShowPhoneList(!showPhoneList);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: "backOut" }}
      >
        {/* Phone Number Selection Modal */}
        <AnimatePresence>
          {showPhoneList && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  Choose Number
                </h3>
                <button
                  onClick={() => setShowPhoneList(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {/* Phone Numbers List */}
              <div className="space-y-2">
                {phoneNumbers.map((phone, index) => (
                  <motion.button
                    key={phone.number}
                    onClick={() => handleWhatsAppClick(phone.number)}
                    className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30 rounded-xl border border-green-200/50 dark:border-green-700/50 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {phone.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                        {phone.number}
                      </p>
                    </div>
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Click any number to start WhatsApp chat
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !showPhoneList && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium"
            >
              Chat with us on WhatsApp
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={togglePhoneList}
          onMouseEnter={() => {
            setIsHovered(true);
            if (!showPhoneList) setShowTooltip(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setShowTooltip(false);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        >
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-green-500 rounded-full opacity-30"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* WhatsApp Icon */}
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          
          {/* Notification Dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {showPhoneList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setShowPhoneList(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}