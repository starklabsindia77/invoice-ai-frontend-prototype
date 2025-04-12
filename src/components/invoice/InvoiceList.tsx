
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { Invoice } from '@/types/invoice';

interface InvoiceListProps {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  onSelectInvoice: (invoice: Invoice) => void;
  formatCurrency: (amount: number, currency?: string) => string;
  getLanguageName: (code: string) => string;
}

const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  selectedInvoiceId,
  onSelectInvoice,
  formatCurrency,
  getLanguageName
}) => {
  return (
    <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
      {invoices.map((invoice) => (
        <div 
          key={invoice.id}
          className={`p-3 rounded-md cursor-pointer border ${
            selectedInvoiceId === invoice.id 
              ? 'bg-brand-50 border-brand-200' 
              : 'hover:bg-gray-50 border-transparent'
          }`}
          onClick={() => onSelectInvoice(invoice)}
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
      
      {invoices.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No invoices found
        </div>
      )}
    </div>
  );
};

export default InvoiceList;
