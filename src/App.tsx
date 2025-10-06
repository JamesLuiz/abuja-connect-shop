import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorRegister from "@/pages/VendorRegister";
import VendorCatalogue from "@/pages/VendorCatalogue";
import OrderTracking from "@/pages/OrderTracking";
import Checkout from "@/pages/Checkout";
import Profile from "@/pages/Profile";
import VendorStore from "@/pages/VendorStore";
import VendorOrderManagement from "@/pages/VendorOrderManagement";
import VendorAnalytics from "@/pages/VendorAnalytics";
import VendorSettings from "@/pages/VendorSettings";
import HelpSupport from "@/pages/HelpSupport";
import EditProfile from "@/pages/EditProfile";
import AddProduct from "@/pages/AddProduct";
import HowItWorks from "@/pages/HowItWorks";
import VendorProgram from "@/pages/VendorProgram";
import CustomerSupport from "@/pages/CustomerSupport";
import Blog from "@/pages/Blog";
import Analytics from "@/pages/Analytics";
import Careers from "@/pages/Careers";
import PublishArticle from "@/pages/PublishArticle";
import JobApplication from "@/pages/JobApplication";
import JobDetails from "@/pages/JobDetails";
import CategoryVendors from "@/pages/CategoryVendors";
import VendorsMarketplace from "@/pages/VendorsMarketplace";
import Login from "@/pages/Login";
import OAuthCallback from "@/pages/OAuthCallback";
import AdminDashboard from "@/pages/AdminDashboard";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import AIAssistant from "@/components/AIAssistant";
import Wishlist from "./pages/Wishlist";
import AuthGuard from "@/components/AuthGuard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <AIAssistant />
          <Routes>
            {/* Public Routes - No authentication required */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/customer-support" element={<CustomerSupport />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/job/:jobId" element={<JobDetails />} />
            <Route path="/category/:category" element={<CategoryVendors />} />
            <Route path="/vendors" element={<VendorsMarketplace />} />
            <Route path="/vendor/:vendorId" element={<VendorCatalogue />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            
            {/* Blog - Partially public (some features require auth) */}
            <Route path="/blog" element={<Blog />} />
            
            {/* Protected Routes - Require authentication */}
            <Route path="/orders" element={
              <AuthGuard>
                <OrderTracking />
              </AuthGuard>
            } />
            <Route path="/checkout" element={
              <AuthGuard>
                <Checkout />
              </AuthGuard>
            } />
            <Route path="/profile" element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            } />
            <Route path="/profile/edit" element={
              <AuthGuard>
                <EditProfile />
              </AuthGuard>
            } />
            <Route path="/wishlist" element={
              <AuthGuard>
                <Wishlist />
              </AuthGuard>
            } />
            <Route path="/help" element={
              <AuthGuard>
                <HelpSupport />
              </AuthGuard>
            } />
            
            {/* Vendor-specific routes - Require vendor authentication */}
            <Route path="/vendor/register" element={<VendorRegister />} />
            <Route path="/vendor/store" element={
              <AuthGuard>
                <VendorStore />
              </AuthGuard>
            } />
            <Route path="/vendor/orders" element={
              <AuthGuard>
                <VendorOrderManagement />
              </AuthGuard>
            } />
            <Route path="/vendor/analytics" element={
              <AuthGuard>
                <VendorAnalytics />
              </AuthGuard>
            } />
            <Route path="/vendor/settings" element={
              <AuthGuard>
                <VendorSettings />
              </AuthGuard>
            } />
            <Route path="/vendor-program" element={
              <AuthGuard>
                <VendorProgram />
              </AuthGuard>
            } />
            <Route path="/add-product" element={
              <AuthGuard>
                <AddProduct />
              </AuthGuard>
            } />
            
            {/* Content creation routes - Require authentication */}
            <Route path="/blog/publish" element={
              <AuthGuard>
                <PublishArticle />
              </AuthGuard>
            } />
            <Route path="/careers/apply/:jobId" element={
              <AuthGuard>
                <JobApplication />
              </AuthGuard>
            } />
            
            {/* Admin routes - Require admin authentication */}
            <Route path="/analytics" element={
              <AuthGuard>
                <Analytics />
              </AuthGuard>
            } />
            <Route path="/admin-dashboard" element={
              <AuthGuard>
                <AdminDashboard />
              </AuthGuard>
            } />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
