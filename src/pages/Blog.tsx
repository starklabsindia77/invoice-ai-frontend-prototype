
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    slug: 'automating-invoice-processing',
    title: 'Automating Invoice Processing: A Complete Guide',
    excerpt: 'Learn how to streamline your invoice processing workflow with automation tools and AI technologies.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=600&auto=format&fit=crop',
    date: 'April 5, 2024',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Product Manager'
    },
    category: 'Automation',
    readTime: '8 min read'
  },
  {
    id: 2,
    slug: 'ai-revolution-in-finance',
    title: 'The AI Revolution in Financial Management',
    excerpt: 'Discover how artificial intelligence is transforming financial management and what it means for your business.',
    coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop',
    date: 'April 2, 2024',
    author: {
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'CTO'
    },
    category: 'Technology',
    readTime: '10 min read'
  },
  {
    id: 3,
    slug: 'compliance-best-practices',
    title: 'Compliance Best Practices for Financial Operations',
    excerpt: 'Stay compliant with these industry-leading best practices for managing financial operations.',
    coverImage: 'https://images.unsplash.com/photo-1622473590773-f588134b6ce7?q=80&w=600&auto=format&fit=crop',
    date: 'March 28, 2024',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Compliance Officer'
    },
    category: 'Compliance',
    readTime: '7 min read'
  },
  {
    id: 4,
    slug: 'invoice-ai-vs-manual',
    title: 'Invoice AI vs. Manual Processing: ROI Comparison',
    excerpt: 'A detailed comparison of AI-powered invoice processing against traditional manual methods.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    date: 'March 22, 2024',
    author: {
      name: 'Michael Brown',
      avatar: 'https://i.pravatar.cc/150?img=8',
      role: 'Finance Analyst'
    },
    category: 'ROI',
    readTime: '12 min read'
  },
  {
    id: 5,
    slug: 'securing-financial-data',
    title: 'Securing Financial Data in the Cloud',
    excerpt: 'Learn the best security practices for protecting your financial data in cloud-based systems.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
    date: 'March 18, 2024',
    author: {
      name: 'Jessica Taylor',
      avatar: 'https://i.pravatar.cc/150?img=9',
      role: 'Security Expert'
    },
    category: 'Security',
    readTime: '9 min read'
  },
  {
    id: 6,
    slug: 'integration-strategies',
    title: 'Integration Strategies for Financial Software',
    excerpt: 'Discover effective ways to integrate your invoice processing solution with existing financial systems.',
    coverImage: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=600&auto=format&fit=crop',
    date: 'March 12, 2024',
    author: {
      name: 'Robert Lee',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'Integration Specialist'
    },
    category: 'Integration',
    readTime: '11 min read'
  }
];

// Popular categories
const categories = [
  { name: 'Automation', count: 12 },
  { name: 'Technology', count: 8 },
  { name: 'AI', count: 15 },
  { name: 'Compliance', count: 9 },
  { name: 'Security', count: 7 },
  { name: 'Integration', count: 6 },
  { name: 'ROI', count: 5 },
  { name: 'Best Practices', count: 14 }
];

const BlogPostCard = ({ post }: { post: typeof blogPosts[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
  >
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardHeader className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <CardTitle className="mb-2">
          <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardFooter className="p-6 pt-0 flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{post.author.name}</span>
          <span className="text-xs text-muted-foreground">{post.date}</span>
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

const Blog = () => {
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
              InvoiceAI Blog
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Insights, guides, and expert opinions on invoice processing, financial operations, and AI technology.
            </p>
            
            <div className="max-w-lg mx-auto relative">
              <Input 
                type="search" 
                placeholder="Search articles..." 
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {blogPosts.map(post => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg">Load More</Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Popular Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogPosts.slice(0, 3).map(post => (
                  <div key={post.id} className="flex gap-3">
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium leading-tight line-clamp-2 text-sm">
                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{post.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Badge 
                      key={category.name} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      {category.name} ({category.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle>Subscribe</CardTitle>
                <CardDescription>Get the latest articles delivered to your inbox</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Your email address" type="email" />
                <Button className="w-full">Subscribe</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
