import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }

  try {
    const redirectPath = `${location.pathname}${location.search}${location.hash}`;
    localStorage.setItem('post_login_redirect', redirectPath || '/');
  } catch (_) {
    // ignore storage errors
  }

  return <Navigate to="/login" replace state={{ from: location }} />;
}
