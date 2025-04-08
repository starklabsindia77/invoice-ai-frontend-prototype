
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Calendar, Clock, Share2, BookmarkPlus } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample blog post data - in a real app, this would come from an API
const blogPosts = [
  {
    slug: 'automating-invoice-processing',
    title: 'Automating Invoice Processing: A Complete Guide',
    content: `
      <p class="lead">The traditional invoice processing workflow is often characterized by manual data entry, paper-based approvals, and time-consuming reconciliation. In today's digital-first environment, this approach is becoming increasingly obsolete.</p>
      
      <p>Invoice processing is a critical function for businesses of all sizes. It ensures that vendors are paid correctly and on time, helps maintain good supplier relationships, and provides essential financial data for accounting and reporting purposes. However, the traditional approach to invoice processing is fraught with challenges:</p>
      
      <ul>
        <li>Manual data entry is time-consuming and error-prone</li>
        <li>Paper-based approval workflows create delays and bottlenecks</li>
        <li>Limited visibility into the status of invoices</li>
        <li>Difficulty in reconciling invoices with purchase orders and receipts</li>
        <li>Storage and retrieval of paper invoices is cumbersome</li>
      </ul>
      
      <h2>The Rise of Automated Invoice Processing</h2>
      
      <p>Automation is transforming the way businesses handle their invoice processing. By leveraging technologies such as optical character recognition (OCR), artificial intelligence (AI), and machine learning (ML), businesses can streamline their invoice processing workflows, reduce errors, and free up valuable staff time for more strategic activities.</p>
      
      <p>Here's how automation is changing the game:</p>
      
      <h3>1. Data Extraction and Entry</h3>
      
      <p>OCR technology can scan and extract data from invoices, eliminating the need for manual data entry. AI and ML algorithms can learn to recognize and interpret different invoice formats, improving accuracy over time. This means that even if your vendors use different invoice templates, the system can adapt and extract the relevant information.</p>
      
      <h3>2. Validation and Matching</h3>
      
      <p>Automated systems can validate invoice data against purchase orders and receipts, ensuring that you only pay for goods and services that you've actually received. This three-way matching process is much more efficient when automated and can catch discrepancies that might be missed in a manual process.</p>
      
      <h3>3. Approval Workflows</h3>
      
      <p>Digital approval workflows can route invoices to the appropriate approvers based on predefined rules. This eliminates the bottlenecks associated with paper-based approvals and provides visibility into where each invoice is in the approval process.</p>
      
      <h3>4. Integration with ERP and Accounting Systems</h3>
      
      <p>Invoice data can be automatically synced with your ERP and accounting systems, ensuring that your financial records are always up-to-date. This eliminates the need for duplicate data entry and reduces the risk of errors.</p>
      
      <h2>The Benefits of Automated Invoice Processing</h2>
      
      <p>The benefits of automating your invoice processing are substantial:</p>
      
      <ul>
        <li><strong>Increased Efficiency:</strong> Automation can reduce the time it takes to process an invoice by up to 80%.</li>
        <li><strong>Reduced Errors:</strong> By eliminating manual data entry, you can significantly reduce the risk of errors.</li>
        <li><strong>Improved Visibility:</strong> Digital systems provide real-time visibility into the status of each invoice, making it easier to manage cash flow and respond to vendor inquiries.</li>
        <li><strong>Cost Savings:</strong> Automation can reduce the cost of processing an invoice by up to 70%.</li>
        <li><strong>Better Vendor Relationships:</strong> Faster, more accurate payments lead to better vendor relationships.</li>
        <li><strong>Enhanced Compliance:</strong> Automated systems can ensure that invoices are processed in accordance with your company's policies and regulatory requirements.</li>
      </ul>
      
      <h2>Implementing Automated Invoice Processing</h2>
      
      <p>Implementing an automated invoice processing system requires careful planning and consideration of your specific business needs. Here are the key steps to follow:</p>
      
      <h3>1. Assess Your Current Process</h3>
      
      <p>Start by mapping out your current invoice processing workflow. Identify pain points, bottlenecks, and areas where errors are most likely to occur. This will help you determine where automation can have the biggest impact.</p>
      
      <h3>2. Define Your Requirements</h3>
      
      <p>Based on your assessment, define your requirements for an automated system. Consider factors such as volume of invoices, types of invoices (PO-based vs. non-PO), approval workflows, integration with existing systems, and reporting needs.</p>
      
      <h3>3. Select the Right Solution</h3>
      
      <p>There are many invoice processing automation solutions on the market, ranging from standalone applications to modules within larger ERP systems. Evaluate different options based on your requirements, and consider factors such as ease of use, scalability, integration capabilities, and cost.</p>
      
      <h3>4. Plan for Integration</h3>
      
      <p>Your invoice processing system needs to integrate with your existing ERP, accounting, and banking systems. Make sure you have a clear plan for how data will flow between these systems.</p>
      
      <h3>5. Implement in Phases</h3>
      
      <p>Consider a phased implementation approach, starting with a pilot project to test the system and refine your processes. This allows you to identify and address any issues before rolling out the system more broadly.</p>
      
      <h3>6. Train Your Team</h3>
      
      <p>Proper training is essential for the success of any new system. Make sure your team understands how to use the new system and how it fits into your overall business processes.</p>
      
      <h3>7. Monitor and Optimize</h3>
      
      <p>After implementation, monitor the performance of your automated system and look for opportunities to further optimize your processes. Regularly solicit feedback from users and make adjustments as needed.</p>
      
      <h2>Conclusion</h2>
      
      <p>Automating your invoice processing can yield significant benefits in terms of efficiency, accuracy, and cost savings. By carefully planning your implementation and choosing the right solution for your business, you can transform this critical financial function from a necessary burden into a strategic advantage.</p>
      
      <p>Remember, the goal of automation is not just to do things faster, but to do them better. With the right approach, you can create an invoice processing workflow that supports your business objectives and helps you stay competitive in an increasingly digital world.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop',
    date: 'April 5, 2024',
    author: {
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Product Manager',
      bio: 'Emma has over 10 years of experience in financial technology and specializes in automation solutions for accounting departments.'
    },
    category: 'Automation',
    readTime: '8 min read',
    tags: ['Automation', 'AI', 'Invoice Processing', 'OCR', 'Workflow']
  },
  {
    slug: 'ai-revolution-in-finance',
    title: 'The AI Revolution in Financial Management',
    content: '<p>This is a sample article content about AI revolution in finance...</p>',
    coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop',
    date: 'April 2, 2024',
    author: {
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'CTO',
      bio: 'David is a technology leader with expertise in AI and machine learning applications in financial services.'
    },
    category: 'Technology',
    readTime: '10 min read',
    tags: ['AI', 'Machine Learning', 'Finance', 'Technology', 'Trends']
  }
];

// Sample related posts
const relatedPosts = [
  {
    slug: 'invoice-ai-vs-manual',
    title: 'Invoice AI vs. Manual Processing: ROI Comparison',
    excerpt: 'A detailed comparison of AI-powered invoice processing against traditional manual methods.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    date: 'March 22, 2024',
    category: 'ROI'
  },
  {
    slug: 'integration-strategies',
    title: 'Integration Strategies for Financial Software',
    excerpt: 'Discover effective ways to integrate your invoice processing solution with existing financial systems.',
    coverImage: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?q=80&w=600&auto=format&fit=crop',
    date: 'March 12, 2024',
    category: 'Integration'
  },
  {
    slug: 'securing-financial-data',
    title: 'Securing Financial Data in the Cloud',
    excerpt: 'Learn the best security practices for protecting your financial data in cloud-based systems.',
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop',
    date: 'March 18, 2024',
    category: 'Security'
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Blog post not found</h1>
        <p className="mt-4">The blog post you're looking for doesn't exist.</p>
        <Button className="mt-8" asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button variant="ghost" size="sm" className="mb-6" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </motion.div>
          
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">{post.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-sm text-muted-foreground">{post.author.role}</div>
              </div>
              <Separator orientation="vertical" className="h-8" />
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
          
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="rounded-xl overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
          
          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            {/* Content */}
            <div className="md:col-span-8">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
              
              {/* Tags */}
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags && post.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Social Share */}
              <div className="mt-8 flex justify-between items-center">
                <h4 className="text-sm font-medium">Share this article:</h4>
                <div className="flex gap-3">
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <BookmarkPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Author Bio */}
              <Card className="mt-8">
                <CardContent className="flex gap-4 p-6">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.author.name}</h3>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    <p className="text-sm mt-2">{post.author.bio}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="md:col-span-4 space-y-8">
              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.slug} className="flex gap-3">
                      <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={relatedPost.coverImage} 
                          alt={relatedPost.title} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium leading-tight line-clamp-2 text-sm">
                          <Link to={`/blog/${relatedPost.slug}`} className="hover:text-primary transition-colors">
                            {relatedPost.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{relatedPost.category}</Badge>
                          <span className="text-xs text-muted-foreground">{relatedPost.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
