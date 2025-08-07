import { CheckCircle, Shield, Truck, CreditCard, Users, Store } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Shield,
      title: 'Trusted Vendors Only',
      description: 'Rigorously verified vendors offering original, luxury products with guaranteed rich quality and authenticity.'
    },
    {
      icon: Truck,
      title: 'Lightning Fast Delivery',
      description: 'Ultra-fast delivery nearest to you across Abuja. Premium logistics ensuring your luxury items arrive quickly.'
    },
    {
      icon: CreditCard,
      title: 'Secure Luxury Payments',
      description: 'Bank-grade security for premium transactions. Multiple payment options for your luxury shopping experience.'
    },
    {
      icon: Users,
      title: 'Premium Customer Care',
      description: 'Dedicated support for luxury shoppers. 24/7 assistance ensuring the best quality shopping experience.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Vendors' },
    { number: '10,000+', label: 'Products Listed' },
    { number: '50,000+', label: 'Happy Customers' },
    { number: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About <span className="bg-gradient-primary bg-clip-text text-transparent">Abuja E-Mall</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover luxury shopping in Abuja's premier marketplace. We connect trusted vendors with customers 
            seeking rich quality, original products. Experience fast delivery of affordable luxury items 
            from the finest businesses nearest to you.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-card border border-border rounded-xl p-8 mb-16 shadow-soft">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                To provide Nigeria's most trusted marketplace for luxury shopping. We connect discerning customers 
                with verified vendors offering original, rich quality products. Experience fast delivery of 
                affordable luxury from the best vendors nearest to you in Abuja.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm text-foreground">Local First</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm text-foreground">Quality Assured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm text-foreground">Customer Focused</span>
                </div>
              </div>
            </div>
            <div className="bg-primary/5 rounded-lg p-6">
              <Store className="h-12 w-12 text-primary mb-4" />
              <h4 className="text-lg font-semibold text-foreground mb-2">Supporting Local Businesses</h4>
              <p className="text-muted-foreground">
                Every purchase on our platform directly supports local Abuja businesses, 
                helping them grow and reach new customers across Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-primary rounded-xl p-8 text-white">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;