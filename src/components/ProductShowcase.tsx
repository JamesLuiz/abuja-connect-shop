import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useState, useMemo } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AdvancedSearchFilters from '@/components/search/AdvancedSearchFilters';
import InfiniteScroll from '@/components/ui/InfiniteScroll';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import ProductComparison from '@/components/product/ProductComparison';
import RecentlyViewed from '@/components/product/RecentlyViewed';
import SwipeableProductGallery from '@/components/product/SwipeableProductGallery';
import AuthPrompt from '@/components/AuthPrompt';

const ProductShowcase = () => {
  const [filters, setFilters] = useState({
    query: '',
    category: 'all',
    location: 'all',
    priceRange: [0, 500000] as [number, number],
    rating: 'all',
    sortBy: 'popular',
    verified: false,
    inStock: false
  });
  const [displayedVendors, setDisplayedVendors] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [compareProducts, setCompareProducts] = useState<any[]>([]);

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const categories = [
    { id: 'all', name: 'All Vendors' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' }
  ];

  const vendorCatalogues = [
    {
      id: 'tech-hub-abuja',
      name: 'TechHub Abuja',
      category: 'electronics',
      location: 'Wuse 2, Abuja FCT',
      rating: 4.8,
      reviews: 324,
      totalProducts: 47,
      verified: true,
      bestSellingProduct: {
        id: 1,
        name: 'Premium Wireless Headphones',
        price: 45000,
        originalPrice: 60000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop' },
          { view: 'top', url: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop' }
        ],
        discount: 25
      },
      description: 'Your premier destination for electronics and gadgets in Abuja'
    },
    {
      id: 'ankara-styles',
      name: 'Ankara Styles',
      category: 'fashion',
      location: 'Garki 2, Abuja FCT',
      rating: 4.9,
      reviews: 156,
      totalProducts: 89,
      verified: true,
      bestSellingProduct: {
        id: 2,
        name: 'Elegant African Print Dress',
        price: 15000,
        originalPrice: 20000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop' },
          { view: 'back', url: 'https://images.unsplash.com/photo-1583743089695-4b816a340f82?w=400&h=400&fit=crop' }
        ],
        discount: 25
      },
      description: 'Authentic African fashion and contemporary designs'
    },
    {
      id: 'mobile-world',
      name: 'Mobile World',
      category: 'electronics',
      location: 'Central Area, Abuja FCT',
      rating: 4.7,
      reviews: 289,
      totalProducts: 156,
      verified: true,
      bestSellingProduct: {
        id: 3,
        name: 'Smartphone with 128GB Storage',
        price: 180000,
        originalPrice: 220000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop' },
          { view: 'back', url: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop' }
        ],
        discount: 18
      },
      description: 'Latest smartphones and mobile accessories'
    },
    {
      id: 'natural-glow',
      name: 'Natural Glow',
      category: 'beauty',
      location: 'Maitama, Abuja FCT',
      rating: 4.6,
      reviews: 198,
      totalProducts: 67,
      verified: true,
      bestSellingProduct: {
        id: 4,
        name: 'Organic Face Cream Set',
        price: 8500,
        originalPrice: 12000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop' },
          { view: 'top', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop' }
        ],
        discount: 29
      },
      description: 'Natural and organic beauty products for healthy skin'
    },
    {
      id: 'home-decor-plus',
      name: 'Home Decor Plus',
      category: 'home',
      location: 'Asokoro, Abuja FCT',
      rating: 4.5,
      reviews: 134,
      totalProducts: 203,
      verified: false,
      bestSellingProduct: {
        id: 5,
        name: 'Modern Table Lamp',
        price: 25000,
        originalPrice: 35000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' },
          { view: 'top', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop' }
        ],
        discount: 29
      },
      description: 'Transform your space with our curated home decor collection'
    },
    {
      id: 'fitlife-store',
      name: 'FitLife Store',
      category: 'sports',
      location: 'Utako, Abuja FCT',
      rating: 4.4,
      reviews: 245,
      totalProducts: 112,
      verified: true,
      bestSellingProduct: {
        id: 6,
        name: 'Fitness Tracker Watch',
        price: 32000,
        originalPrice: 40000,
        images: [
          { view: 'front', url: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop' },
          { view: 'side', url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop' },
          { view: 'top', url: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop' }
        ],
        discount: 20
      },
      description: 'Everything you need for your fitness journey'
    }
  ];

  // Extract unique locations for filter
  const locations = [...new Set(vendorCatalogues.map(vendor => vendor.location))];

  // Enhanced filtering logic with new filters structure
  const filteredVendors = useMemo(() => {
    return vendorCatalogues.filter(vendor => {
      // Category filter
      const categoryMatch = filters.category === 'all' || vendor.category === filters.category;
      
      // Search filter with typo tolerance
      const searchMatch = filters.query === '' || 
        vendor.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        vendor.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        vendor.bestSellingProduct.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        vendor.location.toLowerCase().includes(filters.query.toLowerCase()) ||
        // Simple typo tolerance
        vendor.name.toLowerCase().includes(filters.query.toLowerCase().slice(0, -1)) ||
        vendor.bestSellingProduct.name.toLowerCase().includes(filters.query.toLowerCase().slice(0, -1));
      
      // Location filter
      const locationMatch = filters.location === 'all' || vendor.location === filters.location;
      
      // Rating filter
      const ratingMatch = filters.rating === 'all' || 
        (filters.rating === '4.5+' && vendor.rating >= 4.5) ||
        (filters.rating === '4.0+' && vendor.rating >= 4.0) ||
        (filters.rating === '3.5+' && vendor.rating >= 3.5);
      
      // Price range filter
      const priceMatch = vendor.bestSellingProduct.price >= filters.priceRange[0] && 
                        vendor.bestSellingProduct.price <= filters.priceRange[1];
      
      // Verified filter
      const verifiedMatch = !filters.verified || vendor.verified;
      
      // In stock filter (simulated)
      const inStockMatch = !filters.inStock || Math.random() > 0.2; // 80% in stock simulation
      
      return categoryMatch && searchMatch && locationMatch && ratingMatch && 
             priceMatch && verifiedMatch && inStockMatch;
    }).sort((a, b) => {
      // Enhanced sorting logic
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.bestSellingProduct.price - b.bestSellingProduct.price;
        case 'price-high':
          return b.bestSellingProduct.price - a.bestSellingProduct.price;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'newest':
          return Math.random() - 0.5; // Simulate newest
        case 'distance':
          return Math.random() - 0.5; // Simulate distance
        default: // popular
          return b.reviews * b.rating - a.reviews * a.rating;
      }
    });
  }, [filters, vendorCatalogues]);

  // Pagination logic for infinite scroll
  const displayedVendorsList = filteredVendors.slice(0, displayedVendors);
  const hasMore = displayedVendors < filteredVendors.length;

  const loadMoreVendors = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setDisplayedVendors(prev => Math.min(prev + 6, filteredVendors.length));
      setIsLoading(false);
    }, 800);
  };

  // Reset displayed vendors when filters change
  useMemo(() => {
    setDisplayedVendors(6);
  }, [filters]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Vendor</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Catalogues
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover luxury collections from trusted vendors nearest to you. Rich quality, original products 
            with fast delivery. Find affordable luxury from Abuja's finest businesses.
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <AdvancedSearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          locations={locations}
          resultCount={filteredVendors.length}
        />

        {/* Vendor Catalogues Grid with Infinite Scroll */}
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={loadMoreVendors}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedVendorsList.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="group border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => window.location.href = `/vendor/${vendor.id}`}
            >
              <div className="relative overflow-hidden">
                <Carousel className="w-full">
                  <CarouselContent>
                    {vendor.bestSellingProduct.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative">
                          <img
                            src={image.url}
                            alt={`${vendor.bestSellingProduct.name} - ${image.view} view`}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm text-xs">
                              {image.view}
                            </Badge>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="secondary" className="bg-background/90 backdrop-blur-sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Catalogue
                  </Button>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {vendor.bestSellingProduct.discount > 0 && (
                    <Badge variant="destructive" className="bg-highlight">
                      -{vendor.bestSellingProduct.discount}%
                    </Badge>
                  )}
                  {vendor.verified && (
                    <Badge className="bg-primary text-primary-foreground">
                      Verified
                    </Badge>
                  )}
                </div>

                {/* Product Count */}
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {vendor.totalProducts} items
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="font-bold text-xl text-foreground mb-1">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {vendor.location}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {vendor.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{vendor.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({vendor.reviews} reviews)
                  </span>
                </div>
                
                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Best Selling Product:</p>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm line-clamp-1">
                      {vendor.bestSellingProduct.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">
                        {formatPrice(vendor.bestSellingProduct.price)}
                      </span>
                      {vendor.bestSellingProduct.originalPrice > vendor.bestSellingProduct.price && (
                        <span className="text-xs text-muted-foreground line-through">
                          {formatPrice(vendor.bestSellingProduct.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </InfiniteScroll>

        {/* View More */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8"
            onClick={() => window.location.href = '/vendors'}
          >
            View All Vendors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;