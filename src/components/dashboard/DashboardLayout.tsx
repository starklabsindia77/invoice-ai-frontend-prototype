
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated, tenant } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-64">
        <main className="p-6">
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
      </div>
    </div>
  );
};

export default DashboardLayout;
