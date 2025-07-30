import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Send, 
  Bot, 
  Clock, 
  CheckCircle,
  User,
  HelpCircle,
  Book,
  Video,
  Download
} from 'lucide-react';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      faqs: [
        { question: 'How do I create my first store?', answer: 'Follow our step-by-step store setup guide to get started...' },
        { question: 'What documents do I need for verification?', answer: 'You need a valid ID, business registration certificate...' },
        { question: 'How long does verification take?', answer: 'Verification typically takes 24-48 hours...' }
      ]
    },
    {
      title: 'Order Management',
      icon: CheckCircle,
      faqs: [
        { question: 'How do I track my orders?', answer: 'You can track orders from your dashboard...' },
        { question: 'What payment methods are accepted?', answer: 'We accept cards, bank transfers, and mobile money...' },
        { question: 'How do I process refunds?', answer: 'Refunds can be processed through the order management section...' }
      ]
    },
    {
      title: 'Technical Support',
      icon: HelpCircle,
      faqs: [
        { question: 'Why is my store not loading?', answer: 'Check your internet connection and try refreshing...' },
        { question: 'How do I upload product images?', answer: 'Use the product upload section with drag and drop...' },
        { question: 'Can I customize my store theme?', answer: 'Yes, you can customize themes in store settings...' }
      ]
    }
  ];

  const chatMessages = [
    { type: 'bot', message: 'Hello! How can I help you today?', time: '2:30 PM' },
    { type: 'user', message: 'I need help setting up my store', time: '2:31 PM' },
    { type: 'bot', message: 'I\'d be happy to help! Let me guide you through the store setup process...', time: '2:31 PM' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Help & Support Center
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Get the help you need to succeed on Abuja E-Mall
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for help articles, guides, or ask a question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-base"
              />
            </div>
          </div>

          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="chat">AI Assistant</TabsTrigger>
              <TabsTrigger value="contact">Contact Support</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* FAQ Section */}
            <TabsContent value="faq">
              <div className="grid gap-6">
                {faqCategories.map((category, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <category.icon className="h-6 w-6 text-primary" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-b border-border pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                          <p className="text-muted-foreground text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* AI Assistant Chat */}
            <TabsContent value="chat">
              <Card className="h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Bot className="h-6 w-6 text-primary" />
                    AI Assistant
                    <Badge variant="secondary" className="bg-green-100 text-green-700">Online</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-muted/20 rounded-lg">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-background border border-border'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Support */}
            <TabsContent value="contact">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <MessageCircle className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Live Chat</h4>
                        <p className="text-sm text-muted-foreground">Available 24/7</p>
                        <Badge variant="outline" className="mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Average response: 2 mins
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Phone className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Phone Support</h4>
                        <p className="text-sm text-muted-foreground">+234 800 MALL (6255)</p>
                        <Badge variant="outline" className="mt-1">
                          Mon-Fri 8AM-6PM WAT
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <Mail className="h-8 w-8 text-primary" />
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-sm text-muted-foreground">support@abujaemall.com</p>
                        <Badge variant="outline" className="mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          Response within 2 hours
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support Ticket Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Submit a Support Ticket</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <select className="w-full p-2 border border-border rounded-md bg-background">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Urgent</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select className="w-full p-2 border border-border rounded-md bg-background">
                        <option>Technical Issue</option>
                        <option>Account Problem</option>
                        <option>Payment Issue</option>
                        <option>Order Problem</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Describe your issue</Label>
                      <Textarea
                        id="message"
                        placeholder="Please provide as much detail as possible..."
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button className="w-full">
                      Submit Ticket
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Resources */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Video className="h-6 w-6 text-primary" />
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Step-by-step video guides for all platform features
                    </p>
                    <Button variant="outline" className="w-full">
                      Watch Tutorials
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Book className="h-6 w-6 text-primary" />
                      Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive guides and API documentation
                    </p>
                    <Button variant="outline" className="w-full">
                      Read Docs
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Download className="h-6 w-6 text-primary" />
                      Downloads
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Mobile apps, logos, and marketing materials
                    </p>
                    <Button variant="outline" className="w-full">
                      Download Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpSupport;