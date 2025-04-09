
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description: string;
  cta?: {
    text: string;
    link: string;
  };
  secondaryCta?: {
    text: string;
    link: string;
  };
  backgroundClass?: string;
  pageName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  cta, 
  secondaryCta,
  backgroundClass = "bg-gradient-to-b from-primary/5 to-background",
  pageName
}) => {
  const navigate = useNavigate();
  
  // Helper function to handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <section className={`pt-20 pb-16 ${backgroundClass}`}>
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {pageName && (
            <span className="inline-block text-sm font-medium text-primary/80 mb-3 px-4 py-1 bg-primary/5 rounded-full">
              {pageName}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            {description}
          </p>
          {(cta || secondaryCta) && (
            <div className="flex flex-wrap gap-4 justify-center">
              {cta && (
                <Button 
                  size="lg" 
                  onClick={() => handleNavigation(cta.link)}
                >
                  {cta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => handleNavigation(secondaryCta.link)}
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHeader;
