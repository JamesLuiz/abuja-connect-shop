import { Button } from '@/components/ui/button';
import { ArrowRight, Store, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import heroImage from '@/assets/hero-shopping.jpg';

const Hero = () => {
  const stats = [
    { icon: Store, value: '500+', label: 'Vendors' },
    { icon: ShoppingBag, value: '10k+', label: 'Products' },
    { icon: Users, value: '50k+', label: 'Customers' },
    { icon: TrendingUp, value: '₦2M+', label: 'Sales Monthly' }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero">
        <img
          src={heroImage}
          alt="Abuja E-Mall Shopping"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Sell Anywhere,
                </span>
                <br />
                <span className="text-foreground">Buy Easy</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
                Nigeria's premier marketplace connecting Abuja businesses with customers nationwide. 
                Start selling in minutes or discover amazing products from local vendors.
              </p>
            </div>

            <div className="animate-slide-up flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Start Selling Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Explore Products
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-2">
                    <stat.icon className="h-6 w-6 text-primary mr-2" />
                    <span className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-1 gap-6 animate-slide-up">
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-primary/10 p-3 rounded-lg mr-4">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">For Vendors</h3>
                    <p className="text-sm text-muted-foreground">Start your online store</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Create your digital storefront in minutes. Reach customers across Nigeria 
                  with our integrated payment and delivery solutions.
                </p>
              </div>

              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg mr-4">
                    <ShoppingBag className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">For Shoppers</h3>
                    <p className="text-sm text-muted-foreground">Discover local products</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Shop from verified Abuja businesses. Enjoy fast delivery, secure payments, 
                  and quality products from trusted local vendors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating action indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;