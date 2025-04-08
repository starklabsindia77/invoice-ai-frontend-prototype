
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
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
  Zap,
  ChevronRight,
  Play,
  BarChart3,
  ArrowUpRight,
  PanelLeftClose,
  LayoutGrid,
  LightbulbIcon,
  ArrowDownCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const statsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect for hero image
    const handleScroll = () => {
      if (heroImageRef.current) {
        const scrollY = window.scrollY;
        heroImageRef.current.style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Advanced Design */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-brand-950 text-white">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-brand-700/20 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-brand-600/20 blur-3xl"></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0xaDF2MWgtMXYtMXptLTIgM2gxdjFoLTF2LTF6bS0yLTRoM3YxaC0zdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

          {/* Scattered dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: Math.random() * 4 + 'px',
                  height: Math.random() * 4 + 'px',
                  left: Math.random() * 100 + '%',
                  top: Math.random() * 100 + '%',
                  opacity: Math.random() * 0.3 + 0.1
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 sm:py-24 md:py-32 relative z-10">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-6 md:pr-8">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left"
              >
                <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-medium text-white/90 mb-8 border border-white/20">
                  <span className="bg-brand-600 rounded-full w-2 h-2 mr-2"></span>
                  Introducing AI-powered Invoice Processing
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  Transform Invoices with <span className="text-gradient relative inline-block">
                    Enterprise<span className="absolute -bottom-1 left-0 right-0 h-1 bg-brand-600/70 rounded-full"></span>
                  </span> AI
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/80 leading-relaxed">
                  Extract, validate, and process invoice data automatically with industry-leading 
                  accuracy in 15+ languages including all major Indian languages.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="relative overflow-hidden bg-white text-brand-800 hover:bg-white hover:text-brand-900 group font-medium px-8 h-14 rounded-xl shadow-lg"
                    asChild
                  >
                    <Link to="/signup" className="flex items-center justify-center gap-2">
                      <span>Start Free Trial</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span className="absolute -right-3 -top-3 w-12 h-12 bg-brand-200 rounded-full blur-xl opacity-70 transition-opacity group-hover:opacity-100"></span>
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white bg-white/10 font-medium h-14 rounded-xl px-8"
                    asChild
                  >
                    <Link to="/demo" className="flex items-center gap-2">
                      <Play className="w-4 h-4" /> Watch Demo
                    </Link>
                  </Button>
                </div>
                
                <div className="mt-12 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1 text-white">85%</div>
                    <div className="text-white/70 text-sm">Processing time reduced</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1 text-white">99.8%</div>
                    <div className="text-white/70 text-sm">Extraction accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-1 text-white">15+</div>
                    <div className="text-white/70 text-sm">Languages supported</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="md:col-span-6 relative" ref={heroImageRef}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="relative z-10"
              >
                <div className="relative">
                  <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-300/20 rounded-xl blur-lg -z-10"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-400/20 rounded-xl blur-lg -z-10"></div>
                  
                  <div className="bg-white/[0.07] backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl shadow-black/10 p-5 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="text-xs font-medium text-white/70">InvoiceAI Dashboard</div>
                    </div>
                    
                    {/* Mock Dashboard UI */}
                    <div className="bg-white/[0.03] rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-medium">Recent Invoices</h3>
                        <div className="bg-brand-600/30 rounded-md px-2 py-1 text-xs text-white">
                          Today
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-md bg-brand-700/50 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-white/70" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">INV-2025-{i}00{i}</div>
                                <div className="text-xs text-white/50">Alpha Corp Ltd.</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium text-white">₹{i}4,500.00</div>
                              <div className="text-xs text-brand-300">Processed</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/[0.03] rounded-lg p-4">
                        <h3 className="text-sm text-white/70 mb-2">Processing Status</h3>
                        <div className="flex items-end">
                          <div className="text-2xl font-bold text-white">94%</div>
                          <div className="ml-2 text-xs text-brand-300">↑ 12%</div>
                        </div>
                        <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-white/[0.03] rounded-lg p-4">
                        <h3 className="text-sm text-white/70 mb-2">Time Saved</h3>
                        <div className="flex items-end">
                          <div className="text-2xl font-bold text-white">128h</div>
                          <div className="ml-2 text-xs text-brand-300">This month</div>
                        </div>
                        <div className="mt-3 flex space-x-1">
                          {[40, 65, 85, 50, 70, 90].map((h, i) => (
                            <div key={i} className="flex-1">
                              <div className="w-full bg-brand-500/30 rounded-sm" style={{height: `${h}%`}}></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -right-12 top-1/4 flex items-center gap-2 bg-white/[0.07] backdrop-blur-sm border border-white/10 p-2 rounded-lg shadow-lg animate-bounce">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-xs text-white">Invoice processed</div>
                </div>
                
                <div className="absolute -left-8 bottom-1/4 flex items-center gap-2 bg-white/[0.07] backdrop-blur-sm border border-white/10 p-2 rounded-lg shadow-lg animate-pulse">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-xs text-white">85% faster</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col items-center pb-8"
          >
            <ArrowDownCircle className="w-6 h-6 text-white/60 animate-bounce" />
          </motion.div>
        </div>
      </div>

      {/* Client Logo Section - Enhanced */}
      <div className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wide bg-gray-100 px-4 py-2 rounded-full"
            >
              <span className="text-gray-500">Trusted by businesses worldwide</span>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
          >
            {[
              'Alpha Corp', 'Beta Solutions', 'Gamma Enterprises', 
              'India Business', 'Legal Partners', 'Tech Innovators'
            ].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-xl font-bold text-gray-300 relative overflow-hidden group"
              >
                {company}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-300 group-hover:w-full transition-all duration-300"></span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Value Proposition - Enhanced */}
      <div className="py-24 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-70"></div>
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-brand-600 font-medium mb-3"
            >
              WHY INVOICEAI
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
            >
              Reimagining invoice processing for modern businesses
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground"
            >
              Our AI-powered platform extracts data from invoices with industry-leading accuracy, 
              saving you time and reducing errors.
            </motion.p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            {[
              {
                icon: <Clock className="h-6 w-6" />,
                title: "Save 85% of processing time",
                description: "Automate manual data entry and approval workflows, freeing your team to focus on strategic financial activities.",
                benefits: [
                  "Process hundreds of invoices in minutes instead of hours",
                  "Automated data extraction eliminates manual entry",
                  "Intelligent workflows route invoices automatically"
                ]
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "99.8% data extraction accuracy",
                description: "Our advanced AI models extract data with unprecedented accuracy, even from complex invoice layouts.",
                benefits: [
                  "Advanced OCR with deep learning capabilities",
                  "Recognizes and adapts to various invoice formats",
                  "Continuous model improvement with each processed invoice"
                ]
              },
              {
                icon: <Globe className="h-6 w-6" />,
                title: "Multilingual support",
                description: "Process invoices in 15+ languages, including all major Indian languages, with the same high accuracy.",
                benefits: [
                  "Support for Hindi, Bengali, Tamil, Telugu, and more",
                  "Language-specific extraction rules and validation",
                  "Regional tax compliance (GST, VAT, etc.)"
                ]
              },
              {
                icon: <Coins className="h-6 w-6" />,
                title: "Reduce processing costs by 65%",
                description: "Cut processing costs significantly while improving accuracy and compliance.",
                benefits: [
                  "Lower operational costs through automation",
                  "Reduced error correction and rework",
                  "Capture early payment discounts through faster processing"
                ]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Features - Interactive Cards */}
      <div className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-brand-100/40 to-brand-50/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-blue-100/40 to-blue-50/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-brand-600 font-medium mb-3"
            >
              CORE FEATURES
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
            >
              Powerful features for modern businesses
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Our comprehensive platform is designed to handle your entire invoice processing workflow.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <FileText className="h-6 w-6" />,
                title: "Multilingual OCR",
                description: "Extract invoice data in 15+ languages, including Indian languages like Hindi, Bengali, Tamil, and more.",
                benefits: [
                  "Support for 15+ global languages",
                  "98% accuracy in extraction"
                ]
              },
              {
                icon: <Database className="h-6 w-6" />,
                title: "Accounting Integration",
                description: "Seamlessly sync extracted data with Tally, QuickBooks, Zoho Books, Xero, and other accounting software.",
                benefits: [
                  "Support for all major accounting platforms",
                  "One-click data synchronization"
                ]
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Enterprise Security",
                description: "GDPR compliant with data encryption, anonymization, and tenant-specific data isolation.",
                benefits: [
                  "End-to-end encryption",
                  "Multi-tenant architecture"
                ]
              },
              {
                icon: <PanelLeftClose className="h-6 w-6" />,
                title: "Customizable Workflows",
                description: "Design approval workflows that match your organization's specific requirements and processes.",
                benefits: [
                  "Drag-and-drop workflow designer",
                  "Role-based approvals"
                ]
              },
              {
                icon: <BarChart3 className="h-6 w-6" />,
                title: "Advanced Analytics",
                description: "Gain insights into your invoice processing with real-time dashboards and detailed reports.",
                benefits: [
                  "Custom report builder",
                  "Trend analysis and forecasting"
                ]
              },
              {
                icon: <LayoutGrid className="h-6 w-6" />,
                title: "Batch Processing",
                description: "Upload and process hundreds of invoices at once with our powerful batch processing engine.",
                benefits: [
                  "Bulk upload via API or interface",
                  "Parallel processing for speed"
                ]
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full border border-gray-200 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-brand-600" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* How It Works - Interactive Process section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="text-brand-600 font-medium mb-3">HOW IT WORKS</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                A simple, powerful workflow
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Our streamlined process makes invoice data extraction simple and efficient, with minimal setup required.
              </p>
              
              <div className="space-y-10">
                {[
                  {
                    number: 1,
                    title: "Upload",
                    description: "Upload your invoices through our secure portal, API, or email integration. Batch upload is supported for high volume processing."
                  },
                  {
                    number: 2,
                    title: "Process",
                    description: "Our AI extracts and validates all relevant data fields with industry-leading accuracy. Advanced validation rules ensure data quality."
                  },
                  {
                    number: 3,
                    title: "Review",
                    description: "Review extracted data with our intuitive interface. Any exceptions are highlighted for quick verification and correction."
                  },
                  {
                    number: 4,
                    title: "Export",
                    description: "Sync with your accounting software or download structured data in your preferred format (CSV, Excel, JSON, or XML)."
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-6 group"
                  >
                    <div className="relative">
                      <div className="w-14 h-14 bg-brand-100 text-brand-600 group-hover:bg-brand-600 group-hover:text-white rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                        <span className="text-xl font-bold">{step.number}</span>
                      </div>
                      {index < 3 && (
                        <div className="absolute w-0.5 bg-gray-200 h-16 left-1/2 top-14 -translate-x-1/2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-600 transition-colors">{step.title}</h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12">
                <Button size="lg" className="rounded-full" asChild>
                  <Link to="/demo" className="flex items-center px-8">
                    See it in action <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-50 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl -z-10"></div>
              
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 relative">
                <div className="space-y-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
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
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
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
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          viewport={{ once: true }}
                          className="bg-brand-600 h-2 rounded-full"
                        ></motion.div>
                      </div>
                      <div className="text-xs text-muted-foreground">Processing 3 of 4 pages</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
                  >
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
                  </motion.div>
                  
                  {/* Animation dots */}
                  <div className="flex justify-center space-x-1 py-2">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                        delay: 0
                      }}
                      className="w-2 h-2 bg-brand-600 rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.2
                      }}
                      className="w-2 h-2 bg-brand-600 rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.4
                      }}
                      className="w-2 h-2 bg-brand-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials Section with Animations */}
      <div className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-100/60 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-brand-600 font-medium mb-3"
            >
              TESTIMONIALS
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
            >
              Trusted by businesses worldwide
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              See how InvoiceAI is helping companies streamline their invoice processing workflows.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                initial: "A",
                company: "Alpha Corp",
                industry: "Retail Industry",
                quote: "InvoiceAI has reduced our invoice processing time by 85%. The accuracy is incredible, and the integration with our accounting system was seamless."
              },
              {
                initial: "IB",
                company: "India Business",
                industry: "Legal & Accounting",
                quote: "The multilingual support is a game-changer for us. Being able to process invoices in Hindi, Tamil, and other Indian languages has simplified our regional operations tremendously."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full border border-gray-200 shadow-lg hover:shadow-xl transition-all p-8">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.initial}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">{testimonial.company}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.industry}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="mt-6 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.svg 
                          key={star} 
                          className="w-5 h-5 text-yellow-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + (star * 0.1) }}
                          viewport={{ once: true }}
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </motion.svg>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/customers" className="flex items-center">
                  View all customer stories <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pricing Section Preview - With Hover Effects */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-brand-600 font-medium mb-3"
            >
              PRICING
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight"
            >
              Simple, transparent pricing
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Choose the plan that's right for your business needs.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              {
                name: "Starter",
                price: "$49",
                period: "/month",
                description: "Perfect for small businesses",
                features: [
                  "Up to 100 invoices/month",
                  "Basic OCR capabilities",
                  "CSV export"
                ]
              },
              {
                name: "Professional",
                price: "$149",
                period: "/month",
                description: "For growing businesses",
                popular: true,
                features: [
                  "Up to 500 invoices/month",
                  "Advanced OCR with multilingual support",
                  "Accounting software integration",
                  "Priority support"
                ]
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description: "For large organizations",
                features: [
                  "Unlimited invoices",
                  "Full multilingual support",
                  "Dedicated account manager",
                  "Custom integrations"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className={`relative ${plan.popular ? 'z-10' : ''}`}
              >
                <Card className={`h-full overflow-hidden ${
                  plan.popular 
                    ? 'border-2 border-brand-600 shadow-xl scale-105' 
                    : 'border border-gray-200 shadow-md'
                }`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-brand-600 text-white text-xs font-medium py-1 px-3 rounded-bl">
                      POPULAR
                    </div>
                  )}
                  <div className={`p-6 border-b border-gray-200 ${plan.popular ? 'bg-brand-50' : ''}`}>
                    <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + (i * 0.1) }}
                          viewport={{ once: true }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className={`h-5 w-5 ${plan.popular ? 'text-brand-600' : 'text-brand-500'}`} />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 ${
                        plan.popular 
                          ? 'bg-brand-600 hover:bg-brand-700' 
                          : plan.name === 'Enterprise' 
                            ? 'variant-outline border-brand-600 text-brand-600' 
                            : ''
                      }`}
                      variant={plan.name === 'Enterprise' ? 'outline' : 'default'}
                      asChild
                    >
                      <Link to={plan.name === 'Enterprise' ? '/contact' : '/signup'}>
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
                <Link to="/pricing" className="flex items-center">
                  View detailed pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced with Particles */}
      <div className="py-28 bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white relative overflow-hidden">
        {/* Particle background */}
        <div className="absolute inset-0">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 6 + 'px',
                height: Math.random() * 6 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 10 + 10,
                ease: "linear"
              }}
            ></motion.div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Ready to revolutionize your invoice processing?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl mb-10 max-w-2xl mx-auto text-brand-100 opacity-90"
            >
              Join thousands of businesses that trust InvoiceAI for their document processing needs.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-brand-800 hover:bg-brand-100 font-medium px-8 h-14 rounded-xl"
                asChild
              >
                <Link to="/signup">Start Your Free Trial</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white bg-white/10 font-medium h-14 rounded-xl"
                asChild
              >
                <Link to="/demo">Schedule a Demo</Link>
              </Button>
            </motion.div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20"
            >
              <LightbulbIcon className="h-4 w-4 text-yellow-300" />
              <span className="text-sm">No credit card required for trial</span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
