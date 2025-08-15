# 🏋️ Kinetic Trainer Hub

A modern, responsive fitness trainer website built with React, TypeScript, and Tailwind CSS. Features a complete admin dashboard for content management and dynamic pricing system.

![Kinetic Trainer Hub](https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🎯 **Customer Features**
- **Responsive Design** - Works perfectly on all devices
- **Interactive Gallery** - Auto-rotating photo and video gallery
- **Service Pricing** - Dynamic pricing tags with admin control
- **Appointment Booking** - Easy-to-use booking system
- **Contact Forms** - Multiple inquiry types with validation
- **Success Stories** - Client testimonials and transformations
- **Trainer Profile** - Detailed trainer information and credentials

### 🛠️ **Admin Features**
- **Complete Admin Dashboard** - Manage all content from one place
- **Gallery Management** - Add/edit photos and videos
- **Service Management** - Update services and pricing
- **Appointment Management** - View and manage bookings
- **Contact Management** - Handle customer inquiries
- **Real-time Updates** - Changes reflect immediately on website
- **Content Visibility** - Toggle sections on/off

### 🎨 **Technical Features**
- **Modern React** - Built with React 18 and TypeScript
- **Framer Motion** - Smooth animations and transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Form Validation** - Comprehensive form validation
- **Responsive Images** - Optimized image loading
- **SEO Friendly** - Proper meta tags and structure

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kinetic-trainer-hub.git
   cd kinetic-trainer-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📱 Pages & Routes

- **`/`** - Home page with all sections
- **`/trainer-profile`** - Detailed trainer information
- **`/success-stories`** - Client testimonials
- **`/book-appointment`** - Appointment booking system
- **`/gallery`** - Full gallery page
- **`/admin`** - Admin dashboard (content management)

## 🎛️ Admin Dashboard

Access the admin dashboard at `/admin` to manage:

### 📸 **Gallery Management**
- Add/remove photos and videos
- Update titles and descriptions
- Toggle visibility
- Reorder items

### 💪 **Services Management**
- Edit service descriptions
- Update pricing information
- Manage service visibility
- Add new services

### 📅 **Appointment Management**
- View all bookings
- Confirm/cancel appointments
- Customer contact information
- Booking status tracking

### 💬 **Contact Management**
- View customer inquiries
- Respond to messages
- Track inquiry status
- Export contact data

### 🏆 **Success Stories**
- Add client testimonials
- Upload before/after photos
- Edit transformation stories
- Manage story visibility

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### **UI Components**
- **Radix UI** - Accessible, unstyled components
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   ├── admin/           # Admin dashboard components
│   ├── HeroSection.tsx  # Landing page hero
│   ├── ServicesSection.tsx
│   ├── GallerySection.tsx
│   └── ...
├── pages/               # Page components
│   ├── Index.tsx        # Home page
│   ├── AdminDashboard.tsx
│   └── ...
├── services/            # Business logic and API calls
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── config/              # Configuration files
```

## 🎨 Customization

### **Colors & Branding**
Update colors in `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: "your-primary-color",
      secondary: "your-secondary-color",
      accent: "your-accent-color"
    }
  }
}
```

### **Content Management**
All content can be managed through the admin dashboard at `/admin`:
- Update text content
- Change images and videos
- Modify pricing
- Toggle section visibility

### **Services & Pricing**
Add or modify services in the admin dashboard:
- Service descriptions
- Pricing tiers
- Feature lists
- Visibility settings

## 🚀 Deployment

### **Build for Production**
```bash
npm run build
```

### **Preview Production Build**
```bash
npm run preview
```

### **Deploy to Vercel**
1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### **Deploy to Netlify**
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** - High-quality stock photos
- **Pexels** - Free stock videos
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@kinetictrainer.com
- Website: [kinetictrainer.com](https://kinetictrainer.com)

---

**Built with ❤️ for fitness professionals who want to showcase their expertise online.**