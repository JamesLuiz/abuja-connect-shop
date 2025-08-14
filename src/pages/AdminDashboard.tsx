import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Pie,
  Cell, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  AlertTriangle,
  UserMinus,
  Eye,
  Clock,
  Server,
  Wifi,
  Database,
  Flag,
  Ban,
  MessageSquare,
  FileText,
  Shield,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Star,
  MoreHorizontal
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);

  // Mock data for demonstration
  const salesData = [
    { month: "Jan", sales: 45000, orders: 234 },
    { month: "Feb", sales: 52000, orders: 267 },
    { month: "Mar", sales: 48000, orders: 245 },
    { month: "Apr", sales: 61000, orders: 312 },
    { month: "May", sales: 55000, orders: 289 },
    { month: "Jun", sales: 67000, orders: 342 }
  ];

  const trafficData = [
    { hour: "00:00", visitors: 1200 },
    { hour: "06:00", visitors: 2400 },
    { hour: "12:00", visitors: 4800 },
    { hour: "18:00", visitors: 3600 },
    { hour: "24:00", visitors: 1800 }
  ];

  const vendorCategories = [
    { name: "Electronics", value: 35, color: "hsl(var(--primary))" },
    { name: "Fashion", value: 25, color: "hsl(var(--secondary))" },
    { name: "Home & Garden", value: 20, color: "hsl(var(--accent))" },
    { name: "Sports", value: 12, color: "hsl(var(--muted))" },
    { name: "Others", value: 8, color: "hsl(var(--destructive))" }
  ];

  const vendors = [
    { id: 1, name: "TechHub Nigeria", status: "active", sales: "₦2.4M", orders: 156 },
    { id: 2, name: "Fashion Forward", status: "active", sales: "₦1.8M", orders: 89 },
    { id: 3, name: "Home Essentials", status: "suspended", sales: "₦956K", orders: 43 },
    { id: 4, name: "Sports Zone", status: "active", sales: "₦1.2M", orders: 67 }
  ];

  const systemHealth = {
    server: { status: "healthy", uptime: "99.9%", response: "45ms" },
    database: { status: "healthy", connections: 24, queries: 1250 },
    network: { status: "healthy", bandwidth: "850Mbps", latency: "12ms" }
  };

  // Mock data for users
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", status: "active", orders: 23, joined: "2024-01-15", location: "Abuja", phone: "+234 901 234 5678" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "flagged", orders: 12, joined: "2024-02-10", location: "Lagos", phone: "+234 802 345 6789" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", status: "banned", orders: 5, joined: "2024-03-05", location: "Kano", phone: "+234 703 456 7890" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", status: "active", orders: 45, joined: "2023-12-20", location: "Abuja", phone: "+234 805 567 8901" }
  ];

  // Mock data for disputes
  const disputes = [
    { id: 1, orderId: "ORD-2024-001", buyer: "John Doe", vendor: "TechHub Nigeria", amount: "₦25,000", status: "pending", type: "refund", created: "2024-01-20", description: "Product not as described" },
    { id: 2, orderId: "ORD-2024-002", buyer: "Jane Smith", vendor: "Fashion Forward", amount: "₦15,000", status: "resolved", type: "quality", created: "2024-01-18", description: "Wrong size delivered" },
    { id: 3, orderId: "ORD-2024-003", buyer: "Mike Johnson", vendor: "Home Essentials", amount: "₦8,500", status: "escalated", type: "delivery", created: "2024-01-22", description: "Item never arrived" },
    { id: 4, orderId: "ORD-2024-004", buyer: "Sarah Wilson", vendor: "Sports Zone", amount: "₦12,000", status: "pending", type: "damage", created: "2024-01-21", description: "Package damaged during shipping" }
  ];

  const handleDeleteVendor = (vendorId: number) => {
    console.log(`Deleting vendor ${vendorId}`);
    // Implement actual deletion logic
  };

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user ${userId}`);
    // Implement user action logic
  };

  const handleDisputeAction = (disputeId: number, action: string) => {
    console.log(`${action} dispute ${disputeId}`);
    // Implement dispute action logic
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Abuja E-mall Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and manage your e-commerce platform</p>
          </div>
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Activity className="w-4 h-4 mr-1" />
            System Healthy
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₦45.2M</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,389</div>
              <p className="text-xs text-muted-foreground">+15.3% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">347</div>
              <p className="text-xs text-muted-foreground">+12 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24%</div>
              <p className="text-xs text-muted-foreground">+0.3% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="disputes">Disputes</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
          </TabsList>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Monthly sales and order trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vendor Categories</CardTitle>
                  <CardDescription>Distribution of vendors by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={vendorCategories}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {vendorCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Vendors Tab */}
          <TabsContent value="vendors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription>Manage vendors and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search vendors..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Vendor Name</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Total Sales</th>
                          <th className="text-left p-2">Orders</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vendors.map((vendor) => (
                          <tr key={vendor.id} className="border-b">
                            <td className="p-2">{vendor.name}</td>
                            <td className="p-2">
                              <Badge 
                                variant={vendor.status === "active" ? "default" : "destructive"}
                              >
                                {vendor.status}
                              </Badge>
                            </td>
                            <td className="p-2">{vendor.sales}</td>
                            <td className="p-2">{vendor.orders}</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <UserMinus className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete {vendor.name}? This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDeleteVendor(vendor.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and monitor activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search users..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">User</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Orders</th>
                          <th className="text-left p-2">Location</th>
                          <th className="text-left p-2">Joined</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {user.email}
                                </div>
                                <div className="text-sm text-muted-foreground flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {user.phone}
                                </div>
                              </div>
                            </td>
                            <td className="p-2">
                              <Badge 
                                variant={
                                  user.status === "active" ? "default" : 
                                  user.status === "flagged" ? "secondary" : "destructive"
                                }
                              >
                                {user.status}
                              </Badge>
                            </td>
                            <td className="p-2">{user.orders}</td>
                            <td className="p-2">
                              <div className="flex items-center text-sm">
                                <MapPin className="w-3 h-3 mr-1" />
                                {user.location}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center text-sm">
                                <Calendar className="w-3 h-3 mr-1" />
                                {user.joined}
                              </div>
                            </td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleUserAction(user.id, "view")}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="secondary" size="sm" onClick={() => handleUserAction(user.id, "flag")}>
                                  <Flag className="w-4 h-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <Ban className="w-4 h-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Ban User</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to ban {user.name}? This will suspend their account access.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleUserAction(user.id, "ban")}>
                                        Ban User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disputes Tab */}
          <TabsContent value="disputes" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Disputes</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">23</div>
                  <p className="text-xs text-muted-foreground">Needs attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolved</CardTitle>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">18</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Escalated</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">6</div>
                  <p className="text-xs text-muted-foreground">High priority</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Dispute Management</CardTitle>
                <CardDescription>Handle customer disputes and resolutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search disputes..." className="max-w-sm" />
                    <Button variant="outline">Search</Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-border">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Order ID</th>
                          <th className="text-left p-2">Parties</th>
                          <th className="text-left p-2">Type</th>
                          <th className="text-left p-2">Amount</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Created</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {disputes.map((dispute) => (
                          <tr key={dispute.id} className="border-b">
                            <td className="p-2">
                              <div className="font-medium">{dispute.orderId}</div>
                              <div className="text-xs text-muted-foreground">{dispute.description}</div>
                            </td>
                            <td className="p-2">
                              <div className="text-sm">
                                <div>Buyer: {dispute.buyer}</div>
                                <div>Vendor: {dispute.vendor}</div>
                              </div>
                            </td>
                            <td className="p-2">
                              <Badge variant="outline">{dispute.type}</Badge>
                            </td>
                            <td className="p-2 font-medium">{dispute.amount}</td>
                            <td className="p-2">
                              <Badge 
                                variant={
                                  dispute.status === "resolved" ? "default" : 
                                  dispute.status === "escalated" ? "destructive" : "secondary"
                                }
                              >
                                {dispute.status}
                              </Badge>
                            </td>
                            <td className="p-2 text-sm">{dispute.created}</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm" onClick={() => handleDisputeAction(dispute.id, "view")}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {dispute.status === "pending" && (
                                  <>
                                    <Button variant="default" size="sm" onClick={() => handleDisputeAction(dispute.id, "resolve")}>
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDisputeAction(dispute.id, "escalate")}>
                                      <AlertTriangle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Management</CardTitle>
                <CardDescription>Track and manage sales performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="orders" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">97.8%</div>
                  <p className="text-sm text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Failed Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">2.2%</div>
                  <p className="text-sm text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">₦18,950</div>
                  <p className="text-sm text-muted-foreground">+5.2% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Traffic Tab */}
          <TabsContent value="traffic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Analytics</CardTitle>
                <CardDescription>Monitor website traffic and user behavior</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Server Health</CardTitle>
                  <Server className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">Uptime: {systemHealth.server.uptime}</p>
                  <p className="text-xs text-muted-foreground">Response: {systemHealth.server.response}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Database</CardTitle>
                  <Database className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">Connections: {systemHealth.database.connections}</p>
                  <p className="text-xs text-muted-foreground">Queries: {systemHealth.database.queries}/min</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network</CardTitle>
                  <Wifi className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">Healthy</div>
                  <p className="text-xs text-muted-foreground">Bandwidth: {systemHealth.network.bandwidth}</p>
                  <p className="text-xs text-muted-foreground">Latency: {systemHealth.network.latency}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;