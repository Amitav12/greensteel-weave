import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import { Mail, Phone, Calendar, Clock, User, MessageSquare } from 'lucide-react';

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

const ContactQueriesView = () => {
  const { toast } = useToast();
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [loading, setLoading] = useState(true);

  const loadQueries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform the data to ensure status is properly typed
      const transformedData = (data || []).map(item => ({
        ...item,
        status: (item.status as ContactQuery['status']) || 'pending'
      }));
      
      setQueries(transformedData);
    } catch (error) {
      console.error('Load queries error:', error);
      toast({
        title: "Error",
        description: "Failed to load contact queries",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueries();
  }, []);

  useRealtimeSync('appointments', loadQueries, []);

  const updateQueryStatus = async (id: string, status: ContactQuery['status']) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Query status updated successfully"
      });
      loadQueries();
    } catch (error) {
      console.error('Update status error:', error);
      toast({
        title: "Error",
        description: "Failed to update query status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: ContactQuery['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'contacted': return 'bg-blue-500';
      case 'scheduled': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading contact queries...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Queries</h2>
        <p className="text-muted-foreground">Manage customer inquiries and appointments</p>
      </div>

      <div className="grid gap-6">
        {queries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No queries yet</h3>
              <p className="text-muted-foreground">Customer inquiries will appear here when submitted.</p>
            </CardContent>
          </Card>
        ) : (
          queries.map((query) => (
            <Card key={query.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <User className="w-5 h-5" />
                    {query.name}
                    <Badge className={`${getStatusColor(query.status)} text-white`}>
                      {query.status}
                    </Badge>
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(query.created_at)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{query.email}</span>
                    </div>
                    {query.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{query.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Service: {query.service_type}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Preferred Date: {formatDate(query.preferred_date)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Preferred Time: {formatTime(query.preferred_time)}</span>
                    </div>
                  </div>
                </div>

                {query.message && (
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Message:</h4>
                    <p className="text-sm text-muted-foreground">{query.message}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    size="sm"
                    variant={query.status === 'pending' ? 'default' : 'outline'}
                    onClick={() => updateQueryStatus(query.id, 'pending')}
                  >
                    Pending
                  </Button>
                  <Button
                    size="sm"
                    variant={query.status === 'contacted' ? 'default' : 'outline'}
                    onClick={() => updateQueryStatus(query.id, 'contacted')}
                  >
                    Contacted
                  </Button>
                  <Button
                    size="sm"
                    variant={query.status === 'scheduled' ? 'default' : 'outline'}
                    onClick={() => updateQueryStatus(query.id, 'scheduled')}
                  >
                    Scheduled
                  </Button>
                  <Button
                    size="sm"
                    variant={query.status === 'completed' ? 'default' : 'outline'}
                    onClick={() => updateQueryStatus(query.id, 'completed')}
                  >
                    Completed
                  </Button>
                  <Button
                    size="sm"
                    variant={query.status === 'cancelled' ? 'outline' : 'outline'}
                    onClick={() => updateQueryStatus(query.id, 'cancelled')}
                    className="text-red-600 hover:text-red-700"
                  >
                    Cancelled
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactQueriesView;
