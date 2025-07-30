import { useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Store,
  Settings,
  CreditCard,
  Truck,
  Bell,
  Shield,
  Globe,
  Camera,
  Save,
  Upload,
  CheckCircle,
  X
} from 'lucide-react';

// A reusable Success Popup Component
const SuccessPopup = ({ message, onClose }) => (
  <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-foreground text-background py-3 px-5 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in-5 slide-in-from-bottom-5">
    <CheckCircle className="w-5 h-5 text-green-400" />
    <p className="font-medium text-sm">{message}</p>
    <button onClick={onClose} className="ml-4 text-muted-foreground hover:text-background">
      <X className="w-5 h-5" />
    </button>
  </div>
);

// A self-contained Image Uploader Component
const ImageUploader = () => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Please select a JPG, PNG, or WEBP image.');
      setPreview(null);
      return;
    }

    // Validate file size (5MB max)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError('File is too large. Maximum size is 5MB.');
      setPreview(null);
      return;
    }

    // If valid, create a preview
    setError('');
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
  
  return (
    <div className="space-y-4">
      <Label>Store Logo</Label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Image Preview */}
        <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center border border-dashed shrink-0">
          {preview ? (
            <img src={preview} alt="Logo preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Store className="w-10 h-10 text-muted-foreground" />
          )}
        </div>
        
        {/* Uploader section */}
        <div className="flex-grow">
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/webp"
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={handleUploadClick}>
            <Upload className="w-4 h-4 mr-2" />
            {preview ? 'Change Logo' : 'Select Logo'}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            High-quality PNG, JPG, or WEBP. Max 5MB.
          </p>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};


