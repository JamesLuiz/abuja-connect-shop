import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Monitor,
  Globe,
  CreditCard,
  Smartphone,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
    orderUpdates: true,
    priceAlerts: true
  });

  const toggleTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const updateNotificationSetting = (key: keyof typeof notifications, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <SettingsIcon className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>
          </div>

          <Tabs defaultValue="account" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Moon className="w-4 h-4" />
                <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user?.name || ''} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={user?.email || ''} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user?.phone || ''} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={user?.location || ''} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Password & Security</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Notifications
                    </h3>
                    
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Order Updates</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified about order status changes
                          </div>
                        </div>
                        <Switch
                          checked={notifications.orderUpdates}
                          onCheckedChange={(checked) => updateNotificationSetting('orderUpdates', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Price Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Be notified when items go on sale
                          </div>
                        </div>
                        <Switch
                          checked={notifications.priceAlerts}
                          onCheckedChange={(checked) => updateNotificationSetting('priceAlerts', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Marketing Emails</div>
                          <div className="text-sm text-muted-foreground">
                            Receive promotional content and deals
                          </div>
                        </div>
                        <Switch
                          checked={notifications.marketing}
                          onCheckedChange={(checked) => updateNotificationSetting('marketing', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Smartphone className="w-5 h-5" />
                      SMS & Push Notifications
                    </h3>
                    
                    <div className="space-y-4 pl-7">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">SMS Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Receive text messages for important updates
                          </div>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) => updateNotificationSetting('sms', checked)}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Push Notifications</div>
                          <div className="text-sm text-muted-foreground">
                            Browser push notifications
                          </div>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) => updateNotificationSetting('push', checked)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Theme Preference</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant={theme === 'light' ? 'default' : 'outline'}
                        onClick={() => toggleTheme('light')}
                        className="flex items-center gap-2 h-auto p-4"
                      >
                        <Sun className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Light</div>
                          <div className="text-sm opacity-70">Bright and clean</div>
                        </div>
                      </Button>
                      
                      <Button
                        variant={theme === 'dark' ? 'default' : 'outline'}
                        onClick={() => toggleTheme('dark')}
                        className="flex items-center gap-2 h-auto p-4"
                      >
                        <Moon className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">Dark</div>
                          <div className="text-sm opacity-70">Easy on the eyes</div>
                        </div>
                      </Button>
                      
                      <Button
                        variant={theme === 'system' ? 'default' : 'outline'}
                        onClick={() => toggleTheme('system')}
                        className="flex items-center gap-2 h-auto p-4"
                      >
                        <Monitor className="w-5 h-5" />
                        <div className="text-left">
                          <div className="font-medium">System</div>
                          <div className="text-sm opacity-70">Match your device</div>
                        </div>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Language & Region</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select 
                          id="language" 
                          className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                          defaultValue="en"
                        >
                          <option value="en">English</option>
                          <option value="ha">Hausa</option>
                          <option value="yo">Yoruba</option>
                          <option value="ig">Igbo</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="currency">Currency</Label>
                        <select 
                          id="currency" 
                          className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                          defaultValue="ngn"
                        >
                          <option value="ngn">Nigerian Naira (₦)</option>
                          <option value="usd">US Dollar ($)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data & Privacy</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Profile Visibility</div>
                          <div className="text-sm text-muted-foreground">
                            Make your profile visible to other users
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Purchase History</div>
                          <div className="text-sm text-muted-foreground">
                            Show purchase history in your profile
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Activity Status</div>
                          <div className="text-sm text-muted-foreground">
                            Show when you're active on the platform
                          </div>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Management</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        Download your data
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Delete account
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;