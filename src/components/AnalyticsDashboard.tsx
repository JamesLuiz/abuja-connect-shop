import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Users,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AnalyticsData {
  period: string;
  totalArticles: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  totalReposts: number;
  totalEngagement: number;
  engagementRate: number;
  topArticles: Array<{
    _id: string;
    title: string;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    trendingScore: number;
  }>;
  averageViews: number;
  averageEngagement: number;
}

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [selectedPeriod]);

  const fetchAnalytics = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/analytics/author?period=${selectedPeriod}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Analytics Data</h3>
        <p className="text-muted-foreground">Start creating content to see your analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your content performance</p>
        </div>
        
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalViews)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Likes</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalLikes)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Comments</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalComments)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Share2 className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Shares</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.totalShares)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Engagement Rate</p>
                <p className="text-2xl font-bold">{analytics.engagementRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Views/Article</p>
                <p className="text-2xl font-bold">{formatNumber(analytics.averageViews)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-bold">{analytics.totalArticles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Top Performing Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.topArticles.map((article, index) => (
              <div key={article._id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold line-clamp-1">{article.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{formatNumber(article.views)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{formatNumber(article.likes)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{formatNumber(article.comments)}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Share2 className="h-3 w-3" />
                        <span>{formatNumber(article.shares)}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">
                  Score: {Math.round(article.trendingScore)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Engagement</span>
              <span className="font-semibold">{formatNumber(analytics.totalEngagement)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Engagement/Article</span>
              <span className="font-semibold">{formatNumber(analytics.averageEngagement)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Reposts</span>
              <span className="font-semibold">{formatNumber(analytics.totalReposts)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Period Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Period</span>
              <Badge variant="outline">{analytics.period}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Articles Published</span>
              <span className="font-semibold">{analytics.totalArticles}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Reach</span>
              <span className="font-semibold">{formatNumber(analytics.totalViews)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
