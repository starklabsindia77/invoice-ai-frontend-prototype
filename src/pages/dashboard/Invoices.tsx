
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PlusCircle, Tag, X } from 'lucide-react';

type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
};

type Invoice = {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'Processed' | 'Pending' | 'Failed';
  gstId: string;
  category: 'sales' | 'expense';
  tags: string[];
  items: InvoiceItem[];
};

// Sample invoice data with category and tags
const invoices = [
  {
    id: 'INV-001',
    vendor: 'Office Supplies Ltd',
    amount: 1250.80,
    date: '2024-03-05',
    status: 'Processed',
    gstId: 'GST123456789',
    category: 'expense',
    tags: ['office', 'monthly'],
    items: [
      { description: 'Paper A4', quantity: 10, price: 25.00 },
      { description: 'Pens (box)', quantity: 5, price: 15.00 },
      { description: 'Notebooks', quantity: 20, price: 5.00 },
    ]
  },
  {
    id: 'INV-002',
    vendor: 'Tech Hardware Inc',
    amount: 3499.99,
    date: '2024-03-10',
    status: 'Pending',
    gstId: 'GST987654321',
    category: 'expense',
    tags: ['hardware', 'equipment'],
    items: [
      { description: 'Laptop Dell XPS', quantity: 1, price: 2499.99 },
      { description: 'Monitor 27"', quantity: 2, price: 500.00 },
    ]
  },
  {
    id: 'INV-003',
    vendor: 'Cleaning Services Co',
    amount: 850.00,
    date: '2024-03-15',
    status: 'Processed',
    gstId: 'GST456789123',
    category: 'expense',
    tags: ['services', 'monthly'],
    items: [
      { description: 'Office Cleaning - March', quantity: 1, price: 850.00 },
    ]
  },
  {
    id: 'INV-004',
    vendor: 'Marketing Agency',
    amount: 4500.00,
    date: '2024-03-18',
    status: 'Failed',
    gstId: 'GST789123456',
    category: 'expense',
    tags: ['marketing', 'quarterly'],
    items: [
      { description: 'SEO Services - Q1', quantity: 1, price: 2000.00 },
      { description: 'Social Media Campaign', quantity: 1, price: 1500.00 },
      { description: 'Content Creation', quantity: 1, price: 1000.00 },
    ]
  },
  {
    id: 'INV-005',
    vendor: 'Utility Provider',
    amount: 380.25,
    date: '2024-03-22',
    status: 'Processed',
    gstId: 'GST321654987',
    category: 'expense',
    tags: ['utilities', 'monthly'],
    items: [
      { description: 'Electricity - March', quantity: 1, price: 250.25 },
      { description: 'Water - March', quantity: 1, price: 130.00 },
    ]
  },
  {
    id: 'INV-006',
    vendor: 'Alpha Corp',
    amount: 5250.00,
    date: '2024-03-25',
    status: 'Processed',
    gstId: 'GST456123789',
    category: 'sales',
    tags: ['product', 'enterprise'],
    items: [
      { description: 'Software License - Enterprise', quantity: 5, price: 1050.00 },
    ]
  },
  {
    id: 'INV-007',
    vendor: 'Beta Solutions',
    amount: 3200.00,
    date: '2024-03-27',
    status: 'Processed',
    gstId: 'GST789456123',
    category: 'sales',
    tags: ['service', 'consultation'],
    items: [
      { description: 'Consulting Services - March', quantity: 16, price: 200.00 },
    ]
  },
];

const availableTags = ['office', 'monthly', 'hardware', 'equipment', 'services', 'marketing', 'quarterly', 'utilities', 'product', 'enterprise', 'service', 'consultation', 'tax-deductible', 'recurring', 'one-time'];

