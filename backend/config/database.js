
const mongoose = require('mongoose');
const { Pool } = require('pg');
const logger = require('../utils/logger');

// MongoDB connection for backward compatibility or specific use cases
const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// PostgreSQL pool
const pgPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Test PostgreSQL connection
const testPgConnection = async () => {
  try {
    const client = await pgPool.connect();
    logger.info('PostgreSQL database connected successfully');
    client.release();
    return true;
  } catch (error) {
    logger.error(`Error connecting to PostgreSQL: ${error.message}`);
    return false;
  }
};

// Create schema for a new tenant
const createTenantSchema = async (tenantName) => {
  const schemaName = `tenant_${tenantName.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
  const client = await pgPool.connect();
  
  try {
    // Create the schema
    await client.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
    
    // Create tables in the tenant schema
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
    
    logger.info(`Created schema and tables for tenant: ${tenantName}`);
    return schemaName;
  } catch (error) {
    logger.error(`Error creating schema for tenant ${tenantName}: ${error.message}`);
    throw error;
  } finally {
    client.release();
  }
};

// Create public schema tables for superadmin
const createPublicSchemaTables = async () => {
  const client = await pgPool.connect();
  
  try {
    // Create tenants table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.tenants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        schema_name VARCHAR(255) UNIQUE NOT NULL,
        domain VARCHAR(255) UNIQUE,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.subscriptions (
        id SERIAL PRIMARY KEY,
        tenant_id INTEGER REFERENCES public.tenants(id),
        plan_id INTEGER,
        status VARCHAR(50) DEFAULT 'active',
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP,
        billing_cycle VARCHAR(50),
        price NUMERIC,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create plans table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price NUMERIC NOT NULL,
        billing_cycle VARCHAR(50) NOT NULL,
        features JSONB,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create system_config table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.system_config (
        id SERIAL PRIMARY KEY,
        setting_key VARCHAR(255) NOT NULL,
        setting_value TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(setting_key)
      )
    `);
    
    // Create super admin users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.admin_users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        reset_password_token VARCHAR(255),
        reset_password_expire TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    logger.info('Created public schema tables successfully');
  } catch (error) {
    logger.error(`Error creating public schema tables: ${error.message}`);
    throw error;
  } finally {
    client.release();
  }
};

// Initialize database
const initDatabase = async () => {
  // Test PostgreSQL connection
  const pgConnected = await testPgConnection();
  
  if (pgConnected) {
    // Create public schema tables
    await createPublicSchemaTables();
    
    // If MongoDB URI is provided, connect to MongoDB as well
    if (process.env.MONGODB_URI) {
      await connectMongoDB();
    }
  } else {
    logger.error('Failed to connect to PostgreSQL database');
    process.exit(1);
  }
};

module.exports = {
  pgPool,
  initDatabase,
  createTenantSchema,
  connectMongoDB
};
