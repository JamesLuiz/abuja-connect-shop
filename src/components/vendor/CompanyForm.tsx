import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building, CreditCard, MapPin } from 'lucide-react';

interface CompanyForm {
  businessName: string;
  businessType: 'individual' | 'partnership' | 'limited_company' | 'ngo' | '';
  businessCategory: string;
  businessDescription: string;
  businessAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  cacNumber: string;
  tinNumber: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
  };
}

interface CompanyFormProps {
  onComplete: (data: CompanyForm) => void;
  initialData?: Partial<CompanyForm>;
}

const CompanyForm = ({ onComplete, initialData }: CompanyFormProps) => {
  const [formData, setFormData] = useState<CompanyForm>({
    businessName: initialData?.businessName || '',
    businessType: initialData?.businessType || '',
    businessCategory: initialData?.businessCategory || '',
    businessDescription: initialData?.businessDescription || '',
    businessAddress: {
      street: initialData?.businessAddress?.street || '',
      city: initialData?.businessAddress?.city || '',
      state: initialData?.businessAddress?.state || '',
      postalCode: initialData?.businessAddress?.postalCode || '',
    },
    cacNumber: initialData?.cacNumber || '',
    tinNumber: initialData?.tinNumber || '',
    bankDetails: {
      accountName: initialData?.bankDetails?.accountName || '',
      accountNumber: initialData?.bankDetails?.accountNumber || '',
      bankName: initialData?.bankDetails?.bankName || '',
      bankCode: initialData?.bankDetails?.bankCode || '',
    }
  });

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const businessTypes = [
    { value: 'individual', label: 'Individual/Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'limited_company', label: 'Limited Liability Company' },
    { value: 'ngo', label: 'NGO/Non-Profit' },
  ];

  const businessCategories = [
    'Fashion & Clothing', 'Electronics & Gadgets', 'Home & Garden', 'Beauty & Personal Care',
    'Sports & Outdoors', 'Books & Media', 'Food & Beverages', 'Health & Wellness',
    'Automotive', 'Baby & Kids', 'Crafts & Hobbies', 'Business & Industrial',
    'Services', 'Others'
  ];

  const nigerianBanks = [
    { name: 'Access Bank', code: '044' },
    { name: 'Citibank Nigeria', code: '023' },
    { name: 'Ecobank Nigeria', code: '050' },
    { name: 'Fidelity Bank', code: '070' },
    { name: 'First Bank of Nigeria', code: '011' },
    { name: 'First City Monument Bank', code: '214' },
    { name: 'Guaranty Trust Bank', code: '058' },
    { name: 'Heritage Bank', code: '030' },
    { name: 'Keystone Bank', code: '082' },
    { name: 'Polaris Bank', code: '076' },
    { name: 'Providus Bank', code: '101' },
    { name: 'Stanbic IBTC Bank', code: '221' },
    { name: 'Standard Chartered Bank', code: '068' },
    { name: 'Sterling Bank', code: '232' },
    { name: 'Union Bank of Nigeria', code: '032' },
    { name: 'United Bank For Africa', code: '033' },
    { name: 'Unity Bank', code: '215' },
    { name: 'Wema Bank', code: '035' },
    { name: 'Zenith Bank', code: '057' },
  ];

  const nigerianStates = [
    'Abuja FCT', 'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.businessType) newErrors.businessType = 'Business type is required';
    if (!formData.businessCategory) newErrors.businessCategory = 'Business category is required';
    if (!formData.businessDescription.trim()) newErrors.businessDescription = 'Business description is required';
    if (!formData.tinNumber.trim()) newErrors.tinNumber = 'TIN number is required';
    
    // Bank details validation
    if (!formData.bankDetails.accountName.trim()) newErrors.accountName = 'Account name is required';
    if (!formData.bankDetails.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.bankDetails.bankName) newErrors.bankName = 'Bank name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateNestedField = (parent: 'businessAddress' | 'bankDetails', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBankSelection = (bankName: string) => {
    const bank = nigerianBanks.find(b => b.name === bankName);
    setFormData(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        bankName,
        bankCode: bank?.code || ''
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Details</CardTitle>
        <CardDescription>
          Tell us about your business to complete your vendor registration
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Business Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  placeholder="Enter your business name"
                  className={errors.businessName ? 'border-destructive' : ''}
                />
                {errors.businessName && (
                  <p className="text-sm text-destructive">{errors.businessName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Business Type *</Label>
                <Select 
                  value={formData.businessType} 
                  onValueChange={(value) => updateFormData('businessType', value)}
                >
                  <SelectTrigger className={errors.businessType ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.businessType && (
                  <p className="text-sm text-destructive">{errors.businessType}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Business Category *</Label>
              <Select 
                value={formData.businessCategory} 
                onValueChange={(value) => updateFormData('businessCategory', value)}
              >
                <SelectTrigger className={errors.businessCategory ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select business category" />
                </SelectTrigger>
                <SelectContent>
                  {businessCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.businessCategory && (
                <p className="text-sm text-destructive">{errors.businessCategory}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessDescription">Business Description *</Label>
              <Textarea
                id="businessDescription"
                value={formData.businessDescription}
                onChange={(e) => updateFormData('businessDescription', e.target.value)}
                placeholder="Describe your business, what you sell, and what makes you unique..."
                rows={4}
                className={errors.businessDescription ? 'border-destructive' : ''}
              />
              {errors.businessDescription && (
                <p className="text-sm text-destructive">{errors.businessDescription}</p>
              )}
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Business Address</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessStreet">Street Address</Label>
                <Input
                  id="businessStreet"
                  value={formData.businessAddress.street}
                  onChange={(e) => updateNestedField('businessAddress', 'street', e.target.value)}
                  placeholder="Enter business street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessCity">City</Label>
                  <Input
                    id="businessCity"
                    value={formData.businessAddress.city}
                    onChange={(e) => updateNestedField('businessAddress', 'city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select 
                    value={formData.businessAddress.state} 
                    onValueChange={(value) => updateNestedField('businessAddress', 'state', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessPostalCode">Postal Code</Label>
                  <Input
                    id="businessPostalCode"
                    value={formData.businessAddress.postalCode}
                    onChange={(e) => updateNestedField('businessAddress', 'postalCode', e.target.value)}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Registration Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Registration Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cacNumber">CAC Registration Number</Label>
                <Input
                  id="cacNumber"
                  value={formData.cacNumber}
                  onChange={(e) => updateFormData('cacNumber', e.target.value)}
                  placeholder="Enter CAC number (if applicable)"
                />
                <p className="text-xs text-muted-foreground">
                  Only required for registered companies
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tinNumber">TIN Number *</Label>
                <Input
                  id="tinNumber"
                  value={formData.tinNumber}
                  onChange={(e) => updateFormData('tinNumber', e.target.value)}
                  placeholder="Enter TIN number"
                  className={errors.tinNumber ? 'border-destructive' : ''}
                />
                {errors.tinNumber && (
                  <p className="text-sm text-destructive">{errors.tinNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Bank Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name *</Label>
                <Input
                  id="accountName"
                  value={formData.bankDetails.accountName}
                  onChange={(e) => updateNestedField('bankDetails', 'accountName', e.target.value)}
                  placeholder="Enter account name"
                  className={errors.accountName ? 'border-destructive' : ''}
                />
                {errors.accountName && (
                  <p className="text-sm text-destructive">{errors.accountName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => updateNestedField('bankDetails', 'accountNumber', e.target.value)}
                  placeholder="Enter account number"
                  className={errors.accountNumber ? 'border-destructive' : ''}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bank Name *</Label>
              <Select 
                value={formData.bankDetails.bankName} 
                onValueChange={handleBankSelection}
              >
                <SelectTrigger className={errors.bankName ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select bank" />
                </SelectTrigger>
                <SelectContent>
                  {nigerianBanks.map((bank) => (
                    <SelectItem key={bank.code} value={bank.name}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bankName && (
                <p className="text-sm text-destructive">{errors.bankName}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="px-8">
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;