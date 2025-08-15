
import { useState } from 'react';
import { Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { bookingService } from '@/services/bookingService';
import TimeSlotSelector from './TimeSlotSelector';

interface AppointmentFormProps {
  onSuccess?: () => void;
}

const AppointmentForm = ({ onSuccess }: AppointmentFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_type: '',
    message: ''
  });

  const serviceTypes = [
    'Strength Training',
    'Cardio Conditioning',
    'Functional Fitness',
    'Goal-Specific Training',
    'Group Sessions'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Validation Error",
        description: "Please select both date and time",
        variant: "destructive"
      });
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.service_type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const dateString = selectedDate.toISOString().split('T')[0];
      
      // Check if slot is still available
      const isAvailable = await bookingService.isSlotAvailable(dateString, selectedTime);
      if (!isAvailable) {
        toast({
          title: "Slot Unavailable",
          description: "This time slot has been booked by another client",
          variant: "destructive"
        });
        return;
      }

      await bookingService.createAppointment({
        ...formData,
        preferred_date: dateString,
        preferred_time: selectedTime,
        status: 'pending'
      });

      toast({
        title: "Booking Submitted",
        description: "Your appointment request has been sent. We'll confirm it shortly!",
      });

      // Reset form
      setFormData({ name: '', email: '', phone: '', service_type: '', message: '' });
      setSelectedDate(undefined);
      setSelectedTime('');
      
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Failed to submit appointment request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Your Appointment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date</h3>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 // Disable Sundays
                }
                className="rounded-md border"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-4">
              <TimeSlotSelector
                selectedDate={selectedDate?.toISOString().split('T')[0] || null}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Service Type *</label>
                <Select
                  value={formData.service_type}
                  onValueChange={(value) => setFormData({ ...formData, service_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Additional Message
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Any specific goals or questions?"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="px-8"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Book Appointment'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;
