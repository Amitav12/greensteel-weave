import { FormField } from '@/types/contact';

export interface ValidationErrors {
  [key: string]: string;
}

export const validateField = (field: FormField, value: string): string | null => {
  // Check required fields
  if (field.required && (!value || value.trim() === '')) {
    return `${field.label} is required`;
  }

  // Skip validation for empty optional fields
  if (!value || value.trim() === '') {
    return null;
  }

  // Email validation
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }

  // Phone validation (optional, basic format check)
  if (field.type === 'tel' && value) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
    if (cleanPhone && !phoneRegex.test(cleanPhone)) {
      return 'Please enter a valid phone number';
    }
  }

  // Message minimum length
  if (field.type === 'textarea' && field.required && value.length < 10) {
    return `${field.label} must be at least 10 characters long`;
  }

  // Subject minimum length
  if (field.name === 'subject' && value.length < 3) {
    return 'Subject must be at least 3 characters long';
  }

  return null;
};

export const validateForm = (fields: FormField[], values: Record<string, string>): ValidationErrors => {
  const errors: ValidationErrors = {};

  fields.forEach(field => {
    const error = validateField(field, values[field.name] || '');
    if (error) {
      errors[field.name] = error;
    }
  });

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};