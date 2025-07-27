import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Store, CreditCard, Truck, BarChart, Shield, Headphones } from 'lucide-react';
import vendorImage from '@/assets/vendor-showcase.jpg';

const VendorSignup = () => {
  const features = [
    {
      icon: Store,
      title: 'Custom Storefront',
      description: 'Create your branded online store with customizable themes and layouts'
    },
    {
      icon: CreditCard,
      title: 'Instant Payments',
      description: 'Get paid immediately with our integrated payment processing system'
    },
    {
      icon: Truck,
      title: 'Delivery Integration',
      description: 'Automatic delivery assignment through Bolt and Uber partnerships'
    },
    {
      icon: BarChart,
      title: 'Analytics Dashboard',
      description: 'Track sales, customers, and performance with detailed insights'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security to protect your business and customers'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support and AI-powered assistance'
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
            Join thousands of successful vendors on Abuja E-Mall. Get your business online 
            in minutes and start reaching customers across Nigeria.
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
                  <Button variant="hero" size="lg" className="w-full">
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
              Join the digital marketplace revolution. Start selling online today and 
              reach customers you never thought possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="px-8">
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