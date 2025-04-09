
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  FileText, 
  Search, 
  Clock, 
  Users, 
  Database, 
  Shield, 
  BarChart3, 
  CloudLightning, 
  Bot,
  Zap,
  Check,
  Brain,
  Workflow,
  Layers,
  CreditCard,
  BookOpen,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/PageHeader';

const FeatureSection = ({ 
  title, 
  description, 
  icon, 
  imageUrl, 
  reverse = false,
  features = [] 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  imageUrl?: string;
  reverse?: boolean;
  features?: string[];
}) => {
  return (
    <div className="py-16 border-b border-border">
      <div className="container mx-auto px-4">
        <div className={`grid md:grid-cols-2 gap-12 items-center ${reverse ? 'md:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: reverse ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-2 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">{title}</h2>
            <div className="text-lg text-muted-foreground space-y-4">
              <p>{description}</p>
              
              {features.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="mt-8">
              <Button asChild>
                <Link to="/signup">Try It Free</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: reverse ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={reverse ? 'md:order-first' : ''}
          >
            {imageUrl ? (
              <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-white p-1">
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted rounded-lg shadow-xl flex items-center justify-center">
                <span className="text-muted-foreground">Feature Screenshot</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  </motion.div>
);

const ComparisonTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-muted">
          <th className="p-4 text-left border-b">Feature</th>
          <th className="p-4 text-center border-b">Basic</th>
          <th className="p-4 text-center border-b">Professional</th>
          <th className="p-4 text-center border-b">Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-4 border-b">AI-Powered Data Extraction</td>
          <td className="p-4 text-center border-b">Basic</td>
          <td className="p-4 text-center border-b">Advanced</td>
          <td className="p-4 text-center border-b">Enterprise-grade</td>
        </tr>
        <tr>
          <td className="p-4 border-b">Document Recognition</td>
          <td className="p-4 text-center border-b">Limited</td>
          <td className="p-4 text-center border-b">Enhanced</td>
          <td className="p-4 text-center border-b">Comprehensive</td>
        </tr>
        <tr>
          <td className="p-4 border-b">Approval Workflows</td>
          <td className="p-4 text-center border-b">Basic</td>
          <td className="p-4 text-center border-b">Customizable</td>
          <td className="p-4 text-center border-b">Advanced Logic</td>
        </tr>
        <tr>
          <td className="p-4 border-b">Analytics Dashboard</td>
          <td className="p-4 text-center border-b">Simple</td>
          <td className="p-4 text-center border-b">Advanced</td>
          <td className="p-4 text-center border-b">Custom Reporting</td>
        </tr>
        <tr>
          <td className="p-4 border-b">Integrations</td>
          <td className="p-4 text-center border-b">Limited</td>
          <td className="p-4 text-center border-b">Extended</td>
          <td className="p-4 text-center border-b">Full API Access</td>
        </tr>
      </tbody>
    </table>
  </div>
);

const Testimonial = ({ 
  quote, 
  author, 
  role, 
  company, 
  avatarUrl 
}: { 
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
}) => (
  <div className="bg-background rounded-xl p-6 shadow-sm border border-border">
    <div className="flex items-center mb-4">
      <div className="mr-4">
        {avatarUrl ? (
          <img src={avatarUrl} alt={author} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            {author.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <h4 className="font-semibold">{author}</h4>
        <p className="text-sm text-muted-foreground">{role}, {company}</p>
      </div>
    </div>
    <p className="italic text-muted-foreground">&ldquo;{quote}&rdquo;</p>
  </div>
);

const Features = () => {
  return (
    <>
      <Helmet>
        <title>Features | InvoiceAI - Powerful Invoice Processing Platform</title>
        <meta name="description" content="Explore the powerful features of InvoiceAI that will transform your invoice processing workflow with AI-powered data extraction, approval workflows, and advanced analytics." />
        <meta name="keywords" content="invoice processing, AI technology, data extraction, approval workflows, analytics dashboard" />
        <meta property="og:title" content="Features | InvoiceAI" />
        <meta property="og:description" content="Discover how InvoiceAI transforms your invoice management workflow with powerful AI-driven features that save time and reduce errors." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/features" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/features" />
      </Helmet>

      <div className="pb-16">
        {/* Hero Section */}
        <PageHeader
          pageName="Features"
          title="Powerful Features for Invoice Processing"
          description="Discover how InvoiceAI transforms your invoice management workflow with powerful AI-driven features that save time and reduce errors."
          cta={{ text: "Start Free Trial", link: "/signup" }}
          secondaryCta={{ text: "View Pricing", link: "/pricing" }}
        />

        {/* Tabs Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="core" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-3 md:grid-cols-3 lg:w-auto">
                  <TabsTrigger value="core">Core Features</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced Solutions</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise Options</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="core" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="AI-Powered Data Extraction"
                    description="Extract invoice data with 95% accuracy using our advanced machine learning algorithms."
                    icon={<Bot size={24} />}
                  />
                  <FeatureCard
                    title="Intelligent Document Recognition"
                    description="Automatically identify and categorize different document types from invoices to receipts."
                    icon={<FileText size={24} />}
                  />
                  <FeatureCard
                    title="Customizable Approval Workflows"
                    description="Create multi-step approval workflows based on your organization's structure."
                    icon={<Workflow size={24} />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="Advanced Analytics"
                    description="Gain insights with comprehensive analytics on spending patterns and vendor performance."
                    icon={<BarChart3 size={24} />}
                  />
                  <FeatureCard
                    title="Deep Learning Models"
                    description="Our AI continuously learns from corrections to improve extraction accuracy over time."
                    icon={<Brain size={24} />}
                  />
                  <FeatureCard
                    title="Flexible Integrations"
                    description="Connect with your existing accounting software, ERPs, and payment platforms."
                    icon={<CloudLightning size={24} />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="enterprise" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FeatureCard
                    title="Custom Machine Learning Models"
                    description="We build custom ML models trained specifically on your company's invoice formats."
                    icon={<Layers size={24} />}
                  />
                  <FeatureCard
                    title="Enterprise-Grade Security"
                    description="Bank-level encryption, role-based access controls, and comprehensive audit trails."
                    icon={<Shield size={24} />}
                  />
                  <FeatureCard
                    title="Dedicated Account Manager"
                    description="Get personalized support with a dedicated account manager and priority assistance."
                    icon={<Users size={24} />}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Main Feature Sections */}
        <FeatureSection
          title="AI-Powered Data Extraction"
          description="Our advanced AI technology automatically extracts key information from invoices with industry-leading accuracy. Process invoices in seconds rather than minutes, eliminating manual data entry and reducing errors."
          icon={<Bot size={24} />}
          imageUrl="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          features={[
            "95% accuracy in data extraction from day one",
            "Handles various invoice formats and layouts",
            "Extracts line items, totals, taxes, and payment details",
            "Processes multiple invoices simultaneously"
          ]}
        />

        <FeatureSection
          title="Intelligent Document Recognition"
          description="The system automatically identifies and categorizes different document types, separating invoices from purchase orders, receipts, and other financial documents for streamlined processing."
          icon={<FileText size={24} />}
          imageUrl="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          reverse={true}
          features={[
            "Automatic document classification",
            "Supports multiple languages and currencies",
            "Extracts data from both digital and scanned documents",
            "Processes documents in various file formats"
          ]}
        />
        
        <FeatureSection
          title="Customizable Approval Workflows"
          description="Create multi-step approval workflows based on your organization's structure. Set approval thresholds, delegate approvals, and implement role-based permissions for complete control over your invoice process."
          icon={<Users size={24} />}
          imageUrl="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          features={[
            "Multi-level approval hierarchies",
            "Delegated approval capabilities",
            "Mobile approvals on-the-go",
            "Automatic reminders and escalations"
          ]}
        />

        <FeatureSection
          title="Real-time Analytics Dashboard"
          description="Gain valuable insights into your accounts payable process with comprehensive analytics. Track spending patterns, vendor performance, processing times, and payment status all in one place."
          icon={<BarChart3 size={24} />}
          imageUrl="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
          reverse={true}
          features={[
            "Real-time data visualization",
            "Customizable reporting dashboards",
            "Trend analysis and forecasting",
            "Export reports in multiple formats"
          ]}
        />

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Feature Comparison</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Compare features across different pricing tiers to find the perfect plan for your business.
              </p>
            </div>
            
            <ComparisonTable />
            
            <div className="mt-8 text-center">
              <Button size="lg" asChild>
                <Link to="/pricing">View Full Pricing Details</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Customers Say</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                See how our features have transformed invoice processing for businesses like yours.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Testimonial 
                quote="InvoiceAI's data extraction capabilities have reduced our invoice processing time by 75%. The accuracy is impressive."
                author="Sarah Johnson"
                role="CFO"
                company="Meridian Technologies"
              />
              <Testimonial 
                quote="The customizable approval workflows have streamlined our entire AP process. Our team loves how intuitive it is to use."
                author="Michael Chen"
                role="Finance Director"
                company="Global Logistics Inc."
              />
              <Testimonial 
                quote="The analytics dashboard gives us insights we never had before. We've identified several areas for cost savings."
                author="Emily Rodriguez"
                role="Controller"
                company="Westfield Manufacturing"
              />
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/case-studies">Read Full Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Secondary Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">More Powerful Features</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                InvoiceAI is packed with features designed to streamline your invoice processing workflow from start to finish.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                title="Seamless Integrations"
                description="Connect with popular accounting software, ERPs, and payment platforms for a smooth, uninterrupted workflow."
                icon={<CloudLightning size={24} />}
              />
              
              <FeatureCard
                title="Advanced Search"
                description="Quickly find any invoice with powerful search capabilities across all invoice fields, including OCR'd text within documents."
                icon={<Search size={24} />}
              />
              
              <FeatureCard
                title="Automated Matching"
                description="Automatically match invoices with purchase orders and receiving documents to streamline the verification process."
                icon={<Check size={24} />}
              />
              
              <FeatureCard
                title="Exception Handling"
                description="Smart flagging of discrepancies and exceptions, allowing you to address issues quickly and maintain accuracy."
                icon={<Clock size={24} />}
              />
              
              <FeatureCard
                title="Vendor Management"
                description="Maintain a comprehensive vendor database with payment terms, contact information, and performance history."
                icon={<Database size={24} />}
              />
              
              <FeatureCard
                title="Enterprise-Grade Security"
                description="Bank-level encryption, role-based access controls, and comprehensive audit trails keep your financial data secure."
                icon={<Shield size={24} />}
              />
              
              <FeatureCard
                title="Payment Processing"
                description="Initiate and track payments directly from the platform, with support for multiple payment methods."
                icon={<CreditCard size={24} />}
              />
              
              <FeatureCard
                title="Compliance Management"
                description="Ensure regulatory compliance with built-in tools for tracking tax requirements and financial regulations."
                icon={<BookOpen size={24} />}
              />
              
              <FeatureCard
                title="Performance Optimization"
                description="Identify bottlenecks in your AP process and receive AI-powered suggestions for improving efficiency."
                icon={<Zap size={24} />}
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5 rounded-lg mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Transform Your Invoice Processing?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of businesses saving time and money with InvoiceAI's intelligent invoice processing platform.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Schedule Demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Features;
