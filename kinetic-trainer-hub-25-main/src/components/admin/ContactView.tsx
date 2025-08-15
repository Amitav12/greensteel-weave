
import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Save, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { contactInfoService } from '@/services/adminService';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

const ContactView = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    hours: '',
    social_links: {
      instagram: '',
      facebook: '',
      twitter: '',
      youtube: '',
      linkedin: ''
    }
  });

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const data = await contactInfoService.get();
      if (data) {
        const socialLinks = (data.social_links as any) || {};
        setFormData({
          phone: data.phone || '',
          email: data.email || '',
          address: data.address || '',
          hours: data.hours || '',
          social_links: {
            instagram: socialLinks.instagram || '',
            facebook: socialLinks.facebook || '',
            twitter: socialLinks.twitter || '',
            youtube: socialLinks.youtube || '',
            linkedin: socialLinks.linkedin || ''
          }
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load contact information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContactInfo();
  }, []);

  // Real-time sync for contact info
  useRealtimeSync('contact_info', loadContactInfo, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phone.trim() || !formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Phone and email are required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      await contactInfoService.update(formData);
      toast({
        title: "Success",
        description: "Contact information updated successfully"
      });
      // loadContactInfo will be called automatically by real-time sync
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update contact information",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData({
      ...formData,
      social_links: {
        ...formData.social_links,
        [platform]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading contact information...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Information</h2>
        <p className="text-muted-foreground">Manage your business contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Basic Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="info@fitness.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Business Address</label>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Fitness Street, Health City, HC 12345"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Business Hours</label>
              <Textarea
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="Mon-Fri: 6AM - 10PM&#10;Sat-Sun: 8AM - 8PM"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Social Media Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Instagram</label>
                <Input
                  value={formData.social_links.instagram}
                  onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Facebook</label>
                <Input
                  value={formData.social_links.facebook}
                  onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                  placeholder="https://facebook.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Twitter</label>
                <Input
                  value={formData.social_links.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">YouTube</label>
                <Input
                  value={formData.social_links.youtube}
                  onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                  placeholder="https://youtube.com/channel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn</label>
                <Input
                  value={formData.social_links.linkedin}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {(formData.phone || formData.email || formData.address || formData.hours) && (
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{formData.phone}</span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>{formData.email}</span>
                  </div>
                )}
                {formData.address && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <span className="whitespace-pre-line">{formData.address}</span>
                  </div>
                )}
                {formData.hours && (
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <span className="whitespace-pre-line">{formData.hours}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={saving}
            className="px-8"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactView;
