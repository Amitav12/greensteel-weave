import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { servicesService } from '@/services/adminService';
import { PricingConfig } from '@/types/pricing';
import PricingConfiguration from '@/components/admin/PricingConfiguration';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  pricing: PricingConfig;
  icon?: string;
  gradient?: string;
  order_index: number;
  is_active: boolean;
}

interface FormDataType {
  title: string;
  description: string;
  features: string[];
  pricing: {
    type: 'single' | 'range' | 'tiered' | 'contact';
    value?: number;
    minValue?: number;
    maxValue?: number;
    tiers?: Array<{ name: string; price: number; description?: string }>;
    currency: string;
    period?: string;
  };
  icon?: string;
  gradient?: string;
  order_index: number;
  is_active: boolean;
}

const ServicesView = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    description: '',
    features: [],
    pricing: {
      type: 'single',
      currency: 'USD',
      value: 0,
    },
    order_index: 0,
    is_active: true,
  });

  useEffect(() => {
    loadServices();
  }, []);

  const parsePricingFromJson = (jsonPricing: any): PricingConfig => {
    try {
      if (typeof jsonPricing === 'string') {
        const parsed = JSON.parse(jsonPricing);
        return parsed as PricingConfig;
      } else if (typeof jsonPricing === 'object' && jsonPricing !== null) {
        return jsonPricing as PricingConfig;
      }
    } catch (error) {
      console.warn('Failed to parse pricing JSON:', error);
    }
    
    // Return default pricing if parsing fails
    return {
      type: 'contact',
      currency: 'USD'
    };
  };

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await servicesService.getAll();
      
      // Convert the Json pricing to PricingConfig
      const servicesWithParsedPricing = data.map(service => ({
        ...service,
        pricing: parsePricingFromJson(service.pricing)
      }));
      
      setServices(servicesWithParsedPricing);
    } catch (error) {
      console.error('Load services error:', error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      features: [],
      pricing: {
        type: 'single',
        currency: 'USD',
        value: 0,
      },
      order_index: 0,
      is_active: true,
    });
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      ...service,
      pricing: service.pricing,
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setLoading(true);
        await servicesService.delete(id);
        toast({
          title: "Success",
          description: "Service deleted successfully"
        });
        loadServices();
      } catch (error) {
        console.error('Service delete error:', error);
        toast({
          title: "Error",
          description: "Failed to delete service",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleActive = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      is_active: checked
    }));
  };

  const handlePricingChange = (pricing: PricingConfig) => {
    console.log('Pricing change:', pricing);
    
    // Ensure pricing object has all required fields
    const validatedPricing = {
      type: pricing.type,
      currency: pricing.currency || 'USD',
      period: pricing.period,
      ...(pricing.type === 'single' && { value: pricing.value || 0 }),
      ...(pricing.type === 'range' && { 
        minValue: pricing.minValue || 0, 
        maxValue: pricing.maxValue || 0 
      }),
      ...(pricing.type === 'tiered' && { 
        tiers: pricing.tiers || [] 
      })
    };

    setFormData(prev => ({
      ...prev,
      pricing: validatedPricing
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validate form data
      if (!formData.title.trim() || !formData.description.trim()) {
        throw new Error('Title and description are required');
      }

      // Validate pricing based on type
      const { pricing } = formData;
      if (pricing.type === 'single' && (!pricing.value || pricing.value <= 0)) {
        throw new Error('Single pricing must have a positive value');
      }
      
      if (pricing.type === 'range' && 
          (!pricing.minValue || !pricing.maxValue || 
           pricing.minValue <= 0 || pricing.maxValue <= 0 ||
           pricing.minValue >= pricing.maxValue)) {
        throw new Error('Range pricing must have valid min and max values');
      }
      
      if (pricing.type === 'tiered' && (!pricing.tiers || pricing.tiers.length === 0)) {
        throw new Error('Tiered pricing must have at least one tier');
      }

      const serviceData = {
        ...formData,
        pricing: pricing
      };

      if (editingService) {
        await servicesService.update(editingService.id, serviceData);
        toast({
          title: "Success",
          description: "Service updated successfully"
        });
      } else {
        await servicesService.create(serviceData);
        toast({
          title: "Success", 
          description: "Service created successfully"
        });
      }
      
      setEditingService(null);
      resetForm();
      loadServices();
    } catch (error) {
      console.error('Service save error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save service",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Services Management</h2>
        <p className="text-muted-foreground">Create, edit, and manage service offerings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{editingService ? 'Edit Service' : 'Create New Service'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Service Title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Service Description"
                  rows={3}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order_index">Order Index</Label>
                <Input
                  type="number"
                  id="order_index"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleInputChange}
                  placeholder="Order Index"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="is_active">Active</Label>
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={handleToggleActive}
                />
              </div>

              <PricingConfiguration 
                pricing={formData.pricing}
                onChange={handlePricingChange}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {editingService ? 'Update Service' : 'Create Service'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Services</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                <span>Loading services...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Title</TableHead>
                      <TableHead>Pricing</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell>{service.pricing.type}</TableCell>
                        <TableCell>{service.is_active ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(service.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServicesView;
