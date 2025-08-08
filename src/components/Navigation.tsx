import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, Store } from 'lucide-react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import CartSidebar from '@/components/cart/CartSidebar';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '#home', type: 'scroll' },
    { name: 'Products', href: '#products', type: 'scroll' },
    { name: 'Vendors', href: '#vendors', type: 'scroll' },
    { name: 'Orders', href: '/orders', type: 'route' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Contact', href: '#contact', type: 'scroll' }
  ];

  // Mock user data - in real app this would come from auth context
  // Change isAuthenticated to true to test authenticated state
  const [isAuthenticated, setIsAuthenticated] = useState(true); 
  const mockUser = {
    name: 'Adebayo Johnson',
    email: 'adebayo.johnson@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=face',
    role: 'vendor' as const,
    isVerified: true,
    phone: '+234 809 123 4567',
    location: 'Abuja, FCT',
    joinDate: 'March 2023',
    storeRevenue: 2450000,
    storeRating: 4.8,
    completedSales: 342
  };

  const handleSignOut = () => {
    console.log('User signed out');
    // Handle sign out logic
    setIsAuthenticated(false);
  };

  const handleNavClick = (item) => {
    if (item.type === 'route') {
      navigate(item.href);
    } else {
      // For scroll navigation, first check if we're on the home page
      if (location.pathname !== '/') {
        // If not on home page, navigate to home with the hash
        navigate('/' + item.href);
      } else {
        // If on home page, just scroll to the section
        const element = document.querySelector(item.href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Abuja E-Mall
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Elements */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-glow-pulse"></div>
              <span className="text-xs text-muted-foreground">Live</span>
            </div>
            <div className="text-xs text-muted-foreground">
              🇳🇬 Abuja's #1 Marketplace
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <CartSidebar />
            {/* Conditional rendering for authenticated state */}
            {isAuthenticated ? (
              <>
                <Button 
                  variant="accent" 
                  size="sm"
                  onClick={() => navigate('/vendor/register')}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Sell Now
                </Button>
                <ProfileDropdown user={mockUser} onSignOut={handleSignOut} />
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => navigate("/login")}>
                  Sign Up
                </Button>
                <Button 
                  variant="accent" 
                  size="sm"
                  onClick={() => navigate('/vendor/register')}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Sell Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile right section - Profile and Cart outside hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <CartSidebar />
            {isAuthenticated && <ProfileDropdown user={mockUser} onSignOut={handleSignOut} />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 text-left w-full"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 pb-3 border-t border-border space-y-3">
              {!isAuthenticated && (
                <div className="flex gap-2 px-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate('/login')}
                  >
                    Sign In
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate('/login')}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              <div className="flex justify-center px-3">
                <Button 
                  variant="accent" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('/vendor/register')}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Sell Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;