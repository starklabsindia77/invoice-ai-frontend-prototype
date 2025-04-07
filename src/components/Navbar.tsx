
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, tenant } = useApp();

  return (
    <nav className="border-b border-border bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Logo variant="dark" />
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {tenant && (
                <span className="text-sm text-muted-foreground">
                  {tenant.name}
                </span>
              )}
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                >
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/about">About</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/contact">Contact</Link>
              </Button>
              <div className="h-4 w-px bg-border"></div>
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
