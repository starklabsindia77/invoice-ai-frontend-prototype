
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';
import { Progress } from '@/components/ui/progress';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Upload, FileText, BarChart, Download, Settings } from 'lucide-react';

// Demo data for graphs
const recentInvoices = [
  {
    id: 'INV-001',
    vendor: 'Office Supplies Ltd',
    amount: 1250.80,
    date: '2024-03-05',
    status: 'Processed',
    category: 'expense'
  },
  {
    id: 'INV-002',
    vendor: 'Tech Hardware Inc',
    amount: 3499.99,
    date: '2024-03-10',
    status: 'Pending',
    category: 'expense'
  },
  {
    id: 'INV-003',
    vendor: 'Cleaning Services Co',
    amount: 850.00,
    date: '2024-03-15',
    status: 'Processed',
    category: 'expense'
  },
  {
    id: 'INV-004',
    vendor: 'Marketing Agency',
    amount: 4500.00,
    date: '2024-03-18',
    status: 'Failed',
    category: 'expense'
  },
  {
    id: 'INV-005',
    vendor: 'Utility Provider',
    amount: 380.25,
    date: '2024-03-22',
    status: 'Processed',
    category: 'expense'
  },
  {
    id: 'INV-006',
    vendor: 'Alpha Corp',
    amount: 5250.00,
    date: '2024-03-25',
    status: 'Processed',
    category: 'sales'
  },
  {
    id: 'INV-007',
    vendor: 'Beta Solutions',
    amount: 3200.00,
    date: '2024-03-27',
    status: 'Processed',
    category: 'sales'
  },
];

// Data for charts
const monthlyData = [
  { name: 'Jan', amount: 12500 },
  { name: 'Feb', amount: 19000 },
  { name: 'Mar', amount: 15000 },
  { name: 'Apr', amount: 22000 },
  { name: 'May', amount: 28000 },
  { name: 'Jun', amount: 24000 },
  { name: 'Jul', amount: 30000 },
];

const categoryData = [
  { name: 'Sales', value: 40 },
  { name: 'Expenses', value: 60 },
];

const Dashboard: React.FC = () => {
  const { tenant, subscription } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const invoiceProgress = subscription ? 
    (subscription.usage.invoicesProcessed / subscription.usage.invoicesLimit) * 100 : 0;
  
  const storageProgress = subscription ? 
    (subscription.usage.storageUsed / subscription.usage.storageLimit) * 100 : 0;

  const salesInvoices = recentInvoices.filter(invoice => invoice.category === 'sales');
  const expenseInvoices = recentInvoices.filter(invoice => invoice.category === 'expense');

  const COLORS = ['#8884d8', '#82ca9d', '#FFBB28', '#FF8042'];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="invoices">Recent Invoices</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <TabsContent value="overview" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Invoices Processed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {subscription?.usage.invoicesProcessed || 0}
                <span className="text-muted-foreground text-sm font-normal ml-1">
                  / {subscription?.usage.invoicesLimit || 0}
                </span>
              </div>
              <Progress 
                value={invoiceProgress} 
                className="h-2 mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {subscription?.plan === 'premium' 
                  ? 'Unlimited plan' 
                  : `${Math.round(100 - invoiceProgress)}% remaining this month`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Storage Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {subscription?.usage.storageUsed || 0} GB
                <span className="text-muted-foreground text-sm font-normal ml-1">
                  / {subscription?.usage.storageLimit || 0} GB
                </span>
              </div>
              <Progress 
                value={storageProgress} 
                className="h-2 mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(storageProgress)}% of your storage used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold capitalize">
                {subscription?.plan || 'Free'}
              </div>
              <div className="flex items-center mt-2">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  subscription?.status === 'active' ? 'bg-green-500' : 
                  subscription?.status === 'trial' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
                <span className="text-sm text-muted-foreground capitalize">
                  {subscription?.status || 'Inactive'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {subscription?.endDate 
                  ? `Renews on ${new Date(subscription.endDate).toLocaleDateString()}` 
                  : 'No active subscription'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Overview</CardTitle>
                <CardDescription>
                  Monthly invoicing activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={monthlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Invoice Types</CardTitle>
                <CardDescription>
                  Sales vs. Expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you can perform
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-auto py-4 flex flex-col items-center justify-center bg-brand-50 hover:bg-brand-100 text-brand-700">
                <Upload className="h-8 w-8 mb-2" />
                Upload New Invoice
              </Button>
              
              <Button className="h-auto py-4 flex flex-col items-center justify-center bg-brand-50 hover:bg-brand-100 text-brand-700">
                <FileText className="h-8 w-8 mb-2" />
                View All Invoices
              </Button>
              
              <Button className="h-auto py-4 flex flex-col items-center justify-center bg-brand-50 hover:bg-brand-100 text-brand-700">
                <BarChart className="h-8 w-8 mb-2" />
                Analytics Dashboard
              </Button>
              
              <Button className="h-auto py-4 flex flex-col items-center justify-center bg-brand-50 hover:bg-brand-100 text-brand-700">
                <Download className="h-8 w-8 mb-2" />
                Export Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="invoices" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Invoices</CardTitle>
              <CardDescription>
                Your latest sales invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-xs text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Invoice ID</th>
                      <th className="pb-2 font-medium">Vendor</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0">
                        <td className="py-3 text-sm">
                          <span className="font-medium">{invoice.id}</span>
                        </td>
                        <td className="py-3 text-sm">{invoice.vendor}</td>
                        <td className="py-3 text-sm">
                          ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            invoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {salesInvoices.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-muted-foreground">
                          No sales invoices found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expense Invoices</CardTitle>
              <CardDescription>
                Your latest expense invoices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-xs text-left text-muted-foreground">
                      <th className="pb-2 font-medium">Invoice ID</th>
                      <th className="pb-2 font-medium">Vendor</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenseInvoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-border last:border-0">
                        <td className="py-3 text-sm">
                          <span className="font-medium">{invoice.id}</span>
                        </td>
                        <td className="py-3 text-sm">{invoice.vendor}</td>
                        <td className="py-3 text-sm">
                          ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 text-sm">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                            invoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              View All Invoices
            </Button>
            <Button variant="outline" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload Invoice
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
            <Button variant="outline" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Invoice Settings
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardLayout>
  );
};

export default Dashboard;
