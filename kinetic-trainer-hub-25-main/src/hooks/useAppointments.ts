
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Appointment = Database['public']['Tables']['appointments']['Row'];
type AppointmentInsert = Database['public']['Tables']['appointments']['Insert'];

export const useAppointments = () => {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const createAppointment = async (appointmentData: AppointmentInsert): Promise<Appointment> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async (): Promise<Appointment[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
      return data || [];
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Appointment> => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    appointments,
    loading,
    createAppointment,
    fetchAppointments,
    updateAppointmentStatus
  };
};
