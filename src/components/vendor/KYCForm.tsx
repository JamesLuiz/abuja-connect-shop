import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, FileText, Camera, CheckCircle, AlertCircle } from 'lucide-react';

interface KYCForm {
  idType: 'nin' | 'bvn' | 'passport' | 'drivers_license' | '';
  idNumber: string;
  idDocument: File | null;
  selfiePhoto: File | null;
  proofOfAddress: File | null;
}

interface KYCFormProps {
  onComplete: (data: KYCForm) => void;
  initialData?: Partial<KYCForm>;
}

const KYCForm = ({ onComplete, initialData }: KYCFormProps) => {
  const [formData, setFormData] = useState<KYCForm>({
    idType: initialData?.idType || '',
    idNumber: initialData?.idNumber || '',
    idDocument: initialData?.idDocument || null,
    selfiePhoto: initialData?.selfiePhoto || null,
    proofOfAddress: initialData?.proofOfAddress || null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof KYCForm, string>>>({});
  const [uploadStatus, setUploadStatus] = useState<{
    idDocument: 'idle' | 'uploading' | 'success' | 'error';
    selfiePhoto: 'idle' | 'uploading' | 'success' | 'error';
    proofOfAddress: 'idle' | 'uploading' | 'success' | 'error';
  }>({
    idDocument: 'idle',
    selfiePhoto: 'idle',
    proofOfAddress: 'idle'
  });

  const idTypes = [
    { value: 'nin', label: 'National Identity Number (NIN)' },
    { value: 'bvn', label: 'Bank Verification Number (BVN)' },
    { value: 'passport', label: 'International Passport' },
    { value: 'drivers_license', label: 'Driver\'s License' },
  ];

  const validateForm = () => {
    const newErrors: Partial<Record<keyof KYCForm, string>> = {};

    if (!formData.idType) newErrors.idType = 'Please select an ID type';
    if (!formData.idNumber.trim()) newErrors.idNumber = 'ID number is required';
    if (!formData.idDocument) newErrors.idDocument = 'ID document is required';
    if (!formData.selfiePhoto) newErrors.selfiePhoto = 'Selfie photo is required';
    if (!formData.proofOfAddress) newErrors.proofOfAddress = 'Proof of address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete(formData);
    }
  };

  const updateFormData = (field: keyof KYCForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileUpload = (field: 'idDocument' | 'selfiePhoto' | 'proofOfAddress', file: File) => {
    setUploadStatus(prev => ({ ...prev, [field]: 'uploading' }));
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus(prev => ({ ...prev, [field]: 'success' }));
      updateFormData(field, file);
    }, 1500);
  };

  const FileUploadSection = ({ 
    field, 
    title, 
    description, 
    accept, 
    icon: Icon 
  }: {
    field: 'idDocument' | 'selfiePhoto' | 'proofOfAddress';
    title: string;
    description: string;
    accept: string;
    icon: any;
  }) => {
    const status = uploadStatus[field];
    const file = formData[field];
    const error = errors[field];

    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{title}</Label>
        <p className="text-xs text-muted-foreground">{description}</p>
        
        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          error ? 'border-destructive bg-destructive/5' : 
          status === 'success' ? 'border-primary bg-primary/5' :
          'border-border hover:border-primary/50'
        }`}>
          {status === 'success' && file ? (
            <div className="space-y-2">
              <CheckCircle className="h-8 w-8 text-primary mx-auto" />
              <p className="text-sm text-primary font-medium">File uploaded successfully</p>
              <p className="text-xs text-muted-foreground">{file.name}</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setUploadStatus(prev => ({ ...prev, [field]: 'idle' }));
                  updateFormData(field, null);
                }}
              >
                Replace File
              </Button>
            </div>
          ) : status === 'uploading' ? (
            <div className="space-y-2">
              <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <Icon className="h-8 w-8 text-muted-foreground mx-auto" />
              <div>
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">Maximum file size: 5MB</p>
              </div>
              <input
                type="file"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(field, file);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification (KYC)</CardTitle>
        <CardDescription>
          We need to verify your identity to ensure the security of our platform. All information is encrypted and securely stored.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ID Type *</Label>
              <Select 
                value={formData.idType} 
                onValueChange={(value) => updateFormData('idType', value)}
              >
                <SelectTrigger className={errors.idType ? 'border-destructive' : ''}>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  {idTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.idType && (
                <p className="text-sm text-destructive">{errors.idType}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number *</Label>
              <Input
                id="idNumber"
                value={formData.idNumber}
                onChange={(e) => updateFormData('idNumber', e.target.value)}
                placeholder="Enter your ID number"
                className={errors.idNumber ? 'border-destructive' : ''}
              />
              {errors.idNumber && (
                <p className="text-sm text-destructive">{errors.idNumber}</p>
              )}
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-6">
            <FileUploadSection
              field="idDocument"
              title="ID Document *"
              description="Upload a clear photo of your selected ID document"
              accept="image/*,.pdf"
              icon={FileText}
            />
            
            <FileUploadSection
              field="selfiePhoto"
              title="Selfie Photo *"
              description="Take a selfie holding your ID document next to your face"
              accept="image/*"
              icon={Camera}
            />
            
            <FileUploadSection
              field="proofOfAddress"
              title="Proof of Address *"
              description="Upload a utility bill or bank statement not older than 3 months"
              accept="image/*,.pdf"
              icon={Upload}
            />
          </div>

          {/* Security Notice */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Your information is secure</p>
                <p className="text-xs text-muted-foreground">
                  All documents are encrypted and will only be used for verification purposes. 
                  We comply with Nigerian data protection regulations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="px-8">
              Continue to Business Details
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default KYCForm;