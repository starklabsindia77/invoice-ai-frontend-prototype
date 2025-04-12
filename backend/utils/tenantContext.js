
const { AsyncLocalStorage } = require('async_hooks');
const { pgPool } = require('../config/database');
const logger = require('./logger');

// Create AsyncLocalStorage to store tenant context
const tenantStorage = new AsyncLocalStorage();

// Tenant context class
class TenantContext {
  constructor(tenantId, schemaName) {
    this.tenantId = tenantId;
    this.schemaName = schemaName;
  }
}

// Set current tenant
const setTenant = (tenantId, schemaName, callback) => {
  const tenantContext = new TenantContext(tenantId, schemaName);
  return tenantStorage.run(tenantContext, callback);
};

// Get current tenant
const getCurrentTenant = () => {
  return tenantStorage.getStore();
};

// Get tenant by domain
const getTenantByDomain = async (domain) => {
  try {
    const result = await pgPool.query(
      'SELECT id, name, schema_name FROM public.tenants WHERE domain = $1 AND status = $2',
      [domain, 'active']
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting tenant by domain: ${error.message}`);
    throw error;
  }
};

// Get tenant by name
const getTenantByName = async (name) => {
  try {
    const result = await pgPool.query(
      'SELECT id, name, schema_name FROM public.tenants WHERE name = $1 AND status = $2',
      [name, 'active']
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0];
  } catch (error) {
    logger.error(`Error getting tenant by name: ${error.message}`);
    throw error;
  }
};

// Create tenant
const createTenant = async (name, domain = null) => {
  const client = await pgPool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Create normalized schema name
    const schemaName = `tenant_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    
    // Check if tenant already exists
    const existingTenant = await client.query(
      'SELECT id FROM public.tenants WHERE name = $1 OR schema_name = $2',
      [name, schemaName]
    );
    
    if (existingTenant.rows.length > 0) {
      throw new Error(`Tenant with name ${name} already exists`);
    }
    
    // Insert tenant record
    const result = await client.query(
      'INSERT INTO public.tenants (name, schema_name, domain, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, schemaName, domain, 'active']
    );
    
    const tenantId = result.rows[0].id;
    
    // Create schema and tables for the tenant
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    
    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        organization VARCHAR(255) NOT NULL,
        reset_password_token VARCHAR(255),
        reset_password_expire TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create invoice_items table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.invoice_items (
        id SERIAL PRIMARY KEY,
        invoice_id INTEGER,
        description TEXT NOT NULL,
        quantity NUMERIC NOT NULL CHECK (quantity >= 0),
        price NUMERIC NOT NULL CHECK (price >= 0),
        hsn VARCHAR(255),
        tax_rate NUMERIC DEFAULT 0,
        tax_amount NUMERIC DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create invoices table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.invoices (
        id SERIAL PRIMARY KEY,
        vendor VARCHAR(255) NOT NULL,
        amount NUMERIC NOT NULL CHECK (amount >= 0),
        date TIMESTAMP NOT NULL,
        status VARCHAR(50) DEFAULT 'Pending',
        gst_id VARCHAR(255) NOT NULL,
        category VARCHAR(50) NOT NULL,
        tags TEXT[],
        language VARCHAR(50) DEFAULT 'en',
        currency VARCHAR(50) DEFAULT 'INR',
        gst_type VARCHAR(50),
        gst_filing_status VARCHAR(50) DEFAULT 'Pending',
        gst_filing_period VARCHAR(255),
        place_of_supply VARCHAR(255),
        reverse_charge BOOLEAN DEFAULT FALSE,
        e_invoice_number VARCHAR(255),
        user_id INTEGER NOT NULL,
        organization VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create tenant_config table
    await client.query(`
      CREATE TABLE IF NOT EXISTS ${schemaName}.tenant_config (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(255) NOT NULL,
        setting_value TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(setting_key)
      )
    `);
    
    await client.query('COMMIT');
    
    logger.info(`Created tenant: ${name} with schema: ${schemaName}`);
    
    return {
      id: tenantId,
      name,
      schemaName
    };
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error(`Error creating tenant: ${error.message}`);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  setTenant,
  getCurrentTenant,
  getTenantByDomain,
  getTenantByName,
  createTenant
};
