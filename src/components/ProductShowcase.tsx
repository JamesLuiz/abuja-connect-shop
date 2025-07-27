import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'sports', name: 'Sports' }
  ];

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 45000,
      originalPrice: 60000,
      rating: 4.8,
      reviews: 124,
      category: 'electronics',
      vendor: 'TechHub Abuja',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      discount: 25,
      inStock: true
    },
    {
      id: 2,
      name: 'Elegant African Print Dress',
      price: 15000,
      originalPrice: 20000,
      rating: 4.9,
      reviews: 89,
      category: 'fashion',
      vendor: 'Ankara Styles',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop',
      discount: 25,
      inStock: true
    },
    {
      id: 3,
      name: 'Smartphone with 128GB Storage',
      price: 180000,
      originalPrice: 220000,
      rating: 4.7,
      reviews: 256,
      category: 'electronics',
      vendor: 'Mobile World',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
      discount: 18,
      inStock: true
    },
    {
      id: 4,
      name: 'Organic Face Cream Set',
      price: 8500,
      originalPrice: 12000,
      rating: 4.6,
      reviews: 67,
      category: 'beauty',
      vendor: 'Natural Glow',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
      discount: 29,
      inStock: true
    },
    {
      id: 5,
      name: 'Modern Table Lamp',
      price: 25000,
      originalPrice: 35000,
      rating: 4.5,
      reviews: 43,
      category: 'home',
      vendor: 'Home Decor Plus',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      discount: 29,
      inStock: false
    },
    {
      id: 6,
      name: 'Fitness Tracker Watch',
      price: 32000,
      originalPrice: 40000,
      rating: 4.4,
      reviews: 178,
      category: 'sports',
      vendor: 'FitLife Store',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop',
      discount: 20,
      inStock: true
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

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
            <span className="text-foreground">Featured</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover amazing products from trusted Abuja vendors. Quality guaranteed, 
            fast delivery, and secure payments.
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

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProducts.map((product) => (
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
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.vendor}
                  </Badge>
                </div>
                
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
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;