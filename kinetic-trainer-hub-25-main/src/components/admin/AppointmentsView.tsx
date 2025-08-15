
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAppointments } from '@/hooks/useAppointments';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const AppointmentsView = () => {
  const { appointments, loading, fetchAppointments, updateAppointmentStatus } = useAppointments();
  const { toast } = useToast();

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Real-time sync for appointments
  useRealtimeSync('appointments', fetchAppointments, []);

  const handleStatusUpdate = async (id: string, status: 'confirmed' | 'cancelled') => {
    try {
      await updateAppointmentStatus(id, status);
      toast({
        title: "Success",
        description: `Appointment ${status} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment",
        variant: "destructive"
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-300 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Pending
          </Badge>
        );
      case 'confirmed':
        return (
          <Badge variant="outline" className="text-green-600 border-green-300 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Confirmed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="text-red-600 border-red-300 flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
    return `${formattedDate} at ${time}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading appointments...</span>
      </div>
    );
  }

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const cancelledAppointments = appointments.filter(apt => apt.status === 'cancelled');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Appointments Management</h2>
          <p className="text-muted-foreground">
            {pendingAppointments.length} pending • {confirmedAppointments.length} confirmed • {cancelledAppointments.length} cancelled
          </p>
        </div>
      </div>

      {appointments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Appointments</h3>
            <p className="text-muted-foreground">No appointments have been booked yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {appointments
            .sort((a, b) => new Date(a.preferred_date + ' ' + a.preferred_time).getTime() - new Date(b.preferred_date + ' ' + b.preferred_time).getTime())
            .map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {formatDateTime(appointment.preferred_date, appointment.preferred_time)}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(appointment.status)}
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-primary" />
                      <span>{appointment.email}</span>
                    </div>
                    {appointment.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{appointment.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Service:</span>
                      <span>{appointment.service_type}</span>
                    </div>
                  </div>

                  {appointment.message && (
                    <div className="mb-4 p-3 bg-muted rounded-md">
                      <p className="text-sm"><strong>Message:</strong> {appointment.message}</p>
                    </div>
                  )}

                  {appointment.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;
