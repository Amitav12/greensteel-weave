import { LucideIcon } from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  placeholder: string;
  options?: string[];
}

export interface InquiryType {
  id: 'fitness-journey' | 'general-inquiry' | 'support-request';
  label: string;
  description: string;
  icon: LucideIcon;
  fields: FormField[];
}

export interface ContactFormData {
  inquiryType: 'fitness-journey' | 'general-inquiry' | 'support-request';
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  priority?: 'low' | 'medium' | 'high';
  goal?: string;
  message: string;
  preferredContact?: 'email' | 'phone' | 'either';
}

export interface RoutingConfig {
  'fitness-journey': {
    endpoint: string;
    team: string;
    autoResponse: string;
    successMessage: string;
    responseTime: string;
  };
  'general-inquiry': {
    endpoint: string;
    team: string;
    autoResponse: string;
    successMessage: string;
    responseTime: string;
  };
  'support-request': {
    endpoint: string;
    team: string;
    autoResponse: string;
    successMessage: string;
    responseTime: string;
  };
}