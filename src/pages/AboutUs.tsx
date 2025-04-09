
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  Users, 
  Target, 
  GlobeLock, 
  Lightbulb, 
  Heart, 
  Clock,
  Award,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  name, 
  role, 
  bio, 
  image, 
  linkedin, 
  twitter 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-square overflow-hidden bg-muted">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="text-6xl font-bold text-primary/30">{name.charAt(0)}</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{bio}</p>
        {(linkedin || twitter) && (
          <div className="flex space-x-3">
            {linkedin && (
              <a 
                href={linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            )}
            {twitter && (
              <a 
                href={twitter} 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const ValueCard = ({ 
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

const AboutUs: React.FC = () => {
  const team = [
    {
      name: "Alexandra Chen",
      role: "CEO & Co-Founder",
      bio: "Alexandra has 15+ years of experience in enterprise software and AI. Prior to founding InvoiceAI, she led product at Oracle and was a consultant at McKinsey.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Michael is an AI/ML expert with a PhD from Stanford. He previously led the machine learning team at Dropbox and has numerous patents in document processing.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    {
      name: "Sarah Nguyen",
      role: "Chief Product Officer",
      bio: "Sarah brings 12 years of experience in fintech product development. She previously led product teams at Square and Stripe, focusing on payment processing solutions.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1661&q=80",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Daniel Park",
      role: "VP of Engineering",
      bio: "Daniel has built engineering teams at multiple successful startups. He's passionate about creating scalable systems that leverage cutting-edge AI technologies.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Jessica Thompson",
      role: "VP of Customer Success",
      bio: "Jessica ensures our customers get the most value from our platform. With a background in finance and technology implementation, she understands our customers' needs.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      linkedin: "https://linkedin.com"
    },
    {
      name: "Robert Garcia",
      role: "Chief Revenue Officer",
      bio: "Robert leads our sales and partnerships team. He has 20+ years of experience in enterprise SaaS sales at companies like Salesforce and ServiceNow.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
      linkedin: "https://linkedin.com"
    }
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "InvoiceAI was founded by Alexandra Chen and Michael Rodriguez with a vision to transform invoice processing with AI."
    },
    {
      year: "2019",
      title: "Seed Funding",
      description: "Raised $4M in seed funding led by Accel Partners to build the initial product and core AI technology."
    },
    {
      year: "2020",
      title: "First Enterprise Customer",
      description: "Launched our platform and signed our first enterprise customer, a Fortune 500 manufacturing company."
    },
    {
      year: "2021",
      title: "Series A Funding",
      description: "Secured $15M in Series A funding led by Sequoia Capital to expand our team and accelerate product development."
    },
    {
      year: "2022",
      title: "International Expansion",
      description: "Opened offices in London and Singapore to serve our growing international customer base in Europe and Asia."
    },
    {
      year: "2023",
      title: "Series B Funding",
      description: "Raised $42M in Series B funding to further enhance our AI capabilities and expand our platform."
    },
    {
      year: "2024",
      title: "1,000+ Customers",
      description: "Reached a milestone of 1,000+ customers across 40+ countries, processing over 100 million invoices annually."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | InvoiceAI - Our Story and Mission</title>
        <meta name="description" content="Learn about the team behind InvoiceAI and our mission to transform invoice processing with artificial intelligence." />
        <meta name="keywords" content="InvoiceAI, about us, team, mission, values, company history" />
        <meta property="og:title" content="About Us | InvoiceAI" />
        <meta property="og:description" content="Meet the team behind InvoiceAI and learn about our mission to transform invoice processing with artificial intelligence." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://invoiceai.example.com/about" />
        <meta property="og:image" content="https://invoiceai.example.com/og-image.jpg" />
        <link rel="canonical" href="https://invoiceai.example.com/about" />
      </Helmet>

      <div className="pb-16">
        {/* Hero Section */}
        <PageHeader
          pageName="About Us"
          title="Transforming Invoice Processing with AI"
          description="We're on a mission to eliminate manual data entry and streamline financial operations for businesses worldwide."
          backgroundClass="bg-gradient-to-b from-primary/10 to-background"
        />

        {/* Our Story Section */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold tracking-tight mb-6">Our Story</h2>
                <div className="text-lg text-muted-foreground space-y-4">
                  <p>
                    InvoiceAI was founded in 2018 by Alexandra Chen and Michael Rodriguez, who saw firsthand the 
                    inefficiencies of manual invoice processing while working with enterprise companies.
                  </p>
                  <p>
                    Having experienced the frustration of tedious data entry and error-prone manual processes, 
                    they set out to build a solution that would leverage the latest advances in artificial 
                    intelligence to automate these tasks.
                  </p>
                  <p>
                    What started as a simple prototype has grown into a comprehensive platform trusted by 
                    thousands of businesses in over 40 countries, from small businesses to Fortune 500 
                    companies.
                  </p>
                  <p>
                    Today, InvoiceAI processes over 100 million invoices annually, saving our customers 
                    countless hours and helping them focus on what matters most - growing their business.
                  </p>
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
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Team meeting" 
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Mission & Vision</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We're on a mission to transform financial operations through intelligent automation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-primary/5 p-8 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Target size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground">
                  To eliminate manual data entry in financial processes by providing intelligent, 
                  accessible automation tools that save time, reduce errors, and provide valuable insights.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-primary/5 p-8 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                  <Lightbulb size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground">
                  A world where businesses spend zero time on manual data entry, where financial 
                  operations are seamless and error-free, allowing organizations to focus on growth and innovation.
                </p>
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
                These core principles guide everything we do at InvoiceAI.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ValueCard
                title="Innovation First"
                description="We're constantly pushing the boundaries of what's possible with AI and machine learning to deliver cutting-edge solutions."
                icon={<Lightbulb size={24} />}
              />
              
              <ValueCard
                title="Customer Obsession"
                description="We measure our success by our customers' success, and we're committed to delivering exceptional value and experience."
                icon={<Heart size={24} />}
              />
              
              <ValueCard
                title="Operational Excellence"
                description="We strive for excellence in everything we do, from our product to our processes to our customer interactions."
                icon={<Award size={24} />}
              />
              
              <ValueCard
                title="Security & Trust"
                description="We maintain the highest standards of security and privacy to earn and keep our customers' trust."
                icon={<GlobeLock size={24} />}
              />
              
              <ValueCard
                title="Continuous Improvement"
                description="We're never satisfied with the status quo and constantly seek ways to improve our platform and our company."
                icon={<Clock size={24} />}
              />
              
              <ValueCard
                title="Diversity & Inclusion"
                description="We believe diverse perspectives drive innovation and create better outcomes for our team and our customers."
                icon={<Users size={24} />}
              />
            </div>
          </div>
        </section>

        {/* Timeline/Milestones */}
        <section className="py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Key milestones in our growth from startup to industry leader.
              </p>
            </div>
            
            <div className="relative border-l border-primary/30 pl-10 ml-4 md:ml-12 space-y-10">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[52px] w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <div className="w-4 h-4 rounded-full bg-primary"></div>
                  </div>
                  <div className="bg-background border border-border p-6 rounded-lg shadow-sm">
                    <div className="text-sm font-medium text-primary mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Meet Our Leadership Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The experienced professionals guiding InvoiceAI's mission and growth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/careers">
                  Join Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5 rounded-lg mx-4">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to Experience InvoiceAI?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that trust InvoiceAI to transform their invoice processing.
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

export default AboutUs;
