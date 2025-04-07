
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, FileText, Database, BarChart, Cloud } from 'lucide-react';

const IntegrationCard: React.FC<{ 
  name: string; 
  description: string; 
  icon: React.ReactNode;
  features: string[];
}> = ({ name, description, icon, features }) => (
  <Card className="border border-border hover:shadow-md transition-all hover:-translate-y-1 duration-300">
    <CardContent className="p-6">
      <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-brand-600" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

const Platforms: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Integrate with your favorite platforms
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            InvoiceAI seamlessly connects with your existing software ecosystem, making it easy to automate your invoice processing workflow end-to-end.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Start free trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact" className="flex items-center">Request custom integration <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Integration Categories */}
        <Tabs defaultValue="accounting" className="mb-24">
          <TabsList className="mx-auto flex justify-center mb-8">
            <TabsTrigger value="accounting">Accounting Software</TabsTrigger>
            <TabsTrigger value="erp">ERP Systems</TabsTrigger>
            <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
            <TabsTrigger value="api">API & Developers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accounting" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IntegrationCard 
                name="Tally Integration" 
                description="Connect InvoiceAI with Tally for seamless data synchronization" 
                icon={<Database className="h-6 w-6" />}
                features={[
                  "Automatic invoice data sync",
                  "Real-time validation against Tally masters",
                  "Support for Tally Prime and Tally ERP 9",
                  "Batch processing capabilities"
                ]}
              />
              <IntegrationCard 
                name="QuickBooks Integration" 
                description="Streamline your accounting workflow with QuickBooks integration" 
                icon={<BarChart className="h-6 w-6" />}
                features={[
                  "Direct invoice data export",
                  "Vendor matching and verification",
                  "Custom field mapping",
                  "Support for QuickBooks Online and Desktop"
                ]}
              />
              <IntegrationCard 
                name="Zoho Books Integration" 
                description="Connect your Zoho Books account with InvoiceAI" 
                icon={<FileText className="h-6 w-6" />}
                features={[
                  "Automatic invoice creation in Zoho Books",
                  "Contact and item synchronization",
                  "Multi-currency support",
                  "Custom approval workflows"
                ]}
              />
              <IntegrationCard 
                name="Xero Integration" 
                description="Seamlessly export extracted invoice data to Xero" 
                icon={<Database className="h-6 w-6" />}
                features={[
                  "Direct invoice creation in Xero",
                  "Chart of accounts synchronization",
                  "Tax rate matching",
                  "Attachment storage and linking"
                ]}
              />
              <IntegrationCard 
                name="SAP Concur Integration" 
                description="Streamline expense management with Concur integration" 
                icon={<BarChart className="h-6 w-6" />}
                features={[
                  "Automatic expense creation",
                  "Receipt matching and verification",
                  "Policy compliance checking",
                  "Employee reimbursement tracking"
                ]}
              />
              <IntegrationCard 
                name="Sage Integration" 
                description="Connect InvoiceAI with Sage accounting software" 
                icon={<FileText className="h-6 w-6" />}
                features={[
                  "Invoice data synchronization",
                  "Vendor management",
                  "Payment tracking",
                  "Support for Sage 50 and Sage 200"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="erp" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IntegrationCard 
                name="SAP Integration" 
                description="Connect InvoiceAI with SAP for enterprise-grade integration" 
                icon={<Database className="h-6 w-6" />}
                features={[
                  "SAP ERP and S/4HANA support",
                  "Direct document posting",
                  "Master data synchronization",
                  "Workflow integration"
                ]}
              />
              <IntegrationCard 
                name="Microsoft Dynamics Integration" 
                description="Seamless integration with Microsoft Dynamics 365" 
                icon={<BarChart className="h-6 w-6" />}
                features={[
                  "Automated invoice processing",
                  "Business Central and Finance integration",
                  "Custom approval workflows",
                  "Document management"
                ]}
              />
              <IntegrationCard 
                name="Oracle NetSuite Integration" 
                description="Connect InvoiceAI with NetSuite ERP" 
                icon={<FileText className="h-6 w-6" />}
                features={[
                  "Direct invoice creation",
                  "Vendor bill management",
                  "Subsidiary support",
                  "Custom field mapping"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="cloud" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IntegrationCard 
                name="Google Drive Integration" 
                description="Store and process invoices directly from Google Drive" 
                icon={<Cloud className="h-6 w-6" />}
                features={[
                  "Automatic folder monitoring",
                  "Direct file processing",
                  "Processed document storage",
                  "Document versioning"
                ]}
              />
              <IntegrationCard 
                name="Dropbox Integration" 
                description="Connect InvoiceAI with your Dropbox account" 
                icon={<Cloud className="h-6 w-6" />}
                features={[
                  "Folder synchronization",
                  "Automatic invoice detection",
                  "Processed file organization",
                  "Sharing capabilities"
                ]}
              />
              <IntegrationCard 
                name="Microsoft OneDrive Integration" 
                description="Process invoices stored in OneDrive" 
                icon={<Cloud className="h-6 w-6" />}
                features={[
                  "SharePoint integration",
                  "Real-time file processing",
                  "Team collaboration support",
                  "Microsoft 365 ecosystem integration"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="api" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IntegrationCard 
                name="REST API" 
                description="Connect with InvoiceAI using our comprehensive REST API" 
                icon={<Database className="h-6 w-6" />}
                features={[
                  "Full CRUD operations",
                  "OAuth 2.0 authentication",
                  "Rate limiting and throttling controls",
                  "Webhook support"
                ]}
              />
              <IntegrationCard 
                name="Webhook Integrations" 
                description="Real-time notifications for invoice processing events" 
                icon={<BarChart className="h-6 w-6" />}
                features={[
                  "Customizable event triggers",
                  "Secure delivery with signatures",
                  "Retry logic and failure handling",
                  "Event filtering capabilities"
                ]}
              />
              <IntegrationCard 
                name="Developer SDKs" 
                description="Native libraries for popular programming languages" 
                icon={<FileText className="h-6 w-6" />}
                features={[
                  "Python, Node.js, and Java support",
                  "Simplified authentication",
                  "Extensive documentation",
                  "Example applications"
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* How It Works Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How integrations work</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it easy to connect your existing tools with InvoiceAI, creating a seamless workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground">
                Authorize InvoiceAI to access your third-party application or service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Configure</h3>
              <p className="text-muted-foreground">
                Set up mapping rules and workflow preferences for your integration.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Process</h3>
              <p className="text-muted-foreground">
                InvoiceAI extracts and validates invoice data with industry-leading accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sync</h3>
              <p className="text-muted-foreground">
                Extracted data is automatically synced with your connected applications.
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise Integration Section */}
        <div className="bg-brand-50 rounded-2xl p-8 md:p-12 mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Need a custom integration?</h2>
              <p className="text-muted-foreground mb-6">
                Our team of integration specialists can build custom connectors for your proprietary systems or niche applications. We work closely with your IT team to ensure seamless data flow between InvoiceAI and your existing infrastructure.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Custom API development</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Legacy system integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Dedicated integration support</span>
                </div>
              </div>
              <Button className="mt-4" asChild>
                <Link to="/contact">Contact our integration team</Link>
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Recent custom integrations</h3>
              <ul className="space-y-4">
                <li className="pb-4 border-b border-border">
                  <div className="font-medium">Custom ERP System for Alpha Corp</div>
                  <p className="text-sm text-muted-foreground">Integrated with proprietary procurement system to automate invoice approval workflow</p>
                </li>
                <li className="pb-4 border-b border-border">
                  <div className="font-medium">Healthcare Management System for Beta Solutions</div>
                  <p className="text-sm text-muted-foreground">Connected InvoiceAI with patient billing system for streamlined reimbursement processing</p>
                </li>
                <li>
                  <div className="font-medium">Logistics Platform for Gamma Enterprises</div>
                  <p className="text-sm text-muted-foreground">Built custom connector between InvoiceAI and freight management software</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-800 text-white rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to streamline your invoice processing?</h2>
            <p className="text-xl opacity-80 mb-8">
              Connect InvoiceAI with your existing software ecosystem and transform your workflow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100"
                asChild
              >
                <Link to="/signup">Start your free trial</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/demo">Schedule a demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Platforms;
