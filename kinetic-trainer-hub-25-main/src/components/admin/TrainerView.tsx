import { useState, useEffect } from 'react';
import { User, Save, Plus, Trash2, Award, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { trainerInfoService } from '@/services/adminService';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';

interface Certification {
  name: string;
  year: string;
  organization: string;
}

const TrainerView = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profile_image: '',
    experience_years: 0,
    certifications: [] as Certification[],
    specializations: [] as string[],
    awards: [] as string[]
  });

  const loadTrainerInfo = async () => {
    try {
      setLoading(true);
      const data = await trainerInfoService.get();
      if (data) {
        let certifications: Certification[] = [];
        
        if (Array.isArray(data.certifications)) {
          certifications = (data.certifications as any[]).map((cert: any) => ({
            name: cert?.name || '',
            year: cert?.year || '',
            organization: cert?.organization || ''
          }));
        }
        
        setFormData({
          name: data.name,
          title: data.title,
          bio: data.bio,
          profile_image: data.profile_image || '',
          experience_years: data.experience_years || 0,
          certifications,
          specializations: data.specializations || [],
          awards: Array.isArray(data.awards) ? data.awards : []
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load trainer information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainerInfo();
  }, []);

  // Real-time sync for trainer info
  useRealtimeSync('trainer_info', loadTrainerInfo, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.title.trim() || !formData.bio.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      setSaving(true);
      const payload = {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        profile_image: formData.profile_image || null,
        experience_years: formData.experience_years,
        certifications: formData.certifications.map(c => ({ name: c.name, year: c.year, organization: c.organization })),
        specializations: formData.specializations,
        awards: formData.awards,
      };
      await trainerInfoService.update(payload as any);
      toast({
        title: "Success",
        description: "Trainer information updated successfully"
      });
      // loadTrainerInfo will be called automatically by real-time sync
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update trainer information",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addCertification = () => {
    setFormData({
      ...formData,
      certifications: [...formData.certifications, { name: '', year: '', organization: '' }]
    });
  };

  const updateCertification = (index: number, field: keyof Certification, value: string) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index] = { ...newCertifications[index], [field]: value };
    setFormData({ ...formData, certifications: newCertifications });
  };

  const removeCertification = (index: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((_, i) => i !== index)
    });
  };

  const addSpecialization = () => {
    setFormData({
      ...formData,
      specializations: [...formData.specializations, '']
    });
  };

  const updateSpecialization = (index: number, value: string) => {
    const newSpecializations = [...formData.specializations];
    newSpecializations[index] = value;
    setFormData({ ...formData, specializations: newSpecializations });
  };

  const removeSpecialization = (index: number) => {
    setFormData({
      ...formData,
      specializations: formData.specializations.filter((_, i) => i !== index)
    });
  };

  const addAward = () => {
    setFormData({
      ...formData,
      awards: [...formData.awards, '']
    });
  };

  const updateAward = (index: number, value: string) => {
    const newAwards = [...formData.awards];
    newAwards[index] = value;
    setFormData({ ...formData, awards: newAwards });
  };

  const removeAward = (index: number) => {
    setFormData({
      ...formData,
      awards: formData.awards.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading trainer information...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Trainer Information</h2>
        <p className="text-muted-foreground">Manage your trainer profile and credentials</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Professional Title *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Certified Personal Trainer"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <Input
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData({ ...formData, experience_years: parseInt(e.target.value) || 0 })}
                placeholder="Years of experience"
                min="0"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio *</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell clients about your background, approach, and what makes you unique..."
                rows={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profile Image URL</label>
              <Input
                value={formData.profile_image}
                onChange={(e) => setFormData({ ...formData, profile_image: e.target.value })}
                placeholder="https://example.com/profile.jpg"
              />
              {formData.profile_image && (
                <div className="mt-2">
                  <img 
                    src={formData.profile_image} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certifications
              </div>
              <Button type="button" onClick={addCertification} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Certification
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.certifications.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No certifications added yet. Click "Add Certification" to get started.
              </p>
            ) : (
              formData.certifications.map((cert, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">Certification {index + 1}</h4>
                    <Button
                      type="button"
                      onClick={() => removeCertification(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      placeholder="Certification name"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Year obtained"
                      value={cert.year}
                      onChange={(e) => updateCertification(index, 'year', e.target.value)}
                    />
                    <Input
                      placeholder="Organization"
                      value={cert.organization}
                      onChange={(e) => updateCertification(index, 'organization', e.target.value)}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Specializations
              </div>
              <Button type="button" onClick={addSpecialization} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Specialization
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.specializations.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No specializations added yet. Click "Add Specialization" to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.specializations.map((spec, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={spec}
                      onChange={(e) => updateSpecialization(index, e.target.value)}
                      placeholder="e.g., Weight Loss, Strength Training, etc."
                    />
                    <Button
                      type="button"
                      onClick={() => removeSpecialization(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Awards & Recognition
              </div>
              <Button type="button" onClick={addAward} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Award
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.awards.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No awards added yet. Click "Add Award" to get started.
              </p>
            ) : (
              <div className="space-y-2">
                {formData.awards.map((award, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={award}
                      onChange={(e) => updateAward(index, e.target.value)}
                      placeholder="e.g., 2024 Elite Trainer of the Year"
                    />
                    <Button
                      type="button"
                      onClick={() => removeAward(index)}
                      variant="outline"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

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

export default TrainerView;
