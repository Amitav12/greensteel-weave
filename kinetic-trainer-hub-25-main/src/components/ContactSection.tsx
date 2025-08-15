import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import InquiryTypeSelector from '@/components/InquiryTypeSelector';
import DynamicFormFields from '@/components/DynamicFormFields';
import { inquiryTypes, routingConfig } from '@/config/inquiryTypes';
import { InquiryType, ContactFormData } from '@/types/contact';
import { validateForm, hasValidationErrors, ValidationErrors } from '@/utils/formValidation';

interface ContactInfo {
  id: string;
  phone?: string;
  email?: string;
  address?: string;
  hours?: string;
  social_links?: Record<string, string>;
}

interface ContactSectionProps {
  contactInfo?: ContactInfo | null;
}

const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { toast } = useToast();
  const [selectedInquiryType, setSelectedInquiryType] = useState<InquiryType | null>(inquiryTypes[0]); // Default to fitness journey
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTypeSelector, setShowTypeSelector] = useState(false);

  const handleInquiryTypeSelect = (type: InquiryType) => {
    setSelectedInquiryType(type);
    setValidationErrors({});
    setShowTypeSelector(false);
    
    // Preserve compatible form data when switching types
    const newFormData: Record<string, string> = {};
    type.fields.forEach(field => {
      if (formData[field.name]) {
        newFormData[field.name] = formData[field.name];
      }
    });
    setFormData(newFormData);
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedInquiryType) {
      setShowTypeSelector(true);
      toast({
        title: "Please select an inquiry type",
        description: "Choose how we can help you today before submitting the form.",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    const errors = validateForm(selectedInquiryType.fields, formData);
    if (hasValidationErrors(errors)) {
      setValidationErrors(errors);
      toast({
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const config = routingConfig[selectedInquiryType.id];
      
      toast({
        title: "Message Sent! 🎉",
        description: config.successMessage,
      });
      
      // Reset form
      setFormData({});
      setSelectedInquiryType(inquiryTypes[0]);
      setValidationErrors({});
      setShowTypeSelector(false);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Default contact info as fallback
  const defaultContactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      details: ['123 Fitness Street', 'Downtown Gym District', 'City, State 12345'],
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Text friendly', 'Available 7am-9pm'],
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@personaltrainer.com', 'Quick response', '24hr support'],
      gradient: 'from-accent to-primary'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 6am-9pm', 'Sat-Sun: 8am-6pm', 'Flexible scheduling'],
      gradient: 'from-success to-secondary'
    }
  ];

  // Override with database contact info if available
  const contactInfoDisplay = contactInfo ? [
    {
      icon: MapPin,
      title: 'Location',
      details: contactInfo.address ? [contactInfo.address] : defaultContactInfo[0].details,
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: contactInfo.phone ? [contactInfo.phone, 'Text friendly', 'Available 7am-9pm'] : defaultContactInfo[1].details,
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Mail,
      title: 'Email',
      details: contactInfo.email ? [contactInfo.email, 'Quick response', '24hr support'] : defaultContactInfo[2].details,
      gradient: 'from-accent to-primary'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: contactInfo.hours ? [contactInfo.hours, 'Flexible scheduling'] : defaultContactInfo[3].details,
      gradient: 'from-success to-secondary'
    }
  ] : defaultContactInfo;

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            💬 Get Started
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Ready to{' '}
            <span className="gradient-text">Transform</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take the first step towards your fitness goals. Let's discuss your objectives 
            and create a personalized plan that works for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:items-start">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full"
          >
            <Card className="bg-gradient-card border-border/50 shadow-card overflow-hidden h-full">
              <CardContent className="p-8 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                  {/* Current inquiry type display */}
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="flex items-center gap-3">
                      {selectedInquiryType && <selectedInquiryType.icon className="w-5 h-5 text-primary" />}
                      <span className="font-medium text-sm">
                        {selectedInquiryType?.label || 'Select inquiry type'}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTypeSelector(!showTypeSelector)}
                      className="text-primary hover:text-primary/80"
                    >
                      Change
                    </Button>
                  </div>

                  {/* Show type selector when needed */}
                  {showTypeSelector && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InquiryTypeSelector
                        selectedType={selectedInquiryType}
                        onTypeSelect={handleInquiryTypeSelect}
                        types={inquiryTypes}
                      />
                    </motion.div>
                  )}

                  {selectedInquiryType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex-1"
                    >
                      <DynamicFormFields
                        fields={selectedInquiryType.fields}
                        values={formData}
                        onChange={handleFieldChange}
                        errors={validationErrors}
                      />
                    </motion.div>
                  )}

                  {selectedInquiryType && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="mt-auto pt-6"
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-hero py-3 text-lg font-semibold group"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mr-2"
                          />
                        ) : (
                          <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        )}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-6 h-full flex flex-col"
          >
            {contactInfoDisplay.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                whileHover={{ x: 10 }}
              >
                <Card className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-12 h-12 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center shadow-glow flex-shrink-0`}
                      >
                        <info.icon className="w-6 h-6 text-background" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {info.title}
                        </h4>
                        <div className="space-y-1">
                          {info.details.map((detail, detailIndex) => (
                            <p 
                              key={detailIndex}
                              className={`text-sm ${
                                detailIndex === 0 
                                  ? 'text-foreground font-medium' 
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* Free Consultation CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer mt-auto"
            >
              <Link to="/book-appointment" className="block">
                <h4 className="text-xl font-bold mb-2 text-white">🔥 Free Consultation</h4>
                <p className="text-sm opacity-90 mb-4 text-white">
                  Get a personalized fitness assessment and workout plan - absolutely free!
                </p>
                <div className="text-lg font-bold text-white hover:text-accent transition-colors">
                  Book your session today
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
