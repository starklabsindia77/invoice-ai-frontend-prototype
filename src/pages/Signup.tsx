import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Briefcase, MapPin, Globe, User, Mail, Lock, Check, ArrowRight } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

const companyInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must have at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  region: z.string().min(1, "Please select a region"),
  subdomain: z.string().min(3, "Subdomain must have at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Subdomain can only contain lowercase letters, numbers, and hyphens")
});

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must have at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Verification code must be 6 digits")
});

type CompanyInfoData = z.infer<typeof companyInfoSchema>;
type PersonalInfoData = z.infer<typeof personalInfoSchema>;
type VerificationData = z.infer<typeof verificationSchema>;

type SignupData = CompanyInfoData & PersonalInfoData & VerificationData;

const SignupStep = ({ 
  step, 
  children 
}: { 
  step: number; 
  children: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="space-y-0.5">
          <h2 className="text-xl font-semibold">
            {step === 1 && "Company Information"}
            {step === 2 && "Personal Information"}
            {step === 3 && "Verify Email"}
            {step === 4 && "Account Created"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {step === 1 && "Tell us about your company"}
            {step === 2 && "Create your administrator account"}
            {step === 3 && "Enter the code sent to your email"}
            {step === 4 && "Your account has been created successfully"}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Step {Math.min(step, 3)} of 3
        </div>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(step, 3) * 33.33}%` }}
        />
      </div>
    </div>
    {children}
  </motion.div>
);

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const useCurrentForm = () => {
    switch (step) {
      case 1:
        return useForm<CompanyInfoData>({
          resolver: zodResolver(companyInfoSchema),
          defaultValues: {
            companyName: formData.companyName || '',
            industry: formData.industry || '',
            region: formData.region || '',
            subdomain: formData.subdomain || ''
          }
        });
      case 2:
        return useForm<PersonalInfoData>({
          resolver: zodResolver(personalInfoSchema),
          defaultValues: {
            fullName: formData.fullName || '',
            email: formData.email || '',
            password: formData.password || '',
            confirmPassword: formData.confirmPassword || ''
          }
        });
      case 3:
        return useForm<VerificationData>({
          resolver: zodResolver(verificationSchema),
          defaultValues: {
            verificationCode: formData.verificationCode || ''
          }
        });
      default:
        return useForm();
    }
  };
  
  const form = useCurrentForm();

  const onSubmit = (data: any) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      toast.success("Verification code sent to your email", {
        description: "Please check your inbox"
      });
    } else if (step === 3) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
        toast.success("Account created successfully!");
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleProceedToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <title>Create an Account - InvoiceAI</title>
        <meta name="description" content="Sign up for InvoiceAI and start automating your invoice processing today." />
      </Helmet>
      
      <div className="flex min-h-screen bg-gradient-to-b from-primary/5 to-background">
        <div className="hidden lg:flex lg:w-1/2 bg-primary/10 items-center justify-center p-12">
          <div className="max-w-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold mb-6">Join InvoiceAI</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Create your account and start automating your invoice processing in minutes.
              </p>
              <img 
                src="/placeholder.svg" 
                alt="Invoice Automation Illustration" 
                className="mx-auto rounded-lg shadow-lg"
                width={400}
                height={300}
              />
            </motion.div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                <CardDescription>
                  Get started with InvoiceAI
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <SignupStep step={step}>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <div className="relative">
                                  <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <FormControl>
                                    <Input className="pl-10" placeholder="Your Company Name" {...field} />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <div className="relative">
                                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                  <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                      <SelectTrigger className="pl-10">
                                        <SelectValue placeholder="Select Industry" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="retail">Retail</SelectItem>
                                      <SelectItem value="healthcare">Healthcare</SelectItem>
                                      <SelectItem value="logistics">Logistics</SelectItem>
                                      <SelectItem value="legal">Legal & Accounting</SelectItem>
                                      <SelectItem value="finance">Finance</SelectItem>
                                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="region"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Region</FormLabel>
                                <div className="relative">
                                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                  <Select value={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                      <SelectTrigger className="pl-10">
                                        <SelectValue placeholder="Select Region" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="north_america">North America</SelectItem>
                                      <SelectItem value="europe">Europe</SelectItem>
                                      <SelectItem value="asia_pacific">Asia Pacific</SelectItem>
                                      <SelectItem value="middle_east">Middle East</SelectItem>
                                      <SelectItem value="africa">Africa</SelectItem>
                                      <SelectItem value="latin_america">Latin America</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="subdomain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Subdomain</FormLabel>
                                <div className="relative">
                                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <div className="flex">
                                    <FormControl>
                                      <Input
                                        className="pl-10 rounded-r-none"
                                        placeholder="yourcompany"
                                        {...field}
                                      />
                                    </FormControl>
                                    <span className="bg-muted px-3 py-2 text-muted-foreground border border-l-0 border-input rounded-r-md">
                                      .invoiceai.com
                                    </span>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="w-full mt-2">
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </form>
                      </Form>
                    </SignupStep>
                  )}
                  
                  {step === 2 && (
                    <SignupStep step={step}>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <FormControl>
                                    <Input className="pl-10" placeholder="Your Full Name" {...field} />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      type="email" 
                                      placeholder="you@example.com" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      type="password" 
                                      placeholder="Create a password" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <div className="relative">
                                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                  <FormControl>
                                    <Input 
                                      className="pl-10" 
                                      type="password" 
                                      placeholder="Confirm your password" 
                                      {...field} 
                                    />
                                  </FormControl>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-between pt-2">
                            <Button type="button" variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button type="submit">
                              Next <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </SignupStep>
                  )}
                  
                  {step === 3 && (
                    <SignupStep step={step}>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="text-center mb-6">
                            <p className="text-muted-foreground">
                              We've sent a 6-digit verification code to 
                              <span className="font-medium text-foreground"> {formData.email}</span>
                            </p>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="verificationCode"
                            render={({ field }) => (
                              <FormItem className="space-y-4">
                                <div className="flex justify-center">
                                  <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                      <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                      </InputOTPGroup>
                                    </InputOTP>
                                  </FormControl>
                                </div>
                                <FormMessage className="text-center" />
                              </FormItem>
                            )}
                          />
                          
                          <div className="text-center text-sm">
                            <p className="text-muted-foreground">
                              Didn't receive a code?{" "}
                              <Button variant="link" className="p-0 h-auto" onClick={() => {
                                toast.success("New verification code sent", {
                                  description: "Please check your inbox"
                                });
                              }}>
                                Resend
                              </Button>
                            </p>
                          </div>
                          
                          <div className="flex justify-between pt-2">
                            <Button type="button" variant="outline" onClick={handleBack}>
                              Back
                            </Button>
                            <Button type="submit" disabled={isSubmitting}>
                              {isSubmitting ? "Verifying..." : "Verify & Create Account"}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </SignupStep>
                  )}
                  
                  {step === 4 && (
                    <SignupStep step={step}>
                      <div className="text-center pb-4">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-6">
                          <Check className="h-10 w-10 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Account Created Successfully</h3>
                        <p className="text-muted-foreground mb-6">
                          Your account has been created and your workspace is being prepared.
                        </p>
                      </div>

                      <div className="rounded-lg bg-muted p-4 mb-6">
                        <h4 className="font-medium mb-2">Account Information</h4>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Company:</span>
                            <span className="font-medium">{formData.companyName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Subdomain:</span>
                            <span className="font-medium">{formData.subdomain}.invoiceai.com</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Administrator:</span>
                            <span className="font-medium">{formData.fullName}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleProceedToLogin}>
                        Proceed to Login
                      </Button>
                    </SignupStep>
                  )}
                </AnimatePresence>
              </CardContent>
              
              {step < 4 && (
                <CardFooter>
                  <p className="text-center text-sm text-muted-foreground w-full">
                    Already have an account?{' '}
                    <Link 
                      to="/login" 
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
