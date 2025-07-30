import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Plus, 
  Camera, 
  Calendar, 
  User, 
  Star, 
  MapPin,
  Save,
  AlertCircle,
  Check,
  Tag
} from 'lucide-react';

const AddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPhotographerBooking, setShowPhotographerBooking] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    category: '',
    tags: [],
    inventory: '',
    sku: '',
    brand: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    specifications: []
  });

  const photographers = [
    {
      id: 1,
      name: 'Samuel Okafor',
      rating: 4.9,
      reviews: 156,
      location: 'Wuse 2, Abuja',
      price: '₦15,000',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      specialty: 'Product Photography',
      portfolio: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=150&h=150&fit=crop'
      ],
      available: ['2024-02-15', '2024-02-16', '2024-02-17']
    },
    {
      id: 2,
      name: 'Fatima Hassan',
      rating: 4.8,
      reviews: 203,
      location: 'Garki, Abuja',
      price: '₦18,000',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c6f3?w=100&h=100&fit=crop&crop=face',
      specialty: 'E-commerce Photography',
      portfolio: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=150&h=150&fit=crop'
      ],
      available: ['2024-02-14', '2024-02-15', '2024-02-18']
    },
    {
      id: 3,
      name: 'David Adebayo',
      rating: 4.7,
      reviews: 89,
      location: 'Maitama, Abuja',
      price: '₦22,000',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      specialty: 'Luxury Product Photography',
      portfolio: [
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop'
      ],
      available: ['2024-02-16', '2024-02-19', '2024-02-20']
    }
  ];

  const categories = [
    'Electronics', 'Fashion & Style', 'Home & Garden', 'Beauty & Health',
    'Sports & Fitness', 'Books & Media', 'Automotive', 'Baby & Kids'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach((file: File) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            setProductImages(prev => [...prev, {
                id: Date.now() + Math.random(),
                src: e.target?.result as string, // FileReader.result can be string or ArrayBuffer
                file: file
            }]);
        };
        reader.readAsDataURL(file);
    });
    event.target.value = ''; // Reset input value to allow re-uploading the same file
    setShowPhotographerBooking(false); // Hide photographer booking when images are uploaded
  };

  const removeImage = (imageId) => {
    setProductImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleBookPhotographer = (photographer) => {
    setSelectedPhotographer(photographer);
    alert(`${photographer.name} has been selected for your product photography session.`);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSaveProduct = () => {
    // Validate required fields
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all required fields.");
      return;
    }

    if (productImages.length === 0 && !selectedPhotographer) {
      alert("Please upload at least one product image or book a photographer.");
      return;
    }

    alert("Product added successfully! Your product has been added to your store and is pending review.");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Add New Product</h1>
          <p className="text-muted-foreground">
            Add your product details and images to start selling
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  step <= currentStep 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-muted text-muted-foreground'
                }`}>
                  {step < currentStep ? <Check className="w-4 h-4" /> : step}
                </div>
                <span className={`ml-2 ${step <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step === 1 ? 'Product Images' : step === 2 ? 'Product Details' : 'Review & Submit'}
                </span>
                {step < 3 && <div className="w-12 h-0.5 bg-border ml-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Product Images */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <p className="text-sm text-muted-foreground">
                  High-quality images are essential for selling products online
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <div className="space-y-4">
                    <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-2">Upload Product Images</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop images here, or click to browse
                      </p>
                      <Button variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Images
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                {/* Uploaded Images */}
                {productImages.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Uploaded Images ({productImages.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {productImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                            <img 
                              src={image.src} 
                              alt="Product" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Photography Option */}
                <div className="border border-border rounded-lg p-6 bg-muted/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-2">
                        Need Professional Photography?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Book a professional photographer to take high-quality product photos that increase sales
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => setShowPhotographerBooking(!showPhotographerBooking)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Browse Photographers
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Photographer Booking */}
                {showPhotographerBooking && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">Available Photographers</h4>
                    <div className="grid gap-4">
                      {photographers.map((photographer) => (
                        <Card key={photographer.id} className="p-4">
                          <div className="flex items-start gap-4">
                            <img 
                              src={photographer.avatar} 
                              alt={photographer.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-foreground">{photographer.name}</h5>
                                  <p className="text-sm text-muted-foreground">{photographer.specialty}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                      <span className="text-sm font-medium">{photographer.rating}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      ({photographer.reviews} reviews)
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 mt-1">
                                    <MapPin className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{photographer.location}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-foreground">{photographer.price}</div>
                                  <div className="text-sm text-muted-foreground">per session</div>
                                </div>
                              </div>
                              
                              {/* Portfolio */}
                              <div className="mb-3">
                                <p className="text-sm font-medium text-foreground mb-2">Portfolio</p>
                                <div className="flex gap-2">
                                  {photographer.portfolio.map((img, idx) => (
                                    <div key={idx} className="w-12 h-12 rounded-md overflow-hidden">
                                      <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">
                                    Available: {photographer.available.length} dates
                                  </span>
                                </div>
                                <Button 
                                  size="sm"
                                  onClick={() => handleBookPhotographer(photographer)}
                                >
                                  Book Session
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    disabled={productImages.length === 0 && !selectedPhotographer}
                  >
                    Continue to Product Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Product Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter product name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    placeholder="Describe your product in detail..."
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="price">Price (₦) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="discountPrice">Discount Price (₦)</Label>
                    <Input
                      id="discountPrice"
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, discountPrice: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                      placeholder="Product brand"
                    />
                  </div>
                </div>

                {/* Tags/Keywords Section */}
                <div>
                  <Label htmlFor="tags">Product Tags/Keywords</Label>
                  <div className="space-y-3">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="Enter tags and press Enter (e.g., smartphone, wireless, bluetooth)"
                    />
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {tag}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 ml-1 hover:bg-blue-200"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      Add relevant tags to help customers find your product
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                      placeholder="Product SKU"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="inventory">Inventory Count</Label>
                    <Input
                      id="inventory"
                      type="number"
                      value={formData.inventory}
                      onChange={(e) => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back to Images
              </Button>
              <Button onClick={() => setCurrentStep(3)}>
                Review Product
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Review Product</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Review your product details before submitting
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Preview */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Product Images</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {productImages.slice(0, 6).map((image) => (
                        <div key={image.id} className="aspect-square bg-muted rounded-lg overflow-hidden">
                          <img src={image.src} alt="Product" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    {selectedPhotographer && (
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            Professional photography booked with {selectedPhotographer.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Product Details</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Name:</span>
                        <p className="text-foreground">{formData.name || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Price:</span>
                        <p className="text-foreground">₦{formData.price || '0'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Category:</span>
                        <p className="text-foreground">{formData.category || 'Not specified'}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                          {formData.tags.length > 0 ? (
                            formData.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-foreground text-sm">No tags added</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Description:</span>
                        <p className="text-foreground text-sm">{formData.description || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {(!formData.name || !formData.description || !formData.price || (productImages.length === 0 && !selectedPhotographer)) && (
                  <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm text-destructive">
                      Please complete all required fields before submitting
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back to Details
              </Button>
              <Button 
                onClick={handleSaveProduct}
                disabled={!formData.name || !formData.description || !formData.price || (productImages.length === 0 && !selectedPhotographer)}
              >
                <Save className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;