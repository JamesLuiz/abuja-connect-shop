import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, MapPin, Clock, Truck, DollarSign, Route, Lightbulb } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface LogisticsSuggestion {
  id: string;
  type: 'consolidation' | 'timing' | 'route' | 'cost' | 'delivery_method';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savings?: number;
  timeReduction?: number;
  icon: React.ReactNode;
}

interface LocationData {
  state: string;
  city: string;
  area: string;
  trafficLevel: 'low' | 'medium' | 'high';
  weatherCondition: string;
  isWeekend: boolean;
}

const AILogistics = () => {
  const { items } = useCart();
  const [suggestions, setSuggestions] = useState<LogisticsSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationData>({
    state: 'FCT',
    city: 'Abuja',
    area: 'Wuse II',
    trafficLevel: 'medium',
    weatherCondition: 'Clear',
    isWeekend: false,
  });

  // Mock AI analysis
  const analyzeLogistics = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newSuggestions: LogisticsSuggestion[] = [];

      // Vendor consolidation suggestion
      const vendorGroups = items.reduce((acc, item) => {
        if (!acc[item.vendorId]) {
          acc[item.vendorId] = [];
        }
        acc[item.vendorId].push(item);
        return acc;
      }, {} as Record<string, typeof items>);

      if (Object.keys(vendorGroups).length > 1) {
        const potentialSavings = Object.keys(vendorGroups).length * 500; // ₦500 per vendor
        newSuggestions.push({
          id: 'consolidation',
          type: 'consolidation',
          title: 'Vendor Consolidation Available',
          description: `You have items from ${Object.keys(vendorGroups).length} different vendors. Consider grouping deliveries to save on shipping costs.`,
          impact: 'high',
          savings: potentialSavings,
          icon: <Truck className="h-4 w-4" />,
        });
      }

      // Traffic-based timing suggestion
      if (userLocation.trafficLevel === 'high') {
        newSuggestions.push({
          id: 'timing',
          type: 'timing',
          title: 'Optimal Delivery Time',
          description: 'Current traffic is heavy. Schedule delivery for early morning (6-8 AM) to avoid delays.',
          impact: 'medium',
          timeReduction: 30,
          icon: <Clock className="h-4 w-4" />,
        });
      }

      // Route optimization
      newSuggestions.push({
        id: 'route',
        type: 'route',
        title: 'Smart Route Planning',
        description: `Based on your location in ${userLocation.area}, we've optimized the delivery route to minimize travel time.`,
        impact: 'medium',
        timeReduction: 15,
        icon: <Route className="h-4 w-4" />,
      });

      // Cost optimization
      const totalValue = items.reduce((sum, item) => sum + (item.discountPrice || item.price) * item.quantity, 0);
      if (totalValue > 50000) {
        newSuggestions.push({
          id: 'cost',
          type: 'cost',
          title: 'Free Delivery Eligible',
          description: 'Your order qualifies for free delivery! Consider adding more items to maximize this benefit.',
          impact: 'high',
          savings: 2000,
          icon: <DollarSign className="h-4 w-4" />,
        });
      }

      // Weather-based suggestion
      if (userLocation.weatherCondition !== 'Clear') {
        newSuggestions.push({
          id: 'weather',
          type: 'delivery_method',
          title: 'Weather Alert',
          description: `${userLocation.weatherCondition} weather expected. Consider covered delivery vehicle for fragile items.`,
          impact: 'low',
          icon: <MapPin className="h-4 w-4" />,
        });
      }

      setSuggestions(newSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  useEffect(() => {
    if (items.length > 0) {
      analyzeLogistics();
    }
  }, [items]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Logistics Assistant
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Smart suggestions based on your location and order details
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Location Info */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Delivering to: {userLocation.area}, {userLocation.city}, {userLocation.state}
          </span>
          <Badge variant="secondary" className="ml-auto">
            Traffic: {userLocation.trafficLevel}
          </Badge>
        </div>

        {/* Analysis Status */}
        {isAnalyzing ? (
          <div className="flex items-center justify-center p-8 text-center">
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Analyzing optimal logistics...</p>
            </div>
          </div>
        ) : (
          /* Suggestions */
          <div className="space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <Card key={suggestion.id} className="p-4 hover:shadow-md transition-all duration-200 animate-fade-in">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {suggestion.icon}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact} impact
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {suggestion.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs">
                        {suggestion.savings && (
                          <span className="text-green-600 font-medium">
                            Save {formatPrice(suggestion.savings)}
                          </span>
                        )}
                        {suggestion.timeReduction && (
                          <span className="text-blue-600 font-medium">
                            Save {suggestion.timeReduction} minutes
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center p-6">
                <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  No optimization suggestions at this time
                </p>
              </div>
            )}
          </div>
        )}

        {/* Refresh Analysis */}
        <Button 
          variant="outline" 
          onClick={analyzeLogistics}
          disabled={isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? 'Analyzing...' : 'Refresh Analysis'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default AILogistics;