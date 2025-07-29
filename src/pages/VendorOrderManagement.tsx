import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Eye,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  MoreVertical
} from 'lucide-react';

const VendorOrderManagement = () => {
  const orderStats = {
    pending: 12,
    processing: 8,
    shipped: 15,
    delivered: 156,
    cancelled: 3
  };

  const orders = [
    {
      id: "ORD-2024-001",
      customer: "John Doe",
      items: 2,
      total: 850000,
      status: "pending",
      date: "2024-01-15",
      products: ["Samsung Galaxy S24", "Wireless Charger"]
    },
    {
      id: "ORD-2024-002",
      customer: "Jane Smith",
      items: 1,
      total: 420000,
      status: "processing",
      date: "2024-01-14",
      products: ["Sony WH-1000XM5"]
    },
    {
      id: "ORD-2024-003",
      customer: "Mike Johnson",
      items: 3,
      total: 1200000,
      status: "shipped",
      date: "2024-01-13",
      products: ["MacBook Pro", "Mouse", "Keyboard"]
    },
    {
      id: "ORD-2024-004",
      customer: "Sarah Wilson",
      items: 1,
      total: 300000,
      status: "delivered",
      date: "2024-01-12",
      products: ["AirPods Pro"]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800", icon: Clock },
      processing: { variant: "secondary" as const, color: "bg-blue-100 text-blue-800", icon: Package },
      shipped: { variant: "secondary" as const, color: "bg-purple-100 text-purple-800", icon: Truck },
      delivered: { variant: "secondary" as const, color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { variant: "destructive" as const, color: "bg-red-100 text-red-800", icon: AlertCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "text-yellow-600",
      processing: "text-blue-600",
      shipped: "text-purple-600",
      delivered: "text-green-600",
      cancelled: "text-red-600"
    };
    return colors[status as keyof typeof colors] || "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Order Management</h1>
              <p className="text-muted-foreground">Track and manage all your store orders</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
            </div>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold text-foreground mb-1">{orderStats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold text-foreground mb-1">{orderStats.processing}</div>
                <div className="text-sm text-muted-foreground">Processing</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold text-foreground mb-1">{orderStats.shipped}</div>
                <div className="text-sm text-muted-foreground">Shipped</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold text-foreground mb-1">{orderStats.delivered}</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-2xl font-bold text-foreground mb-1">{orderStats.cancelled}</div>
                <div className="text-sm text-muted-foreground">Cancelled</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search orders by ID, customer name..."
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm text-foreground">{order.products.join(", ")}</p>
                        <p className="text-sm text-muted-foreground">{order.items} item(s)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-medium text-foreground">₦{order.total.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      {getStatusBadge(order.status)}
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VendorOrderManagement;