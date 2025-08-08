import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Eye, MapPin, Filter, ArrowLeft, Grid, List, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const VendorsMarketplace = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Vendors', count: 42 },
    { id: 'electronics', name: 'Electronics', count: 8 },
    { id: 'fashion', name: 'Fashion', count: 12 },
    { id: 'home', name: 'Home & Garden', count: 6 },
    { id: 'beauty', name: 'Beauty', count: 9 },
    { id: 'sports', name: 'Sports', count: 7 }
  ];

  // Extended vendor catalogues
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
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
        discount: 25
      },
      description: 'Your premier destination for electronics and gadgets in Abuja',
      establishedYear: 2020,
      specialties: ['Smartphones', 'Laptops', 'Audio']
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
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
        discount: 25
      },
      description: 'Authentic African fashion and contemporary designs',
      establishedYear: 2019,
      specialties: ['Traditional Wear', 'Modern African Fashion', 'Accessories']
    },
    // Add more vendors with full data...
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
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
        discount: 18
      },
      description: 'Latest smartphones and mobile accessories',
      establishedYear: 2018,
      specialties: ['Smartphones', 'Tablets', 'Accessories']
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
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
        discount: 29
      },
      description: 'Natural and organic beauty products for healthy skin',
      establishedYear: 2021,
      specialties: ['Skincare', 'Organic Products', 'Beauty Tools']
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
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        discount: 29
      },
      description: 'Transform your space with our curated home decor collection',
      establishedYear: 2017,
      specialties: ['Furniture', 'Lighting', 'Decor']
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
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop',
        discount: 20
      },
      description: 'Everything you need for your fitness journey',
      establishedYear: 2020,
      specialties: ['Fitness Equipment', 'Sportswear', 'Supplements']
    }
  ];

  // Extract unique locations for filter
  const locations = [...new Set(vendorCatalogues.map(vendor => vendor.location))];

  // Enhanced filtering logic
  const filteredVendors = vendorCatalogues.filter(vendor => {
    const categoryMatch = activeCategory === 'all' || vendor.category === activeCategory;
    const searchMatch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.bestSellingProduct.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const locationMatch = locationFilter === 'all' || vendor.location === locationFilter;
    const ratingMatch = ratingFilter === 'all' || 
      (ratingFilter === '4.5+' && vendor.rating >= 4.5) ||
      (ratingFilter === '4.0+' && vendor.rating >= 4.0) ||
      (ratingFilter === '3.5+' && vendor.rating >= 3.5);
    
    return categoryMatch && searchMatch && locationMatch && ratingMatch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.bestSellingProduct.price - b.bestSellingProduct.price;
      case 'price-high':
        return b.bestSellingProduct.price - a.bestSellingProduct.price;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'products':
        return b.totalProducts - a.totalProducts;
      case 'newest':
        return b.establishedYear - a.establishedYear;
      default:
        return b.reviews * b.rating - a.reviews * a.rating;
    }
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const VendorCard = ({ vendor, index }: { vendor: any; index: number }) => (
    <Card 
      className={`group border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer animate-fade-in ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => navigate(`/vendor/${vendor.id}`)}
    >
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img
          src={vendor.bestSellingProduct.image}
          alt={vendor.bestSellingProduct.name}
          className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
            viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
          }`}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Button variant="secondary" className="bg-background/90 backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Eye className="h-4 w-4 mr-2" />
            View Store
          </Button>
        </div>

        <div className="absolute top-3 left-3 flex gap-2">
          {vendor.bestSellingProduct.discount > 0 && (
            <Badge variant="destructive" className="bg-highlight animate-slide-up">
              -{vendor.bestSellingProduct.discount}%
            </Badge>
          )}
          {vendor.verified && (
            <Badge className="bg-primary text-primary-foreground animate-slide-up" style={{ animationDelay: '100ms' }}>
              Verified
            </Badge>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {vendor.totalProducts} items
          </Badge>
        </div>
      </div>

      <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors duration-300">
              {vendor.name}
            </h3>
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{vendor.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {vendor.location}
          </p>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {vendor.description}
          </p>

          <div className="flex flex-wrap gap-1 mb-3">
            {vendor.specialties.slice(0, 3).map((specialty: string) => (
              <Badge key={specialty} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span>({vendor.reviews} reviews)</span>
          <span>Est. {vendor.establishedYear}</span>
        </div>
        
        <div className="border-t border-border pt-4">
          <p className="text-xs text-muted-foreground mb-2">Featured Product:</p>
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
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading marketplace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-hero py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-foreground">Vendor</span>{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Marketplace
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover {filteredVendors.length} verified vendors across Abuja. From electronics to fashion, 
                find everything you need from trusted local businesses.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search vendors, products, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 py-3 text-lg"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Advanced Filters & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Location
                </label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Areas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Areas</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  Rating
                </label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Ratings" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="4.5+">4.5+ Stars</SelectItem>
                    <SelectItem value="4.0+">4.0+ Stars</SelectItem>
                    <SelectItem value="3.5+">3.5+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                    <SelectItem value="products">Most Products</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  View Mode
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Results
                </label>
                <div className="flex items-center h-10 px-3 py-2 bg-muted rounded-md">
                  <span className="text-sm text-muted-foreground">
                    {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vendors Grid/List */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredVendors.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No vendors found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
                  : "space-y-6"
              }>
                {filteredVendors.map((vendor, index) => (
                  <VendorCard key={vendor.id} vendor={vendor} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VendorsMarketplace;