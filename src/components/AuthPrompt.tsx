import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, ArrowRight, User, Store } from 'lucide-react';

interface AuthPromptProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: string;
  userType?: 'customer' | 'vendor';
  onAuthSuccess?: () => void;
}

const AuthPrompt = ({ 
  children, 
  title = "Sign in required",
  description = "Please sign in to continue with this action",
  action = "Sign In",
  userType,
  onAuthSuccess
}: AuthPromptProps) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // If user is authenticated, render children
  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  // If user type is specified and matches, render children
  if (userType && user?.role === userType) {
    return <>{children}</>;
  }

  // Show authentication prompt
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Lock className="h-5 w-5 mr-2 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {userType === 'vendor' 
                ? "Vendor account required for this action"
                : userType === 'customer'
                ? "Customer account required for this action"
                : "Please sign in to continue"
              }
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => {
                navigate('/login');
                onAuthSuccess?.();
              }}
              className="w-full"
            >
              {action}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            {userType && (
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  {userType === 'vendor' 
                    ? "Need a vendor account? " 
                    : "Need a customer account? "
                  }
                  <Button 
                    variant="link" 
                    className="px-0 text-xs h-auto"
                    onClick={() => navigate('/login')}
                  >
                    Create one here
                  </Button>
                </p>
              </div>
            )}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPrompt;