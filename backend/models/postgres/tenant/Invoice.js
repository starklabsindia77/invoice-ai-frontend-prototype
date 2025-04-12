
const { pgPool } = require('../../../config/database');
const { getCurrentTenant } = require('../../../utils/tenantContext');
const logger = require('../../../utils/logger');
const PostgresModel = require('./PostgresModel');
const InvoiceItem = require('./InvoiceItem');

class InvoiceModel extends PostgresModel {
  constructor() {
    super('invoices');
  }
  
  // Create invoice with items in a transaction
  async createWithItems(invoiceData, itemsData) {
    const client = await pgPool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert invoice
      const snakeCaseInvoice = this.toSnakeCase(invoiceData);
      const invoiceFields = Object.keys(snakeCaseInvoice);
      const invoicePlaceholders = invoiceFields.map((_, index) => `$${index + 1}`).join(', ');
      const invoiceValues = Object.values(snakeCaseInvoice);
      
      const invoiceQuery = `
        INSERT INTO ${this.getQualifiedTableName()} (${invoiceFields.join(', ')})
        VALUES (${invoicePlaceholders})
        RETURNING *
      `;
      
      const invoiceResult = await client.query(invoiceQuery, invoiceValues);
      const invoice = this.toCamelCase(invoiceResult.rows[0]);
      
      // Insert items
      if (itemsData && itemsData.length > 0) {
        const qualifiedItemsTable = InvoiceItem.getQualifiedTableName();
        
        for (const item of itemsData) {
          const itemWithInvoiceId = {
            ...item,
            invoiceId: invoice.id
          };
          
          const snakeCaseItem = this.toSnakeCase(itemWithInvoiceId);
          const itemFields = Object.keys(snakeCaseItem);
          const itemPlaceholders = itemFields.map((_, index) => `$${index + 1}`).join(', ');
          const itemValues = Object.values(snakeCaseItem);
          
          const itemQuery = `
            INSERT INTO ${qualifiedItemsTable} (${itemFields.join(', ')})
            VALUES (${itemPlaceholders})
          `;
          
          await client.query(itemQuery, itemValues);
        }
      }
      
      await client.query('COMMIT');
      
      return invoice;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error in createWithItems: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Get invoice with items
  async findByIdWithItems(id) {
    try {
      const invoiceResult = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE id = $1`,
        [id]
      );
      
      if (invoiceResult.rows.length === 0) {
        return null;
      }
      
      const invoice = this.toCamelCase(invoiceResult.rows[0]);
      
      // Get items
      const itemsResult = await pgPool.query(
        `SELECT * FROM ${InvoiceItem.getQualifiedTableName()} WHERE invoice_id = $1`,
        [id]
      );
      
      invoice.items = itemsResult.rows.map(row => InvoiceItem.toCamelCase(row));
      
      return invoice;
    } catch (error) {
      logger.error(`Error in findByIdWithItems: ${error.message}`);
      throw error;
    }
  }
  
  // Update invoice with items
  async updateWithItems(id, invoiceData, itemsData) {
    const client = await pgPool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Update invoice
      if (invoiceData && Object.keys(invoiceData).length > 0) {
        const snakeCaseInvoice = this.toSnakeCase(invoiceData);
        const invoiceFields = Object.keys(snakeCaseInvoice);
        const placeholders = invoiceFields.map((field, index) => `${field} = $${index + 1}`).join(', ');
        const values = [...Object.values(snakeCaseInvoice), id];
        
        const query = `
          UPDATE ${this.getQualifiedTableName()}
          SET ${placeholders}
          WHERE id = $${invoiceFields.length + 1}
        `;
        
        await client.query(query, values);
      }
      
      // Update items if provided
      if (itemsData && itemsData.length > 0) {
        const qualifiedItemsTable = InvoiceItem.getQualifiedTableName();
        
        // Delete existing items
        await client.query(`DELETE FROM ${qualifiedItemsTable} WHERE invoice_id = $1`, [id]);
        
        // Insert new items
        for (const item of itemsData) {
          const itemWithInvoiceId = {
            ...item,
            invoiceId: id
          };
          
          const snakeCaseItem = InvoiceItem.toSnakeCase(itemWithInvoiceId);
          const itemFields = Object.keys(snakeCaseItem);
          const itemPlaceholders = itemFields.map((_, index) => `$${index + 1}`).join(', ');
          const itemValues = Object.values(snakeCaseItem);
          
          const itemQuery = `
            INSERT INTO ${qualifiedItemsTable} (${itemFields.join(', ')})
            VALUES (${itemPlaceholders})
          `;
          
          await client.query(itemQuery, itemValues);
        }
      }
      
      await client.query('COMMIT');
      
      return await this.findByIdWithItems(id);
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error in updateWithItems: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Get invoices with filtering and pagination
  async findWithFilters(filters = {}, options = {}) {
    try {
      const tenant = getCurrentTenant();
      if (!tenant) {
        throw new Error('No tenant context available');
      }
      
      let query = `
        SELECT i.*, COUNT(*) OVER() as total_count
        FROM ${tenant.schemaName}.invoices i
      `;
      
      const queryParams = [];
      let whereClause = [];
      let paramIndex = 1;
      
      // Process filters
      if (filters.category) {
        whereClause.push(`i.category = $${paramIndex++}`);
        queryParams.push(filters.category);
      }
      
      if (filters.userId) {
        whereClause.push(`i.user_id = $${paramIndex++}`);
        queryParams.push(filters.userId);
      }
      
      if (filters.organization) {
        whereClause.push(`i.organization = $${paramIndex++}`);
        queryParams.push(filters.organization);
      }
      
      if (filters.status) {
        whereClause.push(`i.status = $${paramIndex++}`);
        queryParams.push(filters.status);
      }
      
      if (filters.dateFrom) {
        whereClause.push(`i.date >= $${paramIndex++}`);
        queryParams.push(new Date(filters.dateFrom));
      }
      
      if (filters.dateTo) {
        whereClause.push(`i.date <= $${paramIndex++}`);
        queryParams.push(new Date(filters.dateTo));
      }
      
      if (filters.search) {
        whereClause.push(`(i.vendor ILIKE $${paramIndex} OR i.gst_id ILIKE $${paramIndex})`);
        queryParams.push(`%${filters.search}%`);
        paramIndex++;
      }
      
      if (filters.gstFilingStatus) {
        whereClause.push(`i.gst_filing_status = $${paramIndex++}`);
        queryParams.push(filters.gstFilingStatus);
      }
      
      // Add WHERE clause if filters exist
      if (whereClause.length > 0) {
        query += ` WHERE ${whereClause.join(' AND ')}`;
      }
      
      // Add ORDER BY
      const sortField = options.sortBy || 'date';
      const sortDirection = options.sortDesc ? 'DESC' : 'ASC';
      query += ` ORDER BY i.${sortField} ${sortDirection}`;
      
      // Add pagination
      const page = options.page || 1;
      const limit = options.limit || 10;
      const offset = (page - 1) * limit;
      
      query += ` LIMIT $${paramIndex++} OFFSET $${paramIndex++}`;
      queryParams.push(limit, offset);
      
      const result = await pgPool.query(query, queryParams);
      
      const invoices = result.rows.map(row => {
        const { total_count, ...invoiceData } = row;
        return this.toCamelCase(invoiceData);
      });
      
      const total = result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0;
      
      return {
        data: invoices,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      logger.error(`Error in findWithFilters: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new InvoiceModel();
