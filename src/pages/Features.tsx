
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureSection = ({ 
  title, 
  description, 
  icon, 
  imageUrl, 
  reverse = false 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  imageUrl?: string;
  reverse?: boolean;
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

const Features = () => {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Powerful Features for Invoice Processing
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Discover how InvoiceAI transforms your invoice management workflow with powerful AI-driven features that save time and reduce errors.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">View Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Feature Sections */}
      <FeatureSection
        title="AI-Powered Data Extraction"
        description="Our advanced AI technology automatically extracts key information from invoices with industry-leading accuracy. Process invoices in seconds rather than minutes, eliminating manual data entry and reducing errors by up to 95%."
        icon={<Bot size={24} />}
        imageUrl="/placeholder.svg"
      />

      <FeatureSection
        title="Intelligent Document Recognition"
        description="The system automatically identifies and categorizes different document types, separating invoices from purchase orders, receipts, and other financial documents for streamlined processing."
        icon={<FileText size={24} />}
        imageUrl="/placeholder.svg"
        reverse={true}
      />
      
      <FeatureSection
        title="Customizable Approval Workflows"
        description="Create multi-step approval workflows based on your organization's structure. Set approval thresholds, delegate approvals, and implement role-based permissions for complete control over your invoice process."
        icon={<Users size={24} />}
        imageUrl="/placeholder.svg"
      />

      <FeatureSection
        title="Real-time Analytics Dashboard"
        description="Gain valuable insights into your accounts payable process with comprehensive analytics. Track spending patterns, vendor performance, processing times, and payment status all in one place."
        icon={<BarChart3 size={24} />}
        imageUrl="/placeholder.svg"
        reverse={true}
      />

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
  );
};

export default Features;
