import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  X, BarChart3, Star, MapPin, ShoppingCart, Heart, 
  Check, AlertCircle, ArrowRight, Scale
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: Array<{view: string; url: string}>;
  discount?: number;
  vendor: string;
  location: string;
  rating?: number;
  inStock?: boolean;
  description?: string;
  category: string;
}

interface ProductComparisonProps {
  compareProducts: Product[];
  onRemoveFromComparison: (productId: number) => void;
  onClearComparison: () => void;
}

const ProductComparison = ({ 
  compareProducts, 
  onRemoveFromComparison, 
  onClearComparison 
}: ProductComparisonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  const getComparisonMetrics = () => {
    if (compareProducts.length === 0) return null;

    const cheapest = Math.min(...compareProducts.map(p => p.price));
    const mostExpensive = Math.max(...compareProducts.map(p => p.price));
    const highestRated = Math.max(...compareProducts.map(p => p.rating || 0));

    return {
      cheapest,
      mostExpensive,
      highestRated,
      avgPrice: compareProducts.reduce((sum, p) => sum + p.price, 0) / compareProducts.length
    };
  };

  const metrics = getComparisonMetrics();

  const ComparisonContent = () => (
    <div className="space-y-6">
      {compareProducts.length === 0 ? (
        <div className="text-center py-12">
          <Scale className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Products to Compare</h3>
          <p className="text-muted-foreground">
            Add products to comparison to see detailed side-by-side analysis
          </p>
        </div>
      ) : (
        <>
          {/* Comparison Summary */}
          {metrics && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Quick Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatPrice(metrics.cheapest)}
                    </div>
                    <div className="text-xs text-muted-foreground">Lowest Price</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">
                      {formatPrice(metrics.mostExpensive)}
                    </div>
                    <div className="text-xs text-muted-foreground">Highest Price</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">
                      {metrics.highestRated.toFixed(1)}⭐
                    </div>
                    <div className="text-xs text-muted-foreground">Best Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(metrics.avgPrice)}
                    </div>
                    <div className="text-xs text-muted-foreground">Avg Price</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Comparison Table */}
          <div className="overflow-x-auto">
            <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : `grid-cols-${Math.min(compareProducts.length, 3)}`}`}>
              {compareProducts.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => onRemoveFromComparison(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {product.discount && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-sm line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price Comparison */}
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {formatPrice(product.price)}
                          </span>
                          {metrics && product.price === metrics.cheapest && (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <Check className="h-3 w-3 mr-1" />
                              Best Price
                            </Badge>
                          )}
                        </div>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Rating Comparison */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm ml-1">{product.rating || 'N/A'}</span>
                        </div>
                        {metrics && product.rating === metrics.highestRated && (
                          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Top Rated
                          </Badge>
                        )}
                      </div>

                      {/* Vendor & Location */}
                      <div className="text-sm text-muted-foreground">
                        <div className="font-medium">{product.vendor}</div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {product.location}
                        </div>
                      </div>

                      {/* Stock Status */}
                      <div className="flex items-center">
                        {product.inStock ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            In Stock
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Out of Stock
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 pt-2 border-t">
                        <Button
                          className="w-full"
                          onClick={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0]?.url || '',
                            vendor: product.vendor
                          })}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Heart className="h-4 w-4 mr-2" />
                          Save to Wishlist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Clear All Button */}
          {compareProducts.length > 0 && (
            <div className="text-center">
              <Button variant="outline" onClick={onClearComparison}>
                Clear All Comparisons
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );

  // Mobile Sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="relative">
            <Scale className="h-4 w-4 mr-2" />
            Compare
            {compareProducts.length > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                {compareProducts.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Product Comparison</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ComparisonContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop Dialog
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative">
          <Scale className="h-4 w-4 mr-2" />
          Compare Products
          {compareProducts.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {compareProducts.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
        </DialogHeader>
        <ComparisonContent />
      </DialogContent>
    </Dialog>
  );
};

export default ProductComparison;