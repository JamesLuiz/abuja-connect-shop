import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Eye, X, ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface RecentProduct {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  discount?: number;
  viewedAt: Date;
}

interface RecentlyViewedProps {
  className?: string;
  limit?: number;
}

const RecentlyViewed = ({ className = '', limit = 8 }: RecentlyViewedProps) => {
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();

  // Load recently viewed products from localStorage
  useEffect(() => {
    const loadRecentlyViewed = () => {
      try {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
          const products = JSON.parse(stored) as RecentProduct[];
          // Sort by viewed date (most recent first) and limit
          const sortedProducts = products
            .map(p => ({ ...p, viewedAt: new Date(p.viewedAt) }))
            .sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime())
            .slice(0, limit);
          
          setRecentProducts(sortedProducts);
          setIsVisible(sortedProducts.length > 0);
        }
      } catch (error) {
        console.error('Error loading recently viewed products:', error);
      }
    };

    loadRecentlyViewed();

    // Listen for changes to recently viewed products
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'recentlyViewed') {
        loadRecentlyViewed();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [limit]);

  const addToRecentlyViewed = (product: Omit<RecentProduct, 'viewedAt'>) => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      let products: RecentProduct[] = stored ? JSON.parse(stored) : [];
      
      // Remove if already exists
      products = products.filter(p => p.id !== product.id);
      
      // Add to beginning with current timestamp
      products.unshift({ ...product, viewedAt: new Date() });
      
      // Keep only the most recent 20 items
      products = products.slice(0, 20);
      
      localStorage.setItem('recentlyViewed', JSON.stringify(products));
      
      // Update state
      setRecentProducts(products.slice(0, limit));
      setIsVisible(products.length > 0);
    } catch (error) {
      console.error('Error saving recently viewed product:', error);
    }
  };

  const removeFromRecentlyViewed = (productId: number) => {
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        let products: RecentProduct[] = JSON.parse(stored);
        products = products.filter(p => p.id !== productId);
        
        localStorage.setItem('recentlyViewed', JSON.stringify(products));
        setRecentProducts(products.slice(0, limit));
        setIsVisible(products.length > 0);
      }
    } catch (error) {
      console.error('Error removing recently viewed product:', error);
    }
  };

  const clearRecentlyViewed = () => {
    try {
      localStorage.removeItem('recentlyViewed');
      setRecentProducts([]);
      setIsVisible(false);
    } catch (error) {
      console.error('Error clearing recently viewed products:', error);
    }
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just viewed';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  // Export the function to be used by other components
  (window as any).addToRecentlyViewed = addToRecentlyViewed;

  if (!isVisible) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Recently Viewed</h3>
          <Badge variant="secondary" className="text-xs">
            {recentProducts.length}
          </Badge>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={clearRecentlyViewed}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear All
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex space-x-4 pb-4">
          {recentProducts.map((product) => (
            <Card 
              key={`${product.id}-${product.viewedAt.getTime()}`} 
              className="flex-shrink-0 w-64 hover:shadow-md transition-shadow group cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="relative mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  
                  {/* Remove button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromRecentlyViewed(product.id);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  {/* Discount badge */}
                  {product.discount && (
                    <Badge className="absolute top-1 left-1 bg-red-500 text-xs">
                      -{product.discount}%
                    </Badge>
                  )}

                  {/* View time */}
                  <Badge
                    variant="secondary"
                    className="absolute bottom-1 right-1 text-xs bg-background/80 backdrop-blur-sm"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    {getTimeAgo(product.viewedAt)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground truncate">
                    {product.vendor}
                  </p>

                  {/* Quick Actions */}
                  <div className="flex space-x-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          productId: product.id.toString(),
                          vendorId: '1',
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          vendor: { name: product.vendor, location: 'Abuja' },
                          quantity: 1,
                          shipping: { cost: 0, estimatedDays: 3 }
                        });
                      }}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to wishlist logic here
                      }}
                    >
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default RecentlyViewed;
