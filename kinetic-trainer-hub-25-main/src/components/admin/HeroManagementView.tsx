
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Video, Save, Eye, RefreshCw } from 'lucide-react';

interface HeroContent {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  video_url?: string;
  is_active?: boolean;
  cta_text?: string;
  cta_url?: string;
  company_name?: string;
  company_logo?: string;
}

const HeroManagementView = () => {
  const { toast } = useToast();
  const [heroData, setHeroData] = useState<HeroContent>({
    title: "Transform Your Body & Mind",
    subtitle: "Professional Personal Training",
    description: "Unlock your potential with personalized training programs designed to help you achieve lasting results and build sustainable habits.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    is_active: true,
    cta_text: "Start Your Journey",
    cta_url: "/book-appointment",
    company_name: "Kinetic Trainer",
    company_logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center"
  });
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string>('');
  const [videoError, setVideoError] = useState(false);

  const handleVideoUrlChange = (url: string) => {
    setHeroData(prev => ({ ...prev, video_url: url }));
    setVideoPreview(url);
    setVideoError(false);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      // Validate video URL if provided
      if (heroData.video_url) {
        console.log('Saving hero content with video:', heroData.video_url);
      }

      // Simulate API call - in real app, this would save to database
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store in localStorage for now
      localStorage.setItem('heroContent', JSON.stringify(heroData));

      // Trigger a custom event to notify the hero section of changes
      window.dispatchEvent(new CustomEvent('heroContentUpdated', { detail: heroData }));

      toast({
        title: "Success",
        description: "Hero content updated successfully. Changes will appear on the homepage."
      });
    } catch (error) {
      console.error('Error saving hero content:', error);
      toast({
        title: "Error",
        description: "Failed to update hero content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewVideo = () => {
    if (heroData.video_url) {
      setVideoPreview(heroData.video_url);
      setVideoError(false);
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    toast({
      title: "Video Error",
      description: "Unable to load video. Please check the URL format and try again.",
      variant: "destructive"
    });
  };

  useEffect(() => {
    // Load existing hero content from localStorage
    const stored = localStorage.getItem('heroContent');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setHeroData(parsedData);
        setVideoPreview(parsedData.video_url || '');
      } catch (error) {
        console.error('Failed to load hero content:', error);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Hero Section Management</h2>
        <p className="text-muted-foreground">Manage the main hero section content and video</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Content Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name</Label>
              <Input
                id="company_name"
                value={heroData.company_name || ''}
                onChange={(e) => setHeroData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_logo">Company Logo URL</Label>
              <Input
                id="company_logo"
                value={heroData.company_logo || ''}
                onChange={(e) => setHeroData(prev => ({ ...prev, company_logo: e.target.value }))}
                placeholder="Enter logo image URL"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={heroData.title || ''}
                onChange={(e) => setHeroData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter main title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle || ''}
                onChange={(e) => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
                placeholder="Enter subtitle"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={heroData.description || ''}
                onChange={(e) => setHeroData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL</Label>
              <div className="flex gap-2">
                <Input
                  id="video_url"
                  value={heroData.video_url || ''}
                  onChange={(e) => handleVideoUrlChange(e.target.value)}
                  placeholder="Enter video URL (MP4 format)"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePreviewVideo}
                  className="shrink-0"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cta_text">CTA Button Text</Label>
                <Input
                  id="cta_text"
                  value={heroData.cta_text || ''}
                  onChange={(e) => setHeroData(prev => ({ ...prev, cta_text: e.target.value }))}
                  placeholder="Button text"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta_url">CTA Button URL</Label>
                <Input
                  id="cta_url"
                  value={heroData.cta_url || ''}
                  onChange={(e) => setHeroData(prev => ({ ...prev, cta_url: e.target.value }))}
                  placeholder="/book-appointment"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={heroData.is_active || false}
                onCheckedChange={(checked) => setHeroData(prev => ({ ...prev, is_active: checked }))}
              />
            </div>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Header Preview */}
            <div>
              <h4 className="font-medium mb-3">Company Header Preview</h4>
              <div className="p-4 bg-muted/20 rounded-lg border-2 border-dashed border-muted">
                {(heroData.company_name || heroData.company_logo) ? (
                  <div className="flex items-center gap-3">
                    {heroData.company_logo && (
                      <div className="flex-shrink-0">
                        <img
                          src={heroData.company_logo}
                          alt={`${heroData.company_name || 'Company'} Logo`}
                          className="h-16 w-auto object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    {heroData.company_name && (
                      <h2 className="text-lg font-semibold">
                        {heroData.company_name}
                      </h2>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Company name and logo will appear here
                  </p>
                )}
              </div>
            </div>

            {/* Video Preview */}
            <div>
              <h4 className="font-medium mb-3">Video Preview</h4>
              {videoPreview && !videoError ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full object-cover"
                    onError={handleVideoError}
                    onLoadStart={() => console.log('Preview video loading started')}
                    onCanPlay={() => console.log('Preview video can play')}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Video className="w-12 h-12 mx-auto mb-2" />
                    <p>Video preview will appear here</p>
                    <p className="text-sm">Enter a video URL to preview</p>
                    {videoError && (
                      <p className="text-sm text-destructive mt-2">
                        Error loading video. Please check the URL.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Video Guidelines:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use MP4 format for best compatibility</li>
                  <li>• Direct video URLs work best</li>
                  <li>• Video will autoplay on homepage (muted)</li>
                  <li>• Recommended aspect ratio: 16:9</li>
                  <li>• Keep file size reasonable for fast loading</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroManagementView;
