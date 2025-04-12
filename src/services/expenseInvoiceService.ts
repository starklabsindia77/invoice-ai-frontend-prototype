
import { Invoice } from '@/types/invoice';
import apiClient from './api';
import { ApiResponse, PaginatedResponse, InvoiceFilterParams, CreateInvoiceRequest, ApiError } from './types';

const EXPENSE_ENDPOINT = '/invoices/expenses';

export const expenseInvoiceService = {
  /**
   * Get all expense invoices with optional filtering
   */
  getAllExpenseInvoices: async (params?: InvoiceFilterParams): Promise<PaginatedResponse<Invoice>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Invoice>>>(EXPENSE_ENDPOINT, { params });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching expense invoices:', error);
      throw error;
    }
  },

  /**
   * Get a specific expense invoice by ID
   */
  getExpenseInvoiceById: async (id: string): Promise<Invoice> => {
    try {
      const response = await apiClient.get<ApiResponse<Invoice>>(`${EXPENSE_ENDPOINT}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching expense invoice with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new expense invoice
   */
  createExpenseInvoice: async (invoiceData: CreateInvoiceRequest): Promise<Invoice> => {
    try {
      const response = await apiClient.post<ApiResponse<Invoice>>(EXPENSE_ENDPOINT, {
        ...invoiceData,
        category: 'expense',
        status: 'Pending', // Default status for new invoices
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating expense invoice:', error);
      throw error;
    }
  },

  /**
   * Update an existing expense invoice
   */
  updateExpenseInvoice: async (id: string, invoiceData: Partial<Invoice>): Promise<Invoice> => {
    try {
      const response = await apiClient.put<ApiResponse<Invoice>>(`${EXPENSE_ENDPOINT}/${id}`, invoiceData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating expense invoice with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete an expense invoice
   */
  deleteExpenseInvoice: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`${EXPENSE_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Error deleting expense invoice with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Export expense invoices to CSV
   */
  exportExpenseInvoicesToCsv: async (params?: InvoiceFilterParams): Promise<Blob> => {
    try {
      const response = await apiClient.get(`${EXPENSE_ENDPOINT}/export/csv`, { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting expense invoices to CSV:', error);
      throw error;
    }
  },
  
  /**
   * Sync expense invoices with accounting software
   */
  syncExpenseInvoicesWithAccounting: async (): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(`${EXPENSE_ENDPOINT}/sync`);
      return response.data.data;
    } catch (error) {
      console.error('Error syncing expense invoices with accounting software:', error);
      throw error;
    }
  },
  
  /**
   * Update the status of an expense invoice
   */
  updateExpenseInvoiceStatus: async (id: string, status: 'Processed' | 'Pending' | 'Failed'): Promise<Invoice> => {
    try {
      const response = await apiClient.patch<ApiResponse<Invoice>>(`${EXPENSE_ENDPOINT}/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating expense invoice status for ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Process GST filing for an expense invoice
   */
  processGstFiling: async (id: string, filingData: { 
    gstFilingStatus: 'Filed' | 'Pending' | 'Not Applicable',
    gstFilingPeriod: string
  }): Promise<Invoice> => {
    try {
      const response = await apiClient.post<ApiResponse<Invoice>>(
        `${EXPENSE_ENDPOINT}/${id}/gst-filing`, 
        filingData
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error processing GST filing for expense invoice ID ${id}:`, error);
      throw error;
    }
  }
};
