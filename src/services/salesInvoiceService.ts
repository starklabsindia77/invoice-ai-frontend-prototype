
import { Invoice } from '@/types/invoice';
import apiClient from './api';
import { ApiResponse, PaginatedResponse, InvoiceFilterParams, CreateInvoiceRequest, ApiError } from './types';

const SALES_ENDPOINT = '/invoices/sales';

export const salesInvoiceService = {
  /**
   * Get all sales invoices with optional filtering
   */
  getAllSalesInvoices: async (params?: InvoiceFilterParams): Promise<PaginatedResponse<Invoice>> => {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Invoice>>>(SALES_ENDPOINT, { params });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching sales invoices:', error);
      throw error;
    }
  },

  /**
   * Get a specific sales invoice by ID
   */
  getSalesInvoiceById: async (id: string): Promise<Invoice> => {
    try {
      const response = await apiClient.get<ApiResponse<Invoice>>(`${SALES_ENDPOINT}/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching sales invoice with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Create a new sales invoice
   */
  createSalesInvoice: async (invoiceData: CreateInvoiceRequest): Promise<Invoice> => {
    try {
      const response = await apiClient.post<ApiResponse<Invoice>>(SALES_ENDPOINT, {
        ...invoiceData,
        category: 'sales',
        status: 'Pending', // Default status for new invoices
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating sales invoice:', error);
      throw error;
    }
  },

  /**
   * Update an existing sales invoice
   */
  updateSalesInvoice: async (id: string, invoiceData: Partial<Invoice>): Promise<Invoice> => {
    try {
      const response = await apiClient.put<ApiResponse<Invoice>>(`${SALES_ENDPOINT}/${id}`, invoiceData);
      return response.data.data;
    } catch (error) {
      console.error(`Error updating sales invoice with ID ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete a sales invoice
   */
  deleteSalesInvoice: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`${SALES_ENDPOINT}/${id}`);
    } catch (error) {
      console.error(`Error deleting sales invoice with ID ${id}:`, error);
      throw error;
    }
  },
  
  /**
   * Export sales invoices to CSV
   */
  exportSalesInvoicesToCsv: async (params?: InvoiceFilterParams): Promise<Blob> => {
    try {
      const response = await apiClient.get(`${SALES_ENDPOINT}/export/csv`, { 
        params,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting sales invoices to CSV:', error);
      throw error;
    }
  },
  
  /**
   * Sync sales invoices with accounting software
   */
  syncSalesInvoicesWithAccounting: async (): Promise<{ message: string }> => {
    try {
      const response = await apiClient.post<ApiResponse<{ message: string }>>(`${SALES_ENDPOINT}/sync`);
      return response.data.data;
    } catch (error) {
      console.error('Error syncing sales invoices with accounting software:', error);
      throw error;
    }
  },
  
  /**
   * Update the status of a sales invoice
   */
  updateSalesInvoiceStatus: async (id: string, status: 'Processed' | 'Pending' | 'Failed'): Promise<Invoice> => {
    try {
      const response = await apiClient.patch<ApiResponse<Invoice>>(`${SALES_ENDPOINT}/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      console.error(`Error updating sales invoice status for ID ${id}:`, error);
      throw error;
    }
  }
};
