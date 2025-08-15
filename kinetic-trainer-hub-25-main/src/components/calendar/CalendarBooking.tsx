import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, Send, AlertCircle, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAppointments } from '@/hooks/useAppointments';
import { useBookingSlots } from '@/hooks/useBookingSlots';

// Types
interface AppointmentData {
  date: Date;
  time: string;
  sessionType: SessionType;
  duration: number;
  trainerId?: string;
}

interface SessionType {
  id: string;
  name: string;
  duration: number;
  description: string;
  icon: string;
}

interface CalendarBookingProps {
  onAppointmentSelect: (appointment: AppointmentData | null) => void;
  selectedAppointment?: AppointmentData;
}

interface BookingActionsProps {
  appointment: AppointmentData;
  onBookingSubmit: (appointment: AppointmentData) => Promise<void>;
}

enum BookingStatus {
  IDLE = 'idle',
  SUBMITTING = 'submitting',
  SUCCESS = 'success',
  ERROR = 'error'
}

// BookingActions Component
const BookingActions = ({ appointment, onBookingSubmit }: BookingActionsProps) => {
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>(BookingStatus.IDLE);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setBookingStatus(BookingStatus.SUBMITTING);
    try {
      await onBookingSubmit(appointment);
      setBookingStatus(BookingStatus.SUCCESS);
    } catch (error) {
      setBookingStatus(BookingStatus.ERROR);
      toast({
        title: "Booking Failed",
        description: "There was an error submitting your appointment request. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getButtonContent = () => {
    switch (bookingStatus) {
      case BookingStatus.SUBMITTING:
        return (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
            Submitting Request...
          </>
        );
      case BookingStatus.SUCCESS:
        return (
          <>
            <Check className="w-4 h-4 mr-2" />
            Request Submitted!
          </>
        );
      case BookingStatus.ERROR:
        return (
          <>
            <AlertCircle className="w-4 h-4 mr-2" />
            Try Again
          </>
        );
      default:
        return (
          <>
            <Send className="w-4 h-4 mr-2" />
            Request Appointment
          </>
        );
    }
  };

  const getButtonStyle = () => {
    switch (bookingStatus) {
      case BookingStatus.SUCCESS:
        return "bg-green-600 hover:bg-green-700";
      case BookingStatus.ERROR:
        return "bg-red-600 hover:bg-red-700";
      default:
        return "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90";
    }
  };

  if (bookingStatus === BookingStatus.SUCCESS) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-4"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h5 className="font-semibold text-green-800 mb-2">Appointment Request Sent!</h5>
        <p className="text-sm text-muted-foreground mb-4">
          Your appointment request has been sent to our admin team for confirmation. 
          You'll receive an email confirmation within 24 hours.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-xs text-green-700">
            <strong>Next Steps:</strong> Our team will review your request and send you a confirmation email 
            with payment details and any additional instructions.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
      <div className="text-sm text-muted-foreground">
        <AlertCircle className="w-4 h-4 inline mr-1" />
        This appointment requires admin confirmation
      </div>
      <Button
        onClick={handleSubmit}
        disabled={bookingStatus === BookingStatus.SUBMITTING}
        className={`${getButtonStyle()} text-white px-6 py-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl`}
      >
        {getButtonContent()}
      </Button>
    </div>
  );
};

const CalendarBooking = ({ onAppointmentSelect, selectedAppointment }: CalendarBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSessionType, setSelectedSessionType] = useState<SessionType | null>(null);
  const { toast } = useToast();
  const { createAppointment } = useAppointments();
  const { isSlotBooked } = useBookingSlots();

  // Mock data
  const sessionTypes: SessionType[] = [
    {
      id: 'consultation',
      name: 'Free Consultation',
      duration: 30,
      description: 'Initial assessment and goal setting',
      icon: '💬'
    },
    {
      id: 'training',
      name: 'Personal Training',
      duration: 60,
      description: 'One-on-one training session',
      icon: '💪'
    },
    {
      id: 'assessment',
      name: 'Fitness Assessment',
      duration: 45,
      description: 'Comprehensive fitness evaluation',
      icon: '📊'
    }
  ];

  const availableTimes = [
    '9:00 AM', '10:30 AM', '12:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'
  ];

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    updateAppointment(selectedDate, time, selectedSessionType);
  };

  const handleSessionTypeSelect = (sessionType: SessionType) => {
    setSelectedSessionType(sessionType);
    updateAppointment(selectedDate, selectedTime, sessionType);
  };

  const updateAppointment = (date: Date | null, time: string, sessionType: SessionType | null) => {
    if (date && time && sessionType) {
      const appointment: AppointmentData = {
        date,
        time,
        sessionType,
        duration: sessionType.duration,
        trainerId: 'alex-johnson'
      };
      onAppointmentSelect(appointment);
    } else {
      onAppointmentSelect(null);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isTimeSlotBooked = (time: string): boolean => {
    if (!selectedDate) return false;
    const dateStr = selectedDate.toISOString().split('T')[0];
    return isSlotBooked(dateStr, time);
  };

  const handleBookingSubmit = async (appointment: AppointmentData) => {
    // Create the appointment in the database
    const appointmentData = {
      name: 'Booking from Calendar', // This would come from a form
      email: 'client@example.com', // This would come from a form  
      phone: '555-0123', // This would come from a form
      service_type: appointment.sessionType.name,
      preferred_date: appointment.date.toISOString().split('T')[0],
      preferred_time: appointment.time,
      message: `Appointment booked through calendar for ${appointment.sessionType.name}`,
      status: 'pending' as const
    };

    await createAppointment(appointmentData);
    
    toast({
      title: "Appointment Request Submitted! 🎉",
      description: "Your request has been sent to our admin team for confirmation. You'll hear back within 24 hours.",
    });

    // Reset selections after successful submission
    setTimeout(() => {
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedSessionType(null);
      onAppointmentSelect(null);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="bg-gradient-to-br from-card via-card to-primary/5 border-border/50 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
              📅 Schedule Your Session
            </div>
            <h3 className="text-2xl font-bold mb-2">Book Your Appointment</h3>
            <p className="text-muted-foreground">
              Choose your preferred date, time, and session type to get started
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Session Types */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <User className="w-4 h-4" />
                Session Type
              </h4>
              <div className="space-y-3">
                {sessionTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSessionTypeSelect(type)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      selectedSessionType?.id === type.id
                        ? 'border-primary bg-primary/10 shadow-lg'
                        : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{type.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{type.name}</div>
                        <div className="text-xs text-muted-foreground mb-1">
                          {type.description}
                        </div>
                        <div className="text-xs font-medium text-primary">
                          {type.duration} minutes
                        </div>
                      </div>
                      {selectedSessionType?.id === type.id && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Available Dates */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Available Dates
              </h4>
              <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {availableDates.slice(0, 14).map((date, index) => (
                  <motion.button
                    key={date.toISOString()}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDateSelect(date)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                      isDateSelected(date)
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-border/50 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {formatDate(date)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Available Times
              </h4>
              {selectedDate ? (
                <div className="grid grid-cols-1 gap-2">
                  {availableTimes.map((time, index) => {
                    const isBooked = isTimeSlotBooked(time);
                    return (
                      <motion.button
                        key={time}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={!isBooked ? { scale: 1.02 } : {}}
                        whileTap={!isBooked ? { scale: 0.98 } : {}}
                        onClick={() => !isBooked && handleTimeSelect(time)}
                        disabled={isBooked}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          isBooked
                            ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed'
                            : selectedTime === time
                            ? 'border-secondary bg-secondary text-white shadow-lg'
                            : 'border-border/50 hover:border-secondary/50 hover:bg-secondary/5'
                        }`}
                      >
                        {time} {isBooked && '(Booked)'}
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a date to see available times</p>
                </div>
              )}
            </div>
          </div>

          {/* Booking Summary */}
          {selectedAppointment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
            >
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Appointment Summary
              </h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm mb-6">
                <div>
                  <span className="text-muted-foreground">Date & Time:</span>
                  <div className="font-semibold">
                    {selectedAppointment.date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="font-semibold text-primary">
                    {selectedAppointment.time}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Session:</span>
                  <div className="font-semibold">
                    {selectedAppointment.sessionType.name}
                  </div>
                  <div className="text-muted-foreground">
                    {selectedAppointment.duration} minutes
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Trainer:</span>
                  <div className="font-semibold">Alex Johnson</div>
                  <div className="text-muted-foreground">Certified Personal Trainer</div>
                </div>
              </div>
              
              {/* Booking Actions */}
              <BookingActions 
                appointment={selectedAppointment}
                onBookingSubmit={handleBookingSubmit}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CalendarBooking;
