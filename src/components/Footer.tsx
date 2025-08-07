import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Store,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Headphones
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Vendor Program', href: '/vendor-program' },
    { name: 'Customer Support', href: '/customer-support' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' }
  ];

  const categories = [
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Fashion & Style', href: '/category/fashion' },
    { name: 'Home & Garden', href: '/category/home-garden' },
    { name: 'Beauty & Health', href: '/category/beauty' },
    { name: 'Sports & Fitness', href: '/category/sports' },
    { name: 'Books & Media', href: '/category/books' }
  ];

  const services = [
    { icon: Store, name: 'Vendor Dashboard' },
    { icon: ShoppingBag, name: 'Easy Shopping' },
    { icon: CreditCard, name: 'Secure Payments' },
    { icon: Truck, name: 'Fast Delivery' },
    { icon: Shield, name: 'Buyer Protection' },
    { icon: Headphones, name: '24/7 Support' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                  Abuja E-Mall
                </h3>
                <p className="text-secondary-foreground/80 mb-4">
                  Discover luxury shopping in Abuja's premier marketplace. Rich quality, original products 
                  with fast delivery from trusted vendors nearest to you.
                </p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">Central Business District, Abuja</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">+234 (0) 123 456 789</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span className="text-sm">support@abujaemall.com</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    className="border-secondary-foreground/20 hover:border-primary hover:bg-primary/10"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-4 w-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Categories</h4>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <a
                      href={category.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
              <p className="text-secondary-foreground/80 mb-4">
                Discover luxury deals, rich quality products, and exclusive offers from trusted vendors nearest to you.
              </p>
              
              <div className="space-y-3 mb-6">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-background/10 border-secondary-foreground/20 focus:border-primary"
                />
                <Button variant="default" className="w-full">
                  Subscribe
                </Button>
              </div>

              <p className="text-xs text-secondary-foreground/60">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="py-8 border-t border-secondary-foreground/20">
          <h4 className="text-lg font-semibold text-center mb-8">Why Choose Abuja E-Mall</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 p-3 rounded-lg w-fit mx-auto mb-3">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-secondary-foreground/80">{service.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-secondary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-secondary-foreground/60 mb-4 md:mb-0">
              © 2024 Abuja E-Mall. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <a href="#privacy" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#cookies" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="#vendor-terms" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Vendor Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;