import { useState } from 'react';
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
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';

const VendorOrderManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const orderStats = {
    pending: 12,
    processing: 8,
    shipped: 15,
    delivered: 156,
    cancelled: 3
  };

  const allOrders = [
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
    },
    {
      id: "ORD-2024-005",
      customer: "David Brown",
      items: 2,
      total: 750000,
      status: "pending",
      date: "2024-01-11",
      products: ["iPhone 15", "Case"]
    },
    {
      id: "ORD-2024-006",
      customer: "Lisa Davis",
      items: 1,
      total: 180000,
      status: "cancelled",
      date: "2024-01-10",
      products: ["Bluetooth Speaker"]
    },
    {
      id: "ORD-2024-007",
      customer: "Tom Wilson",
      items: 4,
      total: 950000,
      status: "processing",
      date: "2024-01-09",
      products: ["Laptop", "Mouse", "Keyboard", "Monitor"]
    },
    {
      id: "ORD-2024-008",
      customer: "Emma Taylor",
      items: 1,
      total: 450000,
      status: "shipped",
      date: "2024-01-08",
      products: ["Tablet"]
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { variant: "secondary", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      processing: { variant: "secondary", color: "bg-blue-100 text-blue-800", icon: Package },
      shipped: { variant: "secondary", color: "bg-purple-100 text-purple-800", icon: Truck },
      delivered: { variant: "secondary", color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { variant: "destructive", color: "bg-red-100 text-red-800", icon: AlertCircle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filterOrders = (orders, status) => {
    let filtered = orders;

    // Filter by tab status
    if (status !== 'all') {
      filtered = filtered.filter(order => order.status === status);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    return filtered;
  };

  const handleViewOrder = (orderId) => {
    alert(`Viewing order: ${orderId}`);
  };

  const handleUpdateOrder = (orderId) => {
    alert(`Updating order: ${orderId}`);
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
      alert(`Order ${orderId} deleted successfully`);
    }
  };

  const OrderList = ({ orders }) => (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-8">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No orders found</p>
        </div>
      ) : (
        orders.map((order) => (
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
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => handleViewOrder(order.id)}
                  title="View Order"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => handleUpdateOrder(order.id)}
                  title="Update Order"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  size="icon" 
                  variant="outline"
                  onClick={() => handleDeleteOrder(order.id)}
                  title="Delete Order"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
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
                    placeholder="Search orders by ID, customer name, or product..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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

        {/* Orders with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">
                  All ({allOrders.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({orderStats.pending})
                </TabsTrigger>
                <TabsTrigger value="processing">
                  Processing ({orderStats.processing})
                </TabsTrigger>
                <TabsTrigger value="shipped">
                  Shipped ({orderStats.shipped})
                </TabsTrigger>
                <TabsTrigger value="delivered">
                  Delivered ({orderStats.delivered})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({orderStats.cancelled})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'all')} />
              </TabsContent>

              <TabsContent value="pending" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'pending')} />
              </TabsContent>

              <TabsContent value="processing" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'processing')} />
              </TabsContent>

              <TabsContent value="shipped" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'shipped')} />
              </TabsContent>

              <TabsContent value="delivered" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'delivered')} />
              </TabsContent>

              <TabsContent value="cancelled" className="mt-6">
                <OrderList orders={filterOrders(allOrders, 'cancelled')} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorOrderManagement;