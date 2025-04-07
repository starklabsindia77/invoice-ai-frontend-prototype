
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Define integration types for structure
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'connected' | 'not_connected';
  category: 'accounting' | 'storage' | 'communication';
}

const Integrations: React.FC = () => {
  const integrations: Integration[] = [
    {
      id: 'tally',
      name: 'Tally',
      description: 'Connect with Tally to sync invoice data automatically.',
      status: 'connected',
      category: 'accounting',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#5470C6" />
          <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      description: 'Sync invoices with QuickBooks for streamlined accounting.',
      status: 'not_connected',
      category: 'accounting',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#2CA01C" />
          <path d="M12 5L18 12L12 19L6 12L12 5Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'zoho',
      name: 'Zoho Books',
      description: 'Integrate with Zoho Books for complete financial management.',
      status: 'not_connected',
      category: 'accounting',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#F04C29" />
          <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H13V17H7V15Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'xero',
      name: 'Xero',
      description: 'Connect with Xero for cloud-based accounting services.',
      status: 'not_connected',
      category: 'accounting',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#13B5EA" />
          <path d="M8 12C8 10.3431 9.34315 9 11 9H13C14.6569 9 16 10.3431 16 12C16 13.6569 14.6569 15 13 15H11C9.34315 15 8 13.6569 8 12Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'gdrive',
      name: 'Google Drive',
      description: 'Store and access your invoice files in Google Drive.',
      status: 'not_connected',
      category: 'storage',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#FBBC04" />
          <path d="M6 15L12 5L18 15H6Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Back up your invoice data to Dropbox automatically.',
      status: 'not_connected',
      category: 'storage',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#0061FF" />
          <path d="M12 7L16 10L12 13L8 10L12 7ZM8 14L12 11L16 14L12 17L8 14Z" fill="white" />
        </svg>
      ),
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get notified about invoice processing in your Slack workspace.',
      status: 'connected',
      category: 'communication',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#4A154B" />
          <path d="M10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5V13.5C7 14.3284 7.67157 15 8.5 15C9.32843 15 10 14.3284 10 13.5V8.5Z" fill="#E01E5A" />
          <path d="M15.5 8.5C15.5 7.67157 14.8284 7 14 7C13.1716 7 12.5 7.67157 12.5 8.5V13.5C12.5 14.3284 13.1716 15 14 15C14.8284 15 15.5 14.3284 15.5 13.5V8.5Z" fill="#2EB67D" />
          <path d="M13.5 14C14.3284 14 15 13.3284 15 12.5C15 11.6716 14.3284 11 13.5 11H8.5C7.67157 11 7 11.6716 7 12.5C7 13.3284 7.67157 14 8.5 14H13.5Z" fill="#ECB22E" />
        </svg>
      ),
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Get invoice notifications directly in Microsoft Teams.',
      status: 'not_connected',
      category: 'communication',
      icon: (
        <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="4" fill="#6264A7" />
          <path d="M12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8Z" fill="white" />
          <path d="M17 10C17.5523 10 18 9.55228 18 9C18 8.44772 17.5523 8 17 8C16.4477 8 16 8.44772 16 9C16 9.55228 16.4477 10 17 10Z" fill="white" />
          <path d="M17 11H12C11.4477 11 11 11.4477 11 12V16C11 16.5523 11.4477 17 12 17H17C17.5523 17 18 16.5523 18 16V12C18 11.4477 17.5523 11 17 11Z" fill="white" />
          <path d="M9 12C9 13.6569 7.65685 15 6 15V12C6 11.4477 6.44772 11 7 11H9V12Z" fill="white" />
        </svg>
      ),
    },
  ];

  const handleConnect = (id: string) => {
    toast.success(`Connecting to ${id}...`);
    // In a real app, this would redirect to the oauth flow
  };

  const handleDisconnect = (id: string) => {
    toast.success(`Disconnected from ${id}`);
    // In a real app, this would revoke access tokens
  };

  const handleViewSettings = (id: string) => {
    toast.info(`Viewing settings for ${id}...`);
    // In a real app, this would open a settings modal or page
  };

  // Group integrations by category
  const accountingIntegrations = integrations.filter(i => i.category === 'accounting');
  const storageIntegrations = integrations.filter(i => i.category === 'storage');
  const communicationIntegrations = integrations.filter(i => i.category === 'communication');

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Integrations</h1>
        <span className="text-sm text-muted-foreground">
          Connect your accounts to streamline your workflow
        </span>
      </div>

      {/* Accounting Integrations */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Accounting Software</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {accountingIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{integration.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        integration.status === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      {integration.description}
                    </p>
                    <div className="flex space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSettings(integration.id)}
                          >
                            Settings
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Storage Integrations */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Cloud Storage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {storageIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{integration.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        integration.status === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      {integration.description}
                    </p>
                    <div className="flex space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSettings(integration.id)}
                          >
                            Settings
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Communication Integrations */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {communicationIntegrations.map((integration) => (
            <Card key={integration.id}>
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">
                    {integration.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{integration.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        integration.status === 'connected' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 mb-4">
                      {integration.description}
                    </p>
                    <div className="flex space-x-2">
                      {integration.status === 'connected' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewSettings(integration.id)}
                          >
                            Settings
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
