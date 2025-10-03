import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, Filter, MapPin, Star, SlidersHorizontal, X, TrendingUp, 
  Clock, Package, Shield, DollarSign
} from 'lucide-react';

interface SearchFilters {
  query: string;
  category: string;
  location: string;
  priceRange: [number, number];
  rating: string;
  sortBy: string;
  verified: boolean;
  inStock: boolean;
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  categories: Array<{id: string; name: string}>;
  locations: string[];
  resultCount: number;
  suggestions?: string[];
}

const AdvancedSearchFilters = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  locations, 
  resultCount,
  suggestions = []
}: AdvancedSearchFiltersProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (filters.query) count++;
    if (filters.category !== 'all') count++;
    if (filters.location !== 'all') count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500000) count++;
    if (filters.rating !== 'all') count++;
    if (filters.verified) count++;
    if (filters.inStock) count++;
    setActiveFilters(count);
  }, [filters]);

  // Smart search suggestions with typo tolerance
  const smartSuggestions = useMemo(() => {
    if (!filters.query || filters.query.length < 2) return [];
    
    const query = filters.query.toLowerCase();
    const allSuggestions = [
      ...categories.map(c => c.name),
      ...locations,
      'electronics', 'fashion', 'beauty', 'smartphones', 'headphones',
      'dresses', 'laptops', 'skincare', 'home decor', 'furniture'
    ];

    return allSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query) ||
        // Simple typo tolerance
        suggestion.toLowerCase().includes(query.slice(0, -1)) ||
        query.includes(suggestion.toLowerCase().slice(0, 3))
      )
      .slice(0, 5);
  }, [filters.query, categories, locations]);

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      query: '',
      category: 'all',
      location: 'all',
      priceRange: [0, 500000],
      rating: 'all',
      sortBy: 'popular',
      verified: false,
      inStock: false
    });
  };

  const formatPrice = (price: number) => `₦${(price / 1000).toFixed(0)}k`;

  // Mobile Filter Sheet
  const MobileFilters = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFilters > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filters
            {activeFilters > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-6 mt-6">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );

  // Desktop Filter Popover
  const DesktopFilters = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Advanced Filters
          {activeFilters > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
              {activeFilters}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-6" align="start">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Filters</h3>
          {activeFilters > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              Clear All
            </Button>
          )}
        </div>
        <FilterContent />
      </PopoverContent>
    </Popover>
  );

  // Filter Content (shared between mobile/desktop)
  const FilterContent = () => (
    <>
      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-sm font-medium flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          Price Range
        </label>
        <div className="px-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatPrice(filters.priceRange[0])}</span>
            <span>{formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          Location
        </label>
        <Select value={filters.location} onValueChange={(value) => updateFilters({ location: value })}>
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

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center">
          <Star className="h-4 w-4 mr-1" />
          Minimum Rating
        </label>
        <Select value={filters.rating} onValueChange={(value) => updateFilters({ rating: value })}>
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

      {/* Quick Filters */}
      <div className="space-y-3">
        <label className="text-sm font-medium">Quick Filters</label>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.verified ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ verified: !filters.verified })}
            className="text-xs"
          >
            <Shield className="h-3 w-3 mr-1" />
            Verified Only
          </Button>
          <Button
            variant={filters.inStock ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ inStock: !filters.inStock })}
            className="text-xs"
          >
            <Package className="h-3 w-3 mr-1" />
            In Stock
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="space-y-4">
      {/* Enhanced Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products, vendors, categories..."
          value={filters.query}
          onChange={(e) => {
            updateFilters({ query: e.target.value });
            setShowSuggestions(e.target.value.length > 1);
          }}
          onFocus={() => setShowSuggestions(filters.query.length > 1)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 py-3 text-base rounded-xl border-2 focus:border-primary transition-colors"
        />
        
        {/* Search Suggestions */}
        {showSuggestions && smartSuggestions.length > 0 && (
          <Card className="absolute top-full mt-1 w-full z-50 max-h-48 overflow-y-auto">
            <CardContent className="p-2">
              {smartSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => {
                    updateFilters({ query: suggestion });
                    setShowSuggestions(false);
                  }}
                >
                  <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                  {suggestion}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={filters.category === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => updateFilters({ category: category.id })}
            className="rounded-full transition-all hover:scale-105"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
            <SelectTrigger className="w-[180px]">
              <TrendingUp className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="distance">Nearest to Me</SelectItem>
            </SelectContent>
          </Select>

          {/* Advanced Filters Button */}
          {isMobile ? <MobileFilters /> : <DesktopFilters />}
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground flex items-center">
          <Package className="h-4 w-4 mr-1" />
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {filters.query && (
            <Badge variant="secondary" className="gap-1">
              "{filters.query}"
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ query: '' })}
              />
            </Badge>
          )}
          {filters.category !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categories.find(c => c.id === filters.category)?.name}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ category: 'all' })}
              />
            </Badge>
          )}
          {filters.location !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {filters.location}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ location: 'all' })}
              />
            </Badge>
          )}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 500000) && (
            <Badge variant="secondary" className="gap-1">
              {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => updateFilters({ priceRange: [0, 500000] })}
              />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchFilters;