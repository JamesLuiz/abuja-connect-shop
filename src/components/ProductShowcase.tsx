import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');

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

  const filteredVendors = activeCategory === 'all' 
    ? vendorCatalogues 
    : vendorCatalogues.filter(vendor => vendor.category === activeCategory);

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
            Explore curated collections from trusted Abuja vendors. Each vendor showcases 
            their best-selling products and complete catalogue.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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