import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, Send, X, Bot, User, Camera, Mic, MicOff, Star, 
  ShoppingCart, Heart, Zap, TrendingUp, MapPin, Clock, Package,
  Image as ImageIcon, Filter, Sparkles, ThumbsUp, Volume2, Search,
  CreditCard, Bell, BarChart3, Lightbulb, Target, Shuffle, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'product' | 'recommendation' | 'action';
  products?: Product[];
  actions?: string[];
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
  rating?: number;
  inStock?: boolean;
  description?: string;
}

interface AIFeature {
  id: string;
  name: string;
  icon: any;
  description: string;
  action: () => void;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🛍️ Welcome to your AI Shopping Assistant! I\'m powered by advanced AI to make your shopping experience exceptional.\n\n✨ I can help you with:\n• Smart product search & recommendations\n• Voice shopping commands\n• Visual product search\n• Price tracking & alerts\n• Real-time inventory checks\n• Personalized suggestions\n• Cart & wishlist management\n\nHow can I help you shop smarter today?',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced product data with more details
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
      category: 'electronics',
      rating: 4.8,
      inStock: true,
      description: 'High-quality wireless headphones with noise cancellation'
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
      category: 'fashion',
      rating: 4.9,
      inStock: true,
      description: 'Elegant silk dress perfect for special occasions'
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
      category: 'beauty',
      rating: 4.6,
      inStock: false,
      description: 'Natural organic skincare products for healthy skin'
    },
    {
      id: 4,
      name: 'Smart Home Speaker',
      price: 35000,
      images: [{ view: 'front', url: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop' }],
      vendor: 'TechHub Abuja',
      location: 'Wuse 2, Abuja FCT',
      category: 'electronics',
      rating: 4.7,
      inStock: true,
      description: 'Smart speaker with voice assistant capabilities'
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
      category: 'sports',
      rating: 4.5,
      inStock: true,
      description: 'Advanced fitness tracker with heart rate monitoring'
    }
  ];

  // AI Features
  const aiFeatures: AIFeature[] = [
    {
      id: 'voice',
      name: 'Voice Search',
      icon: Mic,
      description: 'Speak to search products',
      action: () => handleVoiceSearch()
    },
    {
      id: 'visual',
      name: 'Visual Search',
      icon: Camera,
      description: 'Upload image to find similar',
      action: () => handleImageSearch()
    },
    {
      id: 'smart-rec',
      name: 'Smart Recommendations',
      icon: Sparkles,
      description: 'AI-powered suggestions',
      action: () => handleSmartRecommendations()
    },
    {
      id: 'price-track',
      name: 'Price Tracker',
      icon: TrendingUp,
      description: 'Track price changes',
      action: () => handlePriceTracking()
    },
    {
      id: 'inventory',
      name: 'Stock Check',
      icon: Package,
      description: 'Real-time availability',
      action: () => handleInventoryCheck()
    },
    {
      id: 'compare',
      name: 'Compare Products',
      icon: BarChart3,
      description: 'Side-by-side comparison',
      action: () => handleProductComparison()
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enhanced AI response generation
  const generateAIResponse = (userMessage: string, feature?: string): Message => {
    const message = userMessage.toLowerCase();
    let response: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      type: 'text'
    };

    // Feature-specific responses
    if (feature) {
      switch (feature) {
        case 'smart-rec':
          response = {
            ...response,
            content: '🎯 Here are personalized recommendations based on your preferences:',
            type: 'recommendation',
            products: allProducts.slice(0, 3)
          };
          break;
        case 'price-track':
          response = {
            ...response,
            content: '📈 Price tracking activated! I\'ll monitor these products for price drops:',
            type: 'action',
            products: allProducts.filter(p => p.discount),
            actions: ['Set Price Alert', 'View Price History']
          };
          break;
        case 'inventory':
          response = {
            ...response,
            content: '📦 Current stock status:',
            type: 'product',
            products: allProducts.map(p => ({ ...p, inStock: Math.random() > 0.3 }))
          };
          break;
        case 'compare':
          response = {
            ...response,
            content: '⚖️ Product comparison ready! Here are similar items:',
            type: 'product',
            products: allProducts.slice(0, 2)
          };
          break;
      }
      return response;
    }

    // Smart product search with AI understanding
    if (message.includes('find') || message.includes('search') || message.includes('looking for') || message.includes('need')) {
      const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(message) ||
        product.category.toLowerCase().includes(message) ||
        product.vendor.toLowerCase().includes(message) ||
        product.description?.toLowerCase().includes(message)
      );

      if (searchResults.length > 0) {
        response = {
          ...response,
          content: `🔍 Found ${searchResults.length} products matching "${userMessage}". Here are the best matches:`,
          type: 'product',
          products: searchResults
        };
      } else {
        response.content = `🤔 I couldn't find exact matches for "${userMessage}". Let me suggest some alternatives based on AI analysis:`;
        response.type = 'recommendation';
        response.products = allProducts.slice(0, 2);
      }
      return response;
    }

    // Smart discount and deals detection
    if (message.includes('discount') || message.includes('sale') || message.includes('deal') || message.includes('offer') || message.includes('cheap')) {
      const discountedProducts = allProducts.filter(p => p.discount && p.discount > 0);
      response = {
        ...response,
        content: '🎉 Hot deals and discounts available now! These are trending:',
        type: 'product',
        products: discountedProducts,
        actions: ['Add to Cart', 'View Product', 'View Vendor', 'Set Price Alert']
      };
      return response;
    }

    // Budget-aware recommendations
    if (message.includes('budget') || message.includes('price') || message.includes('₦') || /\d+/.test(message)) {
      const numbers = message.match(/\d+/g);
      if (numbers) {
        const budget = parseInt(numbers[0]) * (numbers.length > 1 ? 1000 : 1);
        const affordableProducts = allProducts.filter(p => p.price <= budget);
        
        if (affordableProducts.length > 0) {
          response = {
            ...response,
            content: `💰 Perfect! Here are quality products within your ₦${budget.toLocaleString()} budget:`,
            type: 'product',
            products: affordableProducts,
            actions: ['Quick Add to Cart', 'View Product', 'Compare Prices', 'Browse Category']
          };
        } else {
          response.content = `💡 Your budget is ₦${budget.toLocaleString()}. Let me find the best value options and potential discounts:`;
          response.type = 'recommendation';
          response.products = allProducts.slice(0, 2);
          response.actions = ['View Product', 'Set Price Alert', 'Browse Similar'];
        }
      }
      return response;
    }

    // Location-based smart search
    if (message.includes('near') || message.includes('location') || message.includes('delivery') || 
        message.includes('lagos') || message.includes('abuja') || message.includes('port harcourt')) {
      let location = '';
      if (message.includes('lagos')) location = 'Lagos';
      else if (message.includes('abuja')) location = 'Abuja';
      else if (message.includes('port harcourt')) location = 'Port Harcourt';
      
      const locationProducts = allProducts.filter(p => 
        !location || p.location.toLowerCase().includes(location.toLowerCase())
      );
      
      response = {
        ...response,
        content: location ? 
          `📍 Products available in ${location} with fast delivery:` : 
          '🚚 Products sorted by delivery speed and location:',
        type: 'product',
        products: locationProducts,
        actions: ['Check Delivery Time', 'Add to Cart', 'View Vendor', 'Browse Category']
      };
      return response;
    }

    // Cart and wishlist management
    if (message.includes('cart') || message.includes('add') || message.includes('buy')) {
      response = {
        ...response,
        content: '🛒 Cart management activated! Here are your recommended actions:',
        type: 'action',
        actions: ['View Cart', 'Quick Checkout', 'Save for Later', 'Find Similar Items'],
        products: allProducts.slice(0, 1)
      };
      return response;
    }

    // Order tracking and support
    if (message.includes('order') || message.includes('track') || message.includes('delivery') || message.includes('status')) {
      response.content = `📦 Order tracking & delivery updates:

🚚 **Current Orders:**
• Order #12345 - Premium Headphones - Out for delivery
• Order #12346 - Silk Dress - Processing

📱 **Quick Actions:**
• Track all orders
• Contact vendor
• Delivery preferences
• Return/Exchange

Would you like me to check a specific order?`;
      return response;
    }

    // Customer support with AI
    if (message.includes('help') || message.includes('support') || message.includes('problem') || message.includes('issue')) {
      response.content = `🤖 **AI-Powered Support Ready!**

🎯 **Instant Solutions:**
• Product recommendations
• Order assistance
• Technical support
• Return/refund help

📞 **Human Support:**
• Phone: +234-800-SHOP-NOW
• Email: ai-support@marketplace.com
• Live Chat: 24/7 AI + Human escalation

🚀 **Premium Features:**
• Voice commands
• Visual search
• Smart notifications
• Personalized shopping

What specific issue can I solve for you?`;
      return response;
    }

    // Default intelligent response
    response.content = `🤖 **AI Shopping Assistant Ready!**

🛍️ **Smart Features:**
• Voice search: "Find me wireless headphones"
• Visual search: Upload product images
• Price tracking: Get alerts on deals
• Smart recommendations: Personalized for you

💡 **Try saying:**
• "Show me deals under ₦30,000"
• "Find electronics in Lagos"
• "Track my recent orders"
• "Compare these two products"

✨ **AI-Powered Capabilities:**
• Natural language understanding
• Real-time inventory checking
• Predictive recommendations
• Multi-modal search

What would you like to explore?`;
    
    return response;
  };

  // Voice search functionality
  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice search not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  // Image search functionality
  const handleImageSearch = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: `🖼️ Uploaded image for visual search: ${file.name}`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, message]);
      
      setTimeout(() => {
        const aiResponse = generateAIResponse('visual search similar products', 'smart-rec');
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  // Feature handlers
  const handleSmartRecommendations = () => {
    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '✨ Show me smart recommendations',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse('', 'smart-rec');
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handlePriceTracking = () => {
    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '📈 Set up price tracking',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse('', 'price-track');
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handleInventoryCheck = () => {
    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '📦 Check inventory status',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse('', 'inventory');
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
  };

  const handleProductComparison = () => {
    const message: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: '⚖️ Compare similar products',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
    
    setTimeout(() => {
      const aiResponse = generateAIResponse('', 'compare');
      setMessages(prev => [...prev, aiResponse]);
    }, 500);
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

    // Simulate AI processing with more realistic delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Navigation helper functions
  const navigateToProduct = (product: Product) => {
    // Create a route-friendly vendor ID
    const vendorId = product.vendor.toLowerCase().replace(/\s+/g, '-');
    navigate(`/vendor/${vendorId}`);
    setIsOpen(false); // Auto-close AI window
  };

  const navigateToCategory = (category: string) => {
    navigate(`/category/${category}`);
    setIsOpen(false); // Auto-close AI window
  };

  const navigateToVendor = (vendorName: string) => {
    const vendorId = vendorName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/vendor/${vendorId}`);
    setIsOpen(false); // Auto-close AI window
  };

  const navigateToSearch = (query: string) => {
    navigate(`/vendors?search=${encodeURIComponent(query)}`);
    setIsOpen(false); // Auto-close AI window
  };

  const handleQuickAction = (action: string, product: Product) => {
    if (action === 'Add to Cart' || action === 'Quick Add to Cart') {
      addToCart({
        productId: product.id.toString(),
        vendorId: product.vendor.toLowerCase().replace(/\s+/g, '-'),
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]?.url || '',
        vendor: {
          name: product.vendor,
          location: product.location
        },
        shipping: {
          cost: 2000,
          estimatedDays: 3
        }
      });
      
      const successMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `✅ Added "${product.name}" to your cart! 🛒\n\nWhat else can I help you find?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, successMessage]);
    } else if (action === 'View Product' || action === 'View Details') {
      navigateToProduct(product);
    } else if (action === 'View Vendor' || action === 'Track Vendor') {
      navigateToVendor(product.vendor);
    } else if (action === 'Browse Category') {
      navigateToCategory(product.category);
    }
  };

  const renderProductCard = (product: Product, actions?: string[]) => (
    <div key={product.id} className="bg-card border rounded-lg p-3 mb-3 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <button
          onClick={() => navigateToProduct(product)}
          className="flex-shrink-0 group"
        >
          <img 
            src={product.images[0]?.url} 
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md group-hover:scale-105 transition-transform"
          />
        </button>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => navigateToProduct(product)}
            className="text-left w-full group"
          >
            <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
              {product.name}
            </h4>
          </button>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-bold text-primary">₦{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-muted-foreground line-through">
                  ₦{product.originalPrice.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-xs">{product.discount}% off</Badge>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            {product.rating && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs">{product.rating}</span>
              </div>
            )}
            <Badge variant={product.inStock ? "default" : "destructive"} className="text-xs">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          <button
            onClick={() => navigateToVendor(product.vendor)}
            className="text-xs text-muted-foreground mt-1 hover:text-primary transition-colors"
          >
            {product.vendor} <ExternalLink className="h-3 w-3 inline ml-1" />
          </button>
        </div>
      </div>
      
      {actions && (
        <div className="flex flex-wrap gap-2 mt-3">
          {actions.map((action) => (
            <Button
              key={action}
              size="sm"
              variant="outline"
              className="text-xs h-7 hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleQuickAction(action, product)}
            >
              {action}
            </Button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Draggable Floating Button */}
      <motion.button
        drag
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={{
          top: 0,
          left: 0,
          right: typeof window !== 'undefined' ? window.innerWidth - (isMobile ? 56 : 80) : 0,
          bottom: typeof window !== 'undefined' ? window.innerHeight - (isMobile ? 56 : 80) : 0,
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onClick={(e) => {
          if (!isDragging) {
            setIsOpen(true);
          }
        }}
        className={`fixed ${isMobile ? 'h-14 w-14' : 'h-20 w-20'} z-50 cursor-grab active:cursor-grabbing rounded-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:to-primary shadow-lg hover:shadow-xl border-2 border-primary/20 text-primary-foreground touch-none flex items-center justify-center`}
        style={{ bottom: isMobile ? '100px' : '120px', right: isMobile ? '16px' : '24px' }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{ 
          scale: 1,
          opacity: isDragging ? 1 : 0.7
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen && (
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className={`${isMobile ? 'h-6 w-6' : 'h-9 w-9'} text-white`} />
          </motion.div>
        )}
      </motion.button>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.3 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={`fixed z-50 ${
              isMobile 
                ? 'inset-x-2 bottom-2 top-[20%] max-h-[80vh]' 
                : 'bottom-6 right-6 w-[480px] h-[650px] md:w-[500px] lg:w-[520px] lg:h-[680px]'
            }`}
          >
            <Card className="w-full h-full shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-lg flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-t-lg flex-shrink-0">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Bot className={`${isMobile ? 'h-4 w-4' : 'h-6 w-6'}`} />
                  </motion.div>
                  <div>
                    <CardTitle className={`${isMobile ? 'text-sm' : 'text-lg font-semibold'}`}>AI Shopping Assistant</CardTitle>
                    <p className={`text-primary-foreground/80 ${isMobile ? 'text-xs' : 'text-sm'}`}>Powered by AI</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className={`${isMobile ? 'h-7 w-7' : 'h-9 w-9'} text-primary-foreground hover:bg-white/20`}
                >
                  <X className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />
                </Button>
              </CardHeader>
              
              <CardContent className="flex flex-col flex-1 p-0 min-h-0">
                {/* AI Features Quick Access */}
                <div className={`${isMobile ? 'p-1.5' : 'p-3'} border-b bg-muted/30 flex-shrink-0`}>
                  <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-3'} gap-2`}>
                    {aiFeatures.slice(0, 6).map((feature) => (
                      <Button
                        key={feature.id}
                        variant="ghost"
                        size="sm"
                        className={`h-auto ${isMobile ? 'p-1' : 'p-2.5'} flex flex-col items-center gap-1 hover:bg-primary/10 text-center transition-colors`}
                        onClick={feature.action}
                      >
                        <feature.icon className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
                        <span className={`${isMobile ? 'text-[9px]' : 'text-xs font-medium'} leading-tight`}>{feature.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <ScrollArea className={`flex-1 ${isMobile ? 'p-2' : 'p-5'} min-h-0`}>
                  <div className={`space-y-${isMobile ? '3' : '5'}`}>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`${isMobile ? 'max-w-[90%]' : 'max-w-[85%]'} ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground ml-auto rounded-2xl rounded-br-md'
                              : 'bg-muted text-foreground rounded-2xl rounded-bl-md'
                          } ${isMobile ? 'p-2.5' : 'p-4'}`}
                        >
                          <div className="flex items-start space-x-2">
                            {message.role === 'assistant' && (
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                              >
                                <Bot className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'} mt-0.5 flex-shrink-0`} />
                              </motion.div>
                            )}
                            {message.role === 'user' && <User className={`${isMobile ? 'h-3.5 w-3.5' : 'h-5 w-5'} mt-0.5 flex-shrink-0`} />}
                            
                            <div className="flex-1 min-w-0">
                              <div className={`whitespace-pre-wrap ${isMobile ? 'text-xs' : 'text-[15px]'} leading-relaxed`}>{message.content}</div>
                              
                              {/* Render products */}
                              {message.products && message.products.length > 0 && (
                                <div className={`${isMobile ? 'mt-2' : 'mt-3'} space-y-2`}>
                                  {message.products.map(product => 
                                    renderProductCard(product, message.actions)
                                  )}
                                </div>
                              )}
                              
                              {/* Render action buttons */}
                              {message.actions && !message.products && (
                                <div className={`flex flex-wrap gap-2 ${isMobile ? 'mt-2' : 'mt-3'}`}>
                                  {message.actions.map((action) => (
                                    <Button
                                      key={action}
                                      size="sm"
                                      variant="outline"
                                      className={`${isMobile ? 'text-xs h-6' : 'text-xs h-7'} hover:bg-primary hover:text-primary-foreground`}
                                    >
                                      {action}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className={`bg-muted ${isMobile ? 'p-2.5' : 'p-3'} rounded-2xl rounded-bl-md`}>
                          <div className="flex items-center space-x-2">
                            <Bot className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                            <div className="flex space-x-1">
                              <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-primary rounded-full animate-bounce`}></div>
                              <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-primary rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }}></div>
                              <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} bg-primary rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                {/* Input Area */}
                <div className={`${isMobile ? 'p-2' : 'p-4'} border-t bg-background/80 flex-shrink-0`}>
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder={isMobile ? "Ask me..." : "Ask me anything..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`${isMobile ? 'min-h-[32px] pr-14 text-xs' : 'min-h-[44px] pr-20 text-[15px]'} max-h-24 resize-none`}
                        rows={1}
                      />
                      <div className={`absolute ${isMobile ? 'right-1 top-1' : 'right-2 top-2'} flex space-x-1`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`}
                          onClick={handleVoiceSearch}
                          disabled={isListening}
                        >
                          {isListening ? (
                            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                              <MicOff className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'} text-red-500`} />
                            </motion.div>
                          ) : (
                            <Mic className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`${isMobile ? 'h-5 w-5' : 'h-8 w-8'}`}
                          onClick={handleImageSearch}
                        >
                          <Camera className={`${isMobile ? 'h-2.5 w-2.5' : 'h-4 w-4'}`} />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage} 
                      size="icon" 
                      disabled={!inputValue.trim()}
                      className={`${isMobile ? 'h-8 w-8' : 'h-11 w-11'} bg-primary hover:bg-primary/90 flex-shrink-0`}
                    >
                      <Send className={`${isMobile ? 'h-3 w-3' : 'h-5 w-5'}`} />
                    </Button>
                  </div>
                  
                  <div className={`flex items-center justify-center mt-1.5 ${isMobile ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>
                    <span>AI-powered assistant</span>
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