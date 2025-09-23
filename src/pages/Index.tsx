import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import About from '@/components/About';
import Contact from '@/components/Contact';
import VendorSignup from '@/components/VendorSignup';
import Footer from '@/components/Footer';
import QuickActions from '@/components/ui/QuickActions';
import RecentlyViewed from '@/components/product/RecentlyViewed';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <div className="container mx-auto px-4 py-8">
        <RecentlyViewed />
      </div>
      <About />
      <Contact />
      <VendorSignup />
      <Footer />
      <QuickActions className="md:hidden" />
    </div>
  );
};

export default Index;
