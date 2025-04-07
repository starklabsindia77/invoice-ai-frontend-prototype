
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  // Monthly invoices data
  const monthlyData = [
    { name: 'Jan', sales: 12, expenses: 8 },
    { name: 'Feb', sales: 19, expenses: 10 },
    { name: 'Mar', sales: 15, expenses: 7 },
    { name: 'Apr', sales: 22, expenses: 12 },
    { name: 'May', sales: 28, expenses: 15 },
    { name: 'Jun', sales: 24, expenses: 18 },
    { name: 'Jul', sales: 30, expenses: 20 },
  ];

  // Category distribution data for pie chart
  const categoryData = [
    { name: 'Office Supplies', value: 35 },
    { name: 'Services', value: 25 },
    { name: 'Utilities', value: 15 },
    { name: 'Technology', value: 20 },
    { name: 'Other', value: 5 },
  ];

  // Tag distribution data
  const tagData = [
    { name: 'Recurring', value: 45 },
    { name: 'One-time', value: 30 },
    { name: 'Tax Deductible', value: 15 },
    { name: 'Other', value: 10 },
  ];

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F'];

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Invoices</CardTitle>
            <CardDescription>All time stats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">254</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-500 font-medium">↑ 12%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sales Invoices</CardTitle>
            <CardDescription>Revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$45,892</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-green-500 font-medium">↑ 8%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Expense Invoices</CardTitle>
            <CardDescription>Total expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$28,475</div>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-red-500 font-medium">↑ 5%</span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Invoice Comparison</CardTitle>
            <CardDescription>Sales vs Expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                  <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Categories</CardTitle>
            <CardDescription>Expense distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Tags Distribution</CardTitle>
            <CardDescription>Breakdown by tags</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tagData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tagData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Processing Efficiency</CardTitle>
            <CardDescription>Average processing time per invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { month: 'Jan', time: 5.2 },
                    { month: 'Feb', time: 4.8 },
                    { month: 'Mar', time: 4.1 },
                    { month: 'Apr', time: 3.5 },
                    { month: 'May', time: 2.9 },
                    { month: 'Jun', time: 2.7 },
                    { month: 'Jul', time: 2.3 }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="time" fill="#8884d8" name="Processing Time (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
