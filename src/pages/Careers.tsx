import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, Heart, FileText, Lightbulb, Award } from 'lucide-react';

const CareerCard: React.FC<{
  title: string;
  location: string;
  type: string;
  description: string;
  link: string;
}> = ({ title, location, type, description, link }) => (
  <motion.div
    className="col-span-12 md:col-span-6 lg:col-span-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Card className="h-full">
      <CardContent className="space-y-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Briefcase className="h-4 w-4" />
          <span>{type}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <Button asChild variant="outline">
          <Link to={link}>Apply Now</Link>
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);

const PerksSection: React.FC = () => (
  <motion.div 
    className="bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <h2 className="text-2xl font-bold mb-6">Why Join Us?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-start gap-4">
        <Heart className="text-primary h-6 w-6" />
        <div>
          <h3 className="font-semibold">Passionate Team</h3>
          <p className="text-muted-foreground text-sm">Work with a team that loves what they do.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <FileText className="text-primary h-6 w-6" />
        <div>
          <h3 className="font-semibold">Growth Opportunities</h3>
          <p className="text-muted-foreground text-sm">Opportunities to learn and grow within the company.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Lightbulb className="text-primary h-6 w-6" />
        <div>
          <h3 className="font-semibold">Innovative Environment</h3>
          <p className="text-muted-foreground text-sm">Be part of a company that values innovation.</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <Award className="text-primary h-6 w-6" />
        <div>
          <h3 className="font-semibold">Competitive Benefits</h3>
          <p className="text-muted-foreground text-sm">Enjoy competitive salaries and benefits.</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const Careers: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Careers - InvoiceAI</title>
        <meta name="description" content="Join the InvoiceAI team and help us revolutionize invoice processing." />
      </Helmet>
      
      <PageHeader
        title="Join Our Team"
        description="Be a part of a company that's changing the future of invoice automation. Explore our open positions and find where you fit in."
        backgroundClass="bg-gradient-to-b from-brand-100/50 to-background"
      />

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
          <div className="grid grid-cols-12 gap-6">
            <CareerCard
              title="Frontend Developer"
              location="Remote"
              type="Full-time"
              description="Join our team as a Frontend Developer and help us build amazing user interfaces."
              link="/careers/frontend-developer"
            />
            <CareerCard
              title="Backend Engineer"
              location="San Francisco, CA"
              type="Full-time"
              description="We're looking for a Backend Engineer to develop and maintain our server-side logic."
              link="/careers/backend-engineer"
            />
            <CareerCard
              title="Data Scientist"
              location="New York, NY"
              type="Full-time"
              description="Help us make sense of our data as a Data Scientist and drive business decisions."
              link="/careers/data-scientist"
            />
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <PerksSection />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't see a position that fits?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            We're always looking for talented individuals to join our team.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;
