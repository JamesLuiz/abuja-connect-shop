import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Store, CreditCard, Truck, BarChart, Shield, Headphones } from 'lucide-react';
import vendorImage from '@/assets/vendor-showcase.jpg';
import { useNavigate } from 'react-router-dom';

const VendorSignup = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Store,
      title: 'Luxury Storefront',
      description: 'Showcase your rich quality, original products with premium branding and luxury marketplace presence'
    },
    {
      icon: CreditCard,
      title: 'Premium Payments',
      description: 'Instant payments for luxury transactions with trusted, secure processing for high-value items'
    },
    {
      icon: Truck,
      title: 'Fast Premium Delivery',
      description: 'Lightning-fast delivery nearest to customers. Premium logistics for luxury products across Abuja'
    },
    {
      icon: BarChart,
      title: 'Rich Analytics',
      description: 'Track luxury sales, discover customer preferences, and optimize your premium product offerings'
    },
    {
      icon: Shield,
      title: 'Trusted Platform',
      description: 'Enterprise security protecting your luxury business and affluent customers with premium safety'
    },
    {
      icon: Headphones,
      title: 'Premium Support',
      description: 'Dedicated support for luxury vendors. Expert assistance for high-quality customer experiences'
    }
  ];

  const pricingFeatures = [
    'Unlimited product listings',
    'Custom store branding',
    'Integrated payment processing',
    'Automatic delivery management',
    'Analytics and reporting',
    'Mobile-optimized storefront',
    'SEO optimization',
    'Customer support tools'
  ];

  return (
    <section id="vendors" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Start Your</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Digital Store
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join trusted vendors selling luxury, original products on Abuja's premier marketplace. 
            Offer rich quality items with fast delivery to customers seeking affordable luxury nearest to them.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Image */}
          <div className="relative">
            <img
              src={vendorImage}
              alt="Vendor Showcase"
              className="rounded-2xl shadow-soft w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl"></div>
          </div>

          {/* Right - Pricing Card */}
          <div>
            <Card className="border-2 border-primary/20 shadow-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl">
                  Start Selling Today
                </CardTitle>
                <CardDescription className="text-lg">
                  Everything you need to run a successful online business
                </CardDescription>
                <div className="py-4">
                  <span className="text-4xl md:text-5xl font-bold text-foreground">₦10,000</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pricingFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="space-y-3">
                  <Button variant="hero" size="lg" className="w-full" onClick={() => navigate('/vendor/register')}>
                    Start Free Trial
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Schedule Demo
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground text-center mt-4">
                  14-day free trial • No setup fees • Cancel anytime
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-primary/10 border border-primary/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Abuja's premier luxury marketplace. Sell original, rich quality products with fast delivery 
              to customers seeking affordable luxury nearest to them.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="px-8" onClick={() => navigate('/vendor/register')}>
                Get Started Now
              </Button>
              <Button variant="outline" size="lg" className="px-8">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorSignup;