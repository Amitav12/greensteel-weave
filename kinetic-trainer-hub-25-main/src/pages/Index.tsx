
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import TrainerDetailsSection from '@/components/TrainerDetailsSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';
import { usePublicData } from '@/hooks/usePublicData';

const Index = () => {
  const { services, trainerInfo, contactInfo, galleryItems, loading } = usePublicData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <FloatingNav />
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <TrainerDetailsSection trainerInfo={trainerInfo} />
      </div>
      <div id="services">
        <ServicesSection services={services} />
      </div>
      <div id="gallery">
        <GallerySection galleryItems={galleryItems} />
      </div>
      <div id="contact">
        <ContactSection contactInfo={contactInfo} />
      </div>
      <Footer contactInfo={contactInfo} />
    </div>
  );
};

export default Index;
