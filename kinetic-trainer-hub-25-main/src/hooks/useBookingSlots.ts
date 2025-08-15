
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BookedSlot {
  date: string;
  time: string;
}

export const useBookingSlots = () => {
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  const fetchBookedSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('preferred_date, preferred_time')
        .eq('status', 'confirmed');

      if (error) throw error;
      
      const slots = data.map(appointment => ({
        date: appointment.preferred_date,
        time: appointment.preferred_time
      }));
      
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  useEffect(() => {
    fetchBookedSlots();

    // Listen for real-time updates to appointments
    const channel = supabase
      .channel('appointment-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        () => {
          fetchBookedSlots();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const isSlotBooked = (date: string, time: string): boolean => {
    return bookedSlots.some(slot => 
      slot.date === date && slot.time === time
    );
  };

  return {
    bookedSlots,
    isSlotBooked,
    refreshSlots: fetchBookedSlots
  };
};
