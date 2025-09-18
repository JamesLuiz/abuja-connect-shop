import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Camera,
  ShoppingBag,
  Heart,
  Star,
  TrendingUp,
  Shield,
  CheckCircle
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  
  // Use data from auth context
  const userData = user || {
    name: 'Guest User',
    email: 'guest@example.com',
    phone: '+234 800 000 0000',
    address: 'Not provided',
    avatar: '',
    joinDate: 'Recently',
    role: 'customer' as const,
    isVerified: false,
    bio: 'No bio available.',
    totalOrders: 0,
    totalSpent: 0,
    storeRevenue: 0,
    storeRating: 0,
    completedSales: 0
  };

  const stats = [
    { icon: ShoppingBag, label: 'Total Orders', value: userData.totalOrders, color: 'text-primary' },
    { icon: Heart, label: 'Wishlist Items', value: 23, color: 'text-accent' },
    { icon: Star, label: 'Reviews Given', value: 89, color: 'text-yellow-500' },
    { icon: TrendingUp, label: 'Member Since', value: userData.joinDate, color: 'text-muted-foreground' }
  ];

  const vendorStats = [
    { icon: TrendingUp, label: 'Store Revenue', value: `₦${userData.storeRevenue?.toLocaleString()}`, color: 'text-primary' },
    { icon: ShoppingBag, label: 'Completed Sales', value: userData.completedSales, color: 'text-accent' },
    { icon: Star, label: 'Store Rating', value: userData.storeRating, color: 'text-yellow-500' },
    { icon: Shield, label: 'Trust Score', value: '96%', color: 'text-green-500' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-medium">
                      {userData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 w-8 h-8">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">{userData.name}</h1>
                    {userData.isVerified && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userData.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Member since {userData.joinDate}</span>
                    </div>
                  </div>

                  <p className="text-foreground mb-4">{userData.bio}</p>
                  
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {(userData.role === 'vendor' ? vendorStats : stats).map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile Tabs */}
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="Adebayo" disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Johnson" disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue={userData.email} disabled={!isEditing} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={userData.phone} disabled={!isEditing} />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue={userData.address} disabled={!isEditing} />
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" defaultValue={userData.bio} disabled={!isEditing} rows={3} />
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-4">
                      <Button>Save Changes</Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Order Updates</div>
                      <div className="text-sm text-muted-foreground">Get notified about order status changes</div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Marketing Emails</div>
                      <div className="text-sm text-muted-foreground">Receive promotional emails and deals</div>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">Get text messages for important updates</div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
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

export default Profile;