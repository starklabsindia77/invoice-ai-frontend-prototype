
export type InvoiceItem = {
  description: string;
  quantity: number;
  price: number;
  hsn?: string; // HSN code for Indian GST
  taxRate?: number; // Tax rate percentage
  taxAmount?: number; // Calculated tax amount
};

export type InvoiceCategory = 'sales' | 'expense';

export type Invoice = {
  id: string;
  vendor: string;
  amount: number;
  date: string;
  status: 'Processed' | 'Pending' | 'Failed';
  gstId: string;
  category: InvoiceCategory;
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
