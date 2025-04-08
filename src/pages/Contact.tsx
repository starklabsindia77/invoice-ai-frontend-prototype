
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(1, {
    message: 'Please select a subject.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactInfo = ({ icon, title, details }: { icon: React.ReactNode, title: string, details: string | React.ReactNode }) => (
  <div className="flex gap-3">
    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
      {icon}
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <div className="text-sm text-muted-foreground">{details}</div>
    </div>
  </div>
);

const Contact = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: ''
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
    toast({
      title: "Message sent successfully",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

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
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground">
              Have a question or need assistance? We're here to help you.
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 space-y-8"
            >
              <Card>
                <CardContent className="p-6 space-y-6">
                  <ContactInfo 
                    icon={<Mail className="h-5 w-5" />}
                    title="Email Us"
                    details={<a href="mailto:support@invoiceai.com" className="hover:text-primary">support@invoiceai.com</a>}
                  />
                  
                  <ContactInfo 
                    icon={<Phone className="h-5 w-5" />}
                    title="Call Us"
                    details={<a href="tel:+18001234567" className="hover:text-primary">+1 (800) 123-4567</a>}
                  />
                  
                  <ContactInfo 
                    icon={<MessageSquare className="h-5 w-5" />}
                    title="Live Chat"
                    details="Available Monday to Friday, 9am - 5pm EST"
                  />
                  
                  <ContactInfo 
                    icon={<MapPin className="h-5 w-5" />}
                    title="Visit Us"
                    details={
                      <address className="not-italic">
                        123 Innovation Drive<br />
                        Suite 400<br />
                        San Francisco, CA 94103
                      </address>
                    }
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4">Before You Contact Us</h3>
                  <div className="flex gap-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <p className="text-sm">
                      Check our <a href="/help" className="text-primary hover:underline">Help Center</a> for answers to common questions.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                    <p className="text-sm">
                      For account-specific questions, please log in to access better support options.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Company Ltd." {...field} />
                              </FormControl>
                              <FormDescription>Optional</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (123) 456-7890" {...field} />
                              </FormControl>
                              <FormDescription>Optional</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">General Inquiry</SelectItem>
                                <SelectItem value="support">Technical Support</SelectItem>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="billing">Billing</SelectItem>
                                <SelectItem value="partnership">Partnership</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you?" 
                                className="min-h-[120px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" size="lg">
                          Send Message
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Our Location</h2>
            <div className="h-[400px] bg-muted rounded-xl overflow-hidden">
              {/* This would be replaced with an actual map component */}
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                <span>Interactive Map Would Be Displayed Here</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
