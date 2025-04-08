import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, HelpCircle, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';

const PlanFeature: React.FC<{ feature: string; included: boolean; proOnly?: boolean; tooltip?: string }> = ({ 
  feature, 
  included, 
  proOnly = false, 
  tooltip 
}) => (
  <div className={`flex items-start gap-2 ${proOnly ? 'opacity-50' : ''}`}>
    {included ? (
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-purple-600" />
    ) : (
      <X className="h-5 w-5 flex-shrink-0 text-gray-300" />
    )}
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

// Feature comparison component for comparison table
const FeatureRow: React.FC<{ 
  feature: string; 
  tooltip?: string;
  starter: boolean | string;
  professional: boolean | string;
  enterprise: boolean | string;
}> = ({ feature, tooltip, starter, professional, enterprise }) => {
  const renderCell = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="h-5 w-5 mx-auto text-purple-600" />
      ) : (
        <X className="h-5 w-5 mx-auto text-gray-300" />
      );
    }
    return <span className="text-sm text-center block">{value}</span>;
  };

  return (
    <div className="grid grid-cols-4 py-4 border-b border-gray-100">
      <div className="flex items-center gap-1.5 col-span-1">
        <span className="text-sm font-medium">{feature}</span>
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
      <div className="col-span-1">{renderCell(starter)}</div>
      <div className="col-span-1">{renderCell(professional)}</div>
      <div className="col-span-1">{renderCell(enterprise)}</div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const [annualBilling, setAnnualBilling] = useState(false);
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Pricing for every business
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
          
          <div className="flex items-center justify-center gap-3 bg-white rounded-full p-1 inline-flex border shadow-sm mb-8">
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!annualBilling ? 'bg-purple-600 text-white' : 'text-gray-600'}`}>
              Monthly
            </span>
            <Switch 
              checked={annualBilling} 
              onCheckedChange={setAnnualBilling} 
              className="mx-2 data-[state=checked]:bg-purple-600" 
            />
            <span className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${annualBilling ? 'bg-purple-600 text-white' : 'text-gray-600'}`}>
              Annual <span className="text-xs font-normal">(save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {/* Starter Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden bg-white hover:translate-y-[-4px]">
            <CardHeader className="pb-6 border-b border-gray-100">
              <div className="uppercase text-xs font-semibold tracking-wider text-purple-600 mb-2">Starter</div>
              <CardTitle className="text-3xl font-bold">
                ${annualBilling ? '39' : '49'} <span className="text-base font-normal text-muted-foreground">/month</span>
              </CardTitle>
              {annualBilling && (
                <p className="text-sm text-purple-600 font-medium mt-1">Billed annually (${39 * 12} per year)</p>
              )}
              <p className="text-sm text-muted-foreground mt-3">Perfect for small businesses just getting started with invoice processing.</p>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-3 mb-6">
                <PlanFeature feature="100 invoices per month" included={true} />
                <PlanFeature feature="Basic OCR capabilities" included={true} />
                <PlanFeature feature="Support for 5 languages" included={true} tooltip="Including English, Hindi, French, German, and Spanish" />
                <PlanFeature feature="CSV export" included={true} />
                <PlanFeature feature="Basic validation rules" included={true} />
                <PlanFeature feature="Email support" included={true} />
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-6">
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:border-purple-300" 
                asChild
              >
                <Link to="/signup">Start free trial</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card className="border-2 border-brand-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white scale-100 hover:scale-105 z-10 relative">
            <div className="absolute top-0 right-0">
              <div className="bg-purple-600 text-white text-xs font-medium py-1 px-4 rounded-bl-lg">
                RECOMMENDED
              </div>
            </div>
            <CardHeader className="pb-6 border-b border-gray-100">
              <div className="uppercase text-xs font-semibold tracking-wider text-purple-600 mb-2">Professional</div>
              <CardTitle className="text-3xl font-bold">
                ${annualBilling ? '119' : '149'} <span className="text-base font-normal text-muted-foreground">/month</span>
              </CardTitle>
              {annualBilling && (
                <p className="text-sm text-purple-600 font-medium mt-1">Billed annually (${119 * 12} per year)</p>
              )}
              <p className="text-sm text-muted-foreground mt-3">For growing businesses with more complex invoice processing needs.</p>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-3 mb-6">
                <PlanFeature feature="500 invoices per month" included={true} />
                <PlanFeature feature="Advanced OCR capabilities" included={true} />
                <PlanFeature feature="Support for 15+ languages" included={true} tooltip="Including all major Indian languages" />
                <PlanFeature feature="CSV & direct export" included={true} />
                <PlanFeature feature="Advanced validation rules" included={true} />
                <PlanFeature feature="Priority email & phone support" included={true} />
                <PlanFeature feature="Accounting software integrations" included={true} tooltip="Connect with Tally, QuickBooks, Zoho Books, and Xero" />
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-6">
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/signup">Start free trial</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden bg-white hover:translate-y-[-4px]">
            <CardHeader className="pb-6 border-b border-gray-100">
              <div className="uppercase text-xs font-semibold tracking-wider text-purple-600 mb-2">Enterprise</div>
              <CardTitle className="text-3xl font-bold">
                Custom <span className="text-base font-normal text-muted-foreground">pricing</span>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-3">For large organizations with custom requirements and high volume needs.</p>
            </CardHeader>
            <CardContent className="py-6">
              <div className="space-y-3 mb-6">
                <PlanFeature feature="Unlimited invoices" included={true} />
                <PlanFeature feature="Full multilingual support" included={true} />
                <PlanFeature feature="Custom integrations" included={true} />
                <PlanFeature feature="Dedicated account manager" included={true} />
                <PlanFeature feature="GDPR compliance" included={true} />
                <PlanFeature feature="SSO & advanced user controls" included={true} />
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-6">
              <Button 
                variant="outline" 
                className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:border-purple-300" 
                asChild
              >
                <Link to="/contact">Contact sales</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Features comparison */}
        <div className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Compare features</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 py-4 px-6 border-b border-gray-200 bg-gray-50">
              <div className="col-span-1">
                <h3 className="font-semibold">Features</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-semibold">Starter</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-semibold">Professional</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-semibold">Enterprise</h3>
              </div>
            </div>
            
            {/* Feature rows */}
            <div className="px-6">
              <FeatureRow 
                feature="Monthly invoices" 
                starter="100" 
                professional="500" 
                enterprise="Unlimited" 
              />
              <FeatureRow 
                feature="OCR capabilities" 
                starter="Basic" 
                professional="Advanced" 
                enterprise="Advanced" 
              />
              <FeatureRow 
                feature="Language support" 
                tooltip="Number of supported languages" 
                starter="5" 
                professional="15+" 
                enterprise="All" 
              />
              <FeatureRow 
                feature="CSV export" 
                starter={true} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Direct export" 
                starter={false} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Validation rules" 
                starter="Basic" 
                professional="Advanced" 
                enterprise="Custom" 
              />
              <FeatureRow 
                feature="Email support" 
                starter={true} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Phone support" 
                starter={false} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Accounting integrations" 
                tooltip="Connect with Tally, QuickBooks, Zoho Books, and Xero" 
                starter={false} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="API access" 
                starter={false} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Custom validation workflows" 
                starter={false} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Dedicated account manager" 
                starter={false} 
                professional={false} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="GDPR compliance" 
                starter={true} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="Data encryption" 
                starter={true} 
                professional={true} 
                enterprise={true} 
              />
              <FeatureRow 
                feature="SSO & advanced user controls" 
                starter={false} 
                professional={false} 
                enterprise={true} 
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently asked questions</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              <div className="p-6">
                <h3 className="font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground text-sm">Yes, you can change your plan at any time. When upgrading, you'll be billed the prorated amount for the remainder of your billing cycle. When downgrading, the new pricing will apply at the start of your next billing cycle.</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">How does the 14-day trial work?</h3>
                <p className="text-muted-foreground text-sm">You can try InvoiceAI for free for 14 days without a credit card. You'll have full access to all features included in the Professional plan. After your trial ends, you'll need to select a plan to continue using the service.</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">What happens if I exceed my monthly invoice limit?</h3>
                <p className="text-muted-foreground text-sm">You'll receive a notification when you're approaching your limit. You can either upgrade your plan or pay for additional invoices at a per-invoice rate of $0.50 per invoice for Starter and $0.30 per invoice for Professional plans.</p>
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">Do you offer discounts for non-profits or educational institutions?</h3>
                <p className="text-muted-foreground text-sm">Yes, we offer special pricing for non-profits, educational institutions, and startups. Please contact our sales team for details and eligibility requirements.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 max-w-4xl mx-auto text-center bg-purple-50 rounded-xl p-12 border border-purple-100">
          <h2 className="text-2xl font-bold mb-3">Ready to streamline your invoice processing?</h2>
          <p className="text-lg text-muted-foreground mb-6">Start your 14-day free trial today. No credit card required.</p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" 
              asChild
            >
              <Link to="/signup">Start free trial</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-600 text-purple-600 transition-all duration-300 hover:bg-purple-50" 
              asChild
            >
              <Link to="/demo">Request demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;