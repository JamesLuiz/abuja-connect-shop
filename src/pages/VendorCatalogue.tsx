import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye, ArrowLeft, MapPin, Phone, Mail } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const VendorCatalogue = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Mock vendor data with products
  const vendor = {
    id: vendorId,
    name: 'TechHub Abuja',
    description: 'Your premier destination for electronics and gadgets in Abuja',
    location: 'Wuse 2, Abuja FCT',
    phone: '+234 803 123 4567',
    email: 'info@techhub.ng',
    rating: 4.8,
    reviews: 324,
    verified: true,
    totalProducts: 47,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    products: [
      {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 45000,
        originalPrice: 60000,
        rating: 4.8,
        reviews: 124,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        discount: 25,
        inStock: true
      },
      {
        id: 2,
        name: 'Smartphone with 128GB Storage',
        price: 180000,
        originalPrice: 220000,
        rating: 4.7,
        reviews: 256,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        discount: 18,
        inStock: true
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        price: 25000,
        originalPrice: 30000,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
        discount: 17,
        inStock: true
      },
      {
        id: 4,
        name: 'Gaming Mouse',
        price: 15000,
        originalPrice: 20000,
        rating: 4.5,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
        discount: 25,
        inStock: false
      },
      {
        id: 5,
        name: 'USB-C Cable 2m',
        price: 3500,
        originalPrice: 5000,
        rating: 4.4,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop',
        discount: 30,
        inStock: true
      },
      {
        id: 6,
        name: 'Wireless Charger',
        price: 12000,
        originalPrice: 15000,
        rating: 4.3,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
        discount: 20,
        inStock: true
      }
    ]
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Vendor Header */}
        <section className="bg-gradient-hero py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="mb-8 bg-background/80 backdrop-blur-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-6xl font-bold text-foreground">
                    {vendor.name}
                  </h1>
                  {vendor.verified && (
                    <Badge className="bg-primary text-primary-foreground">
                      Verified
                    </Badge>
                  )}
                </div>
                
                <p className="text-xl text-muted-foreground mb-6">
                  {vendor.description}
                </p>
                
                <div className="flex flex-wrap gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>{vendor.email}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium ml-1">{vendor.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    ({vendor.reviews} reviews)
                  </span>
                  <span className="text-muted-foreground">
                    {vendor.totalProducts} products
                  </span>
                </div>
              </div>
              
              <div className="md:col-span-1">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-64 object-cover rounded-lg shadow-soft"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Our</span>{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Products
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Browse our complete collection of quality electronics
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vendor.products.map((product) => (
                <Card key={product.id} className="group border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <Button size="icon" variant="secondary" className="h-10 w-10">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-10 w-10">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="default" className="h-10 w-10">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {product.discount > 0 && (
                        <Badge variant="destructive" className="bg-highlight">
                          -{product.discount}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="secondary">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-foreground">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      disabled={!product.inStock}
                      variant={product.inStock ? "default" : "secondary"}
                      onClick={() => product.inStock && addToCart({
                        productId: product.id.toString(),
                        vendorId: vendor.id || '',
                        name: product.name,
                        price: product.originalPrice,
                        discountPrice: product.price !== product.originalPrice ? product.price : undefined,
                        quantity: 1,
                        image: product.image,
                        vendor: { name: vendor.name, location: vendor.location },
                        shipping: { cost: 1500, estimatedDays: 3 }
                      })}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorCatalogue;