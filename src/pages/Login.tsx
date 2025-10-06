import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Building2, User, Mail, Phone, MapPin } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"customer" | "vendor">("customer");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // vendor controlled fields
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessCategory, setBusinessCategory] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, registerCustomer, registerVendor, googleClientId } = useAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, userType);
      setIsLoading(false);
      if (success) {
        toast({ title: 'Welcome back!', description: `Signed in as ${userType}` });
        try {
          const redirectPath = localStorage.getItem('post_login_redirect') || '/';
          localStorage.removeItem('post_login_redirect');
          navigate(redirectPath, { replace: true });
        } catch (_) {
          navigate('/', { replace: true });
        }
      } else {
        toast({ title: 'Login failed', description: 'Please check your credentials and try again.', variant: 'destructive' });
      }
    } catch (e) {
      setIsLoading(false);
      toast({ title: 'Login error', description: 'An error occurred while signing in.', variant: 'destructive' });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
  if (userType === 'customer') {
        // build a minimal payload from the form fields present in the UI
        const payload = { email, password } as any;
        const res = await registerCustomer(payload);
        setIsLoading(false);
        if (res) {
          toast({ title: 'Account created', description: 'Customer account created successfully' });
          // attempt login
          const success = await login(email, password, userType);
          if (success) {
            try {
              const redirectPath = localStorage.getItem('post_login_redirect') || '/';
              localStorage.removeItem('post_login_redirect');
              navigate(redirectPath, { replace: true });
            } catch (_) {
              navigate('/', { replace: true });
            }
          }
        } else {
          toast({ title: 'Registration failed', description: 'Could not create account', variant: 'destructive' });
        }
      } else {
        const payload = {
          email,
          password,
          businessName,
          fullName: contactPerson,
          businessPhoneNumber: businessPhone,
          businessAddress,
          businessCategory,
        } as any;
        const res = await registerVendor(payload);
        setIsLoading(false);
        if (res) {
          toast({ title: 'Vendor account created', description: 'Vendor created successfully' });
          const success = await login(email, password, userType);
          if (success) {
            try {
              const redirectPath = localStorage.getItem('post_login_redirect') || '/';
              localStorage.removeItem('post_login_redirect');
              navigate(redirectPath, { replace: true });
            } catch (_) {
              navigate('/', { replace: true });
            }
          }
        } else {
          toast({ title: 'Registration failed', description: 'Could not create vendor account', variant: 'destructive' });
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast({ title: 'Registration error', description: 'An error occurred while creating your account', variant: 'destructive' });
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000';
      // Store current intent for redirect after OAuth completes
      try {
        const intent = (typeof window !== 'undefined') ? (window.sessionStorage.getItem('post_login_redirect') || window.location.pathname + window.location.search + window.location.hash) : '/';
        localStorage.setItem('post_login_redirect', intent || '/');
      } catch (_) {}

      // Prefer backend-provided redirect URL, with timeout and robust fallback paths
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      let redirected = false;
      try {
        const urlRes = await fetch(`${apiUrl}/api/auth/google`, { signal: controller.signal });
        clearTimeout(timeoutId);
        const contentType = urlRes.headers.get('content-type') || '';
        if (urlRes.ok && contentType.includes('application/json')) {
          const json = await urlRes.json();
          if (json?.url) {
            window.location.href = json.url;
            redirected = true;
          }
        }
      } catch (_) {
        // ignore fetch/timeout errors and fallback below
        clearTimeout(timeoutId);
      }

      if (!redirected) {
        const stateParam = encodeURIComponent(localStorage.getItem('post_login_redirect') || '/');
        // Try both forms: with and without /api prefix
        const primary = `${apiUrl}/auth/google?state=${stateParam}`;
        const secondary = `${apiUrl}/api/auth/google?state=${stateParam}`;
        // Attempt primary first; set a quick fallback to secondary if navigation doesn't start
        const currentHref = typeof window !== 'undefined' ? window.location.href : '';
        try {
          window.location.href = primary;
          setTimeout(() => {
            try {
              if (window.location.href === currentHref) {
                window.location.href = secondary;
              }
            } catch (_) {}
          }, 1200);
        } catch (_) {
          window.location.href = secondary;
        }
      }
    } catch (e) {
      setIsLoading(false);
      toast({ title: 'Google auth error', description: 'Unable to start Google sign-in', variant: 'destructive' });
    }
  };

  // Google Identity Services (One Tap / Button) setup
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const clientId = googleClientId || ((typeof process !== 'undefined' && process.env.REACT_APP_GOOGLE_CLIENT_ID) || import.meta.env.VITE_GOOGLE_CLIENT_ID);
  if (!clientId) return;

    // Load the Google Identity Services script
    const scriptId = 'google-identity-services';
    if (!document.getElementById(scriptId)) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.id = scriptId;
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    }

      const handleCredentialResponse = async (response: any) => {
      if (!response?.credential) return;
      setIsLoading(true);
      try {
  const apiUrl = (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) || import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const endpoint = userType === 'vendor' ? '/api/auth/google/vendor' : '/api/auth/google/customer';
        const vendorPayload = userType === 'vendor' ? {
          idToken: response.credential,
          businessName,
          businessPhoneNumber: businessPhone,
          businessAddress,
          businessCategory,
          fullName: contactPerson,
        } : { idToken: response.credential };

        const res = await fetch(`${apiUrl}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vendorPayload),
        });
        const data = await res.json();
        setIsLoading(false);
        if (res.ok) {
          toast({ title: 'Signed in', description: 'Signed in with Google' });
          try {
            const redirectPath = localStorage.getItem('post_login_redirect') || '/';
            localStorage.removeItem('post_login_redirect');
            navigate(redirectPath, { replace: true });
          } catch (_) {
            navigate('/', { replace: true });
          }
        } else {
          toast({ title: 'Google auth failed', description: data?.message || 'Google sign-in failed', variant: 'destructive' });
        }
      } catch (e) {
        setIsLoading(false);
        toast({ title: 'Google auth error', description: 'An error occurred during Google sign-in', variant: 'destructive' });
      }
    };

    const tryInit = () => {
      // @ts-ignore - google is loaded dynamically
      const google = (window as any).google;
      if (!google || !google.accounts || !google.accounts.id) return;

      try {
        google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
        if (googleButtonRef.current) {
          google.accounts.id.renderButton(googleButtonRef.current, { theme: 'outline', size: 'large' });
        }
        // Optionally enable One Tap
        // google.accounts.id.prompt();
      } catch (e) {
        // ignore initialization errors
      }
    };

    // Wait a tick for the script to load
    const id = setInterval(() => {
      tryInit();
    }, 300);

    const timeout = setTimeout(() => clearInterval(id), 10000);

    return () => {
      clearInterval(id);
      clearTimeout(timeout);
    };
  }, [toast, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <Card className="shadow-xl border-0 bg-background/95 backdrop-blur">
          <Tabs defaultValue="signin" className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Google Authentication */}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
                </div>
              </div>

              {/* Sign In Tab */}
              <TabsContent value="signin" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label>Account Type</Label>
                  <Select value={userType} onValueChange={(value: "customer" | "vendor") => setUserType(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Customer Account
                        </div>
                      </SelectItem>
                      <SelectItem value="vendor">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          Vendor Account
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-xs text-muted-foreground">
                    {userType === "customer" 
                      ? "Demo: Use any email/password to login as Sarah Johnson" 
                      : "Demo: Use any email/password to login as Ahmed Musa"
                    }
                  </div>
                </div>
                
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="signin-email" 
                        type="email" 
                        placeholder="Enter your email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signin-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password"
                        className="pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm">
                      Forgot password?
                    </Button>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <Select value={userType} onValueChange={(value: "customer" | "vendor") => setUserType(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Customer Account
                          </div>
                        </SelectItem>
                        <SelectItem value="vendor">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            Vendor Account
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="text-xs text-muted-foreground mt-1">
                      {userType === "customer" 
                        ? "Demo: Use any email/password to login as Sarah Johnson" 
                        : "Demo: Use any email/password to login as Ahmed Musa"
                      }
                    </div>
                  </div>

                <form onSubmit={handleSignUp} className="space-y-4">
                  {userType === "vendor" ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="business-name">Business Name</Label>
                          <Input 
                            id="business-name" 
                            placeholder="Your business name"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contact-person">Contact Person</Label>
                          <Input 
                            id="contact-person" 
                            placeholder="Full name"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-email">Business Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="business-email" 
                            type="email" 
                            placeholder="business@example.com"
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-phone">Business Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="business-phone" 
                            type="tel" 
                            placeholder="+1 (555) 000-0000"
                            value={businessPhone}
                            onChange={(e) => setBusinessPhone(e.target.value)}
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-address">Business Address</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="business-address" 
                            placeholder="Street address, City, State"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="business-category">Business Category</Label>
                        <Select value={businessCategory} onValueChange={(v: string) => setBusinessCategory(v)} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your business category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="electronics">Electronics</SelectItem>
                            <SelectItem value="fashion">Fashion & Style</SelectItem>
                            <SelectItem value="home">Home & Garden</SelectItem>
                            <SelectItem value="beauty">Beauty & Health</SelectItem>
                            <SelectItem value="sports">Sports & Fitness</SelectItem>
                            <SelectItem value="books">Books & Media</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input 
                            id="first-name" 
                            placeholder="John"
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input 
                            id="last-name" 
                            placeholder="Doe"
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="customer-email" 
                            type="email" 
                            placeholder="john@example.com"
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customer-phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="customer-phone" 
                            type="tel" 
                            placeholder="+1 (555) 000-0000"
                            className="pl-10"
                            required 
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input 
                        id="signup-password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create a strong password"
                        className="pr-10"
                        required 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="Confirm your password"
                      required 
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Button variant="link" className="px-0 text-sm h-auto">
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="px-0 text-sm h-auto">
                        Privacy Policy
                      </Button>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating account..." : `Create ${userType} Account`}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Button variant="link" className="px-0 text-sm h-auto" onClick={() => navigate("/customer-support")}>
              Contact Support
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;