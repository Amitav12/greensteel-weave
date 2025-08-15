
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Star, StarOff, Eye, EyeOff, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { successStoriesService } from '@/services/adminService';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import FileUpload from './FileUpload';

interface SuccessStory {
  id: string;
  created_at: string;
  client_name: string;
  client_image?: string;
  story_title: string;
  story_content: string;
  before_image?: string;
  after_image?: string;
  transformation_stats?: any;
  is_featured: boolean;
  is_active: boolean;
}

interface TransformationStat {
  key: string;
  value: string;
  label: string;
}

const SuccessStoriesManager = () => {
  const { toast } = useToast();
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_image: '',
    story_title: '',
    story_content: '',
    before_image: '',
    after_image: '',
    transformation_stats: [] as TransformationStat[],
    is_featured: false,
    is_active: true
  });

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await successStoriesService.getAll();
      setStories(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load success stories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Enable real-time synchronization
  useRealtimeSync('success_stories', loadStories, []);

  useEffect(() => {
    loadStories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name.trim() || !formData.story_title.trim() || !formData.story_content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      const storyData = {
        ...formData,
        transformation_stats: formData.transformation_stats.reduce((acc, stat) => {
          if (stat.key && stat.value) {
            acc[stat.key] = stat.value;
          }
          return acc;
        }, {} as any)
      };

      if (editingStory) {
        await successStoriesService.update(editingStory.id, storyData);
        toast({
          title: "Success",
          description: "Success story updated successfully"
        });
      } else {
        await successStoriesService.create(storyData);
        toast({
          title: "Success",
          description: "Success story added successfully"
        });
      }
      
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save success story",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this success story?')) return;
    
    try {
      await successStoriesService.delete(id);
      toast({
        title: "Success",
        description: "Success story deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete success story",
        variant: "destructive"
      });
    }
  };

  const handleToggleFeatured = async (story: SuccessStory) => {
    try {
      await successStoriesService.update(story.id, { is_featured: !story.is_featured });
      toast({
        title: "Success",
        description: `Story ${!story.is_featured ? 'featured' : 'unfeatured'} successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update story",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (story: SuccessStory) => {
    try {
      await successStoriesService.update(story.id, { is_active: !story.is_active });
      toast({
        title: "Success",
        description: `Story ${!story.is_active ? 'activated' : 'deactivated'} successfully`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update story",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_image: '',
      story_title: '',
      story_content: '',
      before_image: '',
      after_image: '',
      transformation_stats: [],
      is_featured: false,
      is_active: true
    });
    setEditingStory(null);
    setShowAddForm(false);
  };

  const startEdit = (story: SuccessStory) => {
    const stats = story.transformation_stats ? 
      Object.entries(story.transformation_stats).map(([key, value]) => ({
        key,
        value: String(value),
        label: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      })) : [];

    setFormData({
      client_name: story.client_name,
      client_image: story.client_image || '',
      story_title: story.story_title,
      story_content: story.story_content,
      before_image: story.before_image || '',
      after_image: story.after_image || '',
      transformation_stats: stats,
      is_featured: story.is_featured,
      is_active: story.is_active
    });
    setEditingStory(story);
    setShowAddForm(true);
  };

  const addTransformationStat = () => {
    setFormData({
      ...formData,
      transformation_stats: [...formData.transformation_stats, { key: '', value: '', label: '' }]
    });
  };

  const updateTransformationStat = (index: number, field: keyof TransformationStat, value: string) => {
    const newStats = [...formData.transformation_stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData({ ...formData, transformation_stats: newStats });
  };

  const removeTransformationStat = (index: number) => {
    setFormData({
      ...formData,
      transformation_stats: formData.transformation_stats.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Success Stories Management</h2>
          <p className="text-muted-foreground">Manage client success stories and testimonials</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-primary to-secondary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Story
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{editingStory ? 'Edit' : 'Add'} Success Story</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Name *</label>
                    <Input
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="Client's name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Story Title *</label>
                    <Input
                      value={formData.story_title}
                      onChange={(e) => setFormData({ ...formData, story_title: e.target.value })}
                      placeholder="e.g., Lost 30 Pounds in 4 Months"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Story Content *</label>
                  <Textarea
                    value={formData.story_content}
                    onChange={(e) => setFormData({ ...formData, story_content: e.target.value })}
                    placeholder="Tell the client's transformation story..."
                    rows={4}
                    required
                  />
                </div>

                {/* Images */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Client Photo</label>
                    <FileUpload
                      onUpload={(url) => setFormData({ ...formData, client_image: url })}
                      type="image"
                      accept="image/*"
                      maxSize={5}
                      className="h-24"
                      currentUrl={formData.client_image}
                      onRemove={() => setFormData({ ...formData, client_image: '' })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Before Photo</label>
                    <FileUpload
                      onUpload={(url) => setFormData({ ...formData, before_image: url })}
                      type="image"
                      accept="image/*"
                      maxSize={5}
                      className="h-24"
                      currentUrl={formData.before_image}
                      onRemove={() => setFormData({ ...formData, before_image: '' })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">After Photo</label>
                    <FileUpload
                      onUpload={(url) => setFormData({ ...formData, after_image: url })}
                      type="image"
                      accept="image/*"
                      maxSize={5}
                      className="h-24"
                      currentUrl={formData.after_image}
                      onRemove={() => setFormData({ ...formData, after_image: '' })}
                    />
                  </div>
                </div>

                {/* Transformation Stats */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium">Transformation Stats</label>
                    <Button type="button" onClick={addTransformationStat} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Stat
                    </Button>
                  </div>
                  {formData.transformation_stats.map((stat, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        placeholder="Stat key (e.g., weight_lost)"
                        value={stat.key}
                        onChange={(e) => updateTransformationStat(index, 'key', e.target.value)}
                      />
                      <Input
                        placeholder="Value (e.g., 30 lbs)"
                        value={stat.value}
                        onChange={(e) => updateTransformationStat(index, 'value', e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeTransformationStat(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Settings */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <label className="text-sm font-medium">Featured Story</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <label className="text-sm font-medium">Active</label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit">
                    {editingStory ? 'Update' : 'Add'} Story
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Stories Grid */}
      <div className="grid gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${!story.is_active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Images */}
                  <div className="flex gap-2">
                    {story.client_image && (
                      <img src={story.client_image} alt={story.client_name} className="w-16 h-16 rounded-full object-cover" />
                    )}
                    {story.before_image && (
                      <img src={story.before_image} alt="Before" className="w-16 h-16 rounded object-cover" />
                    )}
                    {story.after_image && (
                      <img src={story.after_image} alt="After" className="w-16 h-16 rounded object-cover" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{story.story_title}</h3>
                        <p className="text-sm text-muted-foreground">by {story.client_name}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {story.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        <Badge variant={story.is_active ? "default" : "outline"}>
                          {story.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3">{story.story_content}</p>

                    {/* Transformation Stats */}
                    {story.transformation_stats && Object.keys(story.transformation_stats).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(story.transformation_stats).map(([key, value]) => (
                          <Badge key={key} variant="outline" className="text-xs">
                            {key.replace(/_/g, ' ')}: {String(value)}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFeatured(story)}
                      >
                        {story.is_featured ? (
                          <StarOff className="w-4 h-4" />
                        ) : (
                          <Star className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(story)}
                      >
                        {story.is_active ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(story)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(story.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStoriesManager;
