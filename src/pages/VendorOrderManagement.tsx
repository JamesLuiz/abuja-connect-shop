import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
      <Badge variant={config.variant} className={`${config.color} capitalize`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const filterOrders = (orders, status) => {
    let filtered = orders;

    // Filter by tab status
    if (activeTab !== 'all') {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.products.some(product => product.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by status dropdown
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    return filtered;
  };

  const handleViewOrder = (orderId) => alert(`Viewing order: ${orderId}`);
  const handleUpdateOrder = (orderId) => alert(`Updating order: ${orderId}`);
  const handleDeleteOrder = (orderId) => {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
      alert(`Order ${orderId} deleted successfully`);
    }
  };

  // Sub-component for handling responsive actions
  const OrderActions = ({ order }) => (
    <>
      {/* Desktop Actions: Visible on medium screens and up */}
      <div className="hidden md:flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={() => handleViewOrder(order.id)} title="View Order">
          <Eye className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => handleUpdateOrder(order.id)} title="Update Order">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => handleDeleteOrder(order.id)} title="Delete Order" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Mobile Actions: Dropdown menu visible on small screens */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleViewOrder(order.id)}>
              <Eye className="w-4 h-4 mr-2" /> View Order
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdateOrder(order.id)}>
              <Edit className="w-4 h-4 mr-2" /> Update Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDeleteOrder(order.id)} className="text-red-600 focus:text-red-600">
              <Trash2 className="w-4 h-4 mr-2" /> Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );

  const OrderList = ({ orders }) => (
    <div className="space-y-4">
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-muted-foreground font-medium">No orders found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        orders.map((order) => (
          // Responsive Order Card
          <div key={order.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Main Info Section */}
            <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
              {/* Left Side: ID, Customer, and Products */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">{order.id}</h3>
                    <div className="md:hidden">{getStatusBadge(order.status)}</div>
                </div>
                <p className="text-sm text-muted-foreground">{order.customer}</p>
                <div className="mt-2 md:hidden">
                    <p className="text-sm text-foreground truncate">{order.products.join(", ")}</p>
                    <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                </div>
                <div className="hidden md:block mt-1">
                    <p className="text-sm text-foreground">{order.products.join(", ")}</p>
                    <p className="text-xs text-muted-foreground">{order.items} item(s)</p>
                </div>
              </div>

              {/* Right Side: Total, Date, and Status */}
              <div className="flex items-center justify-between md:justify-end md:gap-6 mt-2 md:mt-0">
                <div className="text-left md:text-right">
                    <p className="font-medium text-foreground">₦{order.total.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <div className="hidden md:block">{getStatusBadge(order.status)}</div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex justify-end md:justify-start border-t md:border-t-0 pt-3 md:pt-0 -mb-2 md:mb-0 -mx-2 md:mx-0">
                <OrderActions order={order} />
            </div>
          </div>
        ))
      )}
    </div>
  );

  // Derive filtered orders once
  const filteredOrders = filterOrders(allOrders, activeTab);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">Order Management</h1>
            <p className="text-muted-foreground">Track and manage all your store orders.</p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Orders
            </Button>
          </div>
        </div>

        {/* Order Stats - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Card components remain the same */}
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold text-foreground mb-1">{orderStats.pending}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold text-foreground mb-1">{orderStats.processing}</div>
              <div className="text-sm text-muted-foreground">Processing</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold text-foreground mb-1">{orderStats.shipped}</div>
              <div className="text-sm text-muted-foreground">Shipped</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold text-foreground mb-1">{orderStats.delivered}</div>
              <div className="text-sm text-muted-foreground">Delivered</div>
            </CardContent>
          </Card>
          <Card className='col-span-2 sm:col-span-1'>
            <CardContent className="p-4 sm:p-6 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold text-foreground mb-1">{orderStats.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search orders by ID, customer, or product..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="flex-1 md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className='flex-shrink-0'>
                  <Filter className="w-4 h-4 mr-0 sm:mr-2" />
                  <span className='hidden sm:inline'>More Filters</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders with Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>All Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Responsive, scrollable Tabs */}
              <div className="overflow-x-auto pb-2">
                <TabsList>
                  <TabsTrigger value="all">All ({allOrders.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({orderStats.pending})</TabsTrigger>
                  <TabsTrigger value="processing">Processing ({orderStats.processing})</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped ({orderStats.shipped})</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered ({orderStats.delivered})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({orderStats.cancelled})</TabsTrigger>
                </TabsList>
              </div>
              {/* Use a single TabsContent and render the list based on the filtered data */}
              <TabsContent value={activeTab} className="mt-6">
                 <OrderList orders={filteredOrders} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorOrderManagement;