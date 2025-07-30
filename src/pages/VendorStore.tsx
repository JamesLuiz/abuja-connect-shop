import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Star,
  TrendingUp,
  Package,
  Heart,
  ShoppingCart,
  MoreVertical,
  Settings,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VendorStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState(new Set());

  const storeInfo = {
    name: "Adebayo's Electronics Hub",
    description: "Premium electronics and gadgets with warranty",
    rating: 4.8,
    totalProducts: 156,
    totalSales: 342,
    revenue: 2450000
  };

  const products = [
    {
      id: 1,
      name: "Samsung Galaxy S24 Ultra",
      price: 1250000,
      originalPrice: 1350000,
      stock: 15,
      status: "active",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop",
      rating: 4.9,
      sales: 45
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      price: 2800000,
      stock: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      rating: 4.8,
      sales: 23
    },
    {
      id: 3,
      name: "Sony WH-1000XM5",
      price: 420000,
      stock: 0,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
      rating: 4.7,
      sales: 67
    }
  ];

  const getStatusBadge = (status: string, stock: number) => {
    if (status === "out_of_stock" || stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (stock < 10) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
    }
    return <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>;
  };

  const handleAddToFavorites = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      toast({
        title: "Removed from favorites",
        description: "Product removed from your favorites list.",
      });
    } else {
      newFavorites.add(productId);
      toast({
        title: "Added to favorites",
        description: "Product added to your favorites list.",
      });
    }
    setFavorites(newFavorites);
  };

  const handleDeleteProduct = (productId, productName) => {
    toast({
      title: "Product Deleted",
      description: `${productName} has been removed from your store.`,
      variant: "destructive",
    });
  };

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  const handleViewStore = () => {
    // Navigate to public store view
    navigate('/vendor/:vendorId') 
    toast({
      title: "Opening Store View",
      description: "Opening your public store page...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Store Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-8">
            <div className="w-full lg:w-auto">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{storeInfo.name}</h1>
              <p className="text-muted-foreground mb-4">{storeInfo.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{storeInfo.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {storeInfo.totalProducts} Products • {storeInfo.totalSales} Sales
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button variant="outline" onClick={handleViewStore} className="w-full sm:w-auto">
                <Eye className="w-4 h-4 mr-2" />
                View Store
              </Button>
              <Button onClick={handleAddProduct} className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Store Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <Card>
              <CardContent className="p-4 lg:p-6 text-center">
                <Package className="w-6 lg:w-8 h-6 lg:h-8 mx-auto mb-2 text-primary" />
                <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">{storeInfo.totalProducts}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Total Products</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 lg:p-6 text-center">
                <ShoppingCart className="w-6 lg:w-8 h-6 lg:h-8 mx-auto mb-2 text-accent" />
                <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">{storeInfo.totalSales}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Total Sales</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 lg:p-6 text-center">
                <TrendingUp className="w-6 lg:w-8 h-6 lg:h-8 mx-auto mb-2 text-green-500" />
                <div className="text-lg lg:text-2xl font-bold text-foreground mb-1">₦{storeInfo.revenue.toLocaleString()}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Total Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 lg:p-6 text-center">
                <Star className="w-6 lg:w-8 h-6 lg:h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-xl lg:text-2xl font-bold text-foreground mb-1">{storeInfo.rating}</div>
                <div className="text-xs lg:text-sm text-muted-foreground">Store Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Store Management Tabs */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full lg:w-auto">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle className="text-lg lg:text-xl">Product Management</CardTitle>
                    <Button onClick={handleAddProduct} className="w-full sm:w-auto">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Product
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-border rounded-lg gap-4">
                        <div className="flex items-center gap-4 w-full lg:w-auto">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-lg font-bold text-foreground">
                                ₦{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ₦{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm">{product.rating}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{product.sales} sales</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full lg:w-auto">
                          <div className="flex items-center gap-4">
                            {getStatusBadge(product.status, product.stock)}
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              Stock: {product.stock}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => handleAddToFavorites(product.id)}
                              className={favorites.has(product.id) ? "text-red-500" : ""}
                            >
                              <Heart className={`w-4 h-4 ${favorites.has(product.id) ? 'fill-current' : ''}`} />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => {
                                toast({
                                  title: "Edit Product",
                                  description: `Opening edit form for ${product.name}`,
                                });
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id, product.name)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button size="icon" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Inventory Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Low Stock Alert */}
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-yellow-600" />
                        <h3 className="font-medium text-yellow-800">Low Stock Alert</h3>
                      </div>
                      <p className="text-sm text-yellow-700 mb-3">
                        You have 1 product with low stock levels that needs attention.
                      </p>
                      <Button size="sm" variant="outline">
                        View Low Stock Items
                      </Button>
                    </div>

                    {/* Inventory Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">142</div>
                          <div className="text-sm text-muted-foreground">In Stock</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-yellow-600 mb-1">13</div>
                          <div className="text-sm text-muted-foreground">Low Stock</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-red-600 mb-1">1</div>
                          <div className="text-sm text-muted-foreground">Out of Stock</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center py-8">
                      <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium text-foreground mb-2">Advanced Inventory Tracking</h3>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Monitor stock levels, set low stock alerts, track inventory movements, and manage supplier information.
                      </p>
                      <Button>Set Up Advanced Tracking</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Store Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Store Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-foreground mb-3">Store Information</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Store Name</label>
                              <p className="text-foreground">{storeInfo.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-muted-foreground">Description</label>
                              <p className="text-foreground">{storeInfo.description}</p>
                            </div>
                          </div>
                          <Button size="sm" className="mt-4">Edit Information</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-foreground mb-3">Store Performance</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Current Rating</span>
                              <span className="text-foreground font-medium">{storeInfo.rating}/5.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Total Reviews</span>
                              <span className="text-foreground font-medium">234</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Response Rate</span>
                              <span className="text-foreground font-medium">98%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="text-center py-8">
                      <Store className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium text-foreground mb-2">Store Configuration</h3>
                      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                        Customize your store appearance, shipping settings, payment methods, and more.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button>Manage Store Settings</Button>
                        <Button variant="outline">Preview Store</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorStore;