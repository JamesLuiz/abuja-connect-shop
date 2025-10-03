import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Menu,
  ShoppingCart,
  Heart,
  Bell,
  Filter,
  ScanLine,
  MapPin,
  Headphones
} from 'lucide-react';
import AdvancedSearchFilters from '@/components/search/AdvancedSearchFilters';
import { useCart } from '@/contexts/CartContext';

interface QuickActionsProps {
  className?: string;
}

const QuickActions = ({ className = '' }: QuickActionsProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const quickActionItems = [
    {
      icon: Search,
      label: 'Search',
      action: () => setIsSearchOpen(true),
      color: 'text-primary'
    },
    {
      icon: ScanLine,
      label: 'Scan',
      action: () => {
        // TODO: Implement barcode scanning
        console.log('Barcode scanning not implemented yet');
      },
      color: 'text-accent'
    },
    {
      icon: MapPin,
      label: 'Nearby',
      action: () => {
        // TODO: Implement location-based search
        console.log('Location search not implemented yet');
      },
      color: 'text-secondary'
    },
    {
      icon: Headphones,
      label: 'Support',
      action: () => {
        window.location.href = '/help';
      },
      color: 'text-muted-foreground'
    }
  ];

  return (
    <>
      <div className={`fixed bottom-4 left-4 right-4 z-40 ${className}`}>
        <div className="flex items-center justify-between bg-background/95 backdrop-blur-sm border border-border rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-4 md:gap-6 flex-1 justify-around">
            {quickActionItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`flex-col h-12 w-12 p-0 ${item.color} hover:bg-muted/50`}
                  onClick={item.action}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
            
            <Button
              variant="ghost"
              size="sm"
              className="relative flex-col h-12 w-12 p-0"
              onClick={() => {
                // TODO: Open cart sidebar
                console.log('Cart sidebar not implemented yet');
              }}
            >
              <ShoppingCart className="h-5 w-5 text-primary mb-1" />
              {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
              <span className="text-xs">Cart</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Search Sheet */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="h-full overflow-y-auto">
          <AdvancedSearchFilters 
            filters={{
              query: '',
              category: '',
              location: '',
              priceRange: [0, 100000],
              rating: '',
              sortBy: 'relevance',
              verified: false,
              inStock: false
            }}
            onFiltersChange={() => {}}
            categories={[
              { id: 'electronics', name: 'Electronics' },
              { id: 'fashion', name: 'Fashion' },
              { id: 'home', name: 'Home & Garden' }
            ]}
            locations={['Abuja', 'Lagos', 'Port Harcourt']}
            resultCount={0}
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default QuickActions;