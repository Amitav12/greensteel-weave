import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServicesView from '@/components/admin/ServicesView';
import TrainerView from '@/components/admin/TrainerView';
import ContactView from '@/components/admin/ContactView';
import GalleryView from '@/components/admin/GalleryView';
import SuccessStoriesManager from '@/components/admin/SuccessStoriesManager';
import ContactQueriesView from '@/components/admin/ContactQueriesView';
import HeroManagementView from '@/components/admin/HeroManagementView';
import AppointmentsView from '@/components/admin/AppointmentsView';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { 
  Settings, 
  User, 
  Mail, 
  Image, 
  Star, 
  Dumbbell,
  MessageSquare,
  Video,
  Calendar
} from 'lucide-react';

const AdminDashboard = () => {
  const { signOut } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('services');

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold">Kinetic Admin Dashboard</h1>
            <Button variant="outline" onClick={signOut}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 lg:grid-cols-8 w-full">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="trainer" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Trainer</span>
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Hero</span>
            </TabsTrigger>
            <TabsTrigger value="queries" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Queries</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Stories</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <ServicesView />
          </TabsContent>

          <TabsContent value="trainer">
            <TrainerView />
          </TabsContent>

          <TabsContent value="hero">
            <HeroManagementView />
          </TabsContent>

          <TabsContent value="queries">
            <ContactQueriesView />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentsView />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryView />
          </TabsContent>

          <TabsContent value="stories">
            <SuccessStoriesManager />
          </TabsContent>

          <TabsContent value="contact">
            <ContactView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
