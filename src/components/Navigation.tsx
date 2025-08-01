import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, ShoppingCart, Store, User } from 'lucide-react';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import CartSidebar from '@/components/cart/CartSidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home', type: 'scroll' },
    { name: 'Products', href: '#products', type: 'scroll' },
    { name: 'Vendors', href: '#vendors', type: 'scroll' },
    { name: 'Orders', href: '/orders', type: 'route' },
    { name: 'About', href: '#about', type: 'scroll' },
    { name: 'Contact', href: '#contact', type: 'scroll' }
  ];

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

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <CartSidebar />
            
            {isAuthenticated && user ? (
              <>
                <ProfileDropdown user={user} />
                {!user.isVendor && (
                  <Button 
                    variant="accent" 
                    size="sm"
                    onClick={() => navigate('/vendor/register')}
                  >
                    <Store className="h-4 w-4 mr-2" />
                    Sell Now
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/signin')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile right section - Profile and Cart outside hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <CartSidebar />
            
            {isAuthenticated && user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
            )}
            
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
            <div className="pt-4 pb-3 border-t border-border">
              <div className="flex justify-center px-3">
                {isAuthenticated && user ? (
                  !user.isVendor && (
                    <Button 
                      variant="accent" 
                      size="sm" 
                      className="w-full"
                      onClick={() => navigate('/vendor/register')}
                    >
                      <Store className="h-4 w-4 mr-2" />
                      Sell Now
                    </Button>
                  )
                ) : (
                  <div className="flex gap-2 w-full">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate('/signin')}
                    >
                      Sign In
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => navigate('/signup')}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;