import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star, 
  MapPin,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  location: string;
  rating: number;
  discount?: number;
  inStock: boolean;
  addedDate: string;
}

const Wishlist = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState<'all' | 'instock' | 'sale'>('all');
  const { addToCart } = useCart();

  // Mock wishlist data
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 45000,
      originalPrice: 60000,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      vendor: 'TechHub Abuja',
      location: 'Wuse 2, Abuja FCT',
      rating: 4.8,
      discount: 25,
      inStock: true,
      addedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Designer Silk Dress',
      price: 28000,
      originalPrice: 35000,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop',
      vendor: 'Lagos Fashion House',
      location: 'Victoria Island, Lagos',
      rating: 4.9,
      discount: 20,
      inStock: true,
      addedDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Organic Skincare Set',
      price: 15000,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      vendor: 'Beauty Essentials',
      location: 'Ikeja, Lagos',
      rating: 4.6,
      inStock: false,
      addedDate: '2024-01-05'
    }
  ]);

  const filteredItems = wishlistItems.filter(item => {
    if (filter === 'instock') return item.inStock;
    if (filter === 'sale') return item.discount && item.discount > 0;
    return true;
  });

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCartFromWishlist = (item: WishlistItem) => {
    if (item.inStock) {
      addToCart({
        productId: item.id.toString(),
        vendorId: 'vendor-' + item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        vendor: { name: item.vendor, location: item.location },
        shipping: { cost: 0, estimatedDays: 3 }
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">{filteredItems.length} items saved</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <select 
                  value={filter} 
                  onChange={(e) => setFilter(e.target.value as any)}
                  className="bg-background border border-border rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">All Items</option>
                  <option value="instock">In Stock</option>
                  <option value="sale">On Sale</option>
                </select>
              </div>
              
              {/* View Mode */}
              <div className="flex items-center border border-border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Wishlist Items */}
          {filteredItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Your wishlist is empty</h3>
                <p className="text-muted-foreground mb-4">Save items you love to your wishlist</p>
                <Button onClick={() => window.location.href = '/#products'}>
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredItems.map((item) => (
                <Card key={item.id} className={`group hover:shadow-lg transition-all duration-300 ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          viewMode === 'list' ? 'h-32 rounded-l-lg rounded-tr-none' : 'h-48'
                        }`}
                      />
                      {item.discount && (
                        <Badge className="absolute top-2 left-2 bg-highlight text-highlight-foreground">
                          -{item.discount}%
                        </Badge>
                      )}
                      {!item.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="secondary">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : 'p-4'}`}>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{item.name}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground ml-1">{item.rating}</span>
                        </div>
                        <span className="text-muted-foreground">•</span>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3 mr-1" />
                          {item.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-foreground">₦{item.price.toLocaleString()}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₦{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4">Added {new Date(item.addedDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => addToCartFromWishlist(item)}
                        disabled={!item.inStock}
                        className="flex-1"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;