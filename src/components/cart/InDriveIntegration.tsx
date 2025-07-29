import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Car, Clock, MapPin, Package, Star, Navigation } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DeliveryBooking {
  pickupAddress: string;
  deliveryAddress: string;
  packageDetails: {
    weight: number;
    dimensions: string;
    fragile: boolean;
    value: number;
  };
  preferredTime: string;
  specialInstructions?: string;
}

interface Driver {
  id: string;
  name: string;
  rating: number;
  estimatedTime: number;
  price: number;
  vehicleType: string;
  distance: number;
}

const InDriveIntegration = () => {
  const [bookingData, setBookingData] = useState<DeliveryBooking>({
    pickupAddress: '',
    deliveryAddress: '',
    packageDetails: {
      weight: 0,
      dimensions: '',
      fragile: false,
      value: 0,
    },
    preferredTime: '',
    specialInstructions: '',
  });

  const [availableDrivers, setAvailableDrivers] = useState<Driver[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  // Mock drivers data
  const mockDrivers: Driver[] = [
    {
      id: '1',
      name: 'Ahmed Ibrahim',
      rating: 4.8,
      estimatedTime: 15,
      price: 2500,
      vehicleType: 'Motorcycle',
      distance: 3.2,
    },
    {
      id: '2',
      name: 'Blessing Okafor',
      rating: 4.9,
      estimatedTime: 20,
      price: 3000,
      vehicleType: 'Car',
      distance: 4.1,
    },
    {
      id: '3',
      name: 'Musa Adamu',
      rating: 4.7,
      estimatedTime: 12,
      price: 2200,
      vehicleType: 'Motorcycle',
      distance: 2.8,
    },
  ];

  const searchDrivers = async () => {
    if (!bookingData.pickupAddress || !bookingData.deliveryAddress) {
      toast({
        title: "Missing Information",
        description: "Please provide both pickup and delivery addresses",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setAvailableDrivers(mockDrivers);
      setIsSearching(false);
      toast({
        title: "Drivers Found!",
        description: `Found ${mockDrivers.length} available drivers`,
      });
    }, 2000);
  };

  const bookDelivery = (driver: Driver) => {
    setSelectedDriver(driver);
    toast({
      title: "Delivery Booked!",
      description: `${driver.name} will pick up your package in ${driver.estimatedTime} minutes`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5 text-primary" />
          InDrive Delivery Service
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!selectedDriver ? (
          <>
            {/* Address Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="pickup"
                    placeholder="Enter vendor/store address"
                    className="pl-10"
                    value={bookingData.pickupAddress}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      pickupAddress: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Address</Label>
                <div className="relative">
                  <Navigation className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="delivery"
                    placeholder="Enter your delivery address"
                    className="pl-10"
                    value={bookingData.deliveryAddress}
                    onChange={(e) => setBookingData(prev => ({
                      ...prev,
                      deliveryAddress: e.target.value
                    }))}
                  />
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Package Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="0.5"
                  value={bookingData.packageDetails.weight || ''}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    packageDetails: {
                      ...prev.packageDetails,
                      weight: parseFloat(e.target.value) || 0
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dimensions">Dimensions</Label>
                <Input
                  id="dimensions"
                  placeholder="20x15x10 cm"
                  value={bookingData.packageDetails.dimensions}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    packageDetails: {
                      ...prev.packageDetails,
                      dimensions: e.target.value
                    }
                  }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Package Value (₦)</Label>
                <Input
                  id="value"
                  type="number"
                  placeholder="50000"
                  value={bookingData.packageDetails.value || ''}
                  onChange={(e) => setBookingData(prev => ({
                    ...prev,
                    packageDetails: {
                      ...prev.packageDetails,
                      value: parseFloat(e.target.value) || 0
                    }
                  }))}
                />
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions (Optional)</Label>
              <Textarea
                id="instructions"
                placeholder="Any special handling instructions..."
                value={bookingData.specialInstructions}
                onChange={(e) => setBookingData(prev => ({
                  ...prev,
                  specialInstructions: e.target.value
                }))}
              />
            </div>

            {/* Search Button */}
            <Button 
              onClick={searchDrivers} 
              disabled={isSearching}
              className="w-full"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                  Searching for drivers...
                </>
              ) : (
                'Find Available Drivers'
              )}
            </Button>

            {/* Available Drivers */}
            {availableDrivers.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Available Drivers</h3>
                <div className="space-y-3">
                  {availableDrivers.map((driver) => (
                    <Card key={driver.id} className="p-4 hover:shadow-md transition-all duration-200 animate-fade-in">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{driver.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1 fill-current" />
                              {driver.rating}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {driver.vehicleType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {driver.estimatedTime} mins
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {driver.distance} km away
                            </div>
                            <div className="font-semibold text-foreground">
                              {formatPrice(driver.price)}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm"
                          onClick={() => bookDelivery(driver)}
                          className="ml-4"
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Booking Confirmation */
          <div className="text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Package className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Delivery Booked Successfully!</h3>
              <p className="text-muted-foreground">
                {selectedDriver.name} will arrive at the pickup location in approximately {selectedDriver.estimatedTime} minutes
              </p>
            </div>

            <Card className="p-4 bg-muted/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Driver:</span> {selectedDriver.name}
                </div>
                <div>
                  <span className="font-medium">Vehicle:</span> {selectedDriver.vehicleType}
                </div>
                <div>
                  <span className="font-medium">ETA:</span> {selectedDriver.estimatedTime} minutes
                </div>
                <div>
                  <span className="font-medium">Cost:</span> {formatPrice(selectedDriver.price)}
                </div>
              </div>
            </Card>

            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedDriver(null);
                setAvailableDrivers([]);
              }}
              className="w-full"
            >
              Book Another Delivery
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InDriveIntegration;