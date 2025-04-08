
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Toast, ToastAction } from '@/components/ui/toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PlusCircle, Tag, X, ChevronDown, Globe, FileText, AlertTriangle } from 'lucide-react';

// Enhanced Invoice Item type with optional tax information
type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
  hsn?: string; // HSN code for Indian GST
  taxRate?: number; // Tax rate percentage
  taxAmount?: number; // Calculated tax amount
};

// Enhanced Invoice type with language and GST-specific fields
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
  language?: string; // Language of the invoice
  currency?: string; // Currency code
  // Indian GST specific fields
  gstType?: 'CGST/SGST' | 'IGST' | 'Exempt';
  gstFilingStatus?: 'Filed' | 'Pending' | 'Not Applicable';
  gstFilingPeriod?: string;
  placeOfSupply?: string;
  reverseCharge?: boolean;
  eInvoiceNumber?: string;
};

// Sample enhanced invoice data with multiple languages and GST data
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
    language: 'en',
    currency: 'USD',
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
    language: 'en',
    currency: 'USD',
    items: [
      { description: 'Laptop Dell XPS', quantity: 1, price: 2499.99 },
      { description: 'Monitor 27"', quantity: 2, price: 500.00 },
    ]
  },
  {
    id: 'INV-003',
    vendor: 'तकनीकी सेवाएं प्रा.लि.',
    amount: 47500.00,
    date: '2024-03-15',
    status: 'Processed',
    gstId: '27AADCB2230M1ZP',
    category: 'expense',
    tags: ['services', 'monthly'],
    language: 'hi',
    currency: 'INR',
    gstType: 'CGST/SGST',
    gstFilingStatus: 'Filed',
    gstFilingPeriod: 'Q4 2023-24',
    placeOfSupply: 'Maharashtra',
    reverseCharge: false,
    eInvoiceNumber: 'e-INV-7812345',
    items: [
      { 
        description: 'आईटी सपोर्ट सेवाएं - मार्च', 
        quantity: 1, 
        price: 40254.24, 
        hsn: '998313',
        taxRate: 18,
        taxAmount: 7245.76
      },
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
    language: 'en',
    currency: 'USD',
    items: [
      { description: 'SEO Services - Q1', quantity: 1, price: 2000.00 },
      { description: 'Social Media Campaign', quantity: 1, price: 1500.00 },
      { description: 'Content Creation', quantity: 1, price: 1000.00 },
    ]
  },
  {
    id: 'INV-005',
    vendor: 'इंडियन यूटिलिटी कंपनी',
    amount: 15840.25,
    date: '2024-03-22',
    status: 'Processed',
    gstId: '29ABCDE1234F1Z5',
    category: 'expense',
    tags: ['utilities', 'monthly'],
    language: 'hi',
    currency: 'INR',
    gstType: 'IGST',
    gstFilingStatus: 'Pending',
    gstFilingPeriod: 'Q4 2023-24',
    placeOfSupply: 'Karnataka',
    reverseCharge: false,
    eInvoiceNumber: 'e-INV-9876123',
    items: [
      { 
        description: 'बिजली - मार्च', 
        quantity: 1, 
        price: 11864.41, 
        hsn: '996911',
        taxRate: 18,
        taxAmount: 2135.59
      },
      { 
        description: 'पानी - मार्च', 
        quantity: 1, 
        price: 1550.42, 
        hsn: '996912',
        taxRate: 18,
        taxAmount: 279.08
      },
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
    language: 'en',
    currency: 'USD',
    items: [
      { description: 'Software License - Enterprise', quantity: 5, price: 1050.00 },
    ]
  },
  {
    id: 'INV-007',
    vendor: 'ベータソリューションズ株式会社',
    amount: 350000.00,
    date: '2024-03-27',
    status: 'Processed',
    gstId: 'JP12345678901',
    category: 'sales',
    tags: ['service', 'consultation'],
    language: 'ja',
    currency: 'JPY',
    items: [
      { description: 'コンサルティングサービス - 3月', quantity: 16, price: 21875.00 },
    ]
  },
];

const availableTags = ['office', 'monthly', 'hardware', 'equipment', 'services', 'marketing', 'quarterly', 'utilities', 'product', 'enterprise', 'service', 'consultation', 'tax-deductible', 'recurring', 'one-time'];

// Language display options
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'es', name: 'Spanish (Español)' },
];

