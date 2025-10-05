import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Analytics = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnalyticsDashboard />
      </div>
      
      <Footer />
    </div>
  );
};

export default Analytics;
