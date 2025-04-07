
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SignupStepOne: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}> = ({ formData, setFormData, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation would go here in a real application
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Your Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select 
            value={formData.industry} 
            onValueChange={(value) => handleSelectChange('industry', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="logistics">Logistics</SelectItem>
              <SelectItem value="legal">Legal & Accounting</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Select 
            value={formData.region} 
            onValueChange={(value) => handleSelectChange('region', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="uae">UAE</SelectItem>
              <SelectItem value="saudi">Saudi Arabia</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subdomain">Preferred Subdomain</Label>
          <div className="flex">
            <Input
              id="subdomain"
              name="subdomain"
              placeholder="yourcompany"
              value={formData.subdomain}
              onChange={handleChange}
              required
              className="rounded-r-none"
            />
            <span className="bg-muted px-3 py-2 text-muted-foreground border border-l-0 border-input rounded-r-md">
              .invoiceai.com
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button type="submit" className="w-full">
          Next
        </Button>
      </CardFooter>
    </form>
  );
};

const SignupStepTwo: React.FC<{
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onSubmit: () => void;
}> = ({ formData, setFormData, onBack, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation would go here in a real application
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Your Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Create Account
        </Button>
      </CardFooter>
    </form>
  );
};

const SignupStepThree: React.FC<{
  formData: any;
}> = ({ formData }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mt-6 text-xl font-semibold">Account Created Successfully</h3>
          <p className="mt-2 text-muted-foreground">
            Your account has been created and your workspace is being prepared.
          </p>
        </div>

        <div className="rounded-lg bg-muted p-4">
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
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={() => navigate('/login')}
        >
          Proceed to Login
        </Button>
      </CardFooter>
    </>
  );
};

const Signup: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    region: '',
    subdomain: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = () => {
    // In a real app, this would send data to an API
    toast.success('Account created successfully!');
    setStep(3);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your company information"}
            {step === 2 && "Create your admin account"}
            {step === 3 && "Success! Your account is ready"}
          </CardDescription>
          
          {step < 3 && (
            <div className="flex items-center justify-between mt-4">
              <div className="w-full flex justify-between">
                <div className={`h-2 w-1/3 ${step >= 1 ? 'bg-brand-600' : 'bg-gray-200'} rounded-l-full`}></div>
                <div className={`h-2 w-1/3 ${step >= 2 ? 'bg-brand-600' : 'bg-gray-200'}`}></div>
                <div className={`h-2 w-1/3 ${step >= 3 ? 'bg-brand-600' : 'bg-gray-200'} rounded-r-full`}></div>
              </div>
            </div>
          )}
        </CardHeader>
        
        {step === 1 && (
          <SignupStepOne
            formData={formData}
            setFormData={setFormData}
            onNext={() => setStep(2)}
          />
        )}
        
        {step === 2 && (
          <SignupStepTwo
            formData={formData}
            setFormData={setFormData}
            onBack={() => setStep(1)}
            onSubmit={handleSubmit}
          />
        )}
        
        {step === 3 && (
          <SignupStepThree formData={formData} />
        )}
        
        {step < 3 && (
          <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <a 
              href="/login" 
              className="text-brand-600 hover:text-brand-800 font-medium"
            >
              Sign in
            </a>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Signup;