const Invoices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [newTag, setNewTag] = useState('');

  const [invoiceData, setInvoiceData] = useState<Invoice[]>(JSON.parse(JSON.stringify(invoices)));

  const filteredInvoices = invoiceData.filter((invoice) => {
    if (activeTab !== 'all' && invoice.status.toLowerCase() !== activeTab) return false;
    if (categoryFilter !== 'all' && invoice.category !== categoryFilter) return false;
    if (search) {
      return (
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  const handleExportCSV = () => toast.success('Invoice data exported to CSV');
  const handleSyncAccounting = () => toast.success('Invoice data synced with accounting software');
  const handleUpload = () => {
    toast.success('Invoice upload simulation started');
    setTimeout(() => toast.success('Invoice processed successfully'), 2000);
  };

  const updateInvoiceCategory = (invoiceId: string, category: 'sales' | 'expense') => {
    const updatedInvoices = invoiceData.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, category } : invoice
    );
    setInvoiceData(updatedInvoices);
    if (selectedInvoice?.id === invoiceId) setSelectedInvoice({ ...selectedInvoice, category });
    toast.success(`Invoice categorized as ${category}`);
  };

  const addTagToInvoice = (invoiceId: string, tag: string) => {
    if (!tag.trim()) return;
    const updatedInvoices = invoiceData.map((invoice) => {
      if (invoice.id === invoiceId && !invoice.tags.includes(tag)) {
        return { ...invoice, tags: [...invoice.tags, tag] };
      }
      return invoice;
    });
    setInvoiceData(updatedInvoices);
    if (selectedInvoice?.id === invoiceId && !selectedInvoice.tags.includes(tag)) {
      setSelectedInvoice({ ...selectedInvoice, tags: [...selectedInvoice.tags, tag] });
    }
    setNewTag('');
  };

  const removeTagFromInvoice = (invoiceId: string, tagToRemove: string) => {
    const updatedInvoices = invoiceData.map((invoice) =>
      invoice.id === invoiceId
        ? { ...invoice, tags: invoice.tags.filter((tag) => tag !== tagToRemove) }
        : invoice
    );
    setInvoiceData(updatedInvoices);
    if (selectedInvoice?.id === invoiceId) {
      setSelectedInvoice({
        ...selectedInvoice,
        tags: selectedInvoice.tags.filter((tag) => tag !== tagToRemove),
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportCSV}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export CSV
          </Button>
          <Button variant="outline" onClick={handleSyncAccounting}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 16L12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.024 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37138 19.1108 9.00073 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74399 15.0899 5.82799C14.3067 4.91199 13.3248 4.18546 12.2181 3.70437C11.1113 3.22328 9.90851 2.99888 8.70008 3.04808C7.49164 3.09728 6.31378 3.41886 5.24947 3.98865C4.18516 4.55845 3.26303 5.36188 2.54873 6.33864C1.83443 7.31541 1.34768 8.4365 1.12992 9.6239C0.912151 10.8113 0.97136 12.0311 1.30323 13.1919C1.6351 14.3527 2.22904 15.4299 3.04 16.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sync to Accounting
          </Button>
          <Button onClick={handleUpload}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Upload Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4">
                <Label htmlFor="search" className="sr-only">Search</Label>
                <Input 
                  id="search" 
                  placeholder="Search invoices..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="category-filter" className="mb-2 block">Category</Label>
                <Select 
                  value={categoryFilter} 
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger id="category-filter">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="processed">Processed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0">
                  <div className="space-y-2">
                    {filteredInvoices.map((invoice: Invoice) => (
                      <div 
                        key={invoice.id}
                        className={`p-3 rounded-md cursor-pointer border ${
                          selectedInvoice?.id === invoice.id 
                            ? 'bg-brand-50 border-brand-200' 
                            : 'hover:bg-gray-50 border-transparent'
                        }`}
                        onClick={() => setSelectedInvoice(invoice)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{invoice.id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            invoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {invoice.vendor}
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-sm font-medium">
                            ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <Badge className={`mr-2 ${
                            invoice.category === 'sales' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                          }`}>
                            {invoice.category === 'sales' ? 'Sales' : 'Expense'}
                          </Badge>
                          {invoice.tags && invoice.tags.length > 0 && (
                            <span className="text-xs text-muted-foreground">
                              {invoice.tags.length} tags
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {filteredInvoices.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No invoices found
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="processed" className="m-0">
                  {/* Same content as "all" tab but filtered */}
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  {/* Same content as "all" tab but filtered */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          {selectedInvoice ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">{selectedInvoice.id}</h2>
                    <p className="text-muted-foreground">
                      {new Date(selectedInvoice.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    selectedInvoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                    selectedInvoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedInvoice.status}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Vendor</h3>
                    <p className="font-medium">{selectedInvoice.vendor}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">GST/VAT ID</h3>
                    <p className="font-medium">{selectedInvoice.gstId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
                    <Select 
                      value={selectedInvoice.category} 
                      onValueChange={(value) => updateInvoiceCategory(selectedInvoice.id, value as 'sales' | 'expense')}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="expense">Expense</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedInvoice.tags && selectedInvoice.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <button 
                          onClick={() => removeTagFromInvoice(selectedInvoice.id, tag)}
                          className="ml-1 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {(!selectedInvoice.tags || selectedInvoice.tags.length === 0) && (
                      <span className="text-sm text-muted-foreground">No tags</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Collapsible className="w-full">
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add Tag
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <Input 
                              placeholder="New tag" 
                              value={newTag} 
                              onChange={(e) => setNewTag(e.target.value)}
                              className="h-8"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => addTagToInvoice(selectedInvoice.id, newTag)}
                              disabled={!newTag.trim()}
                            >
                              Add
                            </Button>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Or select from common tags:
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {availableTags.slice(0, 8).map(tag => (
                              <Badge 
                                key={tag} 
                                variant="outline" 
                                className="cursor-pointer"
                                onClick={() => addTagToInvoice(selectedInvoice.id, tag)}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>

                <div className="border-t border-border pt-6 mb-6">
                  <h3 className="font-medium mb-4">Invoice Items</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border text-xs text-left text-muted-foreground">
                          <th className="pb-2 font-medium">Description</th>
                          <th className="pb-2 font-medium text-right">Quantity</th>
                          <th className="pb-2 font-medium text-right">Price</th>
                          <th className="pb-2 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item: InvoiceItem, index: number) => (
                          <tr key={index} className="border-b border-border last:border-0">
                            <td className="py-3">{item.description}</td>
                            <td className="py-3 text-right">{item.quantity}</td>
                            <td className="py-3 text-right">${item.price.toFixed(2)}</td>
                            <td className="py-3 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3} className="pt-4 text-right font-medium">Total</td>
                          <td className="pt-4 text-right font-bold">${selectedInvoice.amount.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit Data
                  </Button>
                  <Button variant="outline" size="sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Download PDF
                  </Button>
                  <Button size="sm">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 16L12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.024 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37138 19.1108 9.00073 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74399 15.0899 5.82799C14.3067 4.91199 13.3248 4.18546 12.2181 3.70437C11.1113 3.22328 9.90851 2.99888 8.70008 3.04808C7.49164 3.09728 6.31378 3.41886 5.24947 3.98865C4.18516 4.55845 3.26303 5.36188 2.54873 6.33864C1.83443 7.31541 1.34768 8.4365 1.12992 9.6239C0.912151 10.8113 0.97136 12.0311 1.30323 13.1919C1.6351 14.3527 2.22904 15.4299 3.04 16.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sync to Tally
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 p-12">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No invoice selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select an invoice from the list to view details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Invoices;
