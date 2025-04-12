
const { pgPool } = require('../../../config/database');
const { getCurrentTenant } = require('../../../utils/tenantContext');
const logger = require('../../../utils/logger');

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

module.exports = PostgresModel;
