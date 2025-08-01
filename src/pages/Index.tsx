import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProductShowcase from '@/components/ProductShowcase';
import About from '@/components/About';
import Contact from '@/components/Contact';
import VendorSignup from '@/components/VendorSignup';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProductShowcase />
      <About />
      <Contact />
      <VendorSignup />
      <Footer />
    </div>
  );
};

export default Index;
