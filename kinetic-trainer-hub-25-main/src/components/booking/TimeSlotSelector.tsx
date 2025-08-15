
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingSlots } from '@/hooks/useBookingSlots';

interface TimeSlotSelectorProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
}

const TimeSlotSelector = ({ selectedDate, selectedTime, onTimeSelect }: TimeSlotSelectorProps) => {
  const { isSlotBooked } = useBookingSlots();
  
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
  ];

  if (!selectedDate) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="w-12 h-12 mx-auto mb-4" />
        <p>Please select a date first</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Time</h3>
      <div className="grid grid-cols-3 gap-2">
        {timeSlots.map((time) => {
          const isBooked = isSlotBooked(selectedDate, time);
          const isSelected = selectedTime === time;
          
          return (
            <Button
              key={time}
              variant={isSelected ? "default" : "outline"}
              disabled={isBooked}
              onClick={() => onTimeSelect(time)}
              className={`${isBooked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {time}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
