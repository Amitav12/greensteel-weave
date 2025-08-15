import { Dumbbell, MessageCircle, HelpCircle } from 'lucide-react';
import { InquiryType, RoutingConfig } from '@/types/contact';

export const inquiryTypes: InquiryType[] = [
  {
    id: 'fitness-journey',
    label: 'Start Fitness',
    description: 'Transform your body and mind with personalized training',
    icon: Dumbbell,
    fields: [
      { 
        name: 'name', 
        label: 'Name', 
        type: 'text', 
        required: true, 
        placeholder: 'Your full name' 
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true, 
        placeholder: 'your.email@example.com' 
      },
      { 
        name: 'phone', 
        label: 'Phone', 
        type: 'tel', 
        required: false, 
        placeholder: '(555) 123-4567' 
      },
      { 
        name: 'goal', 
        label: 'Primary Goal', 
        type: 'text', 
        required: false, 
        placeholder: 'e.g., Weight loss, Muscle gain, Endurance' 
      },
      { 
        name: 'message', 
        label: 'Tell us about yourself', 
        type: 'textarea', 
        required: false, 
        placeholder: 'Share your fitness experience, current challenges, and what you hope to achieve. The more we know, the better we can help! 💪' 
      }
    ]
  },
  {
    id: 'general-inquiry',
    label: 'Ask Questions',
    description: 'Get answers about our services and programs',
    icon: MessageCircle,
    fields: [
      { 
        name: 'name', 
        label: 'Name', 
        type: 'text', 
        required: true, 
        placeholder: 'Your full name' 
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true, 
        placeholder: 'your.email@example.com' 
      },
      { 
        name: 'phone', 
        label: 'Phone', 
        type: 'tel', 
        required: false, 
        placeholder: '(555) 123-4567' 
      },
      { 
        name: 'subject', 
        label: 'What\'s on your mind?', 
        type: 'text', 
        required: true, 
        placeholder: 'e.g., Pricing, Programs, Scheduling, Nutrition advice...' 
      },
      { 
        name: 'message', 
        label: 'Your Question', 
        type: 'textarea', 
        required: true, 
        placeholder: 'Ask us anything! We\'re here to help you make the best decision for your fitness journey. 🤔💭' 
      },
      { 
        name: 'preferredContact', 
        label: 'Preferred Contact Method', 
        type: 'select', 
        required: false, 
        placeholder: 'How should we contact you?', 
        options: ['Email', 'Phone', 'Either'] 
      }
    ]
  },
  {
    id: 'support-request',
    label: 'Get Support',
    description: 'Quick help for technical issues and account support',
    icon: HelpCircle,
    fields: [
      { 
        name: 'name', 
        label: 'Name', 
        type: 'text', 
        required: true, 
        placeholder: 'Your full name' 
      },
      { 
        name: 'email', 
        label: 'Email', 
        type: 'email', 
        required: true, 
        placeholder: 'your.email@example.com' 
      },
      { 
        name: 'phone', 
        label: 'Phone', 
        type: 'tel', 
        required: false, 
        placeholder: '(555) 123-4567' 
      },
      { 
        name: 'subject', 
        label: 'What\'s the issue?', 
        type: 'text', 
        required: true, 
        placeholder: 'e.g., Can\'t log in, Payment problem, App not working...' 
      },
      { 
        name: 'priority', 
        label: 'How urgent is this?', 
        type: 'select', 
        required: true, 
        placeholder: 'Select priority level', 
        options: ['Low - Can wait a few days', 'Medium - Need help soon', 'High - Urgent, need immediate help'] 
      },
      { 
        name: 'message', 
        label: 'Tell us more', 
        type: 'textarea', 
        required: true, 
        placeholder: 'Describe what happened, any error messages you saw, and what you were trying to do. Screenshots help too! 📸🔧' 
      }
    ]
  }
];

export const routingConfig: RoutingConfig = {
  'fitness-journey': {
    endpoint: '/api/contact/fitness',
    team: 'trainer-matching',
    autoResponse: 'fitness-consultation',
    successMessage: 'Thank you for your interest! We\'ll get back to you within 24 hours to discuss your fitness goals.',
    responseTime: '24 hours'
  },
  'general-inquiry': {
    endpoint: '/api/contact/general',
    team: 'general-support',
    autoResponse: 'general-inquiry',
    successMessage: 'Your inquiry has been received! Our team will respond to your question within 24 hours.',
    responseTime: '24 hours'
  },
  'support-request': {
    endpoint: '/api/contact/support',
    team: 'technical-support',
    autoResponse: 'support-ticket',
    successMessage: 'Support ticket created! Our technical team will review your request and respond based on the priority level.',
    responseTime: '2-48 hours depending on priority'
  }
};