
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const DashboardFooter: React.FC = () => {
  const { subscription } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white p-4 text-sm text-muted-foreground">
      <div className="container flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0">
          <p>© {currentYear} InvoiceAI. All rights reserved.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {subscription && (
            <span className="mr-4 px-2 py-1 rounded-full text-xs bg-brand-50 text-brand-700 font-medium">
              {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
            </span>
          )}
          
          <Link to="/dashboard/settings" className="hover:text-brand-700">
            Settings
          </Link>
          <Link to="/help" className="hover:text-brand-700">
            Help
          </Link>
          <Link to="/dashboard/support" className="hover:text-brand-700">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
