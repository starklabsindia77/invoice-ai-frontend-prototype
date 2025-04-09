
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Coffee,
  HeartHandshake,
  GraduationCap,
  Zap,
  Globe,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from '@/components/PageHeader';

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  description: string;
  posted: string;
  slug: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  department,
  location,
  locationType,
  description,
  posted,
  slug
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="mb-1">{title}</CardTitle>
            <CardDescription>{department}</CardDescription>
          </div>
          <Badge variant={
            locationType === "Remote" ? "outline" : 
            locationType === "Hybrid" ? "secondary" : "default"
          }>
            {locationType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>Posted: {posted}</span>
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link to={`/careers/${slug}`}>View Job</Link>
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
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

interface ValueCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center p-6 bg-primary/5 rounded-lg"
  >
    <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Careers: React.FC = () => {
  const jobs = [
    {
      title: "Senior Machine Learning Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      locationType: "Hybrid" as const,
      description: "Join our AI team to develop and enhance our machine learning models for document processing and data extraction. You'll work on cutting-edge ML technologies to improve accuracy and expand our capabilities.",
      posted: "April 2, 2024",
      slug: "senior-ml-engineer",
      team: "engineering"
    },
    {
      title: "Product Manager, Enterprise",
      department: "Product",
      location: "Remote (US)",
      locationType: "Remote" as const,
      description: "Lead the product strategy and roadmap for our enterprise-focused features and solutions. You'll work closely with customers, engineering, and sales to drive product direction.",
      posted: "April 3, 2024",
      slug: "product-manager-enterprise",
      team: "product"
    },
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "New York, NY",
      locationType: "On-site" as const,
      description: "Build and maintain features across our entire stack, from frontend React applications to backend Node.js services. You'll work on user-facing features and internal tools.",
      posted: "March 28, 2024",
      slug: "full-stack-engineer",
      team: "engineering"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (Global)",
      locationType: "Remote" as const,
      description: "Partner with our enterprise customers to ensure they get maximum value from our platform. You'll build relationships, provide strategic guidance, and drive adoption and expansion.",
      posted: "April 1, 2024",
      slug: "customer-success-manager",
      team: "customer"
    },
    {
      title: "Enterprise Account Executive",
      department: "Sales",
      location: "Chicago, IL",
      locationType: "Hybrid" as const,
      description: "Drive new business within the enterprise segment. You'll build relationships with key decision-makers, develop and execute account strategies, and close deals.",
      posted: "March 29, 2024",
      slug: "enterprise-account-executive",
      team: "sales"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote (US)",
      locationType: "Remote" as const,
      description: "Build and maintain our infrastructure and deployment pipelines. You'll work on cloud architecture, monitoring, and ensuring high availability and performance.",
      posted: "April 5, 2024",
      slug: "devops-engineer",
      team: "engineering"
    },
    {
      title: "UI/UX Designer",
      department: "Product",
      location: "San Francisco, CA",
      locationType: "Hybrid" as const,
      description: "Design intuitive and beautiful user interfaces for our web application. You'll conduct user research, create prototypes, and work closely with engineering to implement designs.",
      posted: "April 4, 2024",
      slug: "ui-ux-designer",
      team: "product"
    },
    {
      title: "Content Marketing Manager",
      department: "Marketing",
      location: "Remote (US)",
      locationType: "Remote" as const,
      description: "Create compelling content that attracts and engages our target audience. You'll develop blog posts, case studies, whitepapers, and other content to drive demand.",
      posted: "March 30, 2024",
      slug: "content-marketing-manager",
      team: "marketing"
    }
  ];

  const benefits = [
    {
      title: "Competitive Compensation",
      description: "Salary packages that recognize your skills and experience, with equity options to share in our success.",
      icon: <DollarSign size={24} />
    },
    {
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance for you and your dependents, plus mental health support.",
      icon: <HeartHandshake size={24} />
    },
    {
      title: "Work Flexibility",
      description: "Remote and hybrid options with flexible working hours designed to support work-life balance.",
      icon: <Clock size={24} />
    },
    {
      title: "Learning & Development",
      description: "Generous professional development budget and time allocation to help you grow your skills and career.",
      icon: <GraduationCap size={24} />
    },
    {
      title: "Team Events",
      description: "Regular team meetups, retreats, and social events to build relationships and have fun together.",
      icon: <Users size={24} />
    },
    {
      title: "Office Perks",
      description: "Modern offices with standing desks, snacks, and premium coffee to fuel your best work.",
      icon: <Coffee size={24} />
    }
  ];

  const values = [
    {
      title: "Customer Obsession",
      description: "We put our customers at the center of everything we do.",
      icon: <HeartHandshake size={24} />
    },
    {
      title: "Innovation",
      description: "We push boundaries and challenge the status quo.",
      icon: <Lightbulb size={24} />
    },
    {
      title: "Excellence",
      description: "We strive for excellence in all aspects of our work.",
      icon: <Award size={24} />
    },
    {
      title: "Speed",
      description: "We move quickly and value rapid iteration.",
      icon: <Zap size={24} />
    },
    {
      title: "Global Impact",
      description: "We aim to make a meaningful impact worldwide.",
      icon: <Globe size={24} />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers | InvoiceAI - Join Our Team</title>
        <meta name="description" content="Explore career opportunities at InvoiceAI. Join our team of innovators and help transform invoice processing with artificial intelligence." />
        <meta name="keywords" content="InvoiceAI careers, jobs, hiring, tech jobs, AI jobs, fintech careers" />
        <meta property="og:title" content="Careers | InvoiceAI" />
        <meta property="og:description" content="Explore exciting career opportunities at InvoiceAI and help us transform invoice processing with artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/careers" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/careers" />
      </Helmet>

      <div className="pb-16">
        {/* Hero Section */}
        <PageHeader
          pageName="Careers"
          title="Join Our Mission to Transform Finance"
          description="We're building the future of invoice processing and we need passionate people to help us get there. Explore our open positions and become part of our story."
          cta={{ text: "View Open Positions", link: "#open-positions" }}
          backgroundClass="bg-gradient-to-b from-primary/10 to-background"
        />

        {/* Why Join Us */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight mb-6">Why Join InvoiceAI?</h2>
                <div className="text-lg text-muted-foreground space-y-4">
                  <p>
                    At InvoiceAI, you'll be part of a team that's transforming how businesses handle their financial operations. 
                    We're tackling real problems with cutting-edge technology, and we're just getting started.
                  </p>
                  <p>
                    Our team combines expertise in artificial intelligence, finance, and enterprise software to build products 
                    that save our customers thousands of hours and millions of dollars.
                  </p>
                  <p>
                    We believe in giving our team members the autonomy, resources, and support they need to do the best work 
                    of their careers. If you're looking to make a meaningful impact, grow your skills, and work with amazing 
                    people, we'd love to meet you.
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild>
                    <a href="#open-positions">Explore Open Positions</a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="InvoiceAI team collaboration" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These principles guide how we work and make decisions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {values.map((value, index) => (
                <ValueCard key={index} {...value} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Benefits & Perks</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We take care of our team so they can focus on doing their best work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <BenefitCard key={index} {...benefit} />
              ))}
            </div>
          </div>
        </section>

        {/* Office Photos */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Life at InvoiceAI</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Get a glimpse into our office culture and team events.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="aspect-video overflow-hidden rounded-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Team collaboration" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="aspect-video overflow-hidden rounded-lg md:col-span-2"
              >
                <img 
                  src="https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Office space" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="aspect-video overflow-hidden rounded-lg md:col-span-2"
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Team meeting" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="aspect-video overflow-hidden rounded-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                  alt="Office kitchen" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Open Positions</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find your next career opportunity at InvoiceAI.
              </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="inline-flex flex-nowrap">
                  <TabsTrigger value="all">All Teams</TabsTrigger>
                  <TabsTrigger value="engineering">Engineering</TabsTrigger>
                  <TabsTrigger value="product">Product & Design</TabsTrigger>
                  <TabsTrigger value="sales">Sales</TabsTrigger>
                  <TabsTrigger value="marketing">Marketing</TabsTrigger>
                  <TabsTrigger value="customer">Customer Success</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
                </div>
              </TabsContent>

              {["engineering", "product", "sales", "marketing", "customer"].map((team) => (
                <TabsContent key={team} value={team} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs
                      .filter((job) => job.team === team)
                      .map((job, index) => (
                        <JobCard key={index} {...job} />
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Don't see a role that fits your skills? We're always looking for talented people.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us About Opportunities</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Team Says</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Hear directly from our team members about working at InvoiceAI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80" 
                      alt="Michael" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Michael Chen</h4>
                    <p className="text-sm text-muted-foreground">Senior Engineer, 2 years</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The technical challenges we get to solve are fascinating, and the impact we have on our customers' 
                  operations is incredibly rewarding. The team is brilliant and supportive, and I've grown more in two 
                  years here than in my previous five years combined."
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                      alt="Sarah" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Product Manager, 1.5 years</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "Working at InvoiceAI has been the highlight of my career. I get to collaborate with incredibly 
                  smart people to solve real problems for our customers. The leadership team truly cares about 
                  creating both a great product and a great place to work."
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-background rounded-xl p-6 shadow-sm border border-border"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                      alt="David" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">David Washington</h4>
                    <p className="text-sm text-muted-foreground">Customer Success, 3 years</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The growth opportunities at InvoiceAI are incredible. I started as a support specialist and 
                  have been promoted twice in three years. The company invests in employee development and really 
                  lives its values. Plus, our customers absolutely love our product!"
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-xl p-8 md:p-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Join Our Team?</h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Explore our open positions and take the first step toward your next great career opportunity.
                </p>
                <Button size="lg" asChild>
                  <a href="#open-positions">View Open Positions</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Careers;