const VendorSettings = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveChanges = (e) => {
    e.preventDefault(); // Prevent actual form submission for this demo
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000); // Auto-hide after 4 seconds
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-1">Store Settings</h1>
            <p className="text-muted-foreground">Manage your store's configuration and preferences.</p>
          </div>

          {/* Settings Tabs */}
          <Tabs defaultValue="general" className="w-full">
            {/* Responsive, scrollable TabsList */}
            <div className="w-full overflow-x-auto pb-1">
              <TabsList className="w-max">
                <TabsTrigger value="general"><Store className="w-4 h-4 mr-2" />General</TabsTrigger>
                <TabsTrigger value="shipping"><Truck className="w-4 h-4 mr-2" />Shipping</TabsTrigger>
                <TabsTrigger value="payments"><CreditCard className="w-4 h-4 mr-2" />Payments</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2" />Notifications</TabsTrigger>
                <TabsTrigger value="security"><Shield className="w-4 h-4 mr-2" />Security</TabsTrigger>
              </TabsList>
            </div>
            
            <form onSubmit={handleSaveChanges} className="mt-6 space-y-6">
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Update your store's public details and branding.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="storeName">Store Name</Label><Input id="storeName" defaultValue="Adebayo's Electronics Hub" /></div>
                      <div className="space-y-2"><Label htmlFor="storeUrl">Store URL</Label><Input id="storeUrl" defaultValue="adebayo-electronics" /></div>
                    </div>
                    <div className="space-y-2"><Label htmlFor="storeDescription">Store Description</Label><Textarea id="storeDescription" defaultValue="Premium electronics and gadgets with warranty. Trusted by thousands of customers across Nigeria." rows={3}/></div>
                    <div className="space-y-2"><Label htmlFor="storeAddress">Store Address</Label><Textarea id="storeAddress" placeholder="Enter your complete store address" rows={2}/></div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="contactEmail">Contact Email</Label><Input id="contactEmail" type="email" defaultValue="support@adebayo-electronics.com" /></div>
                      <div className="space-y-2"><Label htmlFor="contactPhone">Contact Phone</Label><Input id="contactPhone" defaultValue="+234 809 123 4567" /></div>
                    </div>
                    <ImageUploader />
                    <div className="flex justify-end pt-4 border-t"><Button type="submit"><Save className="w-4 h-4 mr-2" />Save Changes</Button></div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Settings</CardTitle>
                    <CardDescription>Configure how you ship orders to your customers.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2"><Label htmlFor="processingTime">Processing Time (days)</Label><Select defaultValue="1-3"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1 day</SelectItem><SelectItem value="1-3">1-3 days</SelectItem><SelectItem value="3-5">3-5 days</SelectItem><SelectItem value="5-7">5-7 days</SelectItem></SelectContent></Select></div>
                      <div className="space-y-2"><Label htmlFor="shippingOrigin">Shipping Origin</Label><Input id="shippingOrigin" defaultValue="Abuja, FCT" /></div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Shipping Zones</h4>
                      <div className="space-y-3">
                        {/* Responsive list item */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-2">
                          <div><h5 className="font-medium">Lagos State</h5><p className="text-sm text-muted-foreground">Delivery: 2-3 days</p></div>
                          <div className="flex items-center gap-4 self-end sm:self-center"><p className="font-medium">₦2,500</p><Button variant="outline" size="sm" type="button">Edit</Button></div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg gap-2">
                          <div><h5 className="font-medium">Other States</h5><p className="text-sm text-muted-foreground">Delivery: 5-7 days</p></div>
                          <div className="flex items-center gap-4 self-end sm:self-center"><p className="font-medium">₦3,500</p><Button variant="outline" size="sm" type="button">Edit</Button></div>
                        </div>
                      </div>
                      <Button variant="outline" className="mt-4" type="button">Add Shipping Zone</Button>
                    </div>
                    <div className="flex justify-end pt-4 border-t"><Button type="submit"><Save className="w-4 h-4 mr-2" />Save Shipping Settings</Button></div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments">
                  <Card>
                      <CardHeader>
                          <CardTitle>Payment Settings</CardTitle>
                          <CardDescription>Connect payment gateways and set up your bank account for payouts.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                          <div>
                              <h4 className="font-medium text-foreground mb-3">Payment Methods</h4>
                              <div className="space-y-3">
                                  <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center"><Switch defaultChecked id="paystack"/><div className="ml-3"><Label htmlFor="paystack" className="font-medium">Paystack</Label><p className="text-sm text-muted-foreground">Accept cards and bank transfers</p></div></div><Button variant="outline" size="sm" type="button">Configure</Button></div>
                                  <div className="flex items-center justify-between p-4 border rounded-lg"><div className="flex items-center"><Switch id="flutterwave"/><div className="ml-3"><Label htmlFor="flutterwave" className="font-medium">Flutterwave</Label><p className="text-sm text-muted-foreground">Alternative payment gateway</p></div></div><Button variant="outline" size="sm" type="button">Configure</Button></div>
                              </div>
                          </div>
                          <div className="space-y-2"><Label>Bank Account (for payouts)</Label><div className="grid sm:grid-cols-2 gap-4"><Input placeholder="Account Number" /><Input placeholder="Bank Name" /></div></div>
                          <div className="flex justify-end pt-4 border-t"><Button type="submit"><Save className="w-4 h-4 mr-2" />Save Payment Settings</Button></div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="notifications">
                  <Card>
                      <CardHeader>
                          <CardTitle>Notification Preferences</CardTitle>
                          <CardDescription>Choose which notifications you want to receive.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                          <div className="space-y-5">
                              <div className="flex items-start sm:items-center justify-between gap-4"><div className="flex-grow"><Label htmlFor="notif-orders" className="font-medium">New Orders</Label><p className="text-sm text-muted-foreground">Get notified when you receive new orders.</p></div><Switch defaultChecked id="notif-orders"/></div>
                              <div className="flex items-start sm:items-center justify-between gap-4"><div className="flex-grow"><Label htmlFor="notif-stock" className="font-medium">Low Stock Alerts</Label><p className="text-sm text-muted-foreground">Alert when product stock is running low.</p></div><Switch defaultChecked id="notif-stock"/></div>
                              <div className="flex items-start sm:items-center justify-between gap-4"><div className="flex-grow"><Label htmlFor="notif-msg" className="font-medium">Customer Messages</Label><p className="text-sm text-muted-foreground">Notifications for new customer inquiries.</p></div><Switch defaultChecked id="notif-msg"/></div>
                              <div className="flex items-start sm:items-center justify-between gap-4"><div className="flex-grow"><Label htmlFor="notif-mktg" className="font-medium">Marketing Updates</Label><p className="text-sm text-muted-foreground">Platform updates and promotional info.</p></div><Switch id="notif-mktg"/></div>
                          </div>
                          <div className="flex justify-end pt-4 border-t"><Button type="submit"><Save className="w-4 h-4 mr-2" />Save Preferences</Button></div>
                      </CardContent>
                  </Card>
              </TabsContent>

              <TabsContent value="security">
                  <Card>
                      <CardHeader>
                          <CardTitle>Security Settings</CardTitle>
                          <CardDescription>Manage your password and account security features.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8">
                          <div>
                              <h4 className="font-medium text-foreground mb-3">Change Password</h4>
                              <div className="space-y-4 max-w-sm">
                                  <div className="space-y-2"><Label htmlFor="currentPassword">Current Password</Label><Input id="currentPassword" type="password" /></div>
                                  <div className="space-y-2"><Label htmlFor="newPassword">New Password</Label><Input id="newPassword" type="password" /></div>
                                  <div className="space-y-2"><Label htmlFor="confirmPassword">Confirm New Password</Label><Input id="confirmPassword" type="password" /></div>
                                  <Button type="button">Update Password</Button>
                              </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-3">Two-Factor Authentication (2FA)</h4>
                            <div className="flex items-center justify-between p-4 border rounded-lg max-w-sm">
                                <div><h5 className="font-medium">Enable 2FA</h5><p className="text-sm text-muted-foreground">Secure your account with 2FA.</p></div>
                                <Switch />
                            </div>
                          </div>
                          <div className="flex justify-end pt-4 border-t"><Button type="submit"><Save className="w-4 h-4 mr-2" />Save Security Settings</Button></div>
                      </CardContent>
                  </Card>
              </TabsContent>
            </form>

          </Tabs>
        </div>
      </main>
      
      {showSuccess && (
        <SuccessPopup 
          message="Changes saved successfully!" 
          onClose={() => setShowSuccess(false)} 
        />
      )}
      
      <Footer />
    </div>
  );
};

export default VendorSettings;