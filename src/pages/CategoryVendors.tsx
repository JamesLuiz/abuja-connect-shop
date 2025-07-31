import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  ArrowRight,
  Store,
  ShoppingBag
} from 'lucide-react';
import { useState } from 'react';

const CategoryVendors = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    rating: '',
    location: '',
    verified: false,
    priceRange: ''
  });

  // Mock data for vendors by category
  const vendorsByCategory = {
    electronics: [
      {
        id: 'tech-hub-abuja',
        name: 'Tech Hub Abuja',
        description: 'Your one-stop shop for latest electronics and gadgets',
        location: 'Wuse 2, Abuja',
        rating: 4.8,
        reviews: 156,
        verified: true,
        products: 89,
        image: '/placeholder.svg',
        specialties: ['Smartphones', 'Laptops', 'Gaming']
      },
      {
        id: 'digital-world',
        name: 'Digital World Electronics',
        description: 'Premium electronics with warranty and support',
        location: 'Garki, Abuja',
        rating: 4.6,
        reviews: 203,
        verified: true,
        products: 134,
        image: '/placeholder.svg',
        specialties: ['Computers', 'Accessories', 'Audio']
      },
      {
        id: 'gadget-palace',
        name: 'Gadget Palace',
        description: 'Affordable electronics for everyone',
        location: 'Kubwa, Abuja',
        rating: 4.4,
        reviews: 89,
        verified: false,
        products: 67,
        image: '/placeholder.svg',
        specialties: ['Mobile Accessories', 'Tablets', 'Wearables']
      }
    ],
    fashion: [
      {
        id: 'abuja-fashion-house',
        name: 'Abuja Fashion House',
        description: 'Trendy clothing and accessories for modern style',
        location: 'Maitama, Abuja',
        rating: 4.9,
        reviews: 298,
        verified: true,
        products: 245,
        image: '/placeholder.svg',
        specialties: ['Designer Wear', 'Accessories', 'Shoes']
      },
      {
        id: 'style-boutique',
        name: 'Style Boutique',
        description: 'Affordable fashion for the whole family',
        location: 'Utako, Abuja',
        rating: 4.5,
        reviews: 167,
        verified: true,
        products: 189,
        image: '/placeholder.svg',
        specialties: ['Casual Wear', 'Work Attire', 'Kids Fashion']
      }
    ],
    'home-garden': [
      {
        id: 'home-essentials',
        name: 'Home Essentials',
        description: 'Everything you need for a beautiful home',
        location: 'Asokoro, Abuja',
        rating: 4.7,
        reviews: 134,
        verified: true,
        products: 156,
        image: '/placeholder.svg',
        specialties: ['Furniture', 'Decor', 'Kitchen']
      }
    ],
    beauty: [
      {
        id: 'beauty-palace',
        name: 'Beauty Palace',
        description: 'Premium beauty and skincare products',
        location: 'Jahi, Abuja',
        rating: 4.8,
        reviews: 189,
        verified: true,
        products: 98,
        image: '/placeholder.svg',
        specialties: ['Skincare', 'Makeup', 'Hair Care']
      }
    ],
    sports: [
      {
        id: 'sports-arena',
        name: 'Sports Arena',
        description: 'Quality sports equipment and fitness gear',
        location: 'Gwarinpa, Abuja',
        rating: 4.6,
        reviews: 123,
        verified: true,
        products: 78,
        image: '/placeholder.svg',
        specialties: ['Fitness Equipment', 'Sports Wear', 'Outdoor Gear']
      }
    ],
    books: [
      {
        id: 'knowledge-hub',
        name: 'Knowledge Hub',
        description: 'Books, educational materials, and media',
        location: 'Wuye, Abuja',
        rating: 4.7,
        reviews: 95,
        verified: true,
        products: 234,
        image: '/placeholder.svg',
        specialties: ['Educational Books', 'Fiction', 'Professional Development']
      }
    ]
  };

  const categoryDisplayNames = {
    electronics: 'Electronics',
    fashion: 'Fashion & Style',
    'home-garden': 'Home & Garden',
    beauty: 'Beauty & Health',
    sports: 'Sports & Fitness',
    books: 'Books & Media'
  };

  const categoryKey = category?.toLowerCase().replace(/\s+/g, '-').replace('&', '');
  const vendors = vendorsByCategory[categoryKey as keyof typeof vendorsByCategory] || [];
  const displayName = categoryDisplayNames[categoryKey as keyof typeof categoryDisplayNames] || category;

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">{displayName}</span> Vendors
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover quality {displayName.toLowerCase()} vendors in Abuja and across Nigeria
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search vendors..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-12 px-6" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="bg-secondary/20 p-6 rounded-lg mt-6">
                <h3 className="font-semibold mb-4">Filter Options</h3>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Minimum Rating</label>
                    <select 
                      className="w-full p-2 border rounded-md bg-background"
                      value={filters.rating}
                      onChange={(e) => setFilters({...filters, rating: e.target.value})}
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <select 
                      className="w-full p-2 border rounded-md bg-background"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    >
                      <option value="">All Locations</option>
                      <option value="Wuse">Wuse</option>
                      <option value="Garki">Garki</option>
                      <option value="Maitama">Maitama</option>
                      <option value="Utako">Utako</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Verification</label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={filters.verified}
                        onChange={(e) => setFilters({...filters, verified: e.target.checked})}
                        className="rounded"
                      />
                      <span>Verified vendors only</span>
                    </label>
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" onClick={() => setFilters({rating: '', location: '', verified: false, priceRange: ''})}>
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Vendor Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Vendors Grid */}
          {filteredVendors.length === 0 ? (
            <div className="text-center py-16">
              <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No vendors found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? "Try adjusting your search terms or browse all vendors." 
                  : `We're working on adding more ${displayName.toLowerCase()} vendors to this category.`
                }
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                {searchQuery ? 'Clear Search' : 'Browse All Categories'}
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor) => (
                <Card 
                  key={vendor.id} 
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/vendor/${vendor.id}`)}
                >
                  <div className="aspect-video bg-secondary/30 relative overflow-hidden">
                    {vendor.verified && (
                      <Badge className="absolute top-3 left-3 bg-primary">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {vendor.name}
                      </h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-muted-foreground ml-1">({vendor.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">{vendor.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {vendor.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        {vendor.products} products
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.slice(0, 3).map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/vendor/${vendor.id}`);
                      }}
                    >
                      View Store
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryVendors;