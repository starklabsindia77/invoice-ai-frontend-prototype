
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const PlanFeature: React.FC<{ feature: string; included: boolean; proOnly?: boolean; tooltip?: string }> = ({ 
  feature, 
  included, 
  proOnly = false, 
  tooltip 
}) => (
  <div className={`flex items-start gap-2 ${proOnly ? 'opacity-50' : ''}`}>
    <CheckCircle className={`h-5 w-5 flex-shrink-0 ${included ? 'text-brand-600' : 'text-gray-300'}`} />
    <div className="flex items-center gap-1.5">
      <span className="text-sm">{feature}</span>
      {tooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="cursor-help">
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  </div>
);

const Pricing: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>

        <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-muted">
              <TabsTrigger value="monthly">Monthly billing</TabsTrigger>
              <TabsTrigger value="annual">Annual billing (save 20%)</TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TabsContent value="monthly" className="mt-0">
              <Card className="border-2 border-transparent h-full flex flex-col">
                <CardHeader className="pb-8">
                  <div className="uppercase text-xs font-semibold tracking-wider text-brand-600 mb-2">Starter</div>
                  <CardTitle className="text-3xl font-bold">$49 <span className="text-base font-normal text-muted-foreground">/month</span></CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">Perfect for small businesses just getting started with invoice processing.</p>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <PlanFeature feature="100 invoices per month" included={true} />
                  <PlanFeature feature="Basic OCR capabilities" included={true} />
                  <PlanFeature feature="Support for 5 languages" included={true} tooltip="Including English, Hindi, French, German, and Spanish" />
                  <PlanFeature feature="CSV export" included={true} />
                  <PlanFeature feature="Basic validation rules" included={true} />
                  <PlanFeature feature="Email support" included={true} />
                  <PlanFeature feature="Multilingual support" included={false} />
                  <PlanFeature feature="Accounting integrations" included={false} />
                  <PlanFeature feature="Advanced validation rules" included={false} />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Start 14-day free trial</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="annual" className="mt-0">
              <Card className="border-2 border-transparent h-full flex flex-col">
                <CardHeader className="pb-8">
                  <div className="uppercase text-xs font-semibold tracking-wider text-brand-600 mb-2">Starter</div>
                  <CardTitle className="text-3xl font-bold">$39 <span className="text-base font-normal text-muted-foreground">/month</span></CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">Billed annually ($468 per year)</p>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <PlanFeature feature="100 invoices per month" included={true} />
                  <PlanFeature feature="Basic OCR capabilities" included={true} />
                  <PlanFeature feature="Support for 5 languages" included={true} tooltip="Including English, Hindi, French, German, and Spanish" />
                  <PlanFeature feature="CSV export" included={true} />
                  <PlanFeature feature="Basic validation rules" included={true} />
                  <PlanFeature feature="Email support" included={true} />
                  <PlanFeature feature="Multilingual support" included={false} />
                  <PlanFeature feature="Accounting integrations" included={false} />
                  <PlanFeature feature="Advanced validation rules" included={false} />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link to="/signup">Start 14-day free trial</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="mt-0">
              <Card className="border-2 border-brand-600 h-full flex flex-col shadow-lg relative">
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-medium py-1 px-3 rounded-bl">POPULAR</div>
                <CardHeader className="pb-8">
                  <div className="uppercase text-xs font-semibold tracking-wider text-brand-600 mb-2">Professional</div>
                  <CardTitle className="text-3xl font-bold">$149 <span className="text-base font-normal text-muted-foreground">/month</span></CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">For growing businesses with more complex invoice processing needs.</p>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <PlanFeature feature="500 invoices per month" included={true} />
                  <PlanFeature feature="Advanced OCR capabilities" included={true} />
                  <PlanFeature feature="Support for 15+ languages" included={true} tooltip="Including all major Indian languages" />
                  <PlanFeature feature="CSV & direct export" included={true} />
                  <PlanFeature feature="Advanced validation rules" included={true} />
                  <PlanFeature feature="Priority email & phone support" included={true} />
                  <PlanFeature feature="Accounting software integrations" included={true} tooltip="Connect with Tally, QuickBooks, Zoho Books, and Xero" />
                  <PlanFeature feature="API access" included={true} />
                  <PlanFeature feature="Custom validation workflows" included={true} />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-600 hover:bg-brand-700" asChild>
                    <Link to="/signup">Start 14-day free trial</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="annual" className="mt-0">
              <Card className="border-2 border-brand-600 h-full flex flex-col shadow-lg relative">
                <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-medium py-1 px-3 rounded-bl">POPULAR</div>
                <CardHeader className="pb-8">
                  <div className="uppercase text-xs font-semibold tracking-wider text-brand-600 mb-2">Professional</div>
                  <CardTitle className="text-3xl font-bold">$119 <span className="text-base font-normal text-muted-foreground">/month</span></CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">Billed annually ($1,428 per year)</p>
                </CardHeader>
                <CardContent className="grid gap-4 flex-grow">
                  <PlanFeature feature="500 invoices per month" included={true} />
                  <PlanFeature feature="Advanced OCR capabilities" included={true} />
                  <PlanFeature feature="Support for 15+ languages" included={true} tooltip="Including all major Indian languages" />
                  <PlanFeature feature="CSV & direct export" included={true} />
                  <PlanFeature feature="Advanced validation rules" included={true} />
                  <PlanFeature feature="Priority email & phone support" included={true} />
                  <PlanFeature feature="Accounting software integrations" included={true} tooltip="Connect with Tally, QuickBooks, Zoho Books, and Xero" />
                  <PlanFeature feature="API access" included={true} />
                  <PlanFeature feature="Custom validation workflows" included={true} />
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-600 hover:bg-brand-700" asChild>
                    <Link to="/signup">Start 14-day free trial</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted p-8">
              <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
              <p className="text-muted-foreground">For large organizations with custom requirements and high volume needs.</p>
            </div>
            <div className="p-8 bg-white">
              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div>
                  <h3 className="font-semibold mb-3">Enterprise features</h3>
                  <div className="space-y-3">
                    <PlanFeature feature="Unlimited invoices" included={true} />
                    <PlanFeature feature="Full multilingual support" included={true} />
                    <PlanFeature feature="Custom integrations" included={true} />
                    <PlanFeature feature="Dedicated account manager" included={true} />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Security & compliance</h3>
                  <div className="space-y-3">
                    <PlanFeature feature="GDPR compliance" included={true} />
                    <PlanFeature feature="Data encryption" included={true} />
                    <PlanFeature feature="Multi-tenant architecture" included={true} />
                    <PlanFeature feature="SSO & advanced user controls" included={true} />
                  </div>
                </div>
              </div>
              <Button variant="outline" size="lg" className="border-brand-600 text-brand-600" asChild>
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently asked questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground text-sm">Yes, you can change your plan at any time. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How does the 14-day trial work?</h3>
              <p className="text-muted-foreground text-sm">You can try InvoiceAI for free for 14 days without a credit card. After your trial ends, you'll need to select a plan to continue using the service.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens if I exceed my monthly invoice limit?</h3>
              <p className="text-muted-foreground text-sm">You'll receive a notification when you're approaching your limit. You can either upgrade your plan or pay for additional invoices at a per-invoice rate.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Do you offer discounts for non-profits or educational institutions?</h3>
              <p className="text-muted-foreground text-sm">Yes, we offer special pricing for non-profits, educational institutions, and startups. Please contact our sales team for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
