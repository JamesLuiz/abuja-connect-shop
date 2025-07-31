import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  TrendingUp,
  ArrowRight,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Business Tips', 'E-commerce', 'Technology', 'Marketing', 'Success Stories'];

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

  const trendingTopics = [
    "E-commerce Growth",
    "Digital Marketing",
    "Mobile Commerce",
    "Customer Retention",
    "Vendor Success"
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
            {/* Featured Posts */}
            {selectedCategory === 'All' && searchQuery === '' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
                      <div className="aspect-video bg-secondary/30 relative">
                        <Badge className="absolute top-3 left-3 bg-primary">Featured</Badge>
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="outline" className="mb-3">{post.category}</Badge>
                        <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.publishDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={post.authorImage} />
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="group">
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Regular Posts */}
            <section>
              <h2 className="text-2xl font-bold mb-6">
                {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground">Try adjusting your search terms or category filter.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {(selectedCategory === 'All' && searchQuery === '' ? regularPosts : filteredPosts).map((post) => (
                    <Card key={post.id} className="hover:shadow-elegant transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-48 aspect-video md:aspect-square bg-secondary/30"></div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <Badge variant="outline">{post.category}</Badge>
                            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <Eye className="h-4 w-4 mr-1" />
                                {post.views}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                {post.comments}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                          <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={post.authorImage} />
                                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <span>{post.author}</span>
                              </div>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.publishDate).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="group">
                                Read More
                                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
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
                    {trendingTopics.map((topic, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left p-2 h-auto"
                      >
                        #{topic}
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