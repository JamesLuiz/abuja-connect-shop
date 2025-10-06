import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const OAuthCallback = () => {
  const { applyAuthResponse } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const access_token = params.get('access_token');
        const refresh_token = params.get('refresh_token');
        
        if (!access_token || !refresh_token) {
          console.error('Missing tokens in callback');
          setStatus('Authentication failed - missing tokens');
          setTimeout(() => navigate('/login', { replace: true }), 2000);
          return;
        }

        setStatus('Storing authentication tokens...');
        // Apply auth response and wait for completion
        await applyAuthResponse({ access_token, refresh_token });
        
        setStatus('Redirecting...');
        // Small delay to ensure tokens are stored
        setTimeout(() => {
          try {
            const redirectPath = localStorage.getItem('post_login_redirect') || '/';
            localStorage.removeItem('post_login_redirect');
            navigate(redirectPath, { replace: true });
          } catch (_) {
            navigate('/', { replace: true });
          }
        }, 100);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('Authentication failed - redirecting to login');
        setTimeout(() => navigate('/login', { replace: true }), 2000);
      }
    };

    handleCallback();
  }, [location.search, applyAuthResponse, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
};

export default OAuthCallback;


