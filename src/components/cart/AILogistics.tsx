import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Truck,
  Clock,
  MapPin,
  Zap,
  CheckCircle,
  AlertCircle,
  Package,
  Route,
  Calendar,
  DollarSign
} from 'lucide-react';

interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
  confidence: number;
  route: string[];
  features: string[];
  eco_friendly?: boolean;
  premium?: boolean;
}

interface AILogisticsProps {
  destination: string;
  items: Array<{
    id: number;
    name: string;
    weight?: number;
    dimensions?: {
      length: number;
      width: number;
      height: number;
    };
  }>;
  onSelectOption?: (option: DeliveryOption) => void;
}

const AILogistics = ({ destination, items, onSelectOption }: AILogisticsProps) => {
  const [deliveryOptions, setDeliveryOptions] = useState<DeliveryOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  useEffect(() => {
    calculateDeliveryOptions();
  }, [destination, items]);

  const calculateDeliveryOptions = async () => {
    setLoading(true);
    setOptimizationProgress(0);

    // Simulate AI optimization process
    const steps = [
      'Analyzing package dimensions...',
      'Calculating optimal routes...',
      'Comparing carrier rates...',
      'Optimizing for time and cost...',
      'Generating recommendations...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setOptimizationProgress(((i + 1) / steps.length) * 100);
    }

    // Mock AI-generated delivery options
    const mockOptions: DeliveryOption[] = [
      {
        id: 'ai-express',
        name: 'AI Express',
        description: 'AI-optimized fastest delivery with dynamic routing',
        price: 2500,
        estimatedTime: '2-4 hours',
        confidence: 95,
        route: ['Lagos Island', 'Ikeja', 'Abuja FCT'],
        features: ['Real-time tracking', 'Priority handling', 'SMS updates'],
        premium: true
      },
      {
        id: 'smart-standard',
        name: 'Smart Standard',
        description: 'Cost-optimized delivery with intelligent bundling',
        price: 1200,
        estimatedTime: '1-2 days',
        confidence: 88,
        route: ['Lagos', 'Kaduna', 'Abuja'],
        features: ['Package consolidation', 'Route optimization', 'Standard tracking'],
        eco_friendly: true
      },
      {
        id: 'eco-friendly',
        name: 'Green Delivery',
        description: 'Environment-friendly option with carbon offset',
        price: 1500,
        estimatedTime: '2-3 days',
        confidence: 82,
        route: ['Lagos', 'Lokoja', 'Abuja'],
        features: ['Carbon neutral', 'Electric vehicles', 'Sustainable packaging'],
        eco_friendly: true
      },
      {
        id: 'budget-saver',
        name: 'Budget Optimizer',
        description: 'Most economical option with flexible timing',
        price: 800,
        estimatedTime: '3-5 days',
        confidence: 75,
        route: ['Lagos', 'Ibadan', 'Ilorin', 'Abuja'],
        features: ['Flexible delivery window', 'Cost-effective', 'Basic tracking']
      }
    ];

    setDeliveryOptions(mockOptions);
    setLoading(false);
  };

  const handleSelectOption = (option: DeliveryOption) => {
    setSelectedOption(option.id);
    onSelectOption?.(option);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>AI Logistics Optimization</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-muted-foreground animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Analyzing optimal delivery routes...
              </span>
            </div>
            <Progress value={optimizationProgress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              Our AI is calculating the best delivery options for your location and items.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>AI-Optimized Delivery</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Smart logistics solutions tailored for your delivery to {destination}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deliveryOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                selectedOption === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelectOption(option)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold">{option.name}</h4>
                    {option.premium && (
                      <Badge variant="default" className="text-xs">
                        Premium
                      </Badge>
                    )}
                    {option.eco_friendly && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Eco-Friendly
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{option.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>₦{option.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className={`h-4 w-4 ${getConfidenceColor(option.confidence)}`} />
                      <span className={getConfidenceColor(option.confidence)}>
                        {option.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ₦{option.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {option.estimatedTime}
                  </div>
                </div>
              </div>

              {/* Route Information */}
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Route className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Optimized Route</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  {option.route.map((location, index) => (
                    <div key={index} className="flex items-center">
                      <span>{location}</span>
                      {index < option.route.length - 1 && (
                        <span className="mx-2">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Features</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {option.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedOption === option.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Selected for checkout</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedOption && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI Optimization Savings</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                ₦{Math.floor(Math.random() * 500 + 200)} saved
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Our AI found you the best balance of speed, cost, and reliability.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AILogistics;