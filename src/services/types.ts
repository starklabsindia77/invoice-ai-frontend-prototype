
import { Invoice, InvoiceItem } from '@/types/invoice';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Request Types
export interface InvoiceFilterParams {
  status?: string;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  language?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreateInvoiceRequest {
  vendor: string;
  amount: number;
  date: string;
  category: 'sales' | 'expense';
  gstId: string;
  language?: string;
  currency?: string;
  items: InvoiceItem[];
  gstType?: 'CGST/SGST' | 'IGST' | 'Exempt';
  gstFilingStatus?: 'Filed' | 'Pending' | 'Not Applicable';
  gstFilingPeriod?: string;
  placeOfSupply?: string;
  reverseCharge?: boolean;
  eInvoiceNumber?: string;
  tags?: string[];
}

// Error Handling Type
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
