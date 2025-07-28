import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, FileText, Building, User } from 'lucide-react';
import BioDataForm from '@/components/vendor/BioDataForm';
import KYCForm from '@/components/vendor/KYCForm';
import CompanyForm from '@/components/vendor/CompanyForm';
import RegistrationStatus from '@/components/vendor/RegistrationStatus';

type RegistrationStep = 'bio' | 'kyc' | 'company' | 'review' | 'approved' | 'store-setup' | 'complete';

interface RegistrationData {
  bioData?: any;
  kycData?: any;
  companyData?: any;
}

const VendorRegister = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('bio');
  const [registrationData, setRegistrationData] = useState<RegistrationData>({});

  const steps = [
    {
      id: 'bio',
      title: 'Personal Information',
      description: 'Basic details about yourself',
      icon: User,
      completed: ['kyc', 'company', 'review', 'approved', 'store-setup', 'complete'].includes(currentStep)
    },
    {
      id: 'kyc',
      title: 'Identity Verification',
      description: 'Verify your identity with documents',
      icon: FileText,
      completed: ['company', 'review', 'approved', 'store-setup', 'complete'].includes(currentStep)
    },
    {
      id: 'company',
      title: 'Business Details',
      description: 'Information about your business',
      icon: Building,
      completed: ['review', 'approved', 'store-setup', 'complete'].includes(currentStep)
    },
    {
      id: 'review',
      title: 'Under Review',
      description: 'We\'re reviewing your application',
      icon: Clock,
      completed: ['approved', 'store-setup', 'complete'].includes(currentStep)
    }
  ];

  const getStepIndex = () => {
    const stepMap = { bio: 0, kyc: 1, company: 2, review: 3, approved: 3, 'store-setup': 3, complete: 3 };
    return stepMap[currentStep] || 0;
  };

  const getProgressValue = () => {
    const progressMap = { 
      bio: 0, 
      kyc: 25, 
      company: 50, 
      review: 75, 
      approved: 75,
      'store-setup': 90,
      complete: 100 
    };
    return progressMap[currentStep] || 0;
  };

  const handleStepComplete = (stepData: any) => {
    setRegistrationData(prev => ({
      ...prev,
      [`${currentStep}Data`]: stepData
    }));

    // Move to next step
    if (currentStep === 'bio') {
      setCurrentStep('kyc');
    } else if (currentStep === 'kyc') {
      setCurrentStep('company');
    } else if (currentStep === 'company') {
      setCurrentStep('review');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'bio':
        return (
          <BioDataForm 
            onComplete={handleStepComplete}
            initialData={registrationData.bioData}
          />
        );
      case 'kyc':
        return (
          <KYCForm 
            onComplete={handleStepComplete}
            initialData={registrationData.kycData}
          />
        );
      case 'company':
        return (
          <CompanyForm 
            onComplete={handleStepComplete}
            initialData={registrationData.companyData}
          />
        );
      case 'review':
      case 'approved':
      case 'store-setup':
      case 'complete':
        return (
          <RegistrationStatus 
            status={currentStep}
            onStatusChange={setCurrentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Become a</span>{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Vendor
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of successful businesses on Abuja E-Mall. Complete the registration process to start selling your products online.
          </p>
        </div>

        {/* Progress Indicator */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-lg">Registration Progress</CardTitle>
              <span className="text-sm text-muted-foreground">
                Step {getStepIndex() + 1} of {steps.length}
              </span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = getStepIndex() === index;
                const isCompleted = step.completed;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary/10 border border-primary/20' 
                        : isCompleted 
                        ? 'bg-muted/50' 
                        : 'bg-muted/30'
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      isCompleted 
                        ? 'bg-primary text-primary-foreground' 
                        : isActive 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-primary' : 'text-foreground'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Back Button */}
        {currentStep !== 'bio' && !['review', 'approved', 'store-setup', 'complete'].includes(currentStep) && (
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              onClick={() => {
                if (currentStep === 'kyc') setCurrentStep('bio');
                else if (currentStep === 'company') setCurrentStep('kyc');
              }}
            >
              Previous Step
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorRegister;