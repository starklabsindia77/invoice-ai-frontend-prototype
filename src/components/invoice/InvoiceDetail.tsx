
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, FileText, Globe, PlusCircle, X, AlertTriangle } from 'lucide-react';
import { Invoice, InvoiceCategory } from '@/types/invoice';

// GST Type options for Indian invoices
const gstTypeOptions = ['CGST/SGST', 'IGST', 'Exempt'] as const;
type GstType = typeof gstTypeOptions[number];

interface InvoiceDetailProps {
  invoice: Invoice;
  availableTags: string[];
  languageOptions: Array<{ code: string; name: string }>;
  formatCurrency: (amount: number, currency?: string) => string;
  getLanguageName: (code: string) => string;
  updateInvoiceCategory: (invoiceId: string, category: InvoiceCategory) => void;
  addTagToInvoice: (invoiceId: string, tag: string) => void;
  removeTagFromInvoice: (invoiceId: string, tagToRemove: string) => void;
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  availableTags,
  languageOptions,
  formatCurrency,
  getLanguageName,
  updateInvoiceCategory,
  addTagToInvoice,
  removeTagFromInvoice
}) => {
  const [showGstDetails, setShowGstDetails] = useState(false);
  const [newTag, setNewTag] = useState('');

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{invoice.id}</h2>
            {invoice.language && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {getLanguageName(invoice.language)}
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {new Date(invoice.date).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1 rounded-full text-sm ${
            invoice.status === 'Processed' ? 'bg-green-100 text-green-800' : 
            invoice.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
            'bg-red-100 text-red-800'
          }`}>
            {invoice.status}
          </div>
          {invoice.gstFilingStatus && (
            <div className={`px-3 py-1 rounded-full text-sm ${
              invoice.gstFilingStatus === 'Filed' ? 'bg-green-100 text-green-800' : 
              invoice.gstFilingStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
              'bg-gray-100 text-gray-800'
            }`}>
              GST: {invoice.gstFilingStatus}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">
            {invoice.category === 'sales' ? 'Client' : 'Vendor'}
          </h3>
          <p className="font-medium">{invoice.vendor}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">GST/VAT ID</h3>
          <p className="font-medium">{invoice.gstId}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
          <Select 
            value={invoice.category} 
            onValueChange={(value: InvoiceCategory) => updateInvoiceCategory(invoice.id, value)}
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
            {formatCurrency(invoice.amount, invoice.currency)}
            {invoice.currency && <span className="ml-1 text-sm font-normal text-muted-foreground">({invoice.currency})</span>}
          </p>
        </div>
      </div>

      {(invoice.gstType || invoice.placeOfSupply) && (
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
                {invoice.gstType && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">GST Type</h4>
                    <Select 
                      value={invoice.gstType}
                      onValueChange={(value: GstType) => {
                        // This would typically update the invoice state
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
                
                {invoice.placeOfSupply && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Place of Supply</h4>
                    <p className="font-medium">{invoice.placeOfSupply}</p>
                  </div>
                )}
                
                {invoice.gstFilingPeriod && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Filing Period</h4>
                    <p className="font-medium">{invoice.gstFilingPeriod}</p>
                  </div>
                )}
                
                {invoice.eInvoiceNumber && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">e-Invoice Number</h4>
                    <p className="font-medium">{invoice.eInvoiceNumber}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Reverse Charge</h4>
                  <p className="font-medium">{invoice.reverseCharge ? 'Yes' : 'No'}</p>
                </div>
              </div>
              
              {invoice.items.some(item => item.hsn) && (
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
          {invoice.tags && invoice.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1">
              {tag}
              <button 
                onClick={() => removeTagFromInvoice(invoice.id, tag)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {(!invoice.tags || invoice.tags.length === 0) && (
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
                    onClick={() => {
                      addTagToInvoice(invoice.id, newTag);
                      setNewTag('');
                    }}
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
                      onClick={() => addTagToInvoice(invoice.id, tag)}
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
                {invoice.items.some(item => item.hsn) && (
                  <th className="pb-2 font-medium text-right">HSN Code</th>
                )}
                {invoice.items.some(item => item.taxRate) && (
                  <th className="pb-2 font-medium text-right">Tax Rate</th>
                )}
                {invoice.items.some(item => item.taxAmount) && (
                  <th className="pb-2 font-medium text-right">Tax Amount</th>
                )}
                <th className="pb-2 font-medium text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-border last:border-0">
                  <td className="py-3">{item.description}</td>
                  <td className="py-3 text-right">{item.quantity}</td>
                  <td className="py-3 text-right">{formatCurrency(item.price, invoice.currency)}</td>
                  {invoice.items.some(item => item.hsn) && (
                    <td className="py-3 text-right">{item.hsn || '-'}</td>
                  )}
                  {invoice.items.some(item => item.taxRate) && (
                    <td className="py-3 text-right">{item.taxRate ? `${item.taxRate}%` : '-'}</td>
                  )}
                  {invoice.items.some(item => item.taxAmount) && (
                    <td className="py-3 text-right">{item.taxAmount ? formatCurrency(item.taxAmount, invoice.currency) : '-'}</td>
                  )}
                  <td className="py-3 text-right">{formatCurrency(item.quantity * item.price, invoice.currency)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {invoice.items.some(item => item.taxAmount) && (
                <tr>
                  <td colSpan={invoice.items.some(item => item.hsn) ? 5 : 4} className="pt-4 text-right font-medium">Total</td>
                  <td className="pt-4 text-right font-bold">{formatCurrency(invoice.amount, invoice.currency)}</td>
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
        {invoice.category === 'sales' && (
          <Button size="sm">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 16L12 12L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 12V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5799 15.9986C23.024 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37138 19.1108 9.00073 18 9.00001H16.74C16.4373 7.82926 15.8732 6.74399 15.0899 5.82799C14.3067 4.91199 13.3248 4.18546 12.2181 3.70437C11.1113 3.22328 9.90851 2.99888 8.70008 3.04808C7.49164 3.09728 6.31378 3.41886 5.24947 3.98865C4.18516 4.55845 3.26303 5.36188 2.54873 6.33864C1.83443 7.31541 1.34768 8.4365 1.12992 9.6239C0.912151 10.8113 0.97136 12.0311 1.30323 13.1919C1.6351 14.3527 2.22904 15.4299 3.04 16.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Submit to GSTN
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceDetail;
