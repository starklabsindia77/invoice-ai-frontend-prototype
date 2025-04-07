import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { useApp } from '@/contexts/AppContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  FileText, 
  LineChart, 
  Download, 
  Settings, 
  LogOut 
} from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const { tenant, logout } = useApp();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between mt-4 mb-4">
        {!isCollapsed && <Logo size={isCollapsed ? "sm" : "md"} variant="dark" /> }
        <SidebarTrigger className="size-5" />
      </SidebarHeader>

      <SidebarContent>
        {!isCollapsed && (
          <div className="mb-4 px-4">
            <div className="text-sm text-sidebar-foreground/70">
              Workspace
            </div>
            <div className="font-medium text-sidebar-foreground truncate">
              {tenant?.name || 'My Workspace'}
            </div>
          </div>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/dashboard'} 
              tooltip={isCollapsed ? "Dashboard" : undefined}
            >
              <Link to="/dashboard" className="flex items-center">
                <LayoutDashboard className="size-5" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/dashboard/invoices'} 
              tooltip={isCollapsed ? "Invoices" : undefined}
            >
              <Link to="/dashboard/invoices" className="flex items-center">
                <FileText className="size-5" />
                <span className="ml-3">Invoices</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/dashboard/analytics'} 
              tooltip={isCollapsed ? "Analytics" : undefined}
            >
              <Link to="/dashboard/analytics" className="flex items-center">
                <LineChart className="size-5" />
                <span className="ml-3">Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/dashboard/integrations'} 
              tooltip={isCollapsed ? "Integrations" : undefined}
            >
              <Link to="/dashboard/integrations" className="flex items-center">
                <Download className="size-5" />
                <span className="ml-3">Integrations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={location.pathname === '/dashboard/settings'} 
              tooltip={isCollapsed ? "Settings" : undefined}
            >
              <Link to="/dashboard/settings" className="flex items-center">
                <Settings className="size-5" />
                <span className="ml-3">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip={isCollapsed ? "Logout" : undefined} 
              onClick={logout} 
              className="flex items-center"
            >
              <LogOut className="size-5" />
              <span className="ml-3">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;