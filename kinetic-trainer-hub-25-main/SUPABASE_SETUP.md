# Supabase Setup Guide for Kinetic Trainer Hub

## 🚀 Quick Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Wait for the project to be ready (2-3 minutes)

### 2. Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public key**

### 3. Configure Environment Variables
1. Open `.env.local` in your project root
2. Replace the placeholder values:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create all tables and initial data

### 5. Test the Connection
1. Start your development server: `npm run dev`
2. Check browser console for any Supabase connection errors
3. Try submitting a contact form or booking appointment

## 📊 Database Tables Created

### `appointments`
- Stores appointment bookings
- Fields: name, email, phone, service_type, preferred_date, preferred_time, message, status

### `contact_inquiries`
- Stores contact form submissions
- Fields: name, email, phone, inquiry_type, message, status

### `pricing`
- Stores service pricing information
- Fields: service_id, service_title, pricing_type, price_value, tiers, currency, is_visible

## 🔧 Available Services

### Appointment Service
```typescript
import { appointmentService } from '@/services/supabaseService';

// Create appointment
await appointmentService.createAppointment({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '123-456-7890',
  service_type: 'Strength Training',
  preferred_date: '2024-01-15',
  preferred_time: '10:00',
  message: 'Looking forward to training!'
});
```

### Contact Service
```typescript
import { contactService } from '@/services/supabaseService';

// Create contact inquiry
await contactService.createInquiry({
  name: 'Jane Smith',
  email: 'jane@example.com',
  inquiry_type: 'General Question',
  message: 'What are your rates?'
});
```

### Pricing Service
```typescript
import { pricingService } from '@/services/supabaseService';

// Get all pricing
const pricing = await pricingService.getAllPricing();

// Get specific service pricing
const strengthPricing = await pricingService.getPricingByService('strength-training');
```

## 🎣 React Hooks

### useAppointments Hook
```typescript
import { useAppointments } from '@/hooks/useSupabase';

const { appointments, loading, createAppointment } = useAppointments();
```

### useContactInquiries Hook
```typescript
import { useContactInquiries } from '@/hooks/useSupabase';

const { inquiries, loading, createInquiry } = useContactInquiries();
```

### usePricing Hook
```typescript
import { usePricing } from '@/hooks/useSupabase';

const { pricing, loading, upsertPricing } = usePricing();
```

## 🔒 Security Features

- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for visible pricing only
- **Public insert access** for appointments and contact inquiries
- **Admin-only access** for sensitive operations

## 🔄 Real-time Features

Subscribe to real-time changes:
```typescript
import { subscriptions } from '@/services/supabaseService';

// Subscribe to new appointments
const channel = subscriptions.subscribeToAppointments((payload) => {
  console.log('New appointment:', payload);
});

// Unsubscribe when done
channel.unsubscribe();
```

## 🛠️ Next Steps

1. **Integrate with Contact Form**: Update ContactSection to use Supabase
2. **Integrate with Booking Form**: Update BookAppointment to use Supabase
3. **Update Pricing System**: Connect PricingService to Supabase
4. **Create Admin Dashboard**: Build admin interface for managing data
5. **Add Authentication**: Implement user authentication for admin features

## 🐛 Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Restart dev server after updating `.env.local`
2. **CORS errors**: Check your Supabase project URL is correct
3. **RLS policy errors**: Ensure policies are set up correctly in SQL editor
4. **Connection timeout**: Check your internet connection and Supabase status

### Debug Tips:
- Check browser console for detailed error messages
- Use Supabase dashboard logs to see database queries
- Test API calls directly in Supabase API docs

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)