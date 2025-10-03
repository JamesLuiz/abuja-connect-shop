import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  Truck, 
  Clock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import InDriveIntegration from '@/components/cart/InDriveIntegration';
import AILogistics from '@/components/cart/AILogistics';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, getTotalPrice, getShippingTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      toast({
        title: "Order Placed Successfully!",
        description: "You will receive a confirmation email shortly.",
      });
      navigate('/orders');
    }, 3000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-4">
              Add some items to your cart to proceed with checkout
            </p>
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, title: 'Review Order', icon: ShoppingCart },
    { id: 2, title: 'Delivery', icon: Truck },
    { id: 3, title: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your purchase</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="h-4 w-4" />
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            by {item.vendor.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-medium">
                              {formatPrice(item.discountPrice || item.price)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              × {item.quantity}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            {formatPrice((item.discountPrice || item.price) * item.quantity)}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3" />
                            {item.shipping.estimatedDays} days
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* AI Logistics */}
                <AILogistics 
                  destination="Abuja" 
                  items={items.map(item => ({
                    id: parseInt(item.productId) || 0,
                    name: item.name,
                    weight: 1,
                    dimensions: { length: 10, width: 10, height: 10 }
                  }))}
                />

                <Button 
                  onClick={() => setCurrentStep(2)} 
                  className="w-full"
                  size="lg"
                >
                  Proceed to Delivery
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                {/* Delivery Address */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Abuja" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="FCT" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">Postal Code</Label>
                        <Input id="zipCode" placeholder="900001" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>Delivery Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Standard Delivery</p>
                                <p className="text-sm text-muted-foreground">5-7 business days</p>
                              </div>
                              <Badge variant="secondary">Free</Badge>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">Express Delivery</p>
                                <p className="text-sm text-muted-foreground">2-3 business days</p>
                              </div>
                              <Badge>{formatPrice(1500)}</Badge>
                            </div>
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2 p-4 border rounded-lg">
                          <RadioGroupItem value="indrive" id="indrive" />
                          <Label htmlFor="indrive" className="flex-1 cursor-pointer">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">InDrive Delivery</p>
                                <p className="text-sm text-muted-foreground">Same day delivery</p>
                              </div>
                              <Badge variant="secondary">Custom Rate</Badge>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                {/* InDrive Integration */}
                {deliveryMethod === 'indrive' && (
                  <div className="animate-fade-in">
                    <InDriveIntegration 
                      pickupLocation={items[0]?.vendor.location || 'Abuja'} 
                      dropoffLocation="Abuja" 
                    />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(1)}
                    className="flex-1"
                  >
                    Back to Order
                  </Button>
                  <Button 
                    onClick={() => setCurrentStep(3)} 
                    className="flex-1"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card">Card</TabsTrigger>
                        <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="card" className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="bank" className="mt-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                          <div className="space-y-1 text-sm">
                            <p><strong>Bank:</strong> GTBank</p>
                            <p><strong>Account Name:</strong> Abuja Connect Shop</p>
                            <p><strong>Account Number:</strong> 1234567890</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="mobile" className="mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" placeholder="080 1234 5678" />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(2)}
                    className="flex-1"
                  >
                    Back to Delivery
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Total</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{formatPrice(getShippingTotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(getTotalPrice() * 0.075)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>{formatPrice(getTotalPrice() + getShippingTotal() + (getTotalPrice() * 0.075))}</span>
                  </div>
                </div>

                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 You're saving ₦{(items.reduce((acc, item) => {
                      if (item.discountPrice) {
                        return acc + ((item.price - item.discountPrice) * item.quantity);
                      }
                      return acc;
                    }, 0)).toLocaleString()} on this order!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;