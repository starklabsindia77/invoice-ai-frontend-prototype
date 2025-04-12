
// MongoDB models
const MongoUser = require('./user.model');
const MongoInvoice = require('./invoice.model');

// PostgreSQL models
const PostgresModels = require('./postgres');
const PublicModels = require('./postgres/public');

module.exports = {
  // MongoDB models (for backward compatibility)
  MongoUser,
  MongoInvoice,
  
  // PostgreSQL tenant models
  User: PostgresModels.User,
  Invoice: PostgresModels.Invoice,
  InvoiceItem: PostgresModels.InvoiceItem,
  TenantConfig: PostgresModels.TenantConfig,
  
  // PostgreSQL public schema models
  Tenant: PublicModels.Tenant,
  AdminUser: PublicModels.AdminUser,
  Subscription: PublicModels.Subscription,
  Plan: PublicModels.Plan,
  SystemConfig: PublicModels.SystemConfig
};
