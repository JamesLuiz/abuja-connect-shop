import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ShoppingCart, Heart, Eye, Search, MapPin, Filter } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = [
    { id: 'all', name: 'All Vendors' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' }
  ];

  // Mock vendor catalogues with best-selling products
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
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop',
        discount: 20
      },
      description: 'Everything you need for your fitness journey'
    }
  ];

  // Extract unique locations for filter
  const locations = [...new Set(vendorCatalogues.map(vendor => vendor.location))];

  // Enhanced filtering logic
  const filteredVendors = vendorCatalogues.filter(vendor => {
    // Category filter
    const categoryMatch = activeCategory === 'all' || vendor.category === activeCategory;
    
    // Search filter
    const searchMatch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.bestSellingProduct.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Location filter
    const locationMatch = locationFilter === 'all' || vendor.location === locationFilter;
    
    // Rating filter
    const ratingMatch = ratingFilter === 'all' || 
      (ratingFilter === '4.5+' && vendor.rating >= 4.5) ||
      (ratingFilter === '4.0+' && vendor.rating >= 4.0) ||
      (ratingFilter === '3.5+' && vendor.rating >= 3.5);
    
    return categoryMatch && searchMatch && locationMatch && ratingMatch;
  }).sort((a, b) => {
    // Sorting logic
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
      default: // popular
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

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search vendors, products, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="px-6"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
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
                <Filter className="h-4 w-4 mr-1" />
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
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Results
              </label>
              <div className="flex items-center h-10 px-3 py-2 bg-muted rounded-md">
                <span className="text-sm text-muted-foreground">
                  {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Catalogues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVendors.map((vendor) => (
            <Card 
              key={vendor.id} 
              className="group border-border hover:shadow-soft transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
              onClick={() => window.location.href = `/vendor/${vendor.id}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={vendor.bestSellingProduct.image}
                  alt={vendor.bestSellingProduct.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
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

        {/* View More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Vendors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;