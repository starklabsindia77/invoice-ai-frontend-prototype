
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ThumbsUp, ThumbsDown, Bookmark, Share2, Printer, Clock, Calendar, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

// Sample articles data - in a real app, this would come from an API
const articles = [
  {
    slug: 'ai-data-extraction',
    title: 'AI Data Extraction: How It Works',
    content: `
      <h1>AI Data Extraction: How It Works</h1>
      
      <p class="lead">Data extraction is a critical component of invoice processing. InvoiceAI's artificial intelligence engine automates this process with high accuracy and reliability.</p>
      
      <h2>The Challenge of Invoice Data Extraction</h2>
      
      <p>Invoice data extraction is the process of identifying and capturing relevant information from invoices, such as vendor details, invoice numbers, dates, line items, and totals. Traditionally, this has been a manual process, with staff members keying data into accounting systems by hand.</p>
      
      <p>This manual approach presents several challenges:</p>
      
      <ul>
        <li>It's time-consuming, especially for organizations that process large volumes of invoices</li>
        <li>Human error is inevitable, leading to data entry mistakes</li>
        <li>Different invoice formats from various vendors make standardization difficult</li>
        <li>Staff time is spent on low-value tasks rather than strategic activities</li>
      </ul>
      
      <h2>How AI-Powered Data Extraction Works</h2>
      
      <p>InvoiceAI uses a combination of technologies to automate the data extraction process:</p>
      
      <h3>1. Optical Character Recognition (OCR)</h3>
      
      <p>The first step is converting the invoice document (whether it's a scanned paper invoice or a digital PDF) into machine-readable text. OCR technology identifies text characters in the document and converts them into digital text that can be processed further.</p>
      
      <h3>2. Machine Learning Algorithms</h3>
      
      <p>Once the text is extracted, machine learning algorithms analyze the content to identify and categorize different data elements. These algorithms have been trained on millions of invoice examples, allowing them to recognize patterns and understand the context of different pieces of information, even when the layout varies significantly between invoices.</p>
      
      <h3>3. Natural Language Processing (NLP)</h3>
      
      <p>NLP techniques help the system understand the context and meaning of text on the invoice. This is particularly important for handling variations in how information is presented or labeled across different vendor invoices.</p>
      
      <h3>4. Continuous Learning</h3>
      
      <p>The AI engine continuously learns from corrections and validations made by users, improving its accuracy over time. This means that the system becomes increasingly adapted to your specific vendors and invoice formats.</p>
      
      <h2>Key Data Elements Extracted</h2>
      
      <p>InvoiceAI can extract a wide range of data elements from invoices, including:</p>
      
      <ul>
        <li><strong>Header Information:</strong> Vendor name, vendor address, invoice number, invoice date, due date</li>
        <li><strong>Financial Data:</strong> Subtotal, tax amounts, discounts, shipping costs, total amount due</li>
        <li><strong>Payment Information:</strong> Payment terms, bank details, accepted payment methods</li>
        <li><strong>Line Items:</strong> Item descriptions, quantities, unit prices, item totals</li>
        <li><strong>Reference Information:</strong> Purchase order numbers, customer references, contract numbers</li>
      </ul>
      
      <h2>Benefits of AI-Powered Data Extraction</h2>
      
      <h3>Time Savings</h3>
      
      <p>Automated data extraction can reduce processing time from minutes to seconds per invoice. For organizations processing hundreds or thousands of invoices monthly, this translates to significant time savings.</p>
      
      <h3>Improved Accuracy</h3>
      
      <p>AI systems typically achieve 95-98% accuracy in data extraction, significantly higher than manual processing, which typically has error rates of 5-10%.</p>
      
      <h3>Consistency</h3>
      
      <p>The AI approach ensures that data is extracted consistently, regardless of volume fluctuations or staffing changes.</p>
      
      <h3>Scalability</h3>
      
      <p>The system can easily scale to handle peak volumes without requiring additional staffing.</p>
      
      <h2>Handling Different Invoice Formats</h2>
      
      <p>One of the biggest challenges in invoice processing is dealing with the wide variety of formats used by different vendors. InvoiceAI's approach to this challenge includes:</p>
      
      <h3>Template-Free Processing</h3>
      
      <p>Unlike older OCR systems that required pre-defined templates for each vendor, InvoiceAI uses a template-free approach that can adapt to any invoice format on the fly.</p>
      
      <h3>Vendor Learning</h3>
      
      <p>The system learns the specific formats used by your vendors over time, improving accuracy with each processed invoice.</p>
      
      <h3>Format Conversion</h3>
      
      <p>Regardless of the input format, the system standardizes the extracted data into a consistent structure for your accounting system.</p>
      
      <h2>Validation and Exception Handling</h2>
      
      <p>While AI significantly improves accuracy, no system is perfect. InvoiceAI includes several measures to ensure data quality:</p>
      
      <h3>Confidence Scoring</h3>
      
      <p>Each extracted data element is assigned a confidence score. Items with low confidence are flagged for human review.</p>
      
      <h3>Business Rule Validation</h3>
      
      <p>The system applies business rules to validate extracted data, such as checking that line item totals add up to the invoice total.</p>
      
      <h3>Integration Validation</h3>
      
      <p>Data is validated against existing information in your ERP or accounting system, such as matching vendor names to your vendor master file.</p>
      
      <h2>Integration with Your Workflow</h2>
      
      <p>Extracted data doesn't exist in isolation – it needs to flow into your financial systems and processes. InvoiceAI integrates the extraction process with:</p>
      
      <h3>Approval Workflows</h3>
      
      <p>Extracted invoice data is automatically routed through your defined approval process.</p>
      
      <h3>ERP and Accounting System Integration</h3>
      
      <p>Data flows seamlessly into your financial systems, eliminating the need for manual data entry.</p>
      
      <h3>Audit Trails</h3>
      
      <p>All extraction and validation activities are logged for audit purposes, ensuring compliance with internal controls.</p>
      
      <h2>Getting Started with AI Data Extraction</h2>
      
      <p>To start using InvoiceAI's data extraction capabilities:</p>
      
      <ol>
        <li>Configure your extraction preferences in the system settings</li>
        <li>Upload an initial batch of invoices to the system</li>
        <li>Review and validate the extracted data to help train the system</li>
        <li>Set up validation rules specific to your business requirements</li>
        <li>Configure integration with your accounting or ERP system</li>
      </ol>
      
      <p>As you process more invoices, the system will continuously learn and improve, reducing the need for manual intervention over time.</p>
      
      <h2>Conclusion</h2>
      
      <p>AI-powered data extraction represents a significant advancement in invoice processing efficiency. By automating this time-consuming task, organizations can reduce costs, improve accuracy, and free up staff for higher-value activities. InvoiceAI's advanced extraction engine handles the complexities of diverse invoice formats and continuously improves through machine learning, providing an increasingly efficient solution to the challenges of invoice processing.</p>
    `,
    category: 'Features & Functionality',
    lastUpdated: 'March 15, 2024',
    readTime: '8 min read',
    tags: ['AI', 'Data Extraction', 'OCR', 'Machine Learning'],
    helpfulCount: 342,
    relatedArticles: [
      { title: 'Improving Extraction Accuracy', slug: 'improving-extraction-accuracy' },
      { title: 'Training the AI for Your Specific Invoices', slug: 'training-ai-for-specific-invoices' },
      { title: 'Handling Exception Cases in Data Extraction', slug: 'handling-exception-cases' }
    ]
  }
];

// Sample related articles
const moreHelpfulArticles = [
  { title: 'Setting Up Approval Workflows', slug: 'setting-up-approval-workflows' },
  { title: 'Integration with QuickBooks', slug: 'integration-with-quickbooks' },
  { title: 'Custom Field Extraction', slug: 'custom-field-extraction' }
];

const HelpArticle = () => {
  const { slug } = useParams();
  const article = articles.find(article => article.slug === slug);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Article not found</h1>
        <p className="mt-4">The help article you're looking for doesn't exist.</p>
        <Button className="mt-8" asChild>
          <Link to="/help">Back to Help Center</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button variant="ghost" size="sm" className="mb-6" asChild>
                <Link to="/help">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Help Center
                </Link>
              </Button>
            </motion.div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Article Header */}
              <div className="p-8 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    Last updated: {article.lastUpdated}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
                <h1 className="text-3xl font-bold">{article.title}</h1>
              </div>
              
              {/* Article Content */}
              <div className="p-8">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
                
                {/* Article Tags */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Article Feedback */}
                <div className="mt-10 border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-medium mb-4">Was this article helpful?</h3>
                  <div className="flex gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4" />
                      Yes ({article.helpfulCount})
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ThumbsDown className="h-4 w-4" />
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Article Actions */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Article Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Printer className="mr-2 h-4 w-4" />
                    Print Article
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Article
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save for Later
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Related Articles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Related Articles</h3>
                <ul className="space-y-3">
                  {article.relatedArticles.map((relatedArticle, index) => (
                    <li key={index}>
                      <Link 
                        to={`/help/${relatedArticle.slug}`} 
                        className="text-sm text-foreground hover:text-primary hover:underline flex items-start"
                      >
                        <div className="mr-2 mt-0.5">
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>{relatedArticle.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* More Helpful Articles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">More Helpful Articles</h3>
                <ul className="space-y-3">
                  {moreHelpfulArticles.map((helpfulArticle, index) => (
                    <li key={index}>
                      <Link 
                        to={`/help/${helpfulArticle.slug}`} 
                        className="text-sm text-foreground hover:text-primary hover:underline flex items-start"
                      >
                        <div className="mr-2 mt-0.5">
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>{helpfulArticle.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            {/* Contact Support */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-medium mb-2">Need more help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contact our support team for personalized assistance.
                </p>
                <Button className="w-full" asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpArticle;
