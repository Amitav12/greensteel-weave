import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { InquiryType } from '@/types/contact';

interface InquiryTypeSelectorProps {
  selectedType: InquiryType | null;
  onTypeSelect: (type: InquiryType) => void;
  types: InquiryType[];
}

const InquiryTypeSelector = ({ selectedType, onTypeSelect, types }: InquiryTypeSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-center">How can we help you?</h3>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {types.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTypeSelect(type)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
              selectedType?.id === type.id
                ? 'border-primary bg-primary text-white shadow-lg'
                : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
            }`}
            aria-label={`Select ${type.label} inquiry type`}
          >
            <type.icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm whitespace-nowrap">{type.label}</span>
            
            {selectedType?.id === type.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-1"
              >
                <Check className="w-4 h-4" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default InquiryTypeSelector;