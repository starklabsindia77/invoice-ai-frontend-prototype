
const { pgPool } = require('../../config/database');
const logger = require('../../utils/logger');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Base class for PostgreSQL public schema models
 */
class PublicModel {
  constructor(tableName, primaryKey = 'id') {
    this.tableName = tableName;
    this.primaryKey = primaryKey;
  }
  
  /**
   * Get fully qualified table name
   */
  getQualifiedTableName() {
    return `public.${this.tableName}`;
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
}

// Tenant model
class TenantModel extends PublicModel {
  constructor() {
    super('tenants');
  }
  
  async findByName(name) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE name = $1`,
        [name]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByName: ${error.message}`);
      throw error;
    }
  }
  
  async findByDomain(domain) {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE domain = $1`,
        [domain]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in findByDomain: ${error.message}`);
      throw error;
    }
  }
}

// Admin User model
class AdminUserModel extends PublicModel {
  constructor() {
    super('admin_users');
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
  
  // Create admin user with hashed password
  async create(userData) {
    const client = await pgPool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Replace plaintext password with hashed password
      const userDataWithHashedPassword = {
        ...userData,
        password: hashedPassword
      };
      
      const snakeCaseData = this.toSnakeCase(userDataWithHashedPassword);
      const fields = Object.keys(snakeCaseData);
      const placeholders = fields.map((_, index) => `$${index + 1}`).join(', ');
      const values = Object.values(snakeCaseData);
      
      const query = `
        INSERT INTO ${this.getQualifiedTableName()} (${fields.join(', ')})
        VALUES (${placeholders})
        RETURNING *
      `;
      
      const result = await client.query(query, values);
      
      await client.query('COMMIT');
      
      const user = this.toCamelCase(result.rows[0]);
      delete user.password;
      
      return user;
    } catch (error) {
      await client.query('ROLLBACK');
      logger.error(`Error creating admin user: ${error.message}`);
      throw error;
    } finally {
      client.release();
    }
  }
  
  // Match password
  async matchPassword(userId, enteredPassword) {
    try {
      const result = await pgPool.query(
        `SELECT password FROM ${this.getQualifiedTableName()} WHERE id = $1`,
        [userId]
      );
      
      if (result.rows.length === 0) {
        return false;
      }
      
      return await bcrypt.compare(enteredPassword, result.rows[0].password);
    } catch (error) {
      logger.error(`Error in matchPassword: ${error.message}`);
      throw error;
    }
  }
  
  // Get signed JWT token
  getSignedJwtToken(userId) {
    return jwt.sign({ id: userId, isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
}

// Subscription model
class SubscriptionModel extends PublicModel {
  constructor() {
    super('subscriptions');
  }
  
  async findByTenantId(tenantId) {
    try {
      const result = await pgPool.query(
        `SELECT s.*, p.name as plan_name, p.price as plan_price, p.features as plan_features
         FROM ${this.getQualifiedTableName()} s
         JOIN public.plans p ON s.plan_id = p.id
         WHERE s.tenant_id = $1
         ORDER BY s.start_date DESC`,
        [tenantId]
      );
      
      return result.rows.map(row => this.toCamelCase(row));
    } catch (error) {
      logger.error(`Error in findByTenantId: ${error.message}`);
      throw error;
    }
  }
  
  async getActiveTenantSubscription(tenantId) {
    try {
      const result = await pgPool.query(
        `SELECT s.*, p.name as plan_name, p.price as plan_price, p.features as plan_features
         FROM ${this.getQualifiedTableName()} s
         JOIN public.plans p ON s.plan_id = p.id
         WHERE s.tenant_id = $1 AND s.status = 'active'
         ORDER BY s.start_date DESC
         LIMIT 1`,
        [tenantId]
      );
      
      return result.rows.length > 0 ? this.toCamelCase(result.rows[0]) : null;
    } catch (error) {
      logger.error(`Error in getActiveTenantSubscription: ${error.message}`);
      throw error;
    }
  }
}

// Plan model
class PlanModel extends PublicModel {
  constructor() {
    super('plans');
  }
  
  async getActivePlans() {
    try {
      const result = await pgPool.query(
        `SELECT * FROM ${this.getQualifiedTableName()} WHERE is_active = true ORDER BY price ASC`
      );
      
      return result.rows.map(row => this.toCamelCase(row));
    } catch (error) {
      logger.error(`Error in getActivePlans: ${error.message}`);
      throw error;
    }
  }
}

// System Config model
class SystemConfigModel extends PublicModel {
  constructor() {
    super('system_config');
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
  Tenant: new TenantModel(),
  AdminUser: new AdminUserModel(),
  Subscription: new SubscriptionModel(),
  Plan: new PlanModel(),
  SystemConfig: new SystemConfigModel()
};
