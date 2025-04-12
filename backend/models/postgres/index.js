
const { pgPool } = require('../../config/database');
const { getCurrentTenant } = require('../../utils/tenantContext');
const logger = require('../../utils/logger');

/**
 * Base class for PostgreSQL models
 */
class PostgresModel {
  constructor(tableName, primaryKey = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }
  
  /**
   * Get fully qualified table name with schema
   */
  getQualifiedTableName() {
    const tenant = getCurrentTenant();
    if (!tenant) {
      throw new Error('No tenant context available');
    }
    return `${tenant.schemaName}.${this.tableName}`;
  }
  
  /**
   * Convert snake_case DB column names to camelCase for JS
   */
  toCamelCase(obj) {
    if (!obj) return null;
    
    const newObj = {};
    Object.keys(obj).forEach(key => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      newObj[camelKey] = obj[key];
    });
    return newObj;
  }
  
  /**
   * Convert camelCase JS property names to snake_case for DB
   */
  toSnakeCase(obj) {
    if (!obj) return null;
    
    const newObj = {};
    Object.keys(obj).forEach(key => {
      const snakeKey = key.replace(/([A-Z])/g, letter => `_${letter.toLowerCase()}`);
      newObj[snakeKey] = obj[key];
    });
    return newObj;
  }
  
  /**
   * Find record by primary key
   */
  async findById(id) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE ${this.primaryKey} = $1`,
        [id]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findById: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Find records with filters
   */
  async find(filters = {}, options = {}) {
    try {
      let query = `SELECT * FROM ${this.getQualifiedTableName()}`;
      const values = [];
      
      // Process filters
      if (Object.keys(filters).length > 0) {
        const filterEntries = Object.entries(this.toSnakeCase(filters));
        query += ' WHERE ';
        query += filterEntries.map((entry, index) => {
          values.push(entry[1]);
          return `${entry[0]} = $${index + 1}`;
        }).join(' AND ');
      }
      
      // Process sorting
      if (options.sort) {
        const sortField = Object.keys(options.sort)[0];
        const sortDirection = options.sort[sortField] === 1 ? 'ASC' : 'DESC';
        query += ` ORDER BY ${this.toSnakeCase({ [sortField]: '' })[sortField]} ${sortDirection}`;
      }
      
      // Process pagination
      if (options.limit) {
        query += ` LIMIT ${parseInt(options.limit)}`;
        if (options.offset) {
          query += ` OFFSET ${parseInt(options.offset)}`;
        }
      }
      
      const result = await pgPool.query(query, values);
      
      return result.rows.map(row => this.toCamelCase(row));
    } catch (error) {
      logger.error(`Error in find: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Count records with filters
   */
  async count(filters = {}) {
    try {
      let query = `SELECT COUNT(*) FROM ${this.getQualifiedTableName()}`;
      const values = [];
      
      // Process filters
      if (Object.keys(filters).length > 0) {
        const filterEntries = Object.entries(this.toSnakeCase(filters));
        query += ' WHERE ';
        query += filterEntries.map((entry, index) => {
          values.push(entry[1]);
          return `${entry[0]} = $${index + 1}`;
        }).join(' AND ');
      }
      
      const result = await pgPool.query(query, values);
      
      return parseInt(result.rows[0].count);
    } catch (error) {
      logger.error(`Error in count: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Create a new record
   */
  async create(data) {
    try {
      const snakeCaseData = this.toSnakeCase(data);
      const fields = Object.keys(snakeCaseData);
      const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
      const values = Object.values(snakeCaseData);
      
      const query = `
        INSERT INTO ${this.getQualifiedTableName()} (${fields.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const result = await pgPool.query(query, values);
      
      return this.toCamelCase(result.rows[0]);
    } catch (error) {
      logger.error(`Error in create: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Update a record
   */
  async update(id, data) {
    try {
      const snakeCaseData = this.toSnakeCase(data);
      const fields = Object.keys(snakeCaseData);
      const placeholders = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
      const values = [...Object.values(snakeCaseData), id];
      
      const query = `
        UPDATE ${this.getQualifiedTableName()}
        SET ${placeholders}
        WHERE ${this.primaryKey} = $${fields.length + 1}
        RETURNING *
      `;
      
      const result = await pgPool.query(query, values);
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in update: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Delete a record
   */
  async delete(id) {
    try {
      const query = `
        DELETE FROM ${this.getQualifiedTableName()}
        WHERE ${this.primaryKey} = $1
        RETURNING *
      `;
      
      const result = await pgPool.query(query, [id]);
      
      return result.rowCount > 0;
    } catch (error) {
      logger.error(`Error in delete: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Execute a raw query
   */
  async query(sql, params = []) {
    try {
      // Replace {table} with qualified table name
      const parsedSql = sql.replace(/{table}/g, this.getQualifiedTableName());
      
      const result = await pgPool.query(parsedSql, params);
      
      return result.rows.map(row => this.toCamelCase(row));
    } catch (error) {
      logger.error(`Error in raw query: ${error.message}`);
      throw error;
    }
  }
}

// User model
class UserModel extends PostgresModel {
  constructor() {
    super('users');
  }
  
  async findByEmail(email) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE email = $1`,
        [email]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByEmail: ${error.message}`);
      throw error;
    }
  }
}

// Invoice model
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
        const itemsModel = new InvoiceItemModel();
        const qualifiedItemsTable = itemsModel.getQualifiedTableName();
        
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
      const itemsModel = new InvoiceItemModel();
      const itemsResult = await pgPool.query(
        `SELECT * FROM ${itemsModel.getQualifiedTableName()} WHERE invoice_id = $1`,
        [id]
      );
      
      invoice.items = itemsResult.rows.map(row => itemsModel.toCamelCase(row));
      
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
        const itemsModel = new InvoiceItemModel();
        const qualifiedItemsTable = itemsModel.getQualifiedTableName();
        
        // Delete existing items
        await client.query(`DELETE FROM ${qualifiedItemsTable} WHERE invoice_id = $1`, [id]);
        
        // Insert new items
        for (const item of itemsData) {
          const itemWithInvoiceId = {
            ...item,
            invoiceId: id
          };
          
          const snakeCaseItem = itemsModel.toSnakeCase(itemWithInvoiceId);
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

// Invoice Item model
class InvoiceItemModel extends PostgresModel {
  constructor() {
    super('invoice_items');
  }
}

// Tenant Config model
class TenantConfigModel extends PostgresModel {
  constructor() {
    super('tenant_config');
  }
  
  async getSetting(key) {
    try {
      const result = await pgPool.query(
        `SELECT setting_value FROM ${this.getQualifiedTableName()} WHERE setting_key = $1`,
        [key]
      );
      
      return result.rows.length > 0 ? result.rows[0].setting_value : null;
    } catch (error) {
      logger.error(`Error in getSetting: ${error.message}`);
      throw error;
    }
  }
  
  async setSetting(key, value, description = null) {
    try {
      const result = await pgPool.query(
        `
        INSERT INTO ${this.getQualifiedTableName()} (setting_key, setting_value, description)
        VALUES ($1, $2, $3)
        ON CONFLICT (setting_key) 
        DO UPDATE SET setting_value = $2, description = $3
        RETURNING *
        `,
        [key, value, description]
      );
      
      return this.toCamelCase(result.rows[0]);
    } catch (error) {
      logger.error(`Error in setSetting: ${error.message}`);
      throw error;
    }
  }
}

module.exports = {
  User: new UserModel(),
  Invoice: new InvoiceModel(),
  InvoiceItem: new InvoiceItemModel(),
  TenantConfig: new TenantConfigModel()
};
