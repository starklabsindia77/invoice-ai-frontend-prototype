
import React from 'react';
import { Shield, Lock, Database, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SecurityFeature = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-col gap-4">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const ComplianceBadge = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
    <CheckCircle className="h-5 w-5 text-green-500" />
    <span className="font-medium">{title}</span>
  </div>
);

const Security = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Enterprise-Grade Security and Compliance
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We take security seriously. Our platform is built with industry-leading security practices 
              and compliance standards to keep your data safe.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Talk to Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <SecurityFeature 
            icon={<Shield className="h-6 w-6" />}
            title="End-to-End Encryption"
            description="All data is encrypted in transit and at rest using industry-standard AES-256 encryption."
          />
          <SecurityFeature 
            icon={<Lock className="h-6 w-6" />}
            title="Multi-Factor Authentication"
            description="Protect your accounts with multiple layers of security through our MFA options."
          />
          <SecurityFeature 
            icon={<Database className="h-6 w-6" />}
            title="Data Isolation"
            description="Strong isolation between customers ensures your data remains private and secure."
          />
          <SecurityFeature 
            icon={<Shield className="h-6 w-6" />}
            title="Regular Security Audits"
            description="Our systems undergo regular security audits and penetration testing by third-party experts."
          />
          <SecurityFeature 
            icon={<Lock className="h-6 w-6" />}
            title="Role-Based Access Control"
            description="Granular access controls let you define precisely who can access what within your organization."
          />
          <SecurityFeature 
            icon={<Database className="h-6 w-6" />}
            title="Secure Cloud Infrastructure"
            description="Built on top of AWS with multiple redundancy layers and geographic distribution."
          />
        </div>

        {/* Compliance Section */}
        <motion.div 
          className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Compliance Standards</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ComplianceBadge title="GDPR Compliant" />
              <ComplianceBadge title="HIPAA Compliant" />
              <ComplianceBadge title="SOC 2 Type II" />
              <ComplianceBadge title="ISO 27001" />
              <ComplianceBadge title="PCI DSS" />
              <ComplianceBadge title="CCPA Compliant" />
              <ComplianceBadge title="NIST Framework" />
              <ComplianceBadge title="FERPA Compliant" />
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <div className="bg-primary/5 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to secure your invoice operations?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust InvoiceAI with their sensitive financial data.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/security-whitepaper">Download Security Whitepaper</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
