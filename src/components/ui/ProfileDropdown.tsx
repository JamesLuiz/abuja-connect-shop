import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  HelpCircle,
  LogOut,
  Store,
  BarChart3,
  Shield,
  Users,
  CheckCircle,
  Phone,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
    role: 'customer' | 'vendor' | 'admin';
    isVerified: boolean;
    phone?: string;
    location?: string;
    joinDate?: string;
    totalOrders?: number;
    totalSpent?: number;
    storeRevenue?: number;
    storeRating?: number;
    completedSales?: number;
  };
  onSignOut?: () => void;
}

const ProfileDropdown = ({ user, onSignOut }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const customerMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: ShoppingBag, label: 'Order History', href: '/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
  ];

  const vendorMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Store, label: 'My Store', href: '/vendor/store' },
    { icon: ShoppingBag, label: 'Order Management', href: '/vendor/orders' },
    { icon: BarChart3, label: 'Analytics', href: '/vendor/analytics' },
    { icon: Settings, label: 'Store Settings', href: '/vendor/settings' },
    { icon: HelpCircle, label: 'Help & Support', href: '/help' },
  ];

  const adminMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Shield, label: 'Admin Dashboard', href: '/admin/dashboard' },
    { icon: Users, label: 'Vendor Management', href: '/admin/vendors' },
    { icon: BarChart3, label: 'Platform Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const getMenuItems = () => {
    switch (user.role) {
      case 'vendor':
        return vendorMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return customerMenuItems;
    }
  };

  const getRoleBadge = () => {
    const roleColors = {
      customer: 'bg-primary/10 text-primary',
      vendor: 'bg-accent/10 text-accent',
      admin: 'bg-destructive/10 text-destructive'
    };

    return (
      <Badge variant="secondary" className={roleColors[user.role]}>
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
      </Badge>
    );
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          {user.isVerified && (
            <CheckCircle className="absolute -top-1 -right-1 h-4 w-4 text-primary bg-background rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-72 bg-background border-border shadow-glow" 
        align="end" 
        sideOffset={5}
      >
        {/* User Info Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg font-medium">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <p className="text-sm font-semibold text-foreground truncate">
                  {user.name}
                </p>
                {user.isVerified && (
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate mb-2">
                {user.email}
              </p>
              {getRoleBadge()}
            </div>
          </div>

          {/* Additional User Info */}
          <div className="space-y-2 text-xs">
            {user.phone && (
              <div className="flex items-center text-muted-foreground">
                <Phone className="h-3 w-3 mr-2" />
                <span>{user.phone}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-3 w-3 mr-2" />
                <span>{user.location}</span>
              </div>
            )}
            {user.joinDate && (
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-3 w-3 mr-2" />
                <span>Joined {user.joinDate}</span>
              </div>
            )}
          </div>

          {/* Role-specific Stats */}
          {user.role === 'customer' && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">{user.totalOrders || 0}</div>
                  <div className="text-xs text-muted-foreground">Orders</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">₦{user.totalSpent?.toLocaleString() || '0'}</div>
                  <div className="text-xs text-muted-foreground">Total Spent</div>
                </div>
              </div>
            </div>
          )}

          {user.role === 'vendor' && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-foreground">₦{user.storeRevenue?.toLocaleString() || '0'}</div>
                  <div className="text-xs text-muted-foreground">Revenue</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{user.completedSales || 0}</div>
                  <div className="text-xs text-muted-foreground">Sales</div>
                </div>
              </div>
              {user.storeRating && (
                <div className="mt-2 text-center">
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-foreground">{user.storeRating}</span>
                    <span className="text-xs text-muted-foreground ml-1">rating</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {getMenuItems().map((item, index) => {
            const Icon = item.icon;
            return (
              <DropdownMenuItem 
                key={index} 
                className="px-4 py-2.5 cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
                onClick={() => {
                  // Handle navigation here
                  console.log(`Navigate to ${item.href}`);
                  setIsOpen(false);
                }}
              >
                <Icon className="h-4 w-4 mr-3 text-muted-foreground" />
                <span className="text-sm text-foreground">{item.label}</span>
              </DropdownMenuItem>
            );
          })}
        </div>

        <DropdownMenuSeparator className="bg-border" />

        {/* Sign Out */}
        <div className="py-2">
          <DropdownMenuItem 
            className="px-4 py-2.5 cursor-pointer hover:bg-destructive/10 focus:bg-destructive/10 text-destructive"
            onClick={() => {
              onSignOut?.();
              setIsOpen(false);
            }}
          >
            <LogOut className="h-4 w-4 mr-3" />
            <span className="text-sm">Sign Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;