
// MongoDB models
const MongoUser = require('./user.model');
const MongoInvoice = require('./invoice.model');

// PostgreSQL models
const TenantModels = require('./postgres/tenant');
const PublicModels = require('./postgres/public');

module.exports = {
  // MongoDB models (for backward compatibility)
  MongoUser,
  MongoInvoice,
  
  // PostgreSQL tenant models
  User: TenantModels.User,
  Invoice: TenantModels.Invoice,
  InvoiceItem: TenantModels.InvoiceItem,
  TenantConfig: TenantModels.TenantConfig,
  
  // PostgreSQL public schema models
  Tenant: PublicModels.Tenant,
  AdminUser: PublicModels.AdminUser,
  Subscription: PublicModels.Subscription,
  Plan: PublicModels.Plan,
  SystemConfig: PublicModels.SystemConfig
};
