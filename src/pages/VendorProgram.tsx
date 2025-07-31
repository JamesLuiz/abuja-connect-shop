import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Store, 
  TrendingUp, 
  Users, 
  Shield, 
  CreditCard, 
  Truck, 
  BarChart3, 
  Headphones,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const VendorProgram = () => {
  const benefits = [
    {
      icon: Store,
      title: "Free Store Setup",
      description: "Get your digital storefront up and running in minutes with our easy-to-use tools"
    },
    {
      icon: TrendingUp,
      title: "Reach More Customers",
      description: "Access our growing customer base across Nigeria and expand your market reach"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Receive payments safely with our integrated payment system and fraud protection"
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your performance with detailed analytics and customer insights"
    },
    {
      icon: Truck,
      title: "Logistics Support",
      description: "Integrated delivery solutions to get your products to customers efficiently"
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated vendor support team"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "Forever",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 50 products",
        "Basic store customization",
        "Standard support",
        "Basic analytics",
        "Mobile-friendly store"
      ],
      badge: "Most Popular",
      buttonText: "Start Free"
    },
    {
      name: "Professional",
      price: "₦15,000",
      period: "per month",
      description: "Ideal for growing businesses",
      features: [
        "Unlimited products",
        "Advanced store customization",
        "Priority support",
        "Advanced analytics",
        "Custom domain",
        "Marketing tools",
        "Inventory management"
      ],
      buttonText: "Upgrade Now"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact us",
      description: "For large businesses with special needs",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom integrations",
        "White-label solutions",
        "API access",
        "Priority listing",
        "Custom reporting"
      ],
      buttonText: "Contact Sales"
    }
  ];

  const steps = [
    "Sign up for your vendor account",
    "Complete your business verification",
    "Set up your store and add products",
    "Start selling and growing your business"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join the <span className="bg-gradient-primary bg-clip-text text-transparent">Vendor Program</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Grow your business with Nigeria's fastest-growing marketplace. Connect with customers nationwide and boost your sales with our powerful vendor tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start Selling Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell on Abuja E-Mall?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-center text-muted-foreground mb-12">
            Start free and upgrade as your business grows
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${index === 0 ? 'border-primary shadow-elegant' : ''}`}>
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">{plan.badge}</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold">
                    {plan.price}
                    {plan.period !== "Contact us" && (
                      <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={index === 0 ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Getting Started is Easy</h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-5 -right-3 h-5 w-5 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
          <Button size="lg" className="group">
            Join the Vendor Program
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VendorProgram;