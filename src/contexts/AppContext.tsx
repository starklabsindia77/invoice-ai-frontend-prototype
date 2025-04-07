
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  industry: string;
  region: string;
  logo?: string;
}

export interface Subscription {
  id: string;
  plan: 'free' | 'basic' | 'premium';
  status: 'active' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  features: string[];
  usage: {
    invoicesProcessed: number;
    invoicesLimit: number;
    storageUsed: number;
    storageLimit: number;
  };
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  tenant: Tenant | null;
  setTenant: (tenant: Tenant | null) => void;
  subscription: Subscription | null;
  setSubscription: (subscription: Subscription | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with default values
const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
  tenant: null,
  setTenant: () => {},
  subscription: null,
  setSubscription: () => {},
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
});

// Custom hook to use the context
export const useApp = () => useContext(AppContext);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  // Simulate authentication
  const login = async (email: string, password: string) => {
    // Static data for demonstration
    const mockUsers = {
      'john.doe@alphacorp.com': {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@alphacorp.com',
        role: 'admin' as UserRole,
        tenant: {
          id: '1',
          name: 'Alpha Corp',
          subdomain: 'alphacorp',
          industry: 'Retail',
          region: 'Europe',
          logo: '/logos/alpha-corp.svg',
        },
        subscription: {
          id: '1',
          plan: 'premium' as const,
          status: 'active' as const,
          startDate: '2024-01-01',
          endDate: '2025-01-01',
          features: ['Unlimited Invoices', 'Multi-language OCR', 'API Access', 'Priority Support'],
          usage: {
            invoicesProcessed: 450,
            invoicesLimit: 1000,
            storageUsed: 2.5,
            storageLimit: 10,
          },
        },
      },
      'jane.smith@betasolutions.com': {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@betasolutions.com',
        role: 'admin' as UserRole,
        tenant: {
          id: '2',
          name: 'Beta Solutions',
          subdomain: 'betasolutions',
          industry: 'Healthcare',
          region: 'UAE',
          logo: '/logos/beta-solutions.svg',
        },
        subscription: {
          id: '2',
          plan: 'basic' as const,
          status: 'active' as const,
          startDate: '2024-02-15',
          endDate: '2025-02-15',
          features: ['100 Invoices/month', 'English OCR', 'Email Support'],
          usage: {
            invoicesProcessed: 85,
            invoicesLimit: 100,
            storageUsed: 0.8,
            storageLimit: 5,
          },
        },
      },
      'ahmed.khan@gammaent.com': {
        id: '3',
        name: 'Ahmed Khan',
        email: 'ahmed.khan@gammaent.com',
        role: 'admin' as UserRole,
        tenant: {
          id: '3',
          name: 'Gamma Enterprises',
          subdomain: 'gammaent',
          industry: 'Logistics',
          region: 'Saudi Arabia',
          logo: '/logos/gamma-enterprises.svg',
        },
        subscription: {
          id: '3',
          plan: 'free' as const,
          status: 'trial' as const,
          startDate: '2024-03-10',
          endDate: '2024-04-10',
          features: ['10 Invoices/month', 'English OCR', 'Community Support'],
          usage: {
            invoicesProcessed: 8,
            invoicesLimit: 10,
            storageUsed: 0.2,
            storageLimit: 1,
          },
        },
      },
      'rajesh.kumar@indiabusiness.in': {
        id: '4',
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@indiabusiness.in',
        role: 'admin' as UserRole,
        tenant: {
          id: '4',
          name: 'India Business',
          subdomain: 'indiabusiness',
          industry: 'Legal & Accounting',
          region: 'India',
          logo: '/logos/india-business.svg',
        },
        subscription: {
          id: '4',
          plan: 'premium' as const,
          status: 'active' as const,
          startDate: '2024-01-20',
          endDate: '2025-01-20',
          features: ['Unlimited Invoices', 'Multi-language OCR including Hindi, Tamil, Bengali', 'API Access', 'Priority Support', 'GST Compliance'],
          usage: {
            invoicesProcessed: 320,
            invoicesLimit: 1000,
            storageUsed: 1.8,
            storageLimit: 10,
          },
        },
      },
    };

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (mockUsers[email as keyof typeof mockUsers] && password === 'password') {
      const userData = mockUsers[email as keyof typeof mockUsers];
      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      setTenant(userData.tenant);
      setSubscription(userData.subscription);
      return;
    }

    throw new Error('Invalid credentials');
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
    setSubscription(null);
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      tenant,
      setTenant,
      subscription,
      setSubscription,
      isAuthenticated: !!user,
      login,
      logout,
    }}>
      {children}
    </AppContext.Provider>
  );
};
