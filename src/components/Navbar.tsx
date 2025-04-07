
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout, tenant } = useApp();

  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Logo variant="dark" />
          
          {!isAuthenticated && (
            <div className="hidden md:flex items-center ml-10 space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Product <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/features" className="w-full">Features</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/platforms" className="w-full">Platforms</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/security" className="w-full">Security</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/pricing">Pricing</Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    Resources <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/resources" className="w-full">Resource Hub</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blog" className="w-full">Blog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="w-full">Help Center</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <Link to="/customers">Customers</Link>
              </Button>
            </div>
          )}
        </div>
        
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
                className="hidden md:inline-flex"
              >
                <Link to="/contact">Contact</Link>
              </Button>
              <div className="h-4 w-px bg-border hidden md:block"></div>
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
