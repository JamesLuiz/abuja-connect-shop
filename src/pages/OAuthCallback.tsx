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
        // Parse tokens from both query and hash fragments
        const queryParams = new URLSearchParams(location.search || '');
        const hashString = (location.hash || '').replace(/^#/, '');
        const hashParams = new URLSearchParams(hashString);

        const accessToken = queryParams.get('access_token')
          || hashParams.get('access_token')
          || queryParams.get('accessToken')
          || hashParams.get('accessToken')
          || queryParams.get('id_token')
          || hashParams.get('id_token');

        const refreshToken = queryParams.get('refresh_token')
          || hashParams.get('refresh_token')
          || queryParams.get('refreshToken')
          || hashParams.get('refreshToken');

        if (!accessToken) {
          console.error('Missing access token in callback');
          setStatus('Authentication failed - missing token');
          setTimeout(() => navigate('/login', { replace: true }), 1500);
          return;
        }

        setStatus('Storing authentication tokens...');
        try {
          localStorage.setItem('access_token', accessToken);
          if (refreshToken) localStorage.setItem('refresh_token', refreshToken);
        } catch (_) {}

        // Kick off profile application in the background (do not block redirect)
        try { applyAuthResponse({ access_token: accessToken, refresh_token: refreshToken }); } catch (_) {}

        // Determine redirect target: post_login_redirect > state > '/'
        let redirectPath = '/';
        try {
          const stored = localStorage.getItem('post_login_redirect');
          if (stored && typeof stored === 'string') redirectPath = stored;
        } catch (_) {}

        if (!redirectPath || redirectPath === '/') {
          const stateParam = queryParams.get('state') || hashParams.get('state');
          if (stateParam) {
            try {
              const decoded = decodeURIComponent(stateParam);
              if (decoded.startsWith('/')) redirectPath = decoded;
            } catch (_) {}
          }
        }

        setStatus('Redirecting...');
        setTimeout(() => {
          try { localStorage.removeItem('post_login_redirect'); } catch (_) {}
          navigate(redirectPath || '/', { replace: true });
        }, 50);
      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('Authentication failed - redirecting to login');
        setTimeout(() => navigate('/login', { replace: true }), 1500);
      }
    };

    handleCallback();
  }, [location.search, location.hash, applyAuthResponse, navigate]);

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


