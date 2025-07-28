import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Store, 
  BarChart3, 
  Upload,
  Sparkles,
  Rocket
} from 'lucide-react';

type RegistrationStep = 'review' | 'approved' | 'store-setup' | 'complete';

interface RegistrationStatusProps {
  status: RegistrationStep;
  onStatusChange: (status: RegistrationStep) => void;
}

const RegistrationStatus = ({ status, onStatusChange }: RegistrationStatusProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const storeSetupSteps = [
    'Setting up store infrastructure',
    'Configuring payment systems',
    'Preparing analytics dashboard',
    'Finalizing store customization'
  ];

  useEffect(() => {
    if (status === 'store-setup') {
      let stepIndex = 0;
      const interval = setInterval(() => {
        setCurrentStep(stepIndex);
        setProgress((stepIndex + 1) * 25);
        
        if (stepIndex >= storeSetupSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            onStatusChange('complete');
          }, 1500);
        } else {
          stepIndex++;
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [status, onStatusChange]);

  if (status === 'review') {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <CardTitle className="text-2xl">Application Under Review</CardTitle>
          <CardDescription>
            We're reviewing your vendor application. This usually takes 1-2 business days.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Our team will verify your identity documents</li>
                  <li>• We'll validate your business information</li>
                  <li>• Your bank details will be confirmed</li>
                  <li>• You'll receive an email update on your application status</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-primary/10 rounded-lg p-4">
              <p className="text-2xl font-bold text-primary">24-48</p>
              <p className="text-sm text-muted-foreground">Hours Review Time</p>
            </div>
            <div className="bg-green-100 rounded-lg p-4">
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => onStatusChange('approved')}
              className="mt-4"
            >
              Simulate Approval (Demo)
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === 'approved') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">Application Approved!</CardTitle>
          <CardDescription className="text-green-700">
            Congratulations! Your vendor application has been approved. Let's set up your store.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-white rounded-lg p-6 border border-green-200">
            <h3 className="font-semibold mb-4 text-green-800">Welcome to Abuja E-Mall!</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Store className="h-8 w-8 text-green-600 mx-auto" />
                <p className="text-sm font-medium">Custom Store</p>
                <p className="text-xs text-muted-foreground">Your branded storefront</p>
              </div>
              <div className="space-y-2">
                <BarChart3 className="h-8 w-8 text-green-600 mx-auto" />
                <p className="text-sm font-medium">Analytics</p>
                <p className="text-xs text-muted-foreground">Track your performance</p>
              </div>
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-green-600 mx-auto" />
                <p className="text-sm font-medium">Product Upload</p>
                <p className="text-xs text-muted-foreground">Start selling immediately</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onStatusChange('store-setup')}
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create My Store
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === 'store-setup') {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <CardTitle className="text-2xl">Creating Your Store</CardTitle>
          <CardDescription>
            We're setting up your custom storefront. This will only take a moment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Setup Progress</span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-3">
            {storeSetupSteps.map((step, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  index <= currentStep 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : index === currentStep ? (
                  <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <div className="h-5 w-5 border-2 border-muted-foreground rounded-full" />
                )}
                <span className="text-sm font-medium">{step}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === 'complete') {
    return (
      <Card className="border-primary bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6">
            <Rocket className="h-10 w-10 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl bg-gradient-primary bg-clip-text text-transparent">
            Store Ready!
          </CardTitle>
          <CardDescription className="text-lg">
            Your Abuja E-Mall store is now live and ready to receive customers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="bg-white rounded-lg p-6 shadow-soft">
            <h3 className="font-semibold mb-4">Your Store Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Store URL:</p>
                <p className="font-medium text-primary">abujamall.com/store/your-business</p>
              </div>
              <div>
                <p className="text-muted-foreground">Store ID:</p>
                <p className="font-medium">#VM-2024-001</p>
              </div>
              <div>
                <p className="text-muted-foreground">Monthly Fee:</p>
                <p className="font-medium">₦10,000</p>
              </div>
              <div>
                <p className="text-muted-foreground">Status:</p>
                <p className="font-medium text-green-600">Active</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button size="lg" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Upload Products
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              <Store className="h-4 w-4 mr-2" />
              View Store
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Upload your first products to start selling</li>
              <li>• Customize your store design and branding</li>
              <li>• Set up your delivery preferences</li>
              <li>• Share your store link with customers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default RegistrationStatus;