
const { pgPool } = require('../../../config/database');
const logger = require('../../../utils/logger');
const PublicModel = require('./PublicModel');

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

module.exports = new SubscriptionModel();
