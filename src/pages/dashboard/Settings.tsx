
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { tenant } = useApp();

  const handleSaveGeneral = () => {
    toast.success('General settings updated successfully');
  };

  const handleSaveIntegration = () => {
    toast.success('Integration settings updated successfully');
  };

  const handleResetApiKey = () => {
    toast.success('API key reset successfully');
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <span className="text-sm text-muted-foreground">
          Configure {tenant?.name || 'your workspace'}
        </span>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your workspace settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue={tenant?.name || ''} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex">
                  <Input
                    id="subdomain"
                    defaultValue={tenant?.subdomain || ''}
                    className="rounded-r-none"
                  />
                  <span className="bg-muted px-3 py-2 text-muted-foreground border border-l-0 border-input rounded-r-md">
                    .invoiceai.com
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the URL where your users will access your workspace.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select defaultValue={tenant?.industry?.toLowerCase() || ''}>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                    <SelectItem value="legal">Legal & Accounting</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="region">Region</Label>
                <Select defaultValue={tenant?.region?.toLowerCase() || ''}>
                  <SelectTrigger id="region">
                    <SelectValue placeholder="Select Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="uae">UAE</SelectItem>
                    <SelectItem value="saudi">Saudi Arabia</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="ar">Arabic</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="john.doe@alphacorp.com" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value="Administrator" readOnly className="bg-muted" />
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Accounting Software Integration</CardTitle>
              <CardDescription>
                Connect your accounting software for automatic data sync
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="accounting-software">Accounting Software</Label>
                <Select defaultValue="">
                  <SelectTrigger id="accounting-software">
                    <SelectValue placeholder="Select Accounting Software" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tally">Tally</SelectItem>
                    <SelectItem value="quickbooks">QuickBooks</SelectItem>
                    <SelectItem value="zoho">Zoho Books</SelectItem>
                    <SelectItem value="xero">Xero</SelectItem>
                    <SelectItem value="sap">SAP</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" placeholder="Enter your accounting software API key" />
                <p className="text-xs text-muted-foreground">
                  You can find this in your accounting software's API settings.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sync-frequency">Sync Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="sync-frequency">
                    <SelectValue placeholder="Select Sync Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-sync">Auto-sync Invoices</Label>
                  <input 
                    type="checkbox" 
                    id="auto-sync" 
                    className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                    defaultChecked
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Automatically sync processed invoices to your accounting software.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveIntegration}>Save Integration</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted rounded-md">
                <h3 className="font-medium mb-2">Your API Key</h3>
                <div className="flex">
                  <Input 
                    value="sk_live_51JGHzYLKcHm5ZNPRMfUCdkMy9Zdf87hJk***********************" 
                    readOnly 
                    className="font-mono text-xs rounded-r-none"
                  />
                  <Button 
                    variant="outline" 
                    className="rounded-l-none"
                    onClick={() => {
                      navigator.clipboard.writeText("sk_live_51JGHzYLKcHm5ZNPRMfUCdkMy9Zdf87hJkuPfbE6SBlEYyJaqeAQlhVNixdH");
                      toast.success('API key copied to clipboard');
                    }}
                  >
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This key provides full access to your API. Keep it secure and never share it publicly.
                </p>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">API Usage</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Monthly API Requests</span>
                    <span className="text-sm font-medium">243 / 1000</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2.5">
                    <div className="bg-brand-600 h-2.5 rounded-full" style={{ width: "24%" }}></div>
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-muted-foreground">
                  Next reset on April 1, 2025
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">Rate Limits</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Requests per minute</span>
                    <span className="font-medium">60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Requests per day</span>
                    <span className="font-medium">10,000</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetApiKey}>
                Reset API Key
              </Button>
              <Button variant="default">
                View API Documentation
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
