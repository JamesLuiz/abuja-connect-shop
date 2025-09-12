import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: { view: string; url: string }[];
  discount?: number;
  vendor: string;
  location: string;
  category: string;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am your shopping assistant. I can help you find products, check discounts, filter by price range, find items in specific locations, and provide customer support. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock product data - in a real app, this would come from your backend
  const allProducts: Product[] = [
    {
      id: 1,
      name: 'Premium Wireless Headphones',
      price: 45000,
      originalPrice: 60000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' }],
      discount: 25,
      vendor: 'TechHub Abuja',
      location: 'Wuse 2, Abuja FCT',
      category: 'electronics'
    },
    {
      id: 2,
      name: 'Designer Silk Dress',
      price: 28000,
      originalPrice: 35000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop' }],
      discount: 20,
      vendor: 'Lagos Fashion House',
      location: 'Victoria Island, Lagos',
      category: 'fashion'
    },
    {
      id: 3,
      name: 'Organic Skincare Set',
      price: 15000,
      originalPrice: 18000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' }],
      discount: 17,
      vendor: 'Beauty Essentials',
      location: 'Ikeja, Lagos',
      category: 'beauty'
    },
    {
      id: 4,
      name: 'Smart Home Speaker',
      price: 35000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop' }],
      vendor: 'TechHub Abuja',
      location: 'Wuse 2, Abuja FCT',
      category: 'electronics'
    },
    {
      id: 5,
      name: 'Fitness Tracker Watch',
      price: 32000,
      originalPrice: 40000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=400&fit=crop' }],
      discount: 20,
      vendor: 'FitLife Store',
      location: 'Port Harcourt, Rivers',
      category: 'sports'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Product search
    if (message.includes('find') || message.includes('search') || message.includes('looking for')) {
      const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(message) ||
        product.category.toLowerCase().includes(message) ||
        product.vendor.toLowerCase().includes(message)
      );

      if (searchResults.length > 0) {
        const productList = searchResults.map(p => {
          const discountText = p.discount ? ` (${p.discount}% off!)` : '';
          return `• ${p.name} - ₦${p.price.toLocaleString()}${discountText} from ${p.vendor} in ${p.location}`;
        }).join('\n');
        return `I found ${searchResults.length} product(s) matching your search:\n\n${productList}`;
      }
      return "I couldn't find any products matching your search. Try searching for electronics, fashion, beauty, sports, or specific product names.";
    }

    // Discount products
    if (message.includes('discount') || message.includes('sale') || message.includes('offer')) {
      const discountedProducts = allProducts.filter(p => p.discount && p.discount > 0);
      const productList = discountedProducts.map(p => 
        `• ${p.name} - ₦${p.price.toLocaleString()} (${p.discount}% off from ₦${p.originalPrice?.toLocaleString()}) from ${p.vendor}`
      ).join('\n');
      return `Here are products currently on discount:\n\n${productList}`;
    }

    // Price range
    if (message.includes('price') || message.includes('budget') || message.includes('₦') || /\d+/.test(message)) {
      const numbers = message.match(/\d+/g);
      if (numbers) {
        const budget = parseInt(numbers[0]) * (numbers.length > 1 ? 1000 : 1);
        const affordableProducts = allProducts.filter(p => p.price <= budget);
        
        if (affordableProducts.length > 0) {
          const productList = affordableProducts.map(p => 
            `• ${p.name} - ₦${p.price.toLocaleString()} from ${p.vendor} in ${p.location}`
          ).join('\n');
          return `Here are products within your budget of ₦${budget.toLocaleString()}:\n\n${productList}`;
        }
        return `I couldn't find products within ₦${budget.toLocaleString()}. Try increasing your budget or check our discounted items.`;
      }
    }

    // Location-based search
    if (message.includes('lagos') || message.includes('abuja') || message.includes('port harcourt') || message.includes('location') || message.includes('near')) {
      let location = '';
      if (message.includes('lagos')) location = 'Lagos';
      else if (message.includes('abuja')) location = 'Abuja';
      else if (message.includes('port harcourt')) location = 'Port Harcourt';
      
      if (location) {
        const locationProducts = allProducts.filter(p => 
          p.location.toLowerCase().includes(location.toLowerCase())
        );
        
        if (locationProducts.length > 0) {
          const productList = locationProducts.map(p => 
            `• ${p.name} - ₦${p.price.toLocaleString()} from ${p.vendor} in ${p.location}`
          ).join('\n');
          return `Here are products available in ${location}:\n\n${productList}`;
        }
      }
      return "Please specify a location (Lagos, Abuja, or Port Harcourt) to find products near you.";
    }

    // Customer support
    if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('issue')) {
      return `I'm here to help! I can assist you with:

• Finding specific products
• Checking for discounts and sales
• Filtering products by price range
• Finding products in your location
• General shopping questions

You can also contact our support team:
📞 Phone: +234-800-SHOP-NOW
📧 Email: support@marketplace.com
💬 Live Chat: Available 24/7`;
    }

    // Default response
    return `I can help you with:

🔍 **Product Search**: "Find wireless headphones" or "Show me electronics"
💰 **Discounts**: "What products are on sale?"
💵 **Price Range**: "Show me products under ₦30,000"
📍 **Location**: "Find products in Lagos"
🆘 **Support**: "I need help with my order"

What would you like to explore?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </motion.div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px]"
          >
            <Card className="w-full h-full shadow-2xl border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-t-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <CardTitle className="text-lg">AI Shopping Assistant</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex flex-col h-full p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.role === 'assistant' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            {message.role === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me about products, discounts, prices..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;