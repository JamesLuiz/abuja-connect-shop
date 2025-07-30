import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Download,
  BookOpen,
  Contact
} from 'lucide-react';

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: User,
      faqs: [
        { question: 'How do I create my first store?', answer: 'Follow our step-by-step store setup guide available in the Resources tab. It includes video tutorials and detailed documentation to get you started.' },
        { question: 'What documents do I need for verification?', answer: 'For vendor verification, you will need a valid government-issued ID (like a National ID, Driver\'s License, or Passport) and your business registration certificate from the Corporate Affairs Commission (CAC).' },
        { question: 'How long does verification take?', answer: 'Our team works to verify new accounts as quickly as possible. Typically, verification is completed within 24-48 business hours after you submit all required documents.' }
      ]
    },
    {
      title: 'Order Management',
      icon: CheckCircle,
      faqs: [
        { question: 'How do I track my orders?', answer: 'You can track all incoming and outgoing orders from the "Order Management" section in your vendor dashboard. Each order will have a real-time status.' },
        { question: 'What payment methods are accepted?', answer: 'We accept payments via debit/credit cards (Visa, Mastercard), direct bank transfers, and USSD, all processed securely through our payment partners.' },
        { question: 'How do I process refunds?', answer: 'Refunds can be initiated from the specific order\'s detail page in your dashboard. Please review our refund policy for eligibility and processing times.' }
      ]
    },
    {
      title: 'Technical Support',
      icon: HelpCircle,
      faqs: [
        { question: 'Why is my store not loading?', answer: 'First, check your internet connection. If the issue persists, try clearing your browser\'s cache. If it still doesn\'t load, please contact our technical support team by submitting a ticket.' },
        { question: 'How do I upload product images?', answer: 'In the "Add Product" page, you can drag and drop your images into the upload box or click to select files from your device. We recommend using high-quality images under 5MB.' },
        { question: 'Can I customize my store theme?', answer: 'Yes, basic customization options like changing your store banner, logo, and color scheme are available in the "Store Settings" section of your dashboard.' }
      ]
    }
  ];

  const chatMessages = [
    { type: 'bot', message: 'Hello! I am the Abuja E-Mall AI Assistant. How can I help you succeed today?', time: '2:30 PM' },
    { type: 'user', message: 'I need help setting up my shipping zones.', time: '2:31 PM' },
    { type: 'bot', message: 'Of course! To set up shipping zones, go to your Vendor Dashboard, click on "Settings", then "Shipping". There you can add different zones for locations like Lagos, Abuja, or "Rest of Nigeria" and set a specific shipping fee for each. Would you like a link to the guide?', time: '2:31 PM' }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      <main className="flex-grow pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Help & Support Center
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're here to help you succeed. Find answers, contact support, and explore resources.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for answers (e.g., 'how to add products')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base rounded-full"
              />
            </div>
          </div>

          <Tabs defaultValue="faq" className="w-full">
            {/* Responsive, scrollable TabsList */}
            <div className="w-full overflow-x-auto pb-1 mb-4 sm:mb-8">
              <TabsList className="w-full flex justify-between sm:justify-center"> {/* Changed to flex justify-between for mobile */}
                <TabsTrigger value="faq" className="flex-1 sm:flex-initial flex items-center gap-2 px-2 sm:px-4 text-center"><HelpCircle className="w-4 h-4" /><span className="hidden sm:inline">FAQ</span><span className="inline sm:hidden">FAQ</span></TabsTrigger> {/* Adjusted for mobile text */}
                <TabsTrigger value="chat" className="flex-1 sm:flex-initial flex items-center gap-2 px-2 sm:px-4 text-center"><Bot className="w-4 h-4" /><span className="hidden sm:inline">AI Assistant</span><span className="inline sm:hidden">AI</span></TabsTrigger> {/* Adjusted for mobile text */}
                <TabsTrigger value="contact" className="flex-1 sm:flex-initial flex items-center gap-2 px-2 sm:px-4 text-center"><Contact className="w-4 h-4" /><span className="hidden sm:inline">Contact Us</span><span className="inline sm:hidden">Contact</span></TabsTrigger> {/* Adjusted for mobile text */}
                <TabsTrigger value="resources" className="flex-1 sm:flex-initial flex items-center gap-2 px-2 sm:px-4 text-center"><BookOpen className="w-4 h-4" /><span className="hidden sm:inline">Resources</span><span className="inline sm:hidden">Docs</span></TabsTrigger> {/* Adjusted for mobile text */}
              </TabsList>
            </div>

            <div className="mt-4 sm:mt-8"> {/* Adjusted margin for mobile */}
              {/* FAQ Section with Accordion */}
              <TabsContent value="faq">
                {faqCategories.map((category, index) => (
                  <div key={index} className="mb-6 sm:mb-8"> {/* Adjusted margin */}
                    <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"> {/* Adjusted text size and gap */}
                      <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> {/* Adjusted icon size */}
                      {category.title}
                    </h2>
                    <Accordion type="single" collapsible className="w-full space-y-1 sm:space-y-2"> {/* Adjusted space-y */}
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem value={`item-${index}-${faqIndex}`} key={faqIndex} className="bg-muted/30 rounded-lg px-3 sm:px-4"> {/* Adjusted padding */}
                          <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-3 sm:py-4">{faq.question}</AccordionTrigger> {/* Adjusted text size and padding */}
                          <AccordionContent className="text-muted-foreground text-sm pb-3 sm:pb-4">{faq.answer}</AccordionContent> {/* Adjusted text size and padding */}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </TabsContent>

              {/* AI Assistant Chat */}
              <TabsContent value="chat">
                <Card className="h-[calc(100vh-200px)] sm:h-[600px] flex flex-col"> {/* Responsive height */}
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl"> {/* Adjusted title size */}
                      <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> AI Assistant
                      <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-xs sm:text-sm">Online</Badge> {/* Adjusted badge size */}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col p-3 sm:p-4"> {/* Adjusted padding */}
                    <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-3 sm:mb-4 p-2 sm:p-3 bg-muted/20 rounded-lg"> {/* Adjusted padding and spacing */}
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.type === 'bot' && <Bot className="h-5 w-5 text-muted-foreground shrink-0"/>} {/* Adjusted icon size */}
                          <div className={`max-w-[85%] p-2 sm:p-3 rounded-lg ${msg.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background border border-border rounded-bl-none'}`}>
                            <p className="text-sm sm:text-base">{msg.message}</p> {/* Adjusted text size */}
                            <span className="text-xs opacity-70 mt-1 block text-right">{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Type your message..."
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            className="flex-1 text-sm sm:text-base" // Adjusted text size
                        />
                        <Button className="px-3 sm:px-4 py-2 sm:py-2.5"> {/* Adjusted button padding */}
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Support */}
              <TabsContent value="contact">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"> {/* Changed to 1 column on mobile */}
                  <div className="space-y-4 sm:space-y-6"> {/* Adjusted spacing */}
                    <h2 className="text-xl sm:text-2xl font-semibold">Contact Methods</h2> {/* Adjusted text size */}
                    <Card><CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4"><Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" /><div><h4 className="font-medium text-base sm:text-lg">Phone Support</h4><p className="text-sm text-muted-foreground">+234 (09) 123 4567</p><Badge variant="outline" className="mt-1 text-xs sm:text-sm">Mon-Fri 8AM-6PM WAT</Badge></div></CardContent></Card> {/* Adjusted sizes */}
                    <Card><CardContent className="p-3 sm:p-4 flex items-start gap-3 sm:gap-4"><Mail className="h-6 w-6 sm:h-8 sm:w-8 text-primary shrink-0 mt-1" /><div><h4 className="font-medium text-base sm:text-lg">Email Support</h4><p className="text-sm text-muted-foreground">support@abujaemall.com</p><Badge variant="outline" className="mt-1 text-xs sm:text-sm"><Clock className="h-3 w-3 mr-1" />Response within 2 hours</Badge></div></CardContent></Card> {/* Adjusted sizes */}
                  </div>
                  <Card>
                    <CardHeader><CardTitle className="text-xl sm:text-2xl">Submit a Support Ticket</CardTitle><CardDescription className="text-sm sm:text-base">For specific issues, submitting a ticket is the best way to get help.</CardDescription></CardHeader> {/* Adjusted text sizes */}
                    <CardContent className="space-y-3 sm:space-y-4"> {/* Adjusted spacing */}
                      <div className="space-y-1"><Label htmlFor="subject" className="text-sm sm:text-base">Subject</Label><Input id="subject" placeholder="e.g., Issue with payout" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} className="text-sm sm:text-base" /></div> {/* Adjusted text size */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"> {/* Changed to 1 column on mobile */}
                        <div className="space-y-1"><Label htmlFor="priority" className="text-sm sm:text-base">Priority</Label><Select defaultValue="medium"><SelectTrigger className="text-sm sm:text-base"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent></Select></div> {/* Adjusted text size */}
                        <div className="space-y-1"><Label htmlFor="category" className="text-sm sm:text-base">Category</Label><Select defaultValue="technical"><SelectTrigger className="text-sm sm:text-base"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="technical">Technical Issue</SelectItem><SelectItem value="account">Account Problem</SelectItem><SelectItem value="payment">Payment Issue</SelectItem><SelectItem value="order">Order Problem</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div> {/* Adjusted text size */}
                      </div>
                      <div className="space-y-1"><Label htmlFor="message" className="text-sm sm:text-base">Describe your issue</Label><Textarea id="message" placeholder="Please provide as much detail as possible..." value={ticketMessage} onChange={(e) => setTicketMessage(e.target.value)} rows={4} className="text-sm sm:text-base" /></div> {/* Adjusted text size and rows */}
                      <Button className="w-full text-sm sm:text-base py-2 sm:py-2.5"><Send className="w-4 h-4 mr-2" />Submit Ticket</Button> {/* Adjusted button size */}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Resources */}
              <TabsContent value="resources">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"> {/* Changed to 1 column on mobile */}
                  <Card className="flex flex-col"><CardHeader><CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl"><Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />Video Tutorials</CardTitle></CardHeader><CardContent className="flex-grow"><p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Step-by-step video guides for all platform features.</p></CardContent><div className="p-4 pt-0 sm:p-6 sm:pt-0"><Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-2.5">Watch Tutorials</Button></div></Card> {/* Adjusted sizes */}
                  <Card className="flex flex-col"><CardHeader><CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl"><Book className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />Documentation</CardTitle></CardHeader><CardContent className="flex-grow"><p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Comprehensive guides and API documentation.</p></CardContent><div className="p-4 pt-0 sm:p-6 sm:pt-0"><Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-2.5">Read Docs</Button></div></Card> {/* Adjusted sizes */}
                  <Card className="flex flex-col"><CardHeader><CardTitle className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl"><Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />Downloads</CardTitle></CardHeader><CardContent className="flex-grow"><p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">Mobile apps, vendor logos, and marketing materials.</p></CardContent><div className="p-4 pt-0 sm:p-6 sm:pt-0"><Button variant="outline" className="w-full text-sm sm:text-base py-2 sm:py-2.5">Download Now</Button></div></Card> {/* Adjusted sizes */}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpSupport;