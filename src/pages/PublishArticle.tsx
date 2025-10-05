import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AIBlogEditor from '@/components/AIBlogEditor';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  XCircle,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const PublishArticle = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    email: '',
    category: '',
    excerpt: '',
    content: '',
    tags: []
  });
  const [articleFile, setArticleFile] = useState<File | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'passed' | 'failed'>('pending');

  const categories = ['Business Tips', 'E-commerce', 'Technology', 'Marketing', 'Success Stories'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, DOC, DOCX, or TXT file.",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        return;
      }
      
      setArticleFile(file);
    }
  };

  const runAIReview = async () => {
    setIsReviewing(true);
    setReviewStatus('pending');
    
    // Simulate AI review process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI review result (80% chance of passing)
    const passed = Math.random() > 0.2;
    setReviewStatus(passed ? 'passed' : 'failed');
    setIsReviewing(false);
    
    if (passed) {
      toast({
        title: "AI Review Passed",
        description: "Your article meets our quality standards and is ready for submission.",
      });
    } else {
      toast({
        title: "AI Review Failed",
        description: "Your article needs improvement. Please check the feedback and revise.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!articleFile) {
      toast({
        title: "Missing article",
        description: "Please upload your article file.",
        variant: "destructive",
      });
      return;
    }
    
    if (reviewStatus !== 'passed') {
      toast({
        title: "Review required",
        description: "Please run AI review and ensure it passes before submitting.",
        variant: "destructive",
      });
      return;
    }

    // Simulate article upload
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Article Successfully Uploaded!",
        description: "Your article has been submitted and will be published after final review.",
      });
      
      navigate('/blog');
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Sorry we can't upload your article at this time. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
            <h1 className="text-4xl font-bold mb-4">
              Publish Your <span className="bg-gradient-primary bg-clip-text text-transparent">Article</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Share your expertise and insights with the Abuja E-Mall community
            </p>
            
            <div className="flex items-center space-x-2 mt-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                AI-powered content creation and optimization
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Author Information */}
            <Card>
              <CardHeader>
                <CardTitle>Author Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author">Author Name *</Label>
                    <Input
                      id="author"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Article Details */}
            <Card>
              <CardHeader>
                <CardTitle>Article Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Article Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a compelling title for your article"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-background"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e-commerce, tips, business"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Article Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Write a brief summary of your article (2-3 sentences)"
                    rows={3}
                    required
                  />
                </div>

                {/* AI-Powered Content Editor */}
                <div>
                  <Label>Article Content with AI Assistant</Label>
                  <AIBlogEditor
                    onContentChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
                    onTitleChange={(title) => setFormData(prev => ({ ...prev, title }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Article File Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Upload Your Article</p>
                    <p className="text-sm text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="article-upload"
                  />
                  <Label htmlFor="article-upload" className="mt-4 inline-block">
                    <Button type="button" variant="outline" className="cursor-pointer">
                      <FileText className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                  </Label>
                  {articleFile && (
                    <div className="mt-4 p-3 bg-secondary/30 rounded-lg">
                      <p className="text-sm font-medium">{articleFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(articleFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Review */}
            <Card>
              <CardHeader>
                <CardTitle>AI Quality Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Our AI will review your article for quality, originality, and adherence to our content guidelines.
                  </p>
                  
                  <Button
                    type="button"
                    onClick={runAIReview}
                    disabled={!articleFile || isReviewing}
                    variant="outline"
                    className="w-full"
                  >
                    {isReviewing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Reviewing Article...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Run AI Review
                      </>
                    )}
                  </Button>

                  {reviewStatus !== 'pending' && (
                    <div className={`p-4 rounded-lg ${
                      reviewStatus === 'passed' 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-center">
                        {reviewStatus === 'passed' ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <span className={`font-medium ${
                          reviewStatus === 'passed' ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {reviewStatus === 'passed' ? 'Review Passed' : 'Review Failed'}
                        </span>
                      </div>
                      <p className={`mt-2 text-sm ${
                        reviewStatus === 'passed' ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {reviewStatus === 'passed' 
                          ? 'Your article meets our quality standards and is ready for publication.'
                          : 'Please improve content quality, check for plagiarism, and ensure proper formatting.'
                        }
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/blog')}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={reviewStatus !== 'passed'}
                className="group"
              >
                Upload Article
                <ArrowLeft className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform rotate-180" />
              </Button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PublishArticle;