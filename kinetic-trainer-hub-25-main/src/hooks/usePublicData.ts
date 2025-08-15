
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeSync } from './useRealtimeSync';
import { servicesService, trainerInfoService, contactInfoService, galleryService, successStoriesService } from '@/services/adminService';

export const usePublicData = () => {
  const [services, setServices] = useState([]);
  const [trainerInfo, setTrainerInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [servicesData, trainerData, contactData, galleryData, storiesData] = await Promise.all([
        servicesService.getAll(),
        trainerInfoService.get(),
        contactInfoService.get(),
        galleryService.getAll(),
        successStoriesService.getAll()
      ]);

      setServices(servicesData?.filter(s => s.is_active) || []);
      setTrainerInfo(trainerData);
      setContactInfo(contactData);
      setGalleryItems(galleryData?.filter(g => g.is_active) || []);
      setSuccessStories(storiesData?.filter(s => s.is_active) || []);
    } catch (error) {
      console.error('Error loading public data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Set up real-time sync for all tables
  useRealtimeSync('services', loadAllData, []);
  useRealtimeSync('trainer_info', loadAllData, []);
  useRealtimeSync('contact_info', loadAllData, []);
  useRealtimeSync('gallery_items', loadAllData, []);
  useRealtimeSync('success_stories', loadAllData, []);

  return {
    services,
    trainerInfo,
    contactInfo,
    galleryItems,
    successStories,
    loading,
    refreshData: loadAllData
  };
};
