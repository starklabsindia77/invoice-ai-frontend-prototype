
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet  } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";

// Layouts
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Platforms from "./pages/Platforms";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Security from "./pages/Security";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Help from "./pages/Help";
import HelpArticle from "./pages/HelpArticle";
import Contact from "./pages/Contact";

// Private Pages
import Dashboard from "./pages/dashboard/Dashboard";
import Invoices from "./pages/dashboard/Invoices";
import Analytics from "./pages/dashboard/Analytics";
import Integrations from "./pages/dashboard/Integrations";
import Subscription from "./pages/dashboard/Subscription";
import Settings from "./pages/dashboard/Settings";

// Components
import ChatSupport from "./components/ChatSupport";

const queryClient = new QueryClient();

// 🔐 PrivateRoute wrapper
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// 🌐 Public layout
const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ChatSupport />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/platforms" element={<Platforms />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/security" element={<Security />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help/:slug" element={<HelpArticle />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Private Routes (Dashboard) */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Dashboard />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/invoices"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Invoices />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/analytics"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Analytics />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/integrations"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Integrations />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/subscription"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Subscription />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <PrivateRoute>
                  <DashboardLayout>
                    <Settings />
                  </DashboardLayout>
                </PrivateRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
