
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, Book, HelpCircle, LifeBuoy, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

// Sample help categories and articles
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <Book className="h-6 w-6" />,
    description: 'Learn the basics and get up and running quickly',
    articles: [
      { id: 'quickstart', title: 'Quickstart Guide', slug: 'quickstart-guide' },
      { id: 'setup', title: 'Setting Up Your Account', slug: 'setting-up-your-account' },
      { id: 'first-invoice', title: 'Processing Your First Invoice', slug: 'processing-your-first-invoice' },
      { id: 'dashboard', title: 'Understanding the Dashboard', slug: 'understanding-the-dashboard' },
      { id: 'user-roles', title: 'User Roles and Permissions', slug: 'user-roles-and-permissions' }
    ]
  },
  {
    id: 'features',
    title: 'Features & Functionality',
    icon: <FileText className="h-6 w-6" />,
    description: 'Detailed guides on using specific features',
    articles: [
      { id: 'ai-extraction', title: 'AI Data Extraction', slug: 'ai-data-extraction' },
      { id: 'approval-workflows', title: 'Setting Up Approval Workflows', slug: 'setting-up-approval-workflows' },
      { id: 'integration', title: 'Integrations with Accounting Software', slug: 'integrations-with-accounting-software' },
      { id: 'reporting', title: 'Creating Custom Reports', slug: 'creating-custom-reports' },
      { id: 'batch-processing', title: 'Batch Processing Invoices', slug: 'batch-processing-invoices' }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: <HelpCircle className="h-6 w-6" />,
    description: 'Solutions to common issues and problems',
    articles: [
      { id: 'common-errors', title: 'Common Error Messages', slug: 'common-error-messages' },
      { id: 'connection-issues', title: 'Fixing Connection Issues', slug: 'fixing-connection-issues' },
      { id: 'integration-problems', title: 'Integration Troubleshooting', slug: 'integration-troubleshooting' },
      { id: 'data-issues', title: 'Resolving Data Extraction Issues', slug: 'resolving-data-extraction-issues' },
      { id: 'performance', title: 'Improving Performance', slug: 'improving-performance' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    icon: <Shield className="h-6 w-6" />,
    description: 'Information about security features and compliance',
    articles: [
      { id: 'data-security', title: 'Data Security Overview', slug: 'data-security-overview' },
      { id: 'encryption', title: 'Encryption Methods', slug: 'encryption-methods' },
      { id: 'access-control', title: 'Access Control Best Practices', slug: 'access-control-best-practices' },
      { id: 'compliance', title: 'Compliance Certifications', slug: 'compliance-certifications' },
      { id: 'audit-logs', title: 'Understanding Audit Logs', slug: 'understanding-audit-logs' }
    ]
  }
];

// Sample FAQs
const faqs = [
  {
    question: 'How accurate is the AI data extraction?',
    answer: 'Our AI data extraction typically achieves 95-98% accuracy for standard invoices. The system continuously learns from corrections, improving accuracy over time for your specific invoice formats.'
  },
  {
    question: 'Can I integrate with my existing accounting software?',
    answer: 'Yes, InvoiceAI integrates with most popular accounting software including QuickBooks, Xero, Sage, and many others. We also offer an API for custom integrations.'
  },
  {
    question: 'What file formats are supported for invoice uploads?',
    answer: 'We support various file formats including PDF, JPG, PNG, TIFF, and electronic invoice formats such as EDI and XML.'
  },
  {
    question: 'How secure is my invoice data?',
    answer: 'Your data security is our priority. We use bank-level encryption for all data, both in transit and at rest. Our system complies with SOC 2, GDPR, and other security standards.'
  },
  {
    question: 'Can I customize the approval workflow?',
    answer: 'Absolutely. You can create custom approval workflows based on various criteria such as invoice amount, vendor, department, or any custom fields you define.'
  },
  {
    question: 'Is there a limit to the number of invoices I can process?',
    answer: 'Our pricing plans are based on the volume of invoices processed. We offer scalable options from small businesses to enterprise-level organizations with high volume needs.'
  }
];

// Popular articles
const popularArticles = [
  { title: 'Getting Started with InvoiceAI', slug: 'getting-started-with-invoiceai', views: 4350 },
  { title: 'Integrating with QuickBooks', slug: 'integrating-with-quickbooks', views: 3280 },
  { title: 'Setting Up Custom Approval Workflows', slug: 'setting-up-custom-approval-workflows', views: 2970 },
  { title: 'Troubleshooting Common Extraction Errors', slug: 'troubleshooting-common-extraction-errors', views: 2640 }
];

const HelpCategoryCard = ({ category }: { category: typeof helpCategories[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            {category.icon}
          </div>
          <div>
            <CardTitle className="text-xl">{category.title}</CardTitle>
            <CardDescription className="mt-2">{category.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {category.articles.map(article => (
            <li key={article.id}>
              <Link 
                to={`/help/${article.slug}`} 
                className="text-sm text-foreground hover:text-primary hover:underline flex items-center"
              >
                <FileText className="h-3 w-3 mr-2 text-muted-foreground" />
                {article.title}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              to={`/help/categories/${category.id}`}
              className="text-sm font-medium text-primary hover:underline"
            >
              View all articles →
            </Link>
          </li>
        </ul>
      </CardContent>
    </Card>
  </motion.div>
);

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to your questions and learn how to get the most out of InvoiceAI.
            </p>
            
            <div className="max-w-2xl mx-auto relative">
              <Input 
                type="search" 
                placeholder="Search help articles..." 
                className="pl-10 h-12 text-lg rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
              <span>Popular:</span>
              {popularArticles.map((article, index) => (
                <Link 
                  key={index} 
                  to={`/help/${article.slug}`}
                  className="hover:text-primary hover:underline"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Browse Help Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map(category => (
              <HelpCategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mb-16">
          <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="faq">Frequently Asked Questions</TabsTrigger>
              <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              <TabsTrigger value="community">Community Forum</TabsTrigger>
            </TabsList>
            
            <TabsContent value="faq">
              <Card>
                <CardContent className="pt-6">
                  <div className="divide-y">
                    {faqs.map((faq, index) => (
                      <div key={index} className="py-5">
                        <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="videos">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-medium mb-2">Getting Started Tutorial</h3>
                        <p className="text-sm text-muted-foreground">8:24 mins</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-medium mb-2">Advanced Approval Workflows</h3>
                        <p className="text-sm text-muted-foreground">12:06 mins</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-medium mb-2">Integration Guide</h3>
                        <p className="text-sm text-muted-foreground">15:30 mins</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center p-4">
                        <h3 className="font-medium mb-2">Reporting and Analytics</h3>
                        <p className="text-sm text-muted-foreground">10:45 mins</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center p-8">
                    <h3 className="text-xl font-medium mb-4">Join our Community Forum</h3>
                    <p className="mb-6 text-muted-foreground">
                      Connect with other InvoiceAI users, share best practices, and get answers from the community.
                    </p>
                    <Button size="lg">
                      Visit the Forum
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Contact Support */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need more help?</h2>
            <p className="text-muted-foreground mb-6">
              Our support team is available to assist you with any questions or issues.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team in real-time.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto w-full">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <LifeBuoy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Support Ticket</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a support ticket for non-urgent issues.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto w-full" asChild>
                    <Link to="/contact">Submit Ticket</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">Schedule Call</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Book a call with a support specialist.
                  </p>
                  <Button variant="outline" size="sm" className="mt-auto w-full">
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
