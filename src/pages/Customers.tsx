import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, CheckCircle, Quote } from 'lucide-react';

const CustomerStory: React.FC<{ 
  companyName: string; 
  industry: string; 
  logo: string; 
  quote: string; 
  author: string; 
  role: string;
}> = ({ companyName, industry, logo, quote, author, role }) => (
  <Card className="border border-border overflow-hidden hover:shadow-md transition-shadow">
    <CardContent className="p-0">
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="font-bold text-xl">{companyName}</div>
            <div className="text-sm text-muted-foreground">{industry}</div>
          </div>
          <div className="text-2xl font-bold text-gray-400">{logo}</div>
        </div>
        
        <div className="relative mb-6">
          <Quote className="h-8 w-8 text-brand-100 absolute -left-1 -top-3 opacity-60" />
          <p className="text-muted-foreground relative z-10 pl-4">{quote}</p>
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="font-medium">{author}</div>
          <div className="text-sm text-muted-foreground">{role}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ResultCard: React.FC<{ title: string; value: string; description: string }> = ({ 
  title, value, description 
}) => (
  <Card className="border border-border">
    <CardContent className="p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Customers: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Companies of all sizes trust InvoiceAI
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            See how organizations across industries are transforming their invoice processing workflows and saving countless hours with InvoiceAI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">Start free trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact" className="flex items-center">Talk to sales <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* Logos Section */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mb-24">
          <div className="text-2xl font-bold text-gray-400">Alpha Corp</div>
          <div className="text-2xl font-bold text-gray-400">Beta Solutions</div>
          <div className="text-2xl font-bold text-gray-400">Gamma Enterprises</div>
          <div className="text-2xl font-bold text-gray-400">India Business</div>
          <div className="text-2xl font-bold text-gray-400">Legal Partners</div>
        </div>

        {/* Featured Customer Story */}
        <div className="bg-brand-50 rounded-2xl p-8 md:p-12 mb-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-brand-600 font-medium mb-4">FEATURED CUSTOMER STORY</div>
              <h2 className="text-3xl font-bold mb-4">How Alpha Corp reduced invoice processing time by 85%</h2>
              <p className="text-muted-foreground mb-6">
                Alpha Corp was struggling with manual invoice data entry, resulting in errors and delays. After implementing InvoiceAI, they were able to automate their workflow and focus on strategic financial analysis.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Processed 10,000+ invoices per month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Reduced processing costs by 65%</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-brand-600" />
                  <span>Improved data accuracy to 99.8%</span>
                </div>
              </div>
              <Button className="mt-4" asChild>
                <Link to="/case-studies/alpha-corp">Read full case study</Link>
              </Button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Quote className="h-8 w-8 text-brand-200 mb-4" />
              <p className="text-lg mb-6">
                "InvoiceAI has transformed our accounts payable process. What used to take our team hours is now done in minutes, with greater accuracy and consistency."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold">A</div>
                <div>
                  <div className="font-medium">John Doe</div>
                  <div className="text-sm text-muted-foreground">CFO, Alpha Corp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Real results from real customers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our customers are seeing significant improvements in their invoice processing workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResultCard 
              title="TIME SAVED" 
              value="85%" 
              description="Average reduction in invoice processing time across all customers"
            />
            <ResultCard 
              title="COST REDUCTION" 
              value="65%" 
              description="Average reduction in processing costs after implementing InvoiceAI"
            />
            <ResultCard 
              title="ACCURACY" 
              value="99.8%" 
              description="Average data extraction accuracy across all languages"
            />
          </div>
        </div>

        {/* Customer Stories */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Customer stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how different organizations are using InvoiceAI to transform their invoice processing.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="mx-auto flex justify-center">
              <TabsTrigger value="all">All industries</TabsTrigger>
              <TabsTrigger value="retail">Retail</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="logistics">Logistics</TabsTrigger>
              <TabsTrigger value="legal">Legal & Accounting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomerStory 
                  companyName="Alpha Corp" 
                  industry="Retail" 
                  logo="AC" 
                  quote="InvoiceAI has reduced our invoice processing time by 85%. The accuracy is incredible, and the integration with our accounting system was seamless."
                  author="John Doe"
                  role="CFO, Alpha Corp"
                />
                <CustomerStory 
                  companyName="Beta Solutions" 
                  industry="Healthcare" 
                  logo="BS" 
                  quote="As a healthcare provider, we need to process thousands of invoices monthly. InvoiceAI has greatly improved our efficiency and reduced errors."
                  author="Jane Smith"
                  role="Finance Director, Beta Solutions"
                />
                <CustomerStory 
                  companyName="Gamma Enterprises" 
                  industry="Logistics" 
                  logo="GE" 
                  quote="The multilingual capabilities have been a game-changer for our international operations. We can now process invoices from vendors worldwide."
                  author="Ahmed Khan"
                  role="Operations Manager, Gamma Enterprises"
                />
                <CustomerStory 
                  companyName="India Business" 
                  industry="Legal & Accounting" 
                  logo="IB" 
                  quote="The multilingual support is a game-changer for us. Being able to process invoices in Hindi, Tamil, and other Indian languages has simplified our regional operations tremendously."
                  author="Rajesh Kumar"
                  role="Managing Partner, India Business"
                />
                <CustomerStory 
                  companyName="Legal Partners" 
                  industry="Legal & Accounting" 
                  logo="LP" 
                  quote="The platform's GDPR compliance and security features give us confidence that our sensitive financial data is protected."
                  author="Maria Garcia"
                  role="Legal Counsel, Legal Partners"
                />
                <CustomerStory 
                  companyName="Omega Retail" 
                  industry="Retail" 
                  logo="OR" 
                  quote="We've been able to scale our operations without adding headcount to our AP department, thanks to InvoiceAI's automation capabilities."
                  author="David Wilson"
                  role="VP of Finance, Omega Retail"
                />
              </div>
            </TabsContent>
            
            {/* Other tabs content would be similar but filtered by industry */}
            <TabsContent value="retail" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomerStory 
                  companyName="Alpha Corp" 
                  industry="Retail" 
                  logo="AC" 
                  quote="InvoiceAI has reduced our invoice processing time by 85%. The accuracy is incredible, and the integration with our accounting system was seamless."
                  author="John Doe"
                  role="CFO, Alpha Corp"
                />
                <CustomerStory 
                  companyName="Omega Retail" 
                  industry="Retail" 
                  logo="OR" 
                  quote="We've been able to scale our operations without adding headcount to our AP department, thanks to InvoiceAI's automation capabilities."
                  author="David Wilson"
                  role="VP of Finance, Omega Retail"
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center">
            <Button asChild variant="outline">
              <Link to="/case-studies" className="flex items-center">View all customer stories <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-brand-800 text-white rounded-2xl p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to transform your invoice processing?</h2>
            <p className="text-xl opacity-80 mb-8">
              Join thousands of businesses that trust InvoiceAI for their document processing needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100"
                asChild
              >
                <Link to="/signup">Start free trial</Link>
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

export default Customers;
