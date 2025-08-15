import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CompanyHeaderProps {
  className?: string;
}

interface CompanyData {
  company_name?: string;
  company_logo?: string;
}

const CompanyHeader = ({ className = "" }: CompanyHeaderProps) => {
  const [companyData, setCompanyData] = useState<CompanyData>({
    company_name: "Kinetic Trainer",
    company_logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center"
  });

  useEffect(() => {
    // Load company data from localStorage (managed by admin)
    const stored = localStorage.getItem('heroContent');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setCompanyData({
          company_name: parsedData.company_name || "Kinetic Trainer",
          company_logo: parsedData.company_logo || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center"
        });
      } catch (error) {
        console.error('Failed to load company data:', error);
      }
    }

    // Listen for updates from admin panel
    const handleHeroContentUpdate = (event: CustomEvent) => {
      const updatedData = event.detail;
      setCompanyData({
        company_name: updatedData.company_name || "Kinetic Trainer",
        company_logo: updatedData.company_logo || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center"
      });
    };

    window.addEventListener('heroContentUpdated', handleHeroContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('heroContentUpdated', handleHeroContentUpdate as EventListener);
    };
  }, []);

  if (!companyData.company_name && !companyData.company_logo) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-3 ${className}`}
    >
      {companyData.company_logo && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex-shrink-0"
        >
          <img
            src={companyData.company_logo}
            alt={`${companyData.company_name || 'Company'} Logo`}
            className="h-16 w-auto object-contain"
            onError={(e) => {
              // Hide image if it fails to load
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </motion.div>
      )}
      
      {companyData.company_name && (
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-lg font-semibold text-foreground"
        >
          {companyData.company_name}
        </motion.h2>
      )}
    </motion.div>
  );
};

export default CompanyHeader;