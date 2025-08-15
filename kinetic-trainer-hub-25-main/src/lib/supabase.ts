import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Database Types
export interface Database {
  public: {
    Tables: {
      gallery_items: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          type: 'image' | 'video';
          url: string;
          alt_text?: string;
          order_index: number;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          type: 'image' | 'video';
          url: string;
          alt_text?: string;
          order_index?: number;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          type?: 'image' | 'video';
          url?: string;
          alt_text?: string;
          order_index?: number;
          is_active?: boolean;
        };
      };
      success_stories: {
        Row: {
          id: string;
          created_at: string;
          client_name: string;
          client_image?: string;
          story_title: string;
          story_content: string;
          before_image?: string;
          after_image?: string;
          transformation_stats?: any;
          is_featured: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          client_name: string;
          client_image?: string;
          story_title: string;
          story_content: string;
          before_image?: string;
          after_image?: string;
          transformation_stats?: any;
          is_featured?: boolean;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          client_name?: string;
          client_image?: string;
          story_title?: string;
          story_content?: string;
          before_image?: string;
          after_image?: string;
          transformation_stats?: any;
          is_featured?: boolean;
          is_active?: boolean;
        };
      };
      services: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          icon: string;
          features: string[];
          gradient: string;
          pricing?: any;
          is_active: boolean;
          order_index: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          icon: string;
          features: string[];
          gradient: string;
          pricing?: any;
          is_active?: boolean;
          order_index?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          icon?: string;
          features?: string[];
          gradient?: string;
          pricing?: any;
          is_active?: boolean;
          order_index?: number;
        };
      };
      appointments: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          service_type: string;
          preferred_date: string;
          preferred_time: string;
          message?: string;
          status: 'pending' | 'confirmed' | 'cancelled';
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          service_type: string;
          preferred_date: string;
          preferred_time: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          service_type?: string;
          preferred_date?: string;
          preferred_time?: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
        };
      };
      contact_info: {
        Row: {
          id: string;
          created_at: string;
          phone: string;
          email: string;
          address: string;
          hours: string;
          social_links: any;
        };
        Insert: {
          id?: string;
          created_at?: string;
          phone: string;
          email: string;
          address: string;
          hours: string;
          social_links: any;
        };
        Update: {
          id?: string;
          created_at?: string;
          phone?: string;
          email?: string;
          address?: string;
          hours?: string;
          social_links?: any;
        };
      };
      trainer_info: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          title: string;
          bio: string;
          profile_image?: string;
          certifications: any[];
          experience_years: number;
          specializations: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          title: string;
          bio: string;
          profile_image?: string;
          certifications: any[];
          experience_years: number;
          specializations: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          title?: string;
          bio?: string;
          profile_image?: string;
          certifications?: any[];
          experience_years?: number;
          specializations?: string[];
        };
      };
    };
  };
}