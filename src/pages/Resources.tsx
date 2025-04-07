import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, FileText, PlayCircle, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const ResourceCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  category: string;
  link: string;
  type: 'guide' | 'video' | 'whitepaper' | 'webinar';
}> = ({ title, description, icon, category, link, type }) => {
  const typeClass = {
    guide: 'bg-green-100 text-green-700',
    video: 'bg-blue-100 text-blue-700',
    whitepaper: 'bg-purple-100 text-purple-700',
    webinar: 'bg-orange-100 text-orange-700',
  }[type];
  
  const typeLabel = {
    guide: 'Guide',
    video: 'Video',
    whitepaper: 'Whitepaper',
    webinar: 'Webinar',
  }[type];
  
  return (
    <Card className="border border-border overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 duration-300 h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${typeClass}`}>
            {typeLabel}
          </div>
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">{category}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link to={link} className="flex items-center justify-center">
            {type === 'guide' ? 'Read guide' : 
             type === 'video' ? 'Watch video' : 
             type === 'whitepaper' ? 'Download PDF' : 'Register now'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const Resources: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-24">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Resources to help you succeed
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our library of guides, tutorials, case studies, and more to help you get the most out of InvoiceAI.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search resources..." 
              className="pl-10 py-6 rounded-full"
            />
          </div>
        </div>

        {/* Featured Resources */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8">Featured resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-brand-100 bg-brand-50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div className="bg-brand-100 text-brand-700 text-xs font-medium px-2 py-1 rounded-full">
                    Ultimate Guide
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">The Complete Guide to Invoice Data Extraction</h3>
                <p className="text-muted-foreground mb-4">
                  Learn about the latest technologies for automating invoice processing, from OCR to machine learning.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-brand-200 w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-700 text-xs">1</span>
                    </div>
                    <span>Understanding invoice data extraction</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-brand-200 w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-700 text-xs">2</span>
                    </div>
                    <span>OCR technology explained</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <div className="rounded-full bg-brand-200 w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-brand-700 text-xs">3</span>
                    </div>
                    <span>AI-powered validation workflows</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-brand-100/50 p-6">
                <Button className="w-full bg-brand-600 hover:bg-brand-700" asChild>
                  <Link to="/guides/complete-guide-invoice-extraction">Read the guide</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <ResourceCard 
              title="Automating Accounts Payable: A Step-by-Step Implementation Guide" 
              description="Learn how to transform your AP process with automation and AI."
              icon={<FileText className="h-5 w-5" />}
              category="Implementation"
              link="/guides/automating-accounts-payable"
              type="guide"
            />
            
            <ResourceCard 
              title="InvoiceAI Platform Demo: See it in Action" 
              description="Watch our comprehensive demo of the InvoiceAI platform and all its features."
              icon={<PlayCircle className="h-5 w-5" />}
              category="Product"
              link="/videos/invoice-ai-demo"
              type="video"
            />
          </div>
        </div>

        {/* Resource Library */}
        <div className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Resource library</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Most recent
              </Button>
              <Button variant="outline" size="sm">
                Most popular
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All resources</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="whitepapers">Whitepapers</TabsTrigger>
              <TabsTrigger value="webinars">Webinars</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ResourceCard 
                  title="Multilingual Invoice Processing: A Comprehensive Guide" 
                  description="Learn how to process invoices in multiple languages, including Indian languages."
                  icon={<BookOpen className="h-5 w-5" />}
                  category="Multilingual"
                  link="/guides/multilingual-invoice-processing"
                  type="guide"
                />
                
                <ResourceCard 
                  title="Integrating InvoiceAI with Tally: Step-by-Step Tutorial" 
                  description="A detailed walkthrough of connecting InvoiceAI with Tally accounting software."
                  icon={<PlayCircle className="h-5 w-5" />}
                  category="Integration"
                  link="/videos/invoiceai-tally-integration"
                  type="video"
                />
                
                <ResourceCard 
                  title="The ROI of Invoice Automation: 2023 Research Report" 
                  description="Comprehensive analysis of cost savings and efficiency gains from invoice automation."
                  icon={<Download className="h-5 w-5" />}
                  category="Research"
                  link="/whitepapers/roi-invoice-automation"
                  type="whitepaper"
                />
                
                <ResourceCard 
                  title="Implementing GDPR-Compliant Invoice Processing" 
                  description="Learn how to ensure your invoice processing meets GDPR requirements."
                  icon={<BookOpen className="h-5 w-5" />}
                  category="Compliance"
                  link="/guides/gdpr-compliant-invoice-processing"
                  type="guide"
                />
                
                <ResourceCard 
                  title="Advanced Validation Techniques for Invoice Data" 
                  description="Expert webinar on implementing robust validation rules for invoice data extraction."
                  icon={<PlayCircle className="h-5 w-5" />}
                  category="Webinar"
                  link="/webinars/advanced-validation-techniques"
                  type="webinar"
                />
                
                <ResourceCard 
                  title="Multi-Tenant Architecture: Best Practices for SaaS" 
                  description="How InvoiceAI implements secure multi-tenant data isolation."
                  icon={<Download className="h-5 w-5" />}
                  category="Technical"
                  link="/whitepapers/multi-tenant-architecture"
                  type="whitepaper"
                />
                
                <ResourceCard 
                  title="10 Ways to Optimize Your Invoice Processing Workflow" 
                  description="Tips and tricks to improve efficiency in your AP department."
                  icon={<BookOpen className="h-5 w-5" />}
                  category="Optimization"
                  link="/guides/optimize-invoice-processing"
                  type="guide"
                />
                
                <ResourceCard 
                  title="Invoice Fraud Detection with AI" 
                  description="How machine learning can help identify potentially fraudulent invoices."
                  icon={<PlayCircle className="h-5 w-5" />}
                  category="Security"
                  link="/videos/invoice-fraud-detection"
                  type="video"
                />
                
                <ResourceCard 
                  title="The Future of Finance: AI in Accounting" 
                  description="Upcoming trends in AI and automation for accounting departments."
                  icon={<PlayCircle className="h-5 w-5" />}
                  category="Webinar"
                  link="/webinars/future-of-finance-ai"
                  type="webinar"
                />
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/resources/library" className="flex items-center">
                    View all resources <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            {/* Other tab contents would be similar but filtered by type */}
          </Tabs>
        </div>

        {/* Case Studies Section */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8">Customer case studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border border-border overflow-hidden">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-400">Alpha Corp</div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-brand-600 font-medium">CASE STUDY</div>
                  <div className="text-sm text-muted-foreground">Retail Industry</div>
                </div>
                <h3 className="text-xl font-bold mb-2">How Alpha Corp reduced invoice processing time by 85%</h3>
                <p className="text-muted-foreground mb-4">
                  Alpha Corp was processing over 10,000 invoices monthly with a team of 5 full-time staff. After implementing InvoiceAI, they automated 90% of their invoice processing workflow.
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Invoice Automation
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    QuickBooks Integration
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Workflow Optimization
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/case-studies/alpha-corp">Read case study</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-border overflow-hidden">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-400">India Business</div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-brand-600 font-medium">CASE STUDY</div>
                  <div className="text-sm text-muted-foreground">Legal & Accounting</div>
                </div>
                <h3 className="text-xl font-bold mb-2">India Business simplifies multilingual invoice processing</h3>
                <p className="text-muted-foreground mb-4">
                  With clients across different states in India, India Business needed a solution that could process invoices in multiple Indian languages. InvoiceAI's multilingual capabilities were the perfect solution.
                </p>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Multilingual OCR
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Tally Integration
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    Regional Support
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/case-studies/india-business">Read case study</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/case-studies" className="flex items-center">
                View all case studies <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-brand-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay updated with InvoiceAI</h2>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter to receive regular updates on new features, industry insights, and best practices for invoice processing.
              </p>
              <div className="flex gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                By subscribing, you agree to receive marketing communications from InvoiceAI. You can unsubscribe at any time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold mb-4">Recent newsletter topics</h3>
              <ul className="space-y-4">
                <li className="pb-4 border-b border-border">
                  <div className="font-medium">New Feature: Advanced GST Validation for Indian Invoices</div>
                  <p className="text-sm text-muted-foreground">Learn about our new GST compliance features specifically designed for the Indian market.</p>
                </li>
                <li className="pb-4 border-b border-border">
                  <div className="font-medium">Webinar Recap: Automating Accounts Payable in 2023</div>
                  <p className="text-sm text-muted-foreground">Key takeaways from our recent webinar with industry experts.</p>
                </li>
                <li>
                  <div className="font-medium">Customer Spotlight: Beta Solutions' Success Story</div>
                  <p className="text-sm text-muted-foreground">How Beta Solutions transformed their invoice processing with InvoiceAI.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
