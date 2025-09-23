import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Car,
  Clock,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Shield,
  Route,
  CreditCard,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  rating: number;
  completedRides: number;
  estimatedArrival: string;
  price: number;
  vehicleType: string;
  vehicleColor: string;
  vehiclePlate: string;
  isVerified: boolean;
  profileImage?: string;
}

interface InDriveIntegrationProps {
  pickupLocation: string;
  dropoffLocation: string;
  onBookRide?: (driver: Driver, price: number) => void;
}

const InDriveIntegration = ({ pickupLocation, dropoffLocation, onBookRide }: InDriveIntegrationProps) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [customPrice, setCustomPrice] = useState<string>('');
  const [step, setStep] = useState<'browse' | 'negotiate' | 'confirm'>('browse');

  useEffect(() => {
    loadAvailableDrivers();
  }, [pickupLocation, dropoffLocation]);

  const loadAvailableDrivers = async () => {
    setLoading(true);
    
    // Mock InDrive API call
    setTimeout(() => {
      const mockDrivers: Driver[] = [
        {
          id: 'driver1',
          name: 'Ahmed Musa',
          rating: 4.8,
          completedRides: 1247,
          estimatedArrival: '5 min',
          price: 2500,
          vehicleType: 'Toyota Corolla',
          vehicleColor: 'Silver',
          vehiclePlate: 'ABC-123-DE',
          isVerified: true
        },
        {
          id: 'driver2',
          name: 'Fatima Ibrahim',
          rating: 4.9,
          completedRides: 892,
          estimatedArrival: '8 min',
          price: 2200,
          vehicleType: 'Honda Civic',
          vehicleColor: 'Black',
          vehiclePlate: 'XYZ-789-FG',
          isVerified: true
        },
        {
          id: 'driver3',
          name: 'Chidi Okafor',
          rating: 4.7,
          completedRides: 654,
          estimatedArrival: '12 min',
          price: 1800,
          vehicleType: 'Kia Rio',
          vehicleColor: 'White',
          vehiclePlate: 'HIJ-456-KL',
          isVerified: false
        },
        {
          id: 'driver4',
          name: 'Sarah Johnson',
          rating: 4.9,
          completedRides: 1523,
          estimatedArrival: '6 min',
          price: 2800,
          vehicleType: 'Toyota Camry',
          vehicleColor: 'Blue',
          vehiclePlate: 'MNO-012-PQ',
          isVerified: true
        }
      ];
      
      setDrivers(mockDrivers);
      setLoading(false);
    }, 1500);
  };

  const handleSelectDriver = (driver: Driver) => {
    setSelectedDriver(driver);
    setCustomPrice(driver.price.toString());
    setStep('negotiate');
  };

  const handleNegotiatePrice = () => {
    if (selectedDriver && customPrice) {
      const price = parseInt(customPrice);
      setStep('confirm');
    }
  };

  const handleConfirmBooking = () => {
    if (selectedDriver && customPrice) {
      const price = parseInt(customPrice);
      onBookRide?.(selectedDriver, price);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5 text-primary" />
            <span>InDrive Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Route className="h-4 w-4 text-muted-foreground animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Finding available drivers near you...
              </span>
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-muted rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-1/3"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'confirm' && selectedDriver) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>Confirm Booking</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Trip Summary */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Pickup</p>
                  <p className="text-sm text-muted-foreground">{pickupLocation}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">Drop-off</p>
                  <p className="text-sm text-muted-foreground">{dropoffLocation}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Driver Info */}
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {getInitials(selectedDriver.name)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold">{selectedDriver.name}</h4>
                  {selectedDriver.isVerified && (
                    <Shield className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{selectedDriver.rating}</span>
                  </div>
                  <span>{selectedDriver.completedRides} rides</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedDriver.vehicleColor} {selectedDriver.vehicleType} • {selectedDriver.vehiclePlate}
                </p>
              </div>
            </div>

            <Separator />

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₦{Math.floor(parseInt(customPrice) * 0.8).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₦{Math.floor(parseInt(customPrice) * 0.1).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Negotiated Rate</span>
                <span>₦{Math.floor(parseInt(customPrice) * 0.1).toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₦{parseInt(customPrice).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep('negotiate')}
              >
                Back
              </Button>
              <Button 
                className="flex-1"
                onClick={handleConfirmBooking}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Confirm & Pay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'negotiate' && selectedDriver) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <span>Negotiate Price</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Make a counter-offer to {selectedDriver.name}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Driver Info */}
            <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {getInitials(selectedDriver.name)}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{selectedDriver.name}</h4>
                  {selectedDriver.isVerified && (
                    <Shield className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Initial offer: ₦{selectedDriver.price.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedDriver.estimatedArrival}</span>
                </div>
              </div>
            </div>

            {/* Price Negotiation */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="custom-price">Your Counter-Offer</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-lg">₦</span>
                  <Input
                    id="custom-price"
                    type="number"
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="flex-1"
                    placeholder="Enter your price"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Suggested range: ₦{Math.floor(selectedDriver.price * 0.8).toLocaleString()} - ₦{Math.floor(selectedDriver.price * 1.2).toLocaleString()}
                </p>
              </div>

              <div className="flex items-start space-x-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Fair Pricing Tip</p>
                  <p>Consider traffic, distance, and driver ratings when making your offer.</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setStep('browse')}
              >
                Back to Drivers
              </Button>
              <Button 
                className="flex-1"
                onClick={handleNegotiatePrice}
                disabled={!customPrice || parseInt(customPrice) <= 0}
              >
                Send Offer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Car className="h-5 w-5 text-primary" />
          <span>Available Drivers</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose from {drivers.length} drivers near you
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleSelectDriver(driver)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {getInitials(driver.name)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{driver.name}</h4>
                      {driver.isVerified && (
                        <Shield className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{driver.rating}</span>
                      </div>
                      <span>{driver.completedRides} rides</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{driver.estimatedArrival}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {driver.vehicleColor} {driver.vehicleType} • {driver.vehiclePlate}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    ₦{driver.price.toLocaleString()}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Negotiable
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <MessageCircle className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-primary">InDrive Advantage</p>
              <p className="text-muted-foreground">
                Negotiate fair prices directly with drivers. No surge pricing, just honest rates.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InDriveIntegration;