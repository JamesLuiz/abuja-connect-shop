import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SocialBlogCard from '@/components/SocialBlogCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  TrendingUp,
  ArrowRight,
  Eye,
  MessageCircle,
  Share2,
  Home,
  Sparkles,
  Users
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Blog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [articles, setArticles] = useState([]);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [userTimeline, setUserTimeline] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const categories = ['All', 'Business Tips', 'E-commerce', 'Technology', 'Marketing', 'Success Stories'];

  // Fetch data from API
  useEffect(() => {
    fetchArticles();
    fetchTrendingArticles();
    fetchTrendingTopics();
    if (user) {
      fetchUserTimeline();
    }
  }, [user]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingArticles = async () => {
    try {
      const response = await fetch('/api/blog/trending?limit=5');
      if (response.ok) {
        const data = await response.json();
        setTrendingArticles(data);
      }
    } catch (error) {
      console.error('Failed to fetch trending articles:', error);
    }
  };

  const fetchUserTimeline = async () => {
    try {
      const response = await fetch('/api/blog/timeline', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserTimeline(data);
      }
    } catch (error) {
      console.error('Failed to fetch timeline:', error);
    }
  };

  const fetchTrendingTopics = async () => {
    try {
      const response = await fetch('/api/blog/topics/trending?limit=10');
      if (response.ok) {
        const data = await response.json();
        setTrendingTopics(data);
      }
    } catch (error) {
      console.error('Failed to fetch trending topics:', error);
    }
  };

  const handleLike = (articleId: string) => {
    // Update local state optimistically
    setArticles(prev => prev.map(article => 
      article._id === articleId 
        ? { ...article, likes: article.likes.includes(user?._id) 
            ? article.likes.filter(id => id !== user._id)
            : [...article.likes, user._id]
          }
        : article
    ));
  };

  const handleComment = (articleId: string, content: string) => {
    // Update local state optimistically
    setArticles(prev => prev.map(article => 
      article._id === articleId 
        ? { ...article, comments: [...article.comments, { 
            _id: Date.now().toString(),
            userId: user._id,
            content,
            createdAt: new Date().toISOString(),
            likes: []
          }]
          }
        : article
    ));
  };

  const handleRepost = (articleId: string) => {
    // Update local state optimistically
    setArticles(prev => prev.map(article => 
      article._id === articleId 
        ? { ...article, reposts: [...article.reposts, {
            _id: Date.now().toString(),
            userId: user._id,
            createdAt: new Date().toISOString()
          }]
          }
        : article
    ));
  };

  const handleShare = (articleId: string) => {
    // Update local state optimistically
    setArticles(prev => prev.map(article => 
      article._id === articleId 
        ? { ...article, shares: [...article.shares, user._id] }
        : article
    ));
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Tips for New Vendors on Abuja E-Mall",
      excerpt: "Starting your journey as a vendor? Here's everything you need to know to succeed on our platform...",
      content: "Complete guide covering store setup, product photography, pricing strategies, and customer service best practices.",
      author: "Sarah Adebayo",
      authorImage: "/placeholder.svg",
      category: "Business Tips",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      views: 1245,
      comments: 23,
      featured: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "The Rise of E-commerce in Nigeria: Market Insights 2024",
      excerpt: "Exploring the explosive growth of online shopping in Nigeria and what it means for local businesses...",
      content: "In-depth analysis of Nigerian e-commerce trends, consumer behavior, and future opportunities.",
      author: "Ahmed Musa",
      authorImage: "/placeholder.svg",
      category: "E-commerce",
      publishDate: "2024-01-12",
      readTime: "8 min read",
      views: 2156,
      comments: 45,
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "How to Optimize Your Product Photos for Better Sales",
      excerpt: "Professional photography tips that can increase your conversion rates by up to 40%...",
      content: "Step-by-step guide to taking stunning product photos using just your smartphone and basic lighting.",
      author: "Grace Okafor",
      authorImage: "/placeholder.svg",
      category: "Marketing",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      views: 897,
      comments: 18,
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Success Story: From Local Shop to National Brand",
      excerpt: "Meet Fatima Ibrahim, who grew her small Abuja boutique into a nationwide fashion empire through our platform...",
      content: "Inspiring journey of transformation from traditional retail to digital success.",
      author: "Michael Johnson",
      authorImage: "/placeholder.svg",
      category: "Success Stories",
      publishDate: "2024-01-08",
      readTime: "7 min read",
      views: 3421,
      comments: 67,
      featured: true,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Understanding Digital Payment Systems in Nigeria",
      excerpt: "A comprehensive guide to integrating and optimizing payment options for your online store...",
      content: "Everything you need to know about Paystack, Flutterwave, and other payment processors.",
      author: "David Ogun",
      authorImage: "/placeholder.svg",
      category: "Technology",
      publishDate: "2024-01-05",
      readTime: "10 min read",
      views: 1678,
      comments: 34,
      featured: false,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Building Customer Trust in the Digital Age",
      excerpt: "Learn how to establish credibility and build lasting relationships with your online customers...",
      content: "Practical strategies for gaining customer trust through transparency, quality service, and communication.",
      author: "Blessing Ogbonna",
      authorImage: "/placeholder.svg",
      category: "Business Tips",
      publishDate: "2024-01-03",
      readTime: "4 min read",
      views: 934,
      comments: 12,
      featured: false,
      image: "/placeholder.svg"
    }
  ];

  

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Abuja E-Mall <span className="bg-gradient-primary bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Insights, tips, and stories to help you succeed in the digital marketplace
            </p>
            
            <div className="flex justify-center mb-8">
              <Button size="lg" className="group" onClick={() => navigate('/blog/publish')}>
                Publish Your Article
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>All</span>
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Trending</span>
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>AI</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-6">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-full"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                {/* Articles */}
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="mt-2 text-muted-foreground">Loading articles...</p>
                    </div>
                  ) : articles.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                      <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
                    </div>
                  ) : (
                    articles.map((article) => (
                      <SocialBlogCard
                        key={article._id}
                        article={article}
                        onLike={handleLike}
                        onComment={handleComment}
                        onRepost={handleRepost}
                        onShare={handleShare}
                      />
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="trending" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                  Trending Articles
                </h2>
                <div className="space-y-6">
                  {trendingArticles.map((article) => (
                    <SocialBlogCard
                      key={article._id}
                      article={article}
                      onLike={handleLike}
                      onComment={handleComment}
                      onRepost={handleRepost}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Your Timeline
                </h2>
                {user ? (
                  <div className="space-y-6">
                    {userTimeline.map((article) => (
                      <SocialBlogCard
                        key={article._id}
                        article={article}
                        onLike={handleLike}
                        onComment={handleComment}
                        onRepost={handleRepost}
                        onShare={handleShare}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Login Required</h3>
                    <p className="text-muted-foreground mb-4">Sign in to see your personalized timeline.</p>
                    <Button onClick={() => navigate('/login')}>Sign In</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="ai" className="space-y-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Sparkles className="h-6 w-6 mr-2 text-primary" />
                  AI-Powered Content
                </h2>
                <div className="text-center py-12">
                  <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">AI Content Assistant</h3>
                  <p className="text-muted-foreground mb-4">Get AI-powered suggestions for your articles.</p>
                  <Button onClick={() => navigate('/blog/publish')}>
                    Create with AI
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Trending Topics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {(trendingTopics && trendingTopics.length > 0 ? trendingTopics : defaultTrendingTopics).map((topic, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto"
                      >
                        #{topic._id} ({topic.count})
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle>Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get the latest insights and tips delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input type="email" placeholder="Enter your email" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular This Week</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 3).map((post, index) => (
                      <div key={post.id} className="flex space-x-3">
                        <div className="w-12 h-12 bg-secondary/30 rounded flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 mb-1">{post.title}</h4>
                          <p className="text-xs text-muted-foreground">{post.readTime}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;