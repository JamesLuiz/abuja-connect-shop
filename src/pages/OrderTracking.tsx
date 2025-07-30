import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Search,
  Eye,
  User,
  Store,
  ChevronDown
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const OrderTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole] = useState<'customer' | 'vendor'>('customer'); // Mock user role

  // Mock orders data remains unchanged
  const mockOrders = [
    {
      id: 'ORD-2025-001',
      customerName: 'Adebayo Johnson',
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 45000 }
      ],
      total: 46500,
      status: 'delivered',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2025-07-28',
      currentLocation: 'Delivered to Maitama, Abuja',
      timeline: [
        { status: 'ordered', date: '2025-07-25', time: '10:30 AM', completed: true },
        { status: 'confirmed', date: '2025-07-25', time: '11:15 AM', completed: true },
        { status: 'preparing', date: '2025-07-26', time: '09:00 AM', completed: true },
        { status: 'shipped', date: '2025-07-27', time: '02:30 PM', completed: true },
        { status: 'delivered', date: '2025-07-28', time: '11:45 AM', completed: true }
      ]
    },
    {
      id: 'ORD-2025-002',
      customerName: 'Fatima Abdullahi',
      items: [
        { name: 'Smartphone with 128GB Storage', quantity: 1, price: 180000 },
        { name: 'USB-C Cable 2m', quantity: 2, price: 3500 }
      ],
      total: 188500,
      status: 'shipped',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2025-07-31',
      currentLocation: 'In transit to Garki, Abuja',
      timeline: [
        { status: 'ordered', date: '2025-07-29', time: '02:15 PM', completed: true },
        { status: 'confirmed', date: '2025-07-29', time: '03:00 PM', completed: true },
        { status: 'preparing', date: '2025-07-30', time: '10:30 AM', completed: true },
        { status: 'shipped', date: '2025-07-30', time: '01:00 PM', completed: true },
        { status: 'delivered', date: '', time: '', completed: false }
      ]
    },
    {
      id: 'ORD-2025-003',
      customerName: 'Emeka Okafor',
      items: [
        { name: 'Gaming Mouse', quantity: 1, price: 15000 }
      ],
      total: 16500,
      status: 'preparing',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2025-08-01',
      currentLocation: 'Order being prepared',
      timeline: [
        { status: 'ordered', date: '2025-07-29', time: '11:20 AM', completed: true },
        { status: 'confirmed', date: '2025-07-29', time: '12:05 PM', completed: true },
        { status: 'preparing', date: '2025-07-30', time: '09:15 AM', completed: true },
        { status: 'shipped', date: '', time: '', completed: false },
        { status: 'delivered', date: '', time: '', completed: false }
      ]
    }
  ];

  // Helper functions remain unchanged
  const getStatusIcon = (status: string) => {
    const iconClass = "h-5 w-5"; // Standardized icon size
    switch (status) {
      case 'ordered': return <Package className={iconClass} />;
      case 'confirmed': return <CheckCircle className={iconClass} />;
      case 'preparing': return <Clock className={iconClass} />;
      case 'shipped': return <Truck className={iconClass} />;
      case 'delivered': return <CheckCircle className={iconClass} />;
      default: return <Package className={iconClass} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filteredOrders = mockOrders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Order</span>{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Tracking
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Track your orders in real-time from confirmation to delivery.
              </p>
            </div>

            {/* Search */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search by Order ID or Customer Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base"
                />
              </div>
            </div>

            {/* Role-based Tabs */}
            <Tabs defaultValue={userRole} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="customer" className="flex items-center gap-2">
                  <User className="h-4 w-4" /> My Orders
                </TabsTrigger>
                <TabsTrigger value="vendor" className="flex items-center gap-2">
                  <Store className="h-4 w-4" /> Manage Orders
                </TabsTrigger>
              </TabsList>

              {/* Customer View Content */}
              <TabsContent value="customer">
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden shadow-sm">
                      <CardHeader className="bg-muted/40 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg font-semibold">{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Sold by: {order.vendor}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-center">
                            <Badge className={`${getStatusColor(order.status)} capitalize text-xs font-medium py-1 px-2.5`}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 md:p-6">
                        <div className="grid md:grid-cols-5 gap-6">
                          {/* Order Items & Summary (Left side) */}
                          <div className="md:col-span-3">
                            <h4 className="font-semibold mb-3">Order Items</h4>
                            <div className="space-y-3 mb-4">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start text-sm">
                                  <div>
                                    <p className="font-medium text-foreground">{item.name}</p>
                                    <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between items-center text-base font-bold pt-3 border-t border-border">
                              <span>Total:</span>
                              <span className="text-primary">{formatPrice(order.total)}</span>
                            </div>
                          </div>

                          {/* Order Timeline (Right side) */}
                          <div className="md:col-span-2">
                            <h4 className="font-semibold mb-3">Timeline</h4>
                            <div className="relative space-y-6">
                              {/* Vertical connecting line */}
                              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border -translate-x-1/2"></div>
                              {order.timeline.map((step) => (
                                <div key={step.status} className="flex items-start gap-4 pl-1">
                                  <div className={`
                                    relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                                    ${step.completed 
                                      ? 'bg-primary border-primary text-primary-foreground' 
                                      : 'bg-background border-muted-foreground text-muted-foreground'
                                    }
                                  `}>
                                    {getStatusIcon(step.status)}
                                  </div>
                                  <div className="flex-1 pt-1.5">
                                    <p className={`font-medium capitalize ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                                      {step.status}
                                    </p>
                                    {step.completed && (
                                      <p className="text-xs text-muted-foreground">
                                        {step.date} at {step.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Vendor View Content */}
              <TabsContent value="vendor">
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden shadow-sm">
                      <CardHeader className="bg-muted/40 p-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div>
                            <CardTitle className="text-lg font-semibold">{order.id}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              Customer: {order.customerName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-center">
                             <Badge className={`${getStatusColor(order.status)} capitalize text-xs font-medium py-1 px-2.5`}>
                              {order.status}
                            </Badge>
                            {/* Responsive Actions */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Update <ChevronDown className="h-4 w-4 ml-2" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem><Clock className="h-4 w-4 mr-2" /> Mark as Preparing</DropdownMenuItem>
                                <DropdownMenuItem><Truck className="h-4 w-4 mr-2" /> Mark as Shipped</DropdownMenuItem>
                                <DropdownMenuItem><CheckCircle className="h-4 w-4 mr-2" /> Mark as Delivered</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div className="flex-1">
                                <h4 className="font-semibold mb-3">Order Items</h4>
                                <div className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-sm">
                                        <p className="font-medium text-foreground">{item.name} <span className="text-muted-foreground font-normal">x {item.quantity}</span></p>
                                        <p className="font-medium text-foreground">{formatPrice(item.price * item.quantity)}</p>
                                    </div>
                                ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t md:border-t-0 md:pt-0 md:flex-col md:items-end md:justify-start">
                                <span className="text-sm text-muted-foreground">Total</span>
                                <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
                            </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;