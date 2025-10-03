import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  Users,
  Star,
  AlertCircle,
  Eye,
  Heart,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    trend: 'up' | 'down';
    data: Array<{ month: string; revenue: number; orders: number }>;
  };
  products: {
    total: number;
    lowStock: number;
    outOfStock: number;
    topPerforming: Array<{ name: string; sales: number; revenue: number }>;
  };
  customers: {
    total: number;
    new: number;
    returning: number;
    satisfaction: number;
  };
  performance: {
    views: number;
    clicks: number;
    conversions: number;
    rating: number;
  };
}

const VendorAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    loadAnalyticsData();
  }, [timeRange]);

  const loadAnalyticsData = async () => {
    setLoading(true);
    
    // Mock data - in real app, this would come from API
    setTimeout(() => {
      const mockData: AnalyticsData = {
        revenue: {
          current: 245000,
          previous: 198000,
          trend: 'up',
          data: [
            { month: 'Jan', revenue: 180000, orders: 120 },
            { month: 'Feb', revenue: 195000, orders: 145 },
            { month: 'Mar', revenue: 210000, orders: 160 },
            { month: 'Apr', revenue: 225000, orders: 175 },
            { month: 'May', revenue: 245000, orders: 190 }
          ]
        },
        products: {
          total: 156,
          lowStock: 12,
          outOfStock: 3,
          topPerforming: [
            { name: 'iPhone 15 Pro', sales: 45, revenue: 67500 },
            { name: 'Samsung Galaxy S24', sales: 38, revenue: 52000 },
            { name: 'MacBook Air M3', sales: 22, revenue: 48000 },
            { name: 'AirPods Pro', sales: 67, revenue: 33500 }
          ]
        },
        customers: {
          total: 1234,
          new: 89,
          returning: 145,
          satisfaction: 4.8
        },
        performance: {
          views: 15420,
          clicks: 2340,
          conversions: 234,
          rating: 4.7
        }
      };
      
      setAnalyticsData(mockData);
      setLoading(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => `₦${amount.toLocaleString()}`;

  const calculatePercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return Math.round(change * 10) / 10;
  };

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  if (loading || !analyticsData) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const revenueChange = calculatePercentageChange(analyticsData.revenue.current, analyticsData.revenue.previous);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">{formatCurrency(analyticsData.revenue.current)}</p>
              </div>
              <div className={`flex items-center space-x-1 ${revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {revenueChange >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm font-medium">{Math.abs(revenueChange)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{analyticsData.products.total}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            {analyticsData.products.lowStock > 0 && (
              <div className="mt-2 flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-muted-foreground">
                  {analyticsData.products.lowStock} low stock
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{analyticsData.customers.total}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="mt-2 flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{analyticsData.customers.new} new</span>
              <span>{analyticsData.customers.returning} returning</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Store Rating</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{analyticsData.performance.rating}</p>
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-lg font-semibold">{analyticsData.customers.satisfaction}/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.revenue.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₦${value / 1000}k`} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Revenue']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.products.topPerforming.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(product.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Stock</span>
                    <span className="font-medium">
                      {analyticsData.products.total - analyticsData.products.lowStock - analyticsData.products.outOfStock}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-yellow-600">Low Stock</span>
                    <span className="font-medium">{analyticsData.products.lowStock}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600">Out of Stock</span>
                    <span className="font-medium">{analyticsData.products.outOfStock}</span>
                  </div>
                  <Progress 
                    value={((analyticsData.products.total - analyticsData.products.outOfStock) / analyticsData.products.total) * 100}
                    className="mt-4"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Store Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Views</span>
                    </div>
                    <span className="font-semibold">{analyticsData.performance.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Clicks</span>
                    </div>
                    <span className="font-semibold">{analyticsData.performance.clicks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Conversions</span>
                    </div>
                    <span className="font-semibold">{analyticsData.performance.conversions}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion Rate</span>
                      <span>{((analyticsData.performance.conversions / analyticsData.performance.clicks) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={(analyticsData.performance.conversions / analyticsData.performance.clicks) * 100}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'New Customers', value: analyticsData.customers.new },
                          { name: 'Returning Customers', value: analyticsData.customers.returning },
                          { name: 'Inactive', value: analyticsData.customers.total - analyticsData.customers.new - analyticsData.customers.returning }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorAnalytics;