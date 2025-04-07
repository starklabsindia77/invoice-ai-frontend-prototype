
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

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Logo size="md" variant={state === "collapsed" ? "icon" : "dark"} />
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <div className="mb-4 px-4">
          <div className={`text-sm text-sidebar-foreground/70 ${state === "collapsed" ? "hidden" : ""}`}>
            Workspace
          </div>
          <div className={`font-medium text-sidebar-foreground truncate ${state === "collapsed" ? "hidden" : ""}`}>
            {tenant?.name || 'My Workspace'}
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard'} tooltip="Dashboard">
              <Link to="/dashboard">
                <LayoutDashboard className="size-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard/invoices'} tooltip="Invoices">
              <Link to="/dashboard/invoices">
                <FileText className="size-5" />
                <span>Invoices</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard/analytics'} tooltip="Analytics">
              <Link to="/dashboard/analytics">
                <LineChart className="size-5" />
                <span>Analytics</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard/integrations'} tooltip="Integrations">
              <Link to="/dashboard/integrations">
                <Download className="size-5" />
                <span>Integrations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={location.pathname === '/dashboard/settings'} tooltip="Settings">
              <Link to="/dashboard/settings">
                <Settings className="size-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Logout" onClick={logout}>
              <LogOut className="size-5" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
