import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { FileUp } from 'lucide-react';
import InvoiceList from '@/components/invoice/InvoiceList';
import InvoiceDetail from '@/components/invoice/InvoiceDetail';
import UploadExpenseInvoiceModal from '@/components/invoice/UploadExpenseInvoiceModal';
import { Invoice, InvoiceCategory } from '@/types/invoice';
import PageHeader from '@/components/PageHeader';

// Sample invoice data - filtered for expenses only
const expenseInvoices: Invoice[] = [
  {
    id: 'EINV-001',
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
    id: 'EINV-002',
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
    id: 'EINV-003',
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
    id: 'EINV-004',
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
  }
];

// Language display options
const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi (हिन्दी)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'es', name: 'Spanish (Español)' },
];

const ExpenseInvoices = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const [invoiceData, setInvoiceData] = useState<Invoice[]>(expenseInvoices);

  const filteredInvoices = invoiceData.filter((invoice) => {
    if (activeTab !== 'all' && invoice.status.toLowerCase() !== activeTab) return false;
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
    description: "Expense invoice data exported to CSV",
  });
  
  const handleSyncAccounting = () => toast({
    title: "Success",
    description: "Expense invoice data synced with accounting software",
  });
  
  const handleUpload = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = (newInvoice: Invoice) => {
    setInvoiceData(prevInvoices => [newInvoice, ...prevInvoices]);
    
    toast({
      title: "Success",
      description: "Expense invoice processed successfully",
    });
  };

  const updateInvoiceCategory = (invoiceId: string, category: InvoiceCategory) => {
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

  // Helper function to format currency
  const formatCurrency = (amount: number, currency = 'USD') => {
    const currencyMap = {
      USD: { symbol: '$', locale: 'en-US' },
      INR: { symbol: '₹', locale: 'en-IN' },
      JPY: { symbol: '¥', locale: 'ja-JP' },
      EUR: { symbol: '€', locale: 'de-DE' }
    };

    const { locale, symbol } = currencyMap[currency as keyof typeof currencyMap] || currencyMap.USD;
    
    // For JPY, no decimal places
    const options = currency === 'JPY' 
      ? { minimumFractionDigits: 0, maximumFractionDigits: 0 }
      : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    
    return `${symbol}${amount.toLocaleString(locale, options)}`;
  };

  // Helper function to get language display name
  const getLanguageName = (code: string) => {
    const language = languageOptions.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  return (
    <>
      <PageHeader 
        title="Expense Invoices" 
        description="Manage and track all your vendor invoices and expenses"
        pageName="Expense Management"
      />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Manage Expense Invoices</h2>
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
          <Button onClick={handleUpload} className="bg-orange-600 hover:bg-orange-700">
            <FileUp className="w-4 h-4 mr-2" />
            Upload Expense Invoice
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
                  placeholder="Search expense invoices..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 mb-4">
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
                  <InvoiceList 
                    invoices={filteredInvoices}
                    selectedInvoiceId={selectedInvoice?.id || null}
                    onSelectInvoice={setSelectedInvoice}
                    formatCurrency={formatCurrency}
                    getLanguageName={getLanguageName}
                  />
                </TabsContent>
                
                <TabsContent value="processed" className="m-0">
                  {/* Content handled by filtering through InvoiceList */}
                </TabsContent>
                
                <TabsContent value="pending" className="m-0">
                  {/* Content handled by filtering through InvoiceList */}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-6">
          {selectedInvoice ? (
            <Card>
              <CardContent className="p-0">
                <InvoiceDetail 
                  invoice={selectedInvoice}
                  availableTags={availableTags}
                  languageOptions={languageOptions}
                  formatCurrency={formatCurrency}
                  getLanguageName={getLanguageName}
                  updateInvoiceCategory={updateInvoiceCategory}
                  addTagToInvoice={addTagToInvoice}
                  removeTagFromInvoice={removeTagFromInvoice}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-white rounded-lg border border-dashed border-gray-300 p-12">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No expense invoice selected</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select an expense invoice from the list to view details or upload a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <UploadExpenseInvoiceModal
        open={isUploadModalOpen} 
        onOpenChange={setIsUploadModalOpen} 
        onSuccess={handleUploadSuccess}
      />
    </>
  );
};

export default ExpenseInvoices;
