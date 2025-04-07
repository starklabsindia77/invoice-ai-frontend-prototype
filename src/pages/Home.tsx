
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Database, 
  Shield, 
  Sparkles,
  Clock,
  Coins,
  Globe,
  Zap
} from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Inspired by Attio's clean hero design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-6 animate-fade-in">
                Introducing AI-powered Invoice Processing
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in leading-tight tracking-tight">
                Transform Invoice<br />Processing with Enterprise-Grade AI
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-white/80 leading-relaxed max-w-2xl mx-auto">
                Extract, validate, and process invoice data automatically with industry-leading accuracy in 15+ languages including all major Indian languages.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100 font-medium px-8"
                asChild
              >
                <Link to="/signup">Start Free Trial</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-medium px-8"
                asChild
              >
                <Link to="/demo" className="flex items-center">Watch Demo <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">85%</div>
                <div className="text-white/80 text-sm">Average reduction in invoice processing time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">99.8%</div>
                <div className="text-white/80 text-sm">Data extraction accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-white/80 text-sm">Languages supported</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-brand-700/20 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-600/20 blur-3xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0xaDF2MWgtMXYtMXptLTIgM2gxdjFoLTF2LTF6bS0yLTRoM3YxaC0zdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>
      </div>

      {/* Client Logo Section - Attio-inspired clean layout */}
      <div className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wide">Trusted by businesses across industries</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="text-xl font-bold text-gray-300">Alpha Corp</div>
            <div className="text-xl font-bold text-gray-300">Beta Solutions</div>
            <div className="text-xl font-bold text-gray-300">Gamma Enterprises</div>
            <div className="text-xl font-bold text-gray-300">India Business</div>
            <div className="text-xl font-bold text-gray-300">Legal Partners</div>
          </div>
        </div>
      </div>

      {/* Value Proposition - Attio-inspired sections */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="text-brand-600 font-medium mb-3">WHY INVOICEAI</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Reimagining invoice processing for modern businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              Our AI-powered platform extracts data from invoices with industry-leading accuracy, saving you time and reducing errors.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Save 85% of processing time</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Automate manual data entry and approval workflows, freeing your team to focus on strategic financial activities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Process hundreds of invoices in minutes instead of hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Automated data extraction eliminates manual entry</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Intelligent workflows route invoices automatically</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">99.8% data extraction accuracy</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Our advanced AI models extract data with unprecedented accuracy, even from complex invoice layouts.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Advanced OCR with deep learning capabilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Recognizes and adapts to various invoice formats</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Continuous model improvement with each processed invoice</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Multilingual support</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Process invoices in 15+ languages, including all major Indian languages, with the same high accuracy.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Support for Hindi, Bengali, Tamil, Telugu, and more</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Language-specific extraction rules and validation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Regional tax compliance (GST, VAT, etc.)</span>
                </li>
              </ul>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-6">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Reduce processing costs by 65%</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Cut processing costs significantly while improving accuracy and compliance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Lower operational costs through automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Reduced error correction and rework</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                  <span>Capture early payment discounts through faster processing</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Product Features - More detailed feature set */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-brand-600 font-medium mb-3">CORE FEATURES</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Powerful features for modern businesses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform is designed to handle your entire invoice processing workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multilingual OCR</h3>
                <p className="text-muted-foreground">
                  Extract invoice data in 15+ languages, including Indian languages like Hindi, Bengali, Tamil, and more.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>Support for 15+ global languages</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>98% accuracy in extraction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accounting Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly sync extracted data with Tally, QuickBooks, Zoho Books, Xero, and other accounting software.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>Support for all major accounting platforms</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>One-click data synchronization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  GDPR compliant with data encryption, anonymization, and tenant-specific data isolation.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>End-to-end encryption</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-brand-600" />
                    <span>Multi-tenant architecture</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works - Process section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-brand-600 font-medium mb-3">HOW IT WORKS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                A simple, powerful workflow
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Our streamlined process makes invoice data extraction simple and efficient, with minimal setup required.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Upload</h3>
                    <p className="text-muted-foreground">
                      Upload your invoices through our secure portal, API, or email integration. Batch upload is supported for high volume processing.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Process</h3>
                    <p className="text-muted-foreground">
                      Our AI extracts and validates all relevant data fields with industry-leading accuracy. Advanced validation rules ensure data quality.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Review</h3>
                    <p className="text-muted-foreground">
                      Review extracted data with our intuitive interface. Any exceptions are highlighted for quick verification and correction.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Export</h3>
                    <p className="text-muted-foreground">
                      Sync with your accounting software or download structured data in your preferred format (CSV, Excel, JSON, or XML).
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link to="/demo" className="flex items-center">
                    See it in action <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-2xl p-8 relative">
              <div className="absolute -left-4 -top-4 w-24 h-24 bg-brand-100 rounded-xl -z-10"></div>
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-brand-50 rounded-xl -z-10"></div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-600 rounded-full text-white flex items-center justify-center font-bold text-lg mr-3">
                    1
                  </div>
                  <div className="font-medium">Upload invoice</div>
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                  <div className="text-muted-foreground mb-3">Drag & drop files here or</div>
                  <Button variant="outline" size="sm">Browse files</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-600 rounded-full text-white flex items-center justify-center font-bold text-lg mr-3">
                    2
                  </div>
                  <div className="font-medium">AI processing</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Zap className="h-5 w-5 text-brand-600 mr-2" />
                    <div className="text-sm">Extracting invoice data...</div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-brand-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">Processing 3 of 4 pages</div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-brand-600 rounded-full text-white flex items-center justify-center font-bold text-lg mr-3">
                    3
                  </div>
                  <div className="font-medium">Extracted data</div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Invoice Number</div>
                      <div className="font-medium">INV-2023-001</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Date</div>
                      <div className="font-medium">21/03/2023</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Total Amount</div>
                      <div className="font-medium">₹24,500.00</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">GST Number</div>
                      <div className="font-medium">29AADCB2230M1ZP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-brand-600 font-medium mb-3">TESTIMONIALS</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Trusted by businesses worldwide
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how InvoiceAI is helping companies streamline their invoice processing workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border border-gray-200 shadow-sm p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
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
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm p-8">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
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
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/customers" className="flex items-center">
                View all customer stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Pricing Section Preview */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="text-brand-600 font-medium mb-3">PRICING</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Starter</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Perfect for small businesses</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Up to 100 invoices/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Basic OCR capabilities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>CSV export</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-brand-600 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-medium py-1 px-3 rounded-bl">
                POPULAR
              </div>
              <div className="p-6 border-b border-gray-200 bg-brand-50">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$149</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">For growing businesses</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Up to 500 invoices/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Advanced OCR with multilingual support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Accounting software integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-brand-600 hover:bg-brand-700" asChild>
                  <Link to="/signup">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">Custom</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">For large organizations</p>
              </div>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Unlimited invoices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Full multilingual support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-brand-600" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full mt-6 border-brand-600 text-brand-600" asChild>
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/pricing" className="flex items-center">
                View detailed pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-brand-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to revolutionize your invoice processing?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-brand-100 opacity-90">
              Join thousands of businesses that trust InvoiceAI for their document processing needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100 font-medium px-8"
                asChild
              >
                <Link to="/signup">Start Your Free Trial</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 font-medium"
                asChild
              >
                <Link to="/demo">Schedule a Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
