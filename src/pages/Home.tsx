
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-900 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Transform Your Invoice Processing with AI
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-brand-100 opacity-90">
              Extract, validate, and process invoice data automatically with enterprise-grade accuracy and security.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100"
                asChild
              >
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/demo">Watch Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Powerful Features for Modern Businesses
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform extracts data from invoices with industry-leading accuracy, saving you time and reducing errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multilingual OCR</h3>
              <p className="text-muted-foreground">
                Extract invoice data in 15+ languages, including Indian languages like Hindi, Bengali, Tamil, and more.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Accounting Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly sync extracted data with Tally, QuickBooks, Zoho Books, Xero, and other accounting software.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md card-hover">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                GDPR compliant with data encryption, anonymization, and tenant-specific data isolation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
              Trusted by Businesses Worldwide
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how InvoiceAI is helping companies streamline their invoice processing workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alpha Corp</h4>
                  <p className="text-sm text-muted-foreground">Retail Industry</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "InvoiceAI has reduced our invoice processing time by 85%. The accuracy is incredible, and the integration with our accounting system was seamless."
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  IB
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">India Business</h4>
                  <p className="text-sm text-muted-foreground">Legal & Accounting</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The multilingual support is a game-changer for us. Being able to process invoices in Hindi, Tamil, and other Indian languages has simplified our regional operations tremendously."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-brand-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Revolutionize Your Invoice Processing?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-brand-100 opacity-90">
            Join thousands of businesses that trust InvoiceAI for their document processing needs.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-800 hover:bg-brand-100"
            asChild
          >
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
