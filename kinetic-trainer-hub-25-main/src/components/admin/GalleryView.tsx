import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Video, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { galleryService } from '@/services/adminService';
import { useRealtimeSync } from '@/hooks/useRealtimeSync';
import FileUpload from '@/components/admin/FileUpload';

interface GalleryItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  alt_text?: string;
  order_index: number;
  is_active: boolean;
}

const GalleryView = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('upload');
  const [formData, setFormData] = useState({
    title: '',
    type: 'image' as 'image' | 'video',
    url: '',
    alt_text: '',
    is_active: true
  });

  const loadItems = async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAll();
      const normalized = (data || []).map((d: any) => ({
        id: d.id,
        title: d.title,
        type: (d.type === 'video' ? 'video' : 'image') as 'image' | 'video',
        url: d.url,
        alt_text: d.alt_text ?? '',
        order_index: d.order_index ?? 0,
        is_active: d.is_active ?? true,
      }));
      setItems(normalized);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load gallery items",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useRealtimeSync('gallery_items', loadItems, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url) {
      toast({
        title: "Error",
        description: "Please provide a file URL or upload a file",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (editingItem) {
        await galleryService.update(editingItem.id, formData);
        toast({
          title: "Success",
          description: "Gallery item updated successfully"
        });
      } else {
        await galleryService.create({
          ...formData,
          order_index: items.length
        });
        toast({
          title: "Success",
          description: "Gallery item added successfully"
        });
      }
      
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save gallery item",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (url: string) => {
    setFormData({ ...formData, url });
  };

  const handleRemoveFile = () => {
    setFormData({ ...formData, url: '' });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'image',
      url: '',
      alt_text: '',
      is_active: true
    });
    setEditingItem(null);
    setShowAddForm(false);
    setUploadMethod('upload');
  };

  const startEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      type: item.type,
      url: item.url,
      alt_text: item.alt_text || '',
      is_active: item.is_active
    });
    setEditingItem(item);
    setShowAddForm(true);
    setUploadMethod('url');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await galleryService.delete(id);
      toast({
        title: "Success",
        description: "Gallery item deleted successfully"
      });
      // loadItems will be called automatically by real-time sync
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete gallery item",
        variant: "destructive"
      });
    }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      await galleryService.update(item.id, { is_active: !item.is_active });
      toast({
        title: "Success",
        description: `Gallery item ${!item.is_active ? 'activated' : 'deactivated'}`
      });
      // loadItems will be called automatically by real-time sync
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update gallery item",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
        <span>Loading gallery items...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gallery Management</h2>
          <p className="text-muted-foreground">Manage photos and videos with upload support</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit' : 'Add'} Gallery Item</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'image' | 'video' })}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>
              
              {/* Upload Method Toggle */}
              <div className="space-y-3">
                <label className="block text-sm font-medium">Upload Method</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="uploadMethod"
                      value="upload"
                      checked={uploadMethod === 'upload'}
                      onChange={(e) => setUploadMethod(e.target.value as 'url' | 'upload')}
                    />
                    <span>Upload File</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="uploadMethod"
                      value="url"
                      checked={uploadMethod === 'url'}
                      onChange={(e) => setUploadMethod(e.target.value as 'url' | 'upload')}
                    />
                    <span>Enter URL</span>
                  </label>
                </div>
              </div>

              {/* File Upload or URL Input */}
              {uploadMethod === 'upload' ? (
                <div>
                  <label className="block text-sm font-medium mb-2">Upload File</label>
                  <FileUpload
                    onUpload={handleFileUpload}
                    type={formData.type}
                    currentUrl={formData.url}
                    onRemove={handleRemoveFile}
                    maxSize={50}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium mb-2">File URL</label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="Enter image/video URL"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-2">Alt Text (for images)</label>
                <Textarea
                  value={formData.alt_text}
                  onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                  placeholder="Describe the image for accessibility"
                  rows={2}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <label className="text-sm font-medium">Active</label>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" disabled={!formData.url}>
                  {editingItem ? 'Update' : 'Add'} Item
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className={`${!item.is_active ? 'opacity-60' : ''}`}>
            <CardContent className="p-4">
              <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.alt_text}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">{item.title}</h3>
                  <div className="flex items-center gap-1">
                    {item.type === 'image' ? (
                      <ImageIcon className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Video className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleActive(item)}
                  >
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => startEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No gallery items</h3>
            <p className="text-muted-foreground mb-4">
              Start by uploading your first photo or video.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GalleryView;
