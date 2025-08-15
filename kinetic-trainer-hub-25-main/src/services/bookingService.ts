
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Appointment = Database['public']['Tables']['appointments']['Row'];
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];

export const bookingService = {
  async createAppointment(appointmentData: AppointmentInsert): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert(appointmentData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getBookedSlots(): Promise<{ date: string; time: string }[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('preferred_date, preferred_time')
      .eq('status', 'confirmed');

    if (error) throw error;
    
    return data.map(appointment => ({
      date: appointment.preferred_date,
      time: appointment.preferred_time
    }));
  },

  async isSlotAvailable(date: string, time: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('appointments')
      .select('id')
      .eq('preferred_date', date)
      .eq('preferred_time', time)
      .eq('status', 'confirmed')
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !data;
  }
};