// GST Type options for Indian invoices
const gstTypeOptions = ['CGST/SGST', 'IGST', 'Exempt'];

const Invoices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [newTag, setNewTag] = useState('');
  const [showGstDetails, setShowGstDetails] = useState(false);

  const [invoiceData, setInvoiceData] = useState(JSON.parse(JSON.stringify(invoices)));

  const filteredInvoices = invoiceData.filter((invoice) => {
    if (activeTab !== 'all' && invoice.status.toLowerCase() !== activeTab) return false;
    if (categoryFilter !== 'all' && invoice.category !== categoryFilter) return false;
    if (languageFilter !== 'all' && invoice.language !== languageFilter) return false;
    if (search) {
      return (
        invoice.id.toLowerCase().includes(search.toLowerCase()) ||
        invoice.vendor.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  // Action handlers
  const handleExportCSV = () => toast({
    title: "Success",
    description: "Invoice data exported to CSV",
  });
  
  const handleSyncAccounting = () => toast({
    title: "Success",
    description: "Invoice data synced with accounting software",
  });
  
  const handleUpload = () => {
    toast({
      title: "Started",
      description: "Invoice upload simulation started",
    });
    
    setTimeout(() => toast({
      title: "Success",
      description: "Invoice processed successfully",
    }), 2000);
  };

  const updateInvoiceCategory = (invoiceId, category) => {
    const updatedInvoices = invoiceData.map((invoice) =>
      invoice.id === invoiceId ? { ...invoice, category } : invoice
    );
    setInvoiceData(updatedInvoices);
    if (selectedInvoice?.id === invoiceId) setSelectedInvoice({ ...selectedInvoice, category });
    
    toast({
      title: "Category Updated",
      description: `Invoice categorized as ${category}`,
    });
  };

  const addTagToInvoice = (invoiceId, tag) => {
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

  const removeTagFromInvoice = (invoiceId, tagToRemove) => {
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

  // Helper function to format currency
  const formatCurrency = (amount, currency = 'USD') => {
    const currencyMap = {
      USD: { symbol: '$', locale: 'en-US' },
      INR: { symbol: '₹', locale: 'en-IN' },
      JPY: { symbol: '¥', locale: 'ja-JP' },
      EUR: { symbol: '€', locale: 'de-DE' }
    };

    const { locale, symbol } = currencyMap[currency] || currencyMap.USD;
    
    // For JPY, no decimal places
    const options = currency === 'JPY' 
      ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    
    return `${symbol}${amount.toLocaleString(locale, options)}`;
  };

  // Helper function to get language display name
  const getLanguageName = (code) => {
    const language = languageOptions.find(lang => lang.code === code);
    return language ? language.name : code;
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

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-4">
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-4">
                <div>
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
                
                <div>
                  <Label htmlFor="language-filter" className="mb-2 block">Language</Label>
                  <Select 
                    value={languageFilter} 
                    onValueChange={setLanguageFilter}
                  >
                    <SelectTrigger id="language-filter">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {languageOptions.map(lang => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="processed">Processed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="m-0">
                  <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                    {filteredInvoices.map((invoice) => (
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
                            {formatCurrency(invoice.amount, invoice.currency)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(invoice.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2 flex-wrap">
                          <Badge className={`${
                            invoice.category === 'sales' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                          }`}>
                            {invoice.category === 'sales' ? 'Sales' : 'Expense'}
                          </Badge>
                          
                          {invoice.language && (
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {getLanguageName(invoice.language)}
                            </Badge>
                          )}
                          
                          {invoice.gstType && (
                            <Badge variant="outline" className="bg-purple-50 text-purple-800">
                              {invoice.gstType}
                            </Badge>
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
                  {/* Filtered content handled by the component */}
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  {/* Filtered content handled by the component */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          {selectedInvoice ? (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold">{selectedInvoice.id}</h2>
                      {selectedInvoice.language && (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {getLanguageName(selectedInvoice.language)}
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {new Date(selectedInvoice.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      selectedInvoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
                      selectedInvoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedInvoice.status}
                    </div>
                    {selectedInvoice.gstFilingStatus && (
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        selectedInvoice.gstFilingStatus === 'Filed' ? 'bg-green-100 text-green-800' : 
                        selectedInvoice.gstFilingStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        GST: {selectedInvoice.gstFilingStatus}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
                      onValueChange={(value) => updateInvoiceCategory(selectedInvoice.id, value)}
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
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Amount</h3>
                    <p className="font-bold">
                      {formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}
                      {selectedInvoice.currency && <span className="ml-1 text-sm font-normal text-muted-foreground">({selectedInvoice.currency})</span>}
                    </p>
                  </div>
                </div>

                {/* GST Information for Indian Invoices */}
                {(selectedInvoice.gstType || selectedInvoice.placeOfSupply) && (
                  <div className="mb-6">
                    <Collapsible 
                      open={showGstDetails} 
                      onOpenChange={setShowGstDetails}
                      className="border rounded-md p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-purple-500" />
                          <h3 className="font-medium">Indian GST Details</h3>
                        </div>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronDown className={`h-4 w-4 transition-transform ${showGstDetails ? "transform rotate-180" : ""}`} />
                            <span className="sr-only">Toggle GST details</span>
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedInvoice.gstType && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">GST Type</h4>
                              <Select 
                                value={selectedInvoice.gstType}
                                onValueChange={(value) => {
                                  setSelectedInvoice({...selectedInvoice, gstType: value});
                                }}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {gstTypeOptions.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          
                          {selectedInvoice.placeOfSupply && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Place of Supply</h4>
                              <p className="font-medium">{selectedInvoice.placeOfSupply}</p>
                            </div>
                          )}
                          
                          {selectedInvoice.gstFilingPeriod && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">Filing Period</h4>
                              <p className="font-medium">{selectedInvoice.gstFilingPeriod}</p>
                            </div>
                          )}
                          
                          {selectedInvoice.eInvoiceNumber && (
                            <div>
                              <h4 className="text-sm font-medium text-muted-foreground mb-1">e-Invoice Number</h4>
                              <p className="font-medium">{selectedInvoice.eInvoiceNumber}</p>
                            </div>
                          )}
                          
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground mb-1">Reverse Charge</h4>
                            <p className="font-medium">{selectedInvoice.reverseCharge ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                        
                        {selectedInvoice.items.some(item => item.hsn) && (
                          <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <p className="text-sm text-yellow-700">GSTR-1 Filing Due on 11th of next month</p>
                            </div>
                          </div>
                        )}
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedInvoice.tags && selectedInvoice.tags.map((tag) => (
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
                  <div className="overflow-x-auto w-full">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border text-xs text-left text-muted-foreground">
                          <th className="pb-2 font-medium">Description</th>
                          <th className="pb-2 font-medium text-right">Quantity</th>
                          <th className="pb-2 font-medium text-right">Price</th>
                          {selectedInvoice.items.some(item => item.hsn) && (
                            <th className="pb-2 font-medium text-right">HSN Code</th>
                          )}
                          {selectedInvoice.items.some(item => item.taxRate) && (
                            <th className="pb-2 font-medium text-right">Tax Rate</th>
                          )}
                          {selectedInvoice.items.some(item => item.taxAmount) && (
                            <th className="pb-2 font-medium text-right">Tax Amount</th>
                          )}
                          <th className="pb-2 font-medium text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedInvoice.items.map((item, index) => (
                          <tr key={index} className="border-b border-border last:border-0">
                            <td className="py-3">{item.description}</td>
                            <td className="py-3 text-right">{item.quantity}</td>
                            <td className="py-3 text-right">{formatCurrency(item.price, selectedInvoice.currency)}</td>
                            {selectedInvoice.items.some(item => item.hsn) && (
                              <td className="py-3 text-right">{item.hsn || '-'}</td>
                            )}
                            {selectedInvoice.items.some(item => item.taxRate) && (
                              <td className="py-3 text-right">{item.taxRate ? `${item.taxRate}%` : '-'}</td>
                            )}
                            {selectedInvoice.items.some(item => item.taxAmount) && (
                              <td className="py-3 text-right">{item.taxAmount ? formatCurrency(item.taxAmount, selectedInvoice.currency) : '-'}</td>
                            )}
                            <td className="py-3 text-right">{formatCurrency(item.quantity * item.price, selectedInvoice.currency)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        {selectedInvoice.items.some(item => item.taxAmount) && (
                          <tr>
                            <td colSpan={selectedInvoice.items.some(item => item.hsn) ? 5 : 4} className="pt-4 text-right font-medium">Total</td>
                            <td className="pt-4 text-right font-bold">{formatCurrency(selectedInvoice.amount, selectedInvoice.currency)}</td>
                         </tr>
                        )}
                      </tfoot>
                    </table>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
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
                    Submit to GSTN
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
