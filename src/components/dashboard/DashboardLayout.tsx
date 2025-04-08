import React, { ReactNode } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';
import { SidebarProvider } from '@/components/ui/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated, tenant } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 overflow-auto p-6">
            {/* Breadcrumb/tenant info */}
            <div className="mb-6 pb-4 border-b border-border">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{tenant?.name || 'Your Workspace'}</span>
                <span className="mx-2 text-muted-foreground">•</span>
                <span className="text-muted-foreground">{tenant?.subdomain}.invoiceai.com</span>
              </div>
            </div>
            
            {/* Main content */}
            {children}
          </main>
          <DashboardFooter />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
