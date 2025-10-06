import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ArrowRight } from 'lucide-react';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthGuard = ({ 
  children, 
  fallback, 
  requireAuth = true, 
  redirectTo = '/login' 
}: AuthGuardProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If authentication is not required, render children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If user is authenticated, render children
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // If fallback is provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }

  // Default authentication prompt
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Authentication Required</CardTitle>
          <CardDescription>
            Please sign in to access this feature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              You need to be signed in to access this content.
            </p>
            <p className="text-sm text-muted-foreground">
              Sign in to continue or create a new account.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => navigate(redirectTo)}
              className="w-full"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(redirectTo)}
              className="w-full"
            >
              Create Account
            </Button>
          </div>
          
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-sm"
            >
              ← Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthGuard;