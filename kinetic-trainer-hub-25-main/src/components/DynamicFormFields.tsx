import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField } from '@/types/contact';

interface DynamicFormFieldsProps {
  fields: FormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  errors: Record<string, string>;
}

const DynamicFormFields = ({ fields, values, onChange, errors }: DynamicFormFieldsProps) => {
  const renderField = (field: FormField, index: number) => {
    const hasError = errors[field.name];
    const commonClasses = `bg-background/50 border-border/50 focus:border-primary/50 ${
      hasError ? 'border-red-500 focus:border-red-500' : ''
    }`;

    const fieldContent = () => {
      switch (field.type) {
        case 'textarea':
          return (
            <Textarea
              name={field.name}
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              className={`${commonClasses} resize-none`}
              aria-describedby={hasError ? `${field.name}-error` : undefined}
            />
          );
        
        case 'select':
          return (
            <Select
              value={values[field.name] || ''}
              onValueChange={(value) => onChange(field.name, value)}
            >
              <SelectTrigger className={commonClasses}>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option.toLowerCase()}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        
        default:
          return (
            <Input
              type={field.type}
              name={field.name}
              value={values[field.name] || ''}
              onChange={(e) => onChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={commonClasses}
              aria-describedby={hasError ? `${field.name}-error` : undefined}
            />
          );
      }
    };

    return (
      <motion.div
        key={field.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className={field.type === 'textarea' ? 'md:col-span-2' : ''}
      >
        <label className="block text-sm font-medium mb-2">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {fieldContent()}
        {hasError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            id={`${field.name}-error`}
            className="text-red-500 text-sm mt-1"
            role="alert"
          >
            {errors[field.name]}
          </motion.p>
        )}
      </motion.div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field, index) => renderField(field, index))}
    </div>
  );
};

export default DynamicFormFields;