
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type GalleryItem = Database['public']['Tables']['gallery_items']['Row'];
type GalleryItemInsert = Database['public']['Tables']['gallery_items']['Insert'];
type GalleryItemUpdate = Database['public']['Tables']['gallery_items']['Update'];

type Service = Database['public']['Tables']['services']['Row'];
type ServiceInsert = Database['public']['Tables']['services']['Insert'];
type ServiceUpdate = Database['public']['Tables']['services']['Update'];

type SuccessStory = Database['public']['Tables']['success_stories']['Row'];
type SuccessStoryInsert = Database['public']['Tables']['success_stories']['Insert'];
type SuccessStoryUpdate = Database['public']['Tables']['success_stories']['Update'];

type TrainerInfo = Database['public']['Tables']['trainer_info']['Row'];
type TrainerInfoUpdate = Database['public']['Tables']['trainer_info']['Update'];

type ContactInfo = Database['public']['Tables']['contact_info']['Row'];
type ContactInfoUpdate = Database['public']['Tables']['contact_info']['Update'];

// Gallery Service
export const galleryService = {
  async getAll(): Promise<GalleryItem[]> {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  },

  async create(item: GalleryItemInsert): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: GalleryItemUpdate): Promise<GalleryItem> {
    const { data, error } = await supabase
      .from('gallery_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Services Service
export const servicesService = {
  async getAll(): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index');
    
    if (error) throw error;
    return data || [];
  },

  async create(service: ServiceInsert): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: ServiceUpdate): Promise<Service> {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Success Stories Service
export const successStoriesService = {
  async getAll(): Promise<SuccessStory[]> {
    const { data, error } = await supabase
      .from('success_stories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(story: SuccessStoryInsert): Promise<SuccessStory> {
    const { data, error } = await supabase
      .from('success_stories')
      .insert(story)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: SuccessStoryUpdate): Promise<SuccessStory> {
    const { data, error } = await supabase
      .from('success_stories')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('success_stories')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};

// Trainer Info Service
export const trainerInfoService = {
  async get(): Promise<TrainerInfo | null> {
    const { data, error } = await supabase
      .from('trainer_info')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async update(updates: TrainerInfoUpdate): Promise<TrainerInfo> {
    const existing = await this.get();
    
    if (existing) {
      const { data, error } = await supabase
        .from('trainer_info')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('trainer_info')
        .insert({
          name: updates.name || '',
          title: updates.title || '',
          bio: updates.bio || '',
          profile_image: updates.profile_image,
          certifications: updates.certifications,
          experience_years: updates.experience_years,
          specializations: updates.specializations,
          awards: updates.awards
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};

// Contact Info Service
export const contactInfoService = {
  async get(): Promise<ContactInfo | null> {
    const { data, error } = await supabase
      .from('contact_info')
      .select('*')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async update(updates: ContactInfoUpdate): Promise<ContactInfo> {
    const existing = await this.get();
    
    if (existing) {
      const { data, error } = await supabase
        .from('contact_info')
        .update(updates)
        .eq('id', existing.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase
        .from('contact_info')
        .insert({
          phone: updates.phone,
          email: updates.email,
          address: updates.address,
          hours: updates.hours,
          social_links: updates.social_links
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    }
  }
};
