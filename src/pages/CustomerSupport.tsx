import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuickActions from '@/components/ui/QuickActions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  HelpCircle,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { useState } from 'react';

const CustomerSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner and follow the registration process."
        },
        {
          question: "Is it free to use Abuja E-Mall?",
          answer: "Yes, browsing and purchasing is completely free. Vendors have different pricing plans."
        },
        {
          question: "How do I find products?",
          answer: "Use our search bar or browse by categories. You can also filter by location, price, and ratings."
        }
      ]
    },
    {
      category: "Orders & Payments",
      questions: [
        {
          question: "What payment methods are accepted?",
          answer: "We accept bank cards, bank transfers, Paystack, Flutterwave, and mobile money."
        },
        {
          question: "How can I track my order?",
          answer: "Visit the 'Orders' section in your profile or use the tracking link sent to your email."
        },
        {
          question: "What is your return policy?",
          answer: "Returns are handled by individual vendors. Check the vendor's return policy before purchasing."
        }
      ]
    },
    {
      category: "Vendor Support",
      questions: [
        {
          question: "How do I become a vendor?",
          answer: "Click 'Become a Vendor' and complete the registration process including business verification."
        },
        {
          question: "What are the vendor fees?",
          answer: "We offer a free starter plan and paid plans starting from ₦15,000/month with advanced features."
        },
        {
          question: "How do I manage my inventory?",
          answer: "Use the Vendor Dashboard to add, edit, and track your products and inventory levels."
        }
      ]
    }
  ];

  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      action: "Start Chat",
      status: "online"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our customer service",
      availability: "Mon-Fri, 8AM-6PM",
      action: "Call Now",
      status: "available"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and concerns",
      availability: "Response within 24hrs",
      action: "Send Email",
      status: "available"
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How can we <span className="bg-gradient-primary bg-clip-text text-transparent">help you?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Get the support you need to make the most of Abuja E-Mall
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get Immediate Help</h2>
          <QuickActions />
        </div>
      </section>

      {/* Support Channels */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <channel.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex justify-center mb-2">
                    <Badge 
                      variant={channel.status === 'online' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {channel.availability}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{channel.title}</h3>
                  <p className="text-muted-foreground mb-4">{channel.description}</p>
                  <Button className="w-full">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or browse all categories below.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl font-semibold mb-6 text-primary">{category.category}</h3>
                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => (
                      <Card key={faqIndex} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-lg flex items-center justify-between">
                            {faq.question}
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Still Need Help?</h2>
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="What's this about?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Describe your issue or question..." 
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomerSupport;