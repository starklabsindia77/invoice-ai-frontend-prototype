
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Building, Briefcase, BarChart3, PieChart, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/PageHeader';

interface CaseStudyCardProps {
  title: string;
  company: string;
  industry: string;
  description: string;
  results: {
    label: string;
    value: string;
  }[];
  image?: string;
  slug: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ 
  title, 
  company, 
  industry, 
  description, 
  results, 
  image, 
  slug 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={company} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mt-2">{company}</CardDescription>
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
            {industry}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {results.map((result, index) => (
            <div key={index} className="text-center p-3 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{result.value}</p>
              <p className="text-xs text-muted-foreground">{result.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between group" asChild>
          <Link to={`/case-studies/${slug}`}>
            Read Case Study 
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const CaseStudies: React.FC = () => {
  const caseStudies = [
    {
      title: "Automating Finance Operations",
      company: "Global Manufacturing Co.",
      industry: "Manufacturing",
      description: "How a leading manufacturer reduced manual invoice processing by 90% and improved accuracy with InvoiceAI.",
      results: [
        { label: "Time Saved", value: "75%" },
        { label: "Error Reduction", value: "95%" },
        { label: "Annual Savings", value: "$120K" },
        { label: "ROI", value: "438%" }
      ],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "global-manufacturing-co",
      sector: "enterprise"
    },
    {
      title: "Streamlining Accounts Payable",
      company: "Meridian Healthcare",
      industry: "Healthcare",
      description: "How a healthcare provider reduced invoice processing time from 2 weeks to 2 days while improving compliance.",
      results: [
        { label: "Process Time", value: "-86%" },
        { label: "Staff Hours", value: "-65%" },
        { label: "Compliance Rate", value: "99.8%" },
        { label: "Cost Reduction", value: "$87K" }
      ],
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "meridian-healthcare",
      sector: "healthcare"
    },
    {
      title: "Scaling Financial Operations",
      company: "TechStart Inc.",
      industry: "Technology",
      description: "How a fast-growing tech startup scaled their financial operations while maintaining a lean team.",
      results: [
        { label: "Growth Capacity", value: "300%" },
        { label: "Processing Cost", value: "-52%" },
        { label: "Approval Time", value: "-78%" },
        { label: "Team Size", value: "Same" }
      ],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "techstart-inc",
      sector: "startup"
    },
    {
      title: "Optimizing Retail Operations",
      company: "Urban Retail Group",
      industry: "Retail",
      description: "How a multi-location retailer gained visibility across their operations and reduced payment delays.",
      results: [
        { label: "Payment Time", value: "-68%" },
        { label: "Discounts Captured", value: "+28%" },
        { label: "Late Fees", value: "-92%" },
        { label: "Visibility", value: "100%" }
      ],
      image: "https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "urban-retail-group",
      sector: "retail"
    },
    {
      title: "Transforming Government Processes",
      company: "Metro City Municipality",
      industry: "Government",
      description: "How a municipal government improved transparency and reduced processing costs with automation.",
      results: [
        { label: "Processing Time", value: "-70%" },
        { label: "Paper Usage", value: "-95%" },
        { label: "Transparency", value: "+100%" },
        { label: "Tax Savings", value: "$243K" }
      ],
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "metro-city-municipality",
      sector: "government"
    },
    {
      title: "Enhancing Nonprofit Efficiency",
      company: "Global Relief Foundation",
      industry: "Nonprofit",
      description: "How a nonprofit organization redirected resources from administration to their mission with AI automation.",
      results: [
        { label: "Admin Overhead", value: "-42%" },
        { label: "Funds to Mission", value: "+18%" },
        { label: "Grant Compliance", value: "100%" },
        { label: "Donor Reporting", value: "Faster" }
      ],
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      slug: "global-relief-foundation",
      sector: "nonprofit"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Case Studies | InvoiceAI - Real-World Success Stories</title>
        <meta name="description" content="Explore how organizations across industries have transformed their invoice processing with InvoiceAI's intelligent automation platform." />
        <meta name="keywords" content="invoice processing case studies, success stories, ROI, automation results, business transformation" />
        <meta property="og:title" content="Case Studies | InvoiceAI" />
        <meta property="og:description" content="See how businesses are achieving remarkable results with InvoiceAI's intelligent invoice processing platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/case-studies" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/case-studies" />
      </Helmet>

      <div className="pb-16">
        {/* Hero Section */}
        <PageHeader
          pageName="Case Studies"
          title="Real Results from Real Customers"
          description="Discover how organizations of all sizes are transforming their invoice processing with InvoiceAI's intelligent automation platform."
          cta={{ text: "Get Similar Results", link: "/signup" }}
          secondaryCta={{ text: "Schedule a Demo", link: "/contact" }}
        />

        {/* Featured Case Study */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-2">
                  <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Featured Case Study
                  </span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Global Bank Saves $2.1M Annually with InvoiceAI
                </h2>
                <div className="text-lg text-muted-foreground space-y-4">
                  <p>
                    One of the world's leading financial institutions transformed their accounts payable 
                    operations across 35 countries, processing over 1.2 million invoices annually.
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>Reduced processing costs by 78% in the first year</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>Improved processing accuracy from 82% to 99.2%</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>Decreased average processing time from 21 days to 3 days</span>
                    </li>
                    <li className="flex items-start">
                      <Award className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                      <span>Achieved 327% ROI within 18 months of implementation</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <Button asChild>
                    <Link to="/case-studies/global-bank">Read Full Case Study</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="rounded-lg overflow-hidden shadow-xl bg-gradient-to-br from-gray-100 to-white p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Global Bank Case Study" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Case Studies Filter */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Success Across Industries</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore how organizations from various sectors have transformed their operations with InvoiceAI.
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="inline-flex flex-nowrap">
                  <TabsTrigger value="all">All Industries</TabsTrigger>
                  <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="retail">Retail</TabsTrigger>
                  <TabsTrigger value="government">Government</TabsTrigger>
                  <TabsTrigger value="nonprofit">Nonprofit</TabsTrigger>
                  <TabsTrigger value="startup">Startups</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {caseStudies.map((study, index) => (
                    <CaseStudyCard key={index} {...study} />
                  ))}
                </div>
              </TabsContent>

              {["enterprise", "healthcare", "retail", "government", "nonprofit", "startup"].map((sector) => (
                <TabsContent key={sector} value={sector} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {caseStudies
                      .filter((study) => study.sector === sector)
                      .map((study, index) => (
                        <CaseStudyCard key={index} {...study} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Measurable Impact</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our customers consistently achieve outstanding results with InvoiceAI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-background border border-border p-6 rounded-lg text-center"
              >
                <PieChart className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2">78%</div>
                <p className="text-muted-foreground">Average Reduction in Processing Costs</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-background border border-border p-6 rounded-lg text-center"
              >
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2">81%</div>
                <p className="text-muted-foreground">Average Time Savings</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-background border border-border p-6 rounded-lg text-center"
              >
                <Building className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2">320%</div>
                <p className="text-muted-foreground">Average ROI Within 12 Months</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-background border border-border p-6 rounded-lg text-center"
              >
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-4xl font-bold mb-2">94%</div>
                <p className="text-muted-foreground">Customer Satisfaction Rate</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Write Your Success Story?</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Join our growing list of customers who have transformed their invoice processing with InvoiceAI.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link to="/signup">Start Free Trial</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/contact">Talk to an Expert</Link>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center md:justify-end">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Success" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CaseStudies;
