import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
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
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/vendor/register" element={<VendorRegister />} /> 
              <Route path="/vendor/:vendorId" element={<VendorCatalogue />} />
              <Route path="/orders" element={<OrderTracking />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/vendor/store" element={<VendorStore />} />
              <Route path="/vendor/orders" element={<VendorOrderManagement />} />
              <Route path="/vendor/analytics" element={<VendorAnalytics />} />
              <Route path="/vendor/settings" element={<VendorSettings />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/add-product" element={<AddProduct />} />
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
