import React, { useState } from 'react';
import { Bell, Search, HelpCircle, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useApp } from '@/contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetTrigger 
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const DashboardHeader: React.FC = () => {
  const { user, logout } = useApp();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Mock notifications for demo
  const notifications = [
    { id: 1, title: 'New invoice processed', description: 'INV-007 was processed successfully', time: '10m ago', read: false },
    { id: 2, title: 'Integration connected', description: 'Tally integration is now active', time: '1h ago', read: false },
    { id: 3, title: 'Storage limit reached 80%', description: 'Consider upgrading your plan', time: '3h ago', read: true },
    { id: 4, title: 'Maintenance scheduled', description: 'System maintenance on Apr 15', time: '1d ago', read: true },
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-border py-2 px-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        {/* Left side - Search */}
        <div className="flex-1 max-w-md">
          {isSearchOpen ? (
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search invoices, vendors..." 
                className="pl-8 h-9" 
                autoFocus
                onBlur={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)} className="text-muted-foreground">
              <Search className="h-4 w-4 mr-2" />
              <span>Search...</span>
            </Button>
          )}
        </div>
        
        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-2">
          {/* Help Button */}
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <HelpCircle className="h-5 w-5" />
          </Button>
          
          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-md ${notification.read ? 'bg-background' : 'bg-brand-50'}`}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="space-x-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">{user?.name || 'User'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;