import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Store, ShoppingCart, Star, Shield, Truck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Browse & Discover",
      description: "Explore thousands of vendors and products from across Abuja and Nigeria",
      icon: ShoppingCart,
      details: "Use our smart search and filtering system to find exactly what you need"
    },
    {
      step: "2", 
      title: "Connect with Vendors",
      description: "Chat directly with local businesses and view their verified profiles",
      icon: Users,
      details: "Get real-time responses and build relationships with trusted sellers"
    },
    {
      step: "3",
      title: "Secure Purchase",
      description: "Complete your purchase with our secure payment system and buyer protection",
      icon: Shield,
      details: "Multiple payment options with full transaction security and dispute resolution"
    },
    {
      step: "4",
      title: "Fast Delivery",
      description: "Get your items delivered quickly with our integrated logistics partners",
      icon: Truck,
      details: "Real-time tracking and multiple delivery options to suit your schedule"
    }
  ];

  const features = [
    "Verified vendor profiles with ratings and reviews",
    "Secure escrow payment system",
    "Real-time order tracking",
    "24/7 customer support",
    "Local delivery network",
    "Buyer protection guarantee"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How <span className="bg-gradient-primary bg-clip-text text-transparent">Abuja E-Mall</span> Works
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connecting Abuja businesses with customers nationwide through our innovative marketplace platform
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative group hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-3">{step.description}</p>
                  <p className="text-sm text-muted-foreground/80">{step.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Abuja E-Mall?</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-left">{feature}</span>
              </div>
            ))}
          </div>
          <Button size="lg" className="group">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorks;