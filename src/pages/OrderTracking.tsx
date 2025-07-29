import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin, 
  Search,
  Eye,
  User,
  Store
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const OrderTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userRole] = useState<'customer' | 'vendor'>('customer'); // Mock user role

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-2024-001',
      customerName: 'Adebayo Johnson',
      items: [
        { name: 'Premium Wireless Headphones', quantity: 1, price: 45000 }
      ],
      total: 46500,
      status: 'delivered',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2024-01-15',
      currentLocation: 'Delivered to Maitama, Abuja',
      timeline: [
        { status: 'ordered', date: '2024-01-12', time: '10:30 AM', completed: true },
        { status: 'confirmed', date: '2024-01-12', time: '11:15 AM', completed: true },
        { status: 'preparing', date: '2024-01-13', time: '09:00 AM', completed: true },
        { status: 'shipped', date: '2024-01-14', time: '02:30 PM', completed: true },
        { status: 'delivered', date: '2024-01-15', time: '11:45 AM', completed: true }
      ]
    },
    {
      id: 'ORD-2024-002',
      customerName: 'Fatima Abdullahi',
      items: [
        { name: 'Smartphone with 128GB Storage', quantity: 1, price: 180000 },
        { name: 'USB-C Cable 2m', quantity: 2, price: 3500 }
      ],
      total: 188500,
      status: 'shipped',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2024-01-18',
      currentLocation: 'In transit to Garki, Abuja',
      timeline: [
        { status: 'ordered', date: '2024-01-16', time: '02:15 PM', completed: true },
        { status: 'confirmed', date: '2024-01-16', time: '03:00 PM', completed: true },
        { status: 'preparing', date: '2024-01-17', time: '10:30 AM', completed: true },
        { status: 'shipped', date: '2024-01-17', time: '04:00 PM', completed: true },
        { status: 'delivered', date: '', time: '', completed: false }
      ]
    },
    {
      id: 'ORD-2024-003',
      customerName: 'Emeka Okafor',
      items: [
        { name: 'Gaming Mouse', quantity: 1, price: 15000 }
      ],
      total: 16500,
      status: 'preparing',
      vendor: 'TechHub Abuja',
      estimatedDelivery: '2024-01-20',
      currentLocation: 'Order being prepared',
      timeline: [
        { status: 'ordered', date: '2024-01-17', time: '11:20 AM', completed: true },
        { status: 'confirmed', date: '2024-01-17', time: '12:05 PM', completed: true },
        { status: 'preparing', date: '2024-01-18', time: '09:15 AM', completed: true },
        { status: 'shipped', date: '', time: '', completed: false },
        { status: 'delivered', date: '', time: '', completed: false }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ordered': return <Package className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'preparing': return <Clock className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ordered': return 'bg-muted text-muted-foreground';
      case 'confirmed': return 'bg-primary text-primary-foreground';
      case 'preparing': return 'bg-accent text-accent-foreground';
      case 'shipped': return 'bg-highlight text-highlight-foreground';
      case 'delivered': return 'bg-primary text-primary-foreground';
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
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="text-foreground">Order</span>{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Tracking
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Track your orders in real-time from confirmation to delivery
              </p>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by order ID or customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Role-based Tabs */}
            <Tabs defaultValue={userRole === 'customer' ? 'my-orders' : 'vendor-orders'} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="my-orders" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {userRole === 'customer' ? 'My Orders' : 'Customer View'}
                </TabsTrigger>
                <TabsTrigger value="vendor-orders" className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  {userRole === 'vendor' ? 'Manage Orders' : 'Vendor View'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-orders">
                <div className="grid gap-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl">{order.id}</CardTitle>
                            <p className="text-muted-foreground">
                              Customer: {order.customerName} • Vendor: {order.vendor}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(order.status)} variant="secondary">
                              {getStatusIcon(order.status)}
                              <span className="ml-2 capitalize">{order.status}</span>
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6">
                        <div className="grid lg:grid-cols-2 gap-8">
                          {/* Order Details */}
                          <div>
                            <h4 className="font-semibold mb-4">Order Items</h4>
                            <div className="space-y-3 mb-6">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-border">
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Quantity: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-semibold">{formatPrice(item.price)}</p>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex justify-between items-center text-lg font-bold pt-3 border-t border-border">
                              <span>Total:</span>
                              <span className="text-primary">{formatPrice(order.total)}</span>
                            </div>

                            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span className="font-medium">Current Status</span>
                              </div>
                              <p className="text-muted-foreground">{order.currentLocation}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                Estimated delivery: {order.estimatedDelivery}
                              </p>
                            </div>
                          </div>

                          {/* Timeline */}
                          <div>
                            <h4 className="font-semibold mb-4">Order Timeline</h4>
                            <div className="space-y-4">
                              {order.timeline.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                  <div className={`
                                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                                    ${step.completed 
                                      ? 'bg-primary border-primary text-primary-foreground' 
                                      : 'bg-background border-muted-foreground text-muted-foreground'
                                    }
                                  `}>
                                    {getStatusIcon(step.status)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`font-medium capitalize ${
                                      step.completed ? 'text-foreground' : 'text-muted-foreground'
                                    }`}>
                                      {step.status.replace('_', ' ')}
                                    </p>
                                    {step.completed && (
                                      <p className="text-sm text-muted-foreground">
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

              <TabsContent value="vendor-orders">
                <div className="grid gap-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="bg-muted/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <CardTitle className="text-xl">{order.id}</CardTitle>
                            <p className="text-muted-foreground">
                              Customer: {order.customerName}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(order.status)} variant="secondary">
                              {getStatusIcon(order.status)}
                              <span className="ml-2 capitalize">{order.status}</span>
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Update Status
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                          <div className="md:col-span-2">
                            <h4 className="font-semibold mb-4">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-border">
                                  <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                  <p className="font-semibold">{formatPrice(item.price)}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-4">Actions</h4>
                            <div className="space-y-2">
                              <Button variant="outline" className="w-full justify-start">
                                <Package className="h-4 w-4 mr-2" />
                                Mark as Preparing
                              </Button>
                              <Button variant="outline" className="w-full justify-start">
                                <Truck className="h-4 w-4 mr-2" />
                                Mark as Shipped
                              </Button>
                              <Button variant="outline" className="w-full justify-start">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Mark as Delivered
                              </Button>
                            </div>
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