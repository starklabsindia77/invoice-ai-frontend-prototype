
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'For individuals and small businesses just getting started',
    features: [
      '10 Invoices/month',
      'English OCR',
      'CSV Export',
      'Community Support'
    ],
    limits: {
      invoices: 10,
      storage: 1,
      languages: ['English']
    }
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    description: 'For growing businesses with moderate invoice volumes',
    features: [
      '100 Invoices/month',
      'English OCR',
      'CSV Export',
      'Basic Accounting Integration',
      'Email Support'
    ],
    limits: {
      invoices: 100,
      storage: 5,
      languages: ['English', 'Spanish', 'French', 'German']
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    description: 'For businesses with high volume invoice processing needs',
    features: [
      'Unlimited Invoices',
      'Multi-language OCR (15+ languages)',
      'CSV Export & API Access',
      'Advanced Accounting Integration',
      'GST/VAT Compliance',
      'Priority Support'
    ],
    limits: {
      invoices: 1000,
      storage: 10,
      languages: [
        'English', 'Spanish', 'French', 'German',
        'Hindi', 'Bengali', 'Tamil', 'Telugu',
        'Marathi', 'Gujarati', 'Kannada', 'Malayalam',
        'Punjabi', 'Arabic'
      ]
    }
  }
];

const Subscription: React.FC = () => {
  const { subscription, tenant } = useApp();
  
  const currentPlan = plans.find(plan => plan.id === subscription?.plan) || plans[0];
  
  const invoiceProgress = subscription ? 
    (subscription.usage.invoicesProcessed / subscription.usage.invoicesLimit) * 100 : 0;
  
  const storageProgress = subscription ? 
    (subscription.usage.storageUsed / subscription.usage.storageLimit) * 100 : 0;

  const handleUpgrade = (planId: string) => {
    toast.success(`Upgrading to ${planId} plan - redirecting to payment page`);
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription & Usage</h1>
        <span className="text-sm text-muted-foreground">
          Manage your {tenant?.name || 'workspace'} subscription
        </span>
      </div>

      {/* Current Plan */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            Your active subscription and usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-baseline">
                <h3 className="text-2xl font-bold capitalize">{subscription?.plan || 'Free'}</h3>
                {subscription?.plan !== 'free' && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    ${currentPlan.price}/month
                  </span>
                )}
              </div>
              
              <div className="flex items-center mt-2 mb-4">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  subscription?.status === 'active' ? 'bg-green-500' : 
                  subscription?.status === 'trial' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
                <span className="text-sm text-muted-foreground capitalize">
                  {subscription?.status || 'Inactive'}
                  {subscription?.endDate && ` until ${new Date(subscription.endDate).toLocaleDateString()}`}
                </span>
              </div>
              
              <div className="space-y-1 text-sm">
                {currentPlan.features.map((feature, i) => (
                  <div key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Invoice Processing</span>
                  <span className="text-sm text-muted-foreground">
                    {subscription?.usage.invoicesProcessed || 0} / {subscription?.usage.invoicesLimit || 0}
                  </span>
                </div>
                <Progress value={invoiceProgress} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">
                    {subscription?.usage.storageUsed || 0} GB / {subscription?.usage.storageLimit || 0} GB
                  </span>
                </div>
                <Progress value={storageProgress} className="h-2" />
              </div>
              
              <div>
                <span className="text-sm font-medium">Supported Languages</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {currentPlan.limits.languages.slice(0, 5).map((lang, i) => (
                    <span key={i} className="inline-block bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded">
                      {lang}
                    </span>
                  ))}
                  {currentPlan.limits.languages.length > 5 && (
                    <span className="inline-block bg-brand-50 text-brand-700 text-xs px-2 py-1 rounded">
                      +{currentPlan.limits.languages.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border pt-6 flex flex-col md:flex-row gap-2 md:justify-between">
          <div>
            <Button variant="outline">Billing History</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Manage Subscription
            </Button>
            {subscription?.plan !== 'premium' && (
              <Button>Upgrade Plan</Button>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`${subscription?.plan === plan.id ? 'border-brand-500 ring-1 ring-brand-500' : ''}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  {plan.price === 0 ? (
                    'Free Forever'
                  ) : (
                    <span>${plan.price}<span className="text-sm text-muted-foreground">/month</span></span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {plan.description}
                </p>
                <div className="space-y-1 text-sm">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 shrink-0" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {subscription?.plan === plan.id ? (
                  <Button variant="outline" className="w-full" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button 
                    className="w-full" 
                    variant={subscription?.plan && plans.findIndex(p => p.id === subscription.plan) > plans.findIndex(p => p.id === plan.id) ? "outline" : "default"}
                    onClick={() => handleUpgrade(plan.id)}
                  >
                    {subscription?.plan && plans.findIndex(p => p.id === subscription.plan) > plans.findIndex(p => p.id === plan.id) 
                      ? 'Downgrade' 
                      : 'Upgrade'}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Subscription;
